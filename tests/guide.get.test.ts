import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, resetGuideCache, type GuideRow } from "../api/guide";

const SECRET = "test-secret-1234567890";
const call = (key?: string) =>
  GET(new Request(key === undefined ? "http://localhost/api/guide" : `http://localhost/api/guide?key=${key}`));
const find = (rows: GuideRow[], section: string, key: string) =>
  rows.find((r) => r.section === section && r.key.toLowerCase() === key.toLowerCase());

// A pretend published sheet: one new WiFi password and a changed quiet-hours rule.
const SHEET = [
  "section,key,value,value_tl,link",
  "wifi,name,Test Network,,",
  "wifi,password,TEST-ONLY-PASSWORD,,",
  'rules,quiet,"Quiet after 9 PM",,',
].join("\n");

beforeEach(() => {
  resetGuideCache();
  process.env.GUIDE_SECRET = SECRET;
  delete process.env.GUIDE_SHEET_CSV_URL;
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("GET /api/guide", () => {
  it("reports a configuration error when the secret is missing or too short", async () => {
    delete process.env.GUIDE_SECRET;
    expect((await call(SECRET)).status).toBe(500);
    process.env.GUIDE_SECRET = "short";
    expect((await call("short")).status).toBe(500);
  });

  it("returns 404 with no content for a wrong or missing key", async () => {
    for (const key of ["wrong-key-wrong-key-1", undefined]) {
      const res = await call(key);
      expect(res.status).toBe(404);
      expect(await res.text()).not.toContain("rows");
    }
  });

  it("returns the default content for the right key, uncached, with no WiFi password", async () => {
    const res = await call(SECRET);
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    const body = (await res.json()) as { rows: GuideRow[]; source: string };
    expect(body.source).toBe("defaults");
    expect(find(body.rows, "rules", "quiet")?.value).toContain("10:00 PM to 7:00 AM");
    expect(find(body.rows, "fees", "Extra towel")?.value).toBe("₱20 each");
    expect(find(body.rows, "emergency", "Sacred Heart Hospital of Malolos")).toBeTruthy();
    expect(body.rows.some((r) => r.section === "wifi")).toBe(false);
  });

  it("merges the Google Sheet over the defaults and caches it for later requests", async () => {
    process.env.GUIDE_SHEET_CSV_URL = "https://example.com/sheet.csv";
    const fetchMock = vi.fn().mockImplementation(async () => new Response(SHEET));
    vi.stubGlobal("fetch", fetchMock);
    const first = (await (await call(SECRET)).json()) as { rows: GuideRow[]; source: string };
    expect(first.source).toBe("sheet");
    expect(find(first.rows, "wifi", "password")?.value).toBe("TEST-ONLY-PASSWORD");
    expect(find(first.rows, "rules", "quiet")?.value).toBe("Quiet after 9 PM");
    expect(find(first.rows, "checkin", "deposit")).toBeTruthy(); // untouched defaults remain
    await call(SECRET);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("falls back to the defaults when the sheet can't be loaded", async () => {
    process.env.GUIDE_SHEET_CSV_URL = "https://example.com/sheet.csv";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const body = (await (await call(SECRET)).json()) as { rows: GuideRow[]; source: string };
    expect(body.source).toBe("defaults");
    expect(find(body.rows, "rules", "quiet")?.value).toContain("10:00 PM to 7:00 AM");
  });
});
