// GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns booked date ranges from Supabase `blocked_dates`. Only dates — never guest info.
// Runs on Vercel as a serverless function. Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export async function GET(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return json({ error: "Server is not configured yet." }, 500);

  const params = new URL(request.url).searchParams;
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  if (!DATE.test(from) || !DATE.test(to) || from >= to) {
    return json({ error: "Use ?from=YYYY-MM-DD&to=YYYY-MM-DD" }, 400);
  }

  // Ranges that overlap [from, to). check_out is exclusive (that day is free for the next guest).
  const query =
    `${url}/rest/v1/blocked_dates?select=check_in,check_out` +
    `&check_in=lt.${to}&check_out=gt.${from}&order=check_in`;

  const res = await fetch(query, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!res.ok) {
    console.error("Supabase availability error", res.status, await res.text());
    return json({ error: "Could not load availability." }, 502);
  }

  const ranges = (await res.json()) as { check_in: string; check_out: string }[];
  // Cache at Vercel's edge for 5 minutes so we don't hit the database on every visit.
  return json({ ranges }, 200, { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" });
}
