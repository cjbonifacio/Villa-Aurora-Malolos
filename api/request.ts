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

// Simple rate limit: 5 requests per 10 minutes per IP. In-memory, so it is per
// server instance (best effort) — enough to stop casual spam.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

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
  if (rateLimited(ip)) return json({ error: "Too many requests. Please try again later or message us on Facebook." }, 429);

  let body: unknown;
  try {
    body = await request.json();
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

  if (r.check_in < todayInManila()) return json({ error: "Check-in date is in the past." }, 400);

  const headers = { ...supabaseHeaders(key), "Content-Type": "application/json" };

  // Server-side re-check: are any of these nights already booked?
  const overlap = await fetch(
    `${url}/rest/v1/blocked_dates?select=id&check_in=lt.${r.check_out}&check_out=gt.${r.check_in}&limit=1`,
    { headers },
  );
  if (!overlap.ok) {
    console.error("Supabase overlap check error", overlap.status, await supabaseError(overlap));
    return json({ error: "Could not check availability. Please try again." }, 502);
  }
  if (((await overlap.json()) as unknown[]).length > 0) {
    return json({ error: "Sorry, some of those dates are already booked. Please pick other dates." }, 409);
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
    console.error("Supabase insert error", insert.status, await supabaseError(insert));
    return json({ error: "Could not send your request. Please try again or message us on Facebook." }, 502);
  }

  return json({ ok: true });
}
