// GET /api/guide?key=<secret>
// Content for the private guest guide at /guide/<secret>: check-in details, rules, fees, WiFi, nearby places.
// Needs GUIDE_SECRET (16+ characters). Optional GUIDE_SHEET_CSV_URL = a Google Sheet tab published as CSV.
// Sheet rows add to or replace the built-in default rows below, so CJ can edit the guide without touching code.
// A wrong or missing key gets a 404, so the guide looks like it doesn't exist.

import { createHash, timingSafeEqual } from "node:crypto";

// One line of guide content. Keep in sync with src/lib/guide.ts.
export interface GuideRow {
  section: string; // e.g. "rules", "fees", "wifi" (lower case)
  key: string; // short label or id within the section
  value: string; // the text shown to guests
  value_tl: string; // optional Tagalog explanation
  link: string; // optional URL (map, tel:)
}

// Minimal CSV reader: handles quoted cells, commas and line breaks inside quotes, and "" for a quote.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// Turns the sheet's CSV into rows, finding columns by header name (any order, case-insensitive).
export function rowsFromCsv(text: string): GuideRow[] {
  const [head, ...body] = parseCsv(text);
  if (!head) return [];
  const col = (name: string) => head.findIndex((h) => h.trim().toLowerCase() === name);
  const idx = { section: col("section"), key: col("key"), value: col("value"), value_tl: col("value_tl"), link: col("link") };
  if (idx.section < 0 || idx.key < 0 || idx.value < 0) return []; // not our sheet
  const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? "").trim() : "");
  return body
    .map((r) => ({
      section: get(r, idx.section).toLowerCase(),
      key: get(r, idx.key),
      value: get(r, idx.value),
      value_tl: get(r, idx.value_tl),
      link: get(r, idx.link),
    }))
    .filter((r) => r.section && r.key);
}

// Sheet rows replace defaults with the same section+key (keeping their position), new rows are added at
// the end, and any row with an empty value is removed (that's how CJ hides a default row).
export function mergeRows(defaults: GuideRow[], sheet: GuideRow[]): GuideRow[] {
  const id = (r: GuideRow) => `${r.section}|${r.key.toLowerCase()}`;
  const out = new Map<string, GuideRow>();
  for (const r of defaults) out.set(id(r), r);
  for (const r of sheet) out.set(id(r), r); // setting an existing key keeps its original position
  return [...out.values()].filter((r) => r.value !== "");
}

// Constant-time check, so response timing can't be used to guess the secret.
export function keyMatches(given: string, secret: string): boolean {
  if (!given || !secret) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(secret).digest();
  return timingSafeEqual(a, b);
}

// ---- Built-in content (shown when the sheet is empty or can't be reached) ----
// WiFi has no default on purpose: the password lives only in CJ's Google Sheet.
const row = (section: string, key: string, value: string, value_tl = "", link = ""): GuideRow => ({
  section, key, value, value_tl, link,
});
const maps = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const DEFAULT_ROWS: GuideRow[] = [
  // Check-in
  row("checkin", "overnight", "Overnight stay: check-in 2:00 PM, check-out 12:00 NN."),
  row("checkin", "daytour", "Day tour: 2:00 PM to 10:00 PM (no bedroom access)."),
  row(
    "checkin", "gate",
    "The caretakers, Kuya Rudy and Ate Ruby, will meet you at the gate and open it for you. Message or call them when you are close.",
    "Sasalubungin kayo ng mga caretaker sa gate. Tawagan sila kapag malapit na kayo.",
  ),
  row("checkin", "parking", "4-car parking area."),
  row(
    "checkin", "deposit",
    "₱1,000 security deposit, paid to the caretaker when you arrive. The caretaker refunds it if there is no damage.",
    "₱1,000 na deposit pagdating. Ibabalik ng caretaker kung walang nasira.",
  ),
  // Check-out checklist
  row("checkout", "bedsheets", "Bedsheets: please leave them on the beds, ready for the caretakers."),
  row("checkout", "utensils", "Plates, glasses and all utensils: please make sure all 22 sets are complete."),
  row("checkout", "damage", "Damage check: the caretaker looks over the whole area before your deposit is returned."),
  // House rules
  row(
    "rules", "quiet",
    "Quiet hours: 10:00 PM to 7:00 AM. Please follow the city noise ordinance, including videoke and speakers.",
    "Bawal ang malakas na ingay mula 10:00 PM hanggang 7:00 AM, kasama ang videoke at speaker. Sundin ang ordinansa ng lungsod.",
  ),
  row(
    "rules", "capacity",
    "Maximum overnight capacity: 22 guests. Day visitors are welcome as long as overnight guests stay at 22 or fewer.",
    "Hanggang 22 lang ang puwedeng mag-overnight.",
  ),
  row("rules", "pool", "The pool is limited to 22 swimmers. Extra swimmers pay ₱250 per person.", "Hanggang 22 lang ang puwedeng lumangoy. May dagdag na ₱250 bawat sobra."),
  row("rules", "damage", "Guests are responsible for any damage to the property.", "Ang bisita ang mananagot sa anumang masisira."),
  row(
    "rules", "smoking",
    "No smoking inside the rooms. Smoke only in open outdoor areas and dispose of cigarette butts properly.",
    "Bawal manigarilyo sa loob ng kuwarto. Sa labas lang, at itapon nang maayos ang upos.",
  ),
  row(
    "rules", "pets",
    "2 to 3 pets are allowed with prior notice. Keep them supervised, off the furniture and out of the pool, and bring their own bedding or diapers.",
    "Bantayan ang alagang hayop. Bawal sa muwebles at sa pool.",
  ),
  // Fees and add-ons
  row("fees", "Extra guest", "₱250 per person"),
  row("fees", "Extension", "₱500 per hour (subject to availability)"),
  row("fees", "Professional sound", "₱2,000"),
  row("fees", "Pet damage", "₱500 (if damage occurs)"),
  row("fees", "Extra towel", "₱20 each"),
  row("fees", "Housekeeping", "The caretakers clean only after your booking ends. They are not house helpers."),
  // Explore (walking times from Google Maps)
  row("explore", "Barasoain Church", "2 min walk", "", maps("Barasoain Church Malolos")),
  row("explore", "7-Eleven (Barasoain Church)", "3 min walk · 190 m · open 24 hours", "", maps("7-Eleven Barasoain Church Paseo del Congreso Malolos")),
  row("explore", "Casa Real Shrine", "6 min walk · 450 m", "", maps("Casa Real Shrine Malolos")),
  row("explore", "Malolos Cathedral", "9 min walk · 700 m", "", maps("Malolos Cathedral Minor Basilica of the Immaculate Conception")),
  row("explore", "Sacred Heart Hospital of Malolos", "13 min walk · 950 m", "", maps("Sacred Heart Hospital of Malolos")),
  row("explore", "Robinsons Place Malolos", "21 min walk · 1.5 km · about 4 min by ride", "", maps("Robinsons Place Malolos")),
  row("explore", "Restaurants nearby", "Open in Google Maps", "", maps("restaurants near Independencia St San Gabriel Malolos")),
  row("explore", "Pharmacies nearby", "Open in Google Maps", "", maps("pharmacy near Independencia St San Gabriel Malolos")),
  row("explore", "Gas stations nearby", "Open in Google Maps", "", maps("gas station near Independencia St San Gabriel Malolos")),
  row("explore", "Supermarkets nearby", "Open in Google Maps", "", maps("supermarket near Independencia St San Gabriel Malolos")),
  // Emergency
  row("emergency", "Resort", "0906 233 6008", "", "tel:+639062336008"),
  row("emergency", "Caretakers (Kuya Rudy & Ate Ruby)", "0953 357 2419", "", "tel:+639533572419"),
  row("emergency", "Sacred Heart Hospital of Malolos", "Dr. Peralta St. · 13 min walk", "", maps("Sacred Heart Hospital of Malolos")),
  row("emergency", "Emergency hotline", "911", "", "tel:911"),
];

// ---- Google Sheet (published as CSV), kept for 5 minutes ----
let sheetCache: { at: number; rows: GuideRow[] } | null = null;
export function resetGuideCache() {
  sheetCache = null; // used by tests
}

// Returns the sheet's rows, or null if it can't be read (then the guide shows the defaults).
async function sheetRows(csvUrl: string): Promise<GuideRow[] | null> {
  if (sheetCache && Date.now() - sheetCache.at < 5 * 60_000) return sheetCache.rows;
  try {
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error(`Sheet returned ${res.status}`);
    const rows = rowsFromCsv(await res.text());
    sheetCache = { at: Date.now(), rows };
    return rows;
  } catch (err) {
    console.error("Guide sheet error", (err as Error).message);
    return sheetCache?.rows ?? null; // keep showing the last good copy if we have one
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    // Never cached by the browser or Vercel's edge: the response can contain the WiFi password.
    headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
  });
}

export async function GET(request: Request) {
  const secret = process.env.GUIDE_SECRET?.trim();
  if (!secret || secret.length < 16) return json({ error: "Guide is not configured yet." }, 500);

  const key = new URL(request.url).searchParams.get("key") ?? "";
  if (!keyMatches(key, secret)) return json({ error: "Not found" }, 404);

  const csvUrl = process.env.GUIDE_SHEET_CSV_URL?.trim();
  const fromSheet = csvUrl ? await sheetRows(csvUrl) : null;
  return json({ rows: mergeRows(DEFAULT_ROWS, fromSheet ?? []), source: fromSheet ? "sheet" : "defaults" });
}
