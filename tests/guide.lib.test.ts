import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGuide, GuideNotFound, REVIEW_URL, rowsOf, valueOf, type GuideRow } from "../src/lib/guide";

const r = (section: string, key: string, value: string): GuideRow => ({ section, key, value, value_tl: "", link: "" });
const rows = [r("wifi", "name", "Villa"), r("wifi", "Password", "pw"), r("rules", "quiet", "Shh")];

afterEach(() => vi.unstubAllGlobals());

describe("rowsOf / valueOf", () => {
  it("filters by section and keeps order", () => {
    expect(rowsOf(rows, "wifi").map((x) => x.key)).toEqual(["name", "Password"]);
  });
  it("finds a value case-insensitively and returns '' when missing", () => {
    expect(valueOf(rows, "wifi", "password")).toBe("pw");
    expect(valueOf(rows, "wifi", "nope")).toBe("");
  });
});

describe("fetchGuide", () => {
  it("sends the key (URL-encoded) and returns the rows", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ rows })));
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchGuide("a b")).toEqual(rows);
    expect(fetchMock).toHaveBeenCalledWith("/api/guide?key=a%20b");
  });
  it("throws GuideNotFound on 404 and a normal error on other failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    await expect(fetchGuide("x")).rejects.toBeInstanceOf(GuideNotFound);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    await expect(fetchGuide("x")).rejects.not.toBeInstanceOf(GuideNotFound);
  });
  it("exposes the Google review link", () => {
    expect(REVIEW_URL).toBe("https://g.page/r/CeFpo2QX1u-REBM/review");
  });
});
