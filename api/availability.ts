// GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns booked date ranges from Supabase `blocked_dates`. Only dates — never guest info.
// Runs on Vercel as a serverless function. Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

const DATE = /^\d{4}-\d{2}-\d{2}$/;

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

  const res = await fetch(query, { headers: supabaseHeaders(key) });
  if (!res.ok) {
    const detail = await supabaseError(res);
    console.error("Supabase availability error", res.status, detail);
    return json({ error: "Could not load availability.", detail }, 502);
  }

  const ranges = (await res.json()) as { check_in: string; check_out: string }[];
  // Cache at Vercel's edge for 5 minutes so we don't hit the database on every visit.
  return json({ ranges }, 200, { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" });
}
