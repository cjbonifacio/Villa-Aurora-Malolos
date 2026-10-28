// POST /api/request — a guest submits a booking REQUEST (not a confirmed booking).
// Validates the form, re-checks the dates against `blocked_dates`, then saves it to
// Supabase `booking_requests` with status 'pending'. CJ approves bookings in the admin.
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only, never in the browser).

import { z } from "zod";

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

const RequestSchema = z
  .object({
    guest_name: z.string().trim().min(2).max(100),
    phone: z.string().trim().regex(/^[0-9+()\-\s]{7,30}$/, "Invalid phone number"),
    email: z.string().trim().email().max(200).optional().or(z.literal("")),
    check_in: date,
    check_out: date,
    pax: z.coerce.number().int().min(1).max(100),
    package_type: z.enum(["overnight", "daytour", "wedding", "other"]).optional().or(z.literal("")),
    message: z.string().trim().max(500).optional().or(z.literal("")),
    website: z.string().optional(), // honeypot: real people leave this empty
  })
  .refine((r) => r.check_out > r.check_in, { message: "Check-out must be after check-in", path: ["check_out"] });

// ---- Flood protection ----
// 1. Quick per-visitor limit (5 per 10 minutes per IP). It lives in memory, so it only covers one
//    server copy; Vercel runs several copies during a burst, which is why 2 and 3 also exist.
// 2. Site-wide limit, counted in the database: at most MAX_PER_HOUR new requests per hour.
// 3. Per-guest limit, counted in the database: at most MAX_PER_PHONE_PER_DAY requests per phone number per day.
//    2 and 3 are checked here first (cheap), and enforced for certain by a database rule
//    (supabase/migrations/0002_lock_down.sql), which also covers requests arriving at the same moment.
// When a limit is hit, the guest is asked to message us on Messenger instead, so real guests are never lost.
const MAX_PER_HOUR = 20;
const MAX_PER_PHONE_PER_DAY = 3;
const MAX_BODY_BYTES = 10_000; // a real form is under 2 KB
const MAX_NIGHTS = 30;

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory small during a flood from many IPs
  return recent.length > 5;
}

// How many booking_requests match `filter` (Supabase returns the total in the Content-Range header).
async function countRequests(url: string, headers: Record<string, string>, filter: string) {
  const res = await fetch(`${url}/rest/v1/booking_requests?select=id&${filter}`, {
    headers: { ...headers, Prefer: "count=exact", Range: "0-0" },
  });
  if (!res.ok) throw new Error(`count failed: ${await supabaseError(res)}`);
  return Number(res.headers.get("content-range")?.split("/")[1] ?? 0);
}

const BUSY_MESSAGE = "We're getting a lot of requests right now. Please message us on Messenger and we'll reply soon.";

// Old Supabase keys are JWTs ("eyJ...") and go in both headers. New "sb_secret_..." keys go in apikey only.
function supabaseHeaders(key: string): Record<string, string> {
  return key.startsWith("eyJ") ? { apikey: key, Authorization: `Bearer ${key}` } : { apikey: key };
}

// Supabase error text, e.g. "Invalid API key" (never contains the key itself).
async function supabaseError(res: Response) {
  const text = await res.text();
  try {
    return (JSON.parse(text).message as string) ?? text;
  } catch {
    return text.slice(0, 200);
  }
}

// ---- Google Calendar (same code in api/availability.ts and api/request.ts — keep them in sync) ----
// Reads the calendar's private "Secret address in iCal format" (Vercel setting GOOGLE_CALENDAR_ICS_URL).
// Only dates leave this function: event titles and guest names are never returned.
// What counts as booked:
//   • all-day events (the admin app saves bookings as all-day "RESERVED: name" events)
//   • timed events of 6+ hours (e.g. a day tour 2 PM–10 PM, or an overnight 2 PM–12 NN)
//   Short timed events (like a 1-hour ocular visit) and cancelled events are ignored.
interface DateRange {
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD, exclusive (the check-out day stays open)
}

const addDays = (ymd: string, days: number) => {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

// Turns an iCal date line ("DTSTART;VALUE=DATE:20261224", "DTSTART:20261224T060000Z",
// "DTSTART;TZID=Asia/Manila:20261224T140000") into a Manila date + timestamp.
function parseIcalDate(line: string) {
  const value = line.slice(line.lastIndexOf(":") + 1).trim();
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s, z] = m;
  if (!h) return { date: `${y}-${mo}-${d}`, allDay: true, time: Date.UTC(+y, +mo - 1, +d) };
  // UTC times are moved to Manila (UTC+8); other times are treated as Manila local time.
  const utc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s) - (z ? 0 : 8 * 3600 * 1000);
  const manila = new Date(utc + 8 * 3600 * 1000).toISOString().slice(0, 10);
  return { date: manila, allDay: false, time: utc };
}

// Keeps the downloaded feed for 60 seconds, and lets requests that arrive at the same moment share
// one download, so a burst of visitors doesn't hammer Google (which could block the feed).
let feedCache: { at: number; text: Promise<string> } | null = null;
function loadFeed(icsUrl: string): Promise<string> {
  if (feedCache && Date.now() - feedCache.at < 60_000) return feedCache.text;
  const text = fetch(icsUrl, { headers: { Accept: "text/calendar" } }).then(async (res) => {
    if (!res.ok) throw new Error(`Google Calendar feed returned ${res.status}`);
    return (await res.text()).replace(/\r?\n[ \t]/g, ""); // unfold long lines
  });
  feedCache = { at: Date.now(), text };
  text.catch(() => {
    feedCache = null; // don't keep a failed download
  });
  return text;
}

async function calendarRanges(from: string, to: string): Promise<DateRange[]> {
  const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL?.trim();
  if (!icsUrl) return []; // not set up: the site just uses Supabase blocked_dates
  const text = await loadFeed(icsUrl);

  const ranges: DateRange[] = [];
  for (const block of text.split("BEGIN:VEVENT").slice(1)) {
    const lines = block.split(/\r?\n/);
    const get = (name: string) => lines.find((l) => l.startsWith(name + ":") || l.startsWith(name + ";"));
    if (/^STATUS:CANCELLED/m.test(block)) continue;
    const startLine = get("DTSTART");
    if (!startLine) continue;
    const start = parseIcalDate(startLine);
    const endLine = get("DTEND");
    const end = endLine ? parseIcalDate(endLine) : null;
    if (!start) continue;

    let range: DateRange;
    if (start.allDay) {
      range = { check_in: start.date, check_out: end?.date && end.date > start.date ? end.date : addDays(start.date, 1) };
    } else {
      if (!end || end.time - start.time < 6 * 3600 * 1000) continue;
      range = { check_in: start.date, check_out: end.date > start.date ? end.date : addDays(start.date, 1) };
    }
    if (range.check_in < to && range.check_out > from) ranges.push(range);
  }
  return ranges;
}
// ---- end Google Calendar ----

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function todayInManila() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }); // YYYY-MM-DD
}

export async function POST(request: Request) {
  // trim() guards against stray spaces when the values were pasted into Vercel
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return json({ error: "Server is not configured yet." }, 500);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return json({ error: "Too many requests. Please try again later or message us on Messenger." }, 429);

  // Refuse oversized bodies before reading them.
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Please check the form.", fields: parsed.error.flatten().fieldErrors }, 400);
  }
  const r = parsed.data;

  // Honeypot filled in = a bot. Pretend it worked so it doesn't retry.
  if (r.website) return json({ ok: true });

  const today = todayInManila();
  if (r.check_in < today) return json({ error: "Check-in date is in the past." }, 400);
  if (r.check_in > addDays(today, 730)) return json({ error: "Please pick a date within the next 2 years." }, 400);
  if (r.check_out > addDays(r.check_in, MAX_NIGHTS)) {
    return json({ error: `For stays longer than ${MAX_NIGHTS} nights, please message us on Messenger.` }, 400);
  }

  const headers = { ...supabaseHeaders(key), "Content-Type": "application/json" };

  // Server-side re-check: are any of these nights already booked (Supabase or Google Calendar)?
  const overlap = await fetch(
    `${url}/rest/v1/blocked_dates?select=id&check_in=lt.${r.check_out}&check_out=gt.${r.check_in}&limit=1`,
    { headers },
  );
  if (!overlap.ok) {
    console.error("Supabase overlap check error", overlap.status, await supabaseError(overlap));
    return json({ error: "Could not check availability. Please try again." }, 502);
  }
  let calendarClash = false;
  try {
    calendarClash = (await calendarRanges(r.check_in, r.check_out)).length > 0;
  } catch (err) {
    console.error("Google Calendar error", (err as Error).message);
    return json({ error: "Could not check availability. Please try again." }, 502);
  }
  if (((await overlap.json()) as unknown[]).length > 0 || calendarClash) {
    return json({ error: "Sorry, some of those dates are already booked. Please pick other dates." }, 409);
  }

  // Database-backed limits (see "Flood protection" above).
  try {
    const hourAgo = new Date(Date.now() - 3600_000).toISOString();
    const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
    const [lastHour, samePhone] = await Promise.all([
      countRequests(url, headers, `created_at=gte.${hourAgo}`),
      countRequests(url, headers, `created_at=gte.${dayAgo}&phone=eq.${encodeURIComponent(r.phone)}`),
    ]);
    if (lastHour >= MAX_PER_HOUR || samePhone >= MAX_PER_PHONE_PER_DAY) return json({ error: BUSY_MESSAGE }, 429);
  } catch (err) {
    console.error("Flood check error", (err as Error).message);
    return json({ error: "Could not check availability. Please try again." }, 502);
  }

  const insert = await fetch(`${url}/rest/v1/booking_requests`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      guest_name: r.guest_name,
      phone: r.phone,
      email: r.email || null,
      check_in: r.check_in,
      check_out: r.check_out,
      pax: r.pax,
      package_type: r.package_type || null,
      message: r.message || null,
      status: "pending",
    }),
  });
  if (!insert.ok) {
    const detail = await supabaseError(insert);
    // The database's own flood limit (supabase/migrations/0002_lock_down.sql) refused it.
    if (detail.includes("rate_limited")) return json({ error: BUSY_MESSAGE }, 429);
    console.error("Supabase insert error", insert.status, detail);
    return json({ error: "Could not send your request. Please try again or message us on Messenger." }, 502);
  }

  return json({ ok: true });
}
