import { describe, expect, it } from "vitest";
import { keyMatches, mergeRows, parseCsv, rowsFromCsv, type GuideRow } from "../api/guide";

const row = (section: string, key: string, value: string): GuideRow => ({ section, key, value, value_tl: "", link: "" });

describe("parseCsv", () => {
  it("splits plain rows and ignores the final newline", () => {
    expect(parseCsv("a,b\r\n1,2\r\n")).toEqual([["a", "b"], ["1", "2"]]);
  });
  it("handles quoted commas, escaped quotes and newlines inside quotes", () => {
    expect(parseCsv('x,"a,b","say ""hi""","l1\nl2"')).toEqual([["x", "a,b", 'say "hi"', "l1\nl2"]]);
  });
});

describe("rowsFromCsv", () => {
  it("maps columns by header name and skips blank rows", () => {
    const csv = 'Section,Key,Value,Value_TL,Link\nWiFi,Password,"abc,def",,\n,,,,\n';
    expect(rowsFromCsv(csv)).toEqual([{ section: "wifi", key: "Password", value: "abc,def", value_tl: "", link: "" }]);
  });
  it("works when the optional columns are missing", () => {
    expect(rowsFromCsv("section,key,value\nrules,quiet,Shh")).toEqual([
      { section: "rules", key: "quiet", value: "Shh", value_tl: "", link: "" },
    ]);
  });
  it("returns nothing for a page that is not the expected sheet (e.g. an HTML error page)", () => {
    expect(rowsFromCsv("<html><body>Sign in</body></html>")).toEqual([]);
  });
});

describe("mergeRows", () => {
  it("replaces a default in place, appends new rows, and drops rows with an empty value", () => {
    const defaults = [row("a", "x", "1"), row("a", "y", "2")];
    const sheet = [row("a", "x", "9"), row("b", "z", "3"), row("a", "y", "")];
    expect(mergeRows(defaults, sheet)).toEqual([row("a", "x", "9"), row("b", "z", "3")]);
  });
  it("matches keys case-insensitively", () => {
    expect(mergeRows([row("a", "Quiet", "1")], [row("a", "quiet", "2")])).toEqual([row("a", "quiet", "2")]);
  });
});

describe("keyMatches", () => {
  it("accepts only the exact secret", () => {
    expect(keyMatches("secret-abcdefghijklmnop", "secret-abcdefghijklmnop")).toBe(true);
    expect(keyMatches("secret-abcdefghijklmnoq", "secret-abcdefghijklmnop")).toBe(false);
    expect(keyMatches("short", "secret-abcdefghijklmnop")).toBe(false);
  });
  it("rejects empty values", () => {
    expect(keyMatches("", "secret-abcdefghijklmnop")).toBe(false);
    expect(keyMatches("anything", "")).toBe(false);
  });
});
