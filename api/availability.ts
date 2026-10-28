// GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns booked date ranges from Supabase `blocked_dates` and Google Calendar. Only dates, never guest info.
// Runs on Vercel as a serverless function. Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY,
// plus GOOGLE_CALENDAR_ICS_URL (optional) to include Google Calendar bookings.

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// "2026-12-01" + 1 month -> "2027-01-01"
function addMonthsYmd(ymd: string, months: number) {
  const d = new Date(`${ymd.slice(0, 7)}-01T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}
const nextMonth = (ymd: string) => addMonthsYmd(ymd, 1);

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

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export async function GET(request: Request) {
  // trim() guards against stray spaces when the values were pasted into Vercel
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return json({ error: "Server is not configured yet." }, 500);

  // Only accept exactly what the website asks for: one whole month, e.g. ?from=2026-12-01&to=2027-01-01,
  // within the next 2 years. Anything else (extra values, huge ranges) is refused before touching the
  // database, so nobody can skip the 5-minute cache and flood Supabase or Google Calendar.
  const params = new URL(request.url).searchParams;
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const thisMonth = new Date().toISOString().slice(0, 7) + "-01";
  const validMonth =
    [...params.keys()].every((k) => k === "from" || k === "to") &&
    /^\d{4}-\d{2}-01$/.test(from) &&
    to === nextMonth(from) &&
    from >= addMonthsYmd(thisMonth, -1) &&
    from <= addMonthsYmd(thisMonth, 24);
  if (!DATE.test(from) || !validMonth) {
    return json({ error: "Use ?from=YYYY-MM-01&to=<first day of the next month>, within the next 2 years" }, 400);
  }

  // Ranges that overlap [from, to). check_out is exclusive (that day is free for the next guest).
  const query =
    `${url}/rest/v1/blocked_dates?select=check_in,check_out` +
    `&check_in=lt.${to}&check_out=gt.${from}&order=check_in`;

  // Booked dates come from two places, fetched at the same time:
  // Supabase blocked_dates (added by hand) and your Google Calendar.
  const [res, fromCalendar] = await Promise.all([
    fetch(query, { headers: supabaseHeaders(key) }),
    calendarRanges(from, to).catch((err: Error) => err),
  ]);
  if (!res.ok) {
    const detail = await supabaseError(res);
    console.error("Supabase availability error", res.status, detail);
    return json({ error: "Could not load availability.", detail }, 502);
  }
  // If the calendar can't be read, show an error instead of wrongly showing booked dates as free.
  if (fromCalendar instanceof Error) {
    console.error("Google Calendar error", fromCalendar.message);
    return json({ error: "Could not load availability.", detail: fromCalendar.message }, 502);
  }

  const fromSupabase = (await res.json()) as DateRange[];
  const ranges = [...fromSupabase, ...fromCalendar].sort((x, y) => x.check_in.localeCompare(y.check_in));
  // Cache at Vercel's edge for 5 minutes so we don't hit the database on every visit.
  // "calendar" says whether Google Calendar is set up (never the address itself), to help with troubleshooting.
  const calendar = process.env.GOOGLE_CALENDAR_ICS_URL?.trim() ? "connected" : "not set";
  return json({ ranges, calendar }, 200, { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" });
}
