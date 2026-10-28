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
