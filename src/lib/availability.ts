import { addDays, addMonths, format, parseISO, startOfMonth } from "date-fns";

// Booked dates, shared by the calendar and the booking form.

export interface BookedRange {
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD, exclusive (the check-out day stays open)
}

// How far ahead guests can look and book (the server allows the same).
export const MONTHS_AHEAD = 23;

// React Query key for one month, e.g. ["availability", "2026-12"].
export const monthQueryKey = (month: string) => ["availability", month] as const;

// Loads booked ranges for one month (e.g. "2026-12") from our /api/availability function.
export async function fetchMonth(month: string): Promise<BookedRange[]> {
  const start = startOfMonth(parseISO(`${month}-01`));
  const from = format(start, "yyyy-MM-dd");
  const to = format(addMonths(start, 1), "yyyy-MM-dd");
  const res = await fetch(`/api/availability?from=${from}&to=${to}`);
  if (!res.ok) throw new Error(`Availability request failed (${res.status})`);
  const data = await res.json();
  return data.ranges ?? [];
}

// The months a stay touches, e.g. Dec 30 -> Jan 2 gives ["2026-12", "2027-01"]. At most 3.
export function monthsOfStay(checkIn: string, checkOut: string): string[] {
  if (!checkIn || !checkOut || checkOut <= checkIn) return [];
  const months: string[] = [];
  let m = startOfMonth(parseISO(checkIn));
  const last = startOfMonth(addDays(parseISO(checkOut), -1));
  while (m <= last && months.length < 3) {
    months.push(format(m, "yyyy-MM"));
    m = addMonths(m, 1);
  }
  return months;
}

// True if any night of [checkIn, checkOut) is booked.
export function stayIsBooked(ranges: BookedRange[], checkIn: string, checkOut: string) {
  return ranges.some((r) => r.check_in < checkOut && r.check_out > checkIn);
}
