// Helpers for the private guest guide page. The content comes from /api/guide (see api/guide.ts).

// One line of guide content. Keep in sync with api/guide.ts.
export interface GuideRow {
  section: string;
  key: string;
  value: string;
  value_tl: string; // optional Tagalog explanation
  link: string; // optional URL (map, tel:)
}

// Guests are sent here to leave a Google review (also shown as a QR code).
export const REVIEW_URL = "https://g.page/r/CeFpo2QX1u-REBM/review";

// Thrown when the secret in the link is wrong, so the page can show the normal 404.
export class GuideNotFound extends Error {}

export async function fetchGuide(key: string): Promise<GuideRow[]> {
  const res = await fetch(`/api/guide?key=${encodeURIComponent(key)}`);
  if (res.status === 404) throw new GuideNotFound();
  if (!res.ok) throw new Error(`Guide request failed (${res.status})`);
  return ((await res.json()) as { rows: GuideRow[] }).rows;
}

export const rowsOf = (rows: GuideRow[], section: string) => rows.filter((r) => r.section === section);

export const valueOf = (rows: GuideRow[], section: string, key: string) =>
  rows.find((r) => r.section === section && r.key.toLowerCase() === key.toLowerCase())?.value ?? "";

// Section ids for the sticky menu at the top of the page.
export const GUIDE_NAV = [
  { id: "checkin", label: "Check-in" },
  { id: "wifi", label: "WiFi" },
  { id: "rules", label: "Rules" },
  { id: "amenities", label: "Amenities" },
  { id: "fees", label: "Fees" },
  { id: "explore", label: "Explore" },
  { id: "emergency", label: "Emergency" },
  { id: "review", label: "Review" },
];
