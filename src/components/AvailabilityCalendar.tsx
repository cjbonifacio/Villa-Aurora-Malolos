import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  isBefore,
} from "date-fns";

interface BookedRange {
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD, exclusive
}

// Loads booked ranges for one month from our /api/availability function.
async function fetchMonth(month: Date): Promise<BookedRange[]> {
  const from = format(startOfMonth(month), "yyyy-MM-dd");
  const to = format(addMonths(startOfMonth(month), 1), "yyyy-MM-dd");
  const res = await fetch(`/api/availability?from=${from}&to=${to}`);
  if (!res.ok) throw new Error(`Availability request failed (${res.status})`);
  const data = await res.json();
  return data.ranges ?? [];
}

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthKey = format(currentMonth, "yyyy-MM");
  const { data: ranges = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["availability", monthKey],
    queryFn: () => fetchMonth(currentMonth),
    staleTime: 5 * 60 * 1000,
  });

  const monthStart = startOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: endOfMonth(currentMonth) });
  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const startDayOfWeek = monthStart.getDay();
  const today = startOfDay(new Date());

  // A night is booked if check_in <= day < check_out. The check-out day stays open.
  const isBooked = (date: Date) => {
    const day = format(date, "yyyy-MM-dd");
    return ranges.some((r) => r.check_in <= day && day < r.check_out);
  };
  const isPast = (date: Date) => isBefore(date, today);

  const getDateColor = (date: Date) => {
    if (isPast(date)) return "bg-muted text-muted-foreground border-muted cursor-default";
    if (isBooked(date)) return "bg-red-500 hover:bg-red-600 text-white border-red-600";
    return "bg-green-500 hover:bg-green-600 text-white border-green-600";
  };

  const getDateStatus = (date: Date) => {
    if (isPast(date)) return "Past date";
    if (isBooked(date)) return "Booked";
    return "Available";
  };

  // Don't let visitors page back before the current month.
  const canGoBack = startOfMonth(currentMonth) > startOfMonth(today);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="shadow-elegant">
        <CardContent className="p-4 sm:p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="h-10 w-10"
              disabled={!canGoBack}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="h-10 w-10"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading availability...</span>
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">
                We couldn't load the calendar right now. Please try again, or message us on Facebook to check your dates.
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={() => refetch()}>Retry</Button>
                <Button variant="outline" asChild>
                  <a href="https://m.me/villaaurora.malolos" target="_blank" rel="noopener noreferrer">
                    Message us
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Calendar Grid */}
          {!isLoading && !isError && (
            <>
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {Array.from({ length: startDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {daysInMonth.map((date) => {
                  const isHovered = hoveredDate && isSameDay(hoveredDate, date);
                  return (
                    <div
                      key={date.toISOString()}
                      className="relative aspect-square"
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <button
                        type="button"
                        aria-label={`${format(date, "MMMM d, yyyy")}: ${getDateStatus(date)}`}
                        className={`w-full h-full rounded-full border-2 font-semibold transition-all duration-200 hover:scale-110 ${getDateColor(date)}`}
                      >
                        {format(date, "d")}
                      </button>

                      {isHovered && (
                        <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border whitespace-nowrap text-sm">
                          <div className="font-semibold">{format(date, "MMMM d, yyyy")}</div>
                          <div className="text-xs">{getDateStatus(date)}</div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-l border-t"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-green-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">07</span>
                  </div>
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 border-2 border-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">07</span>
                  </div>
                  <span className="text-sm font-medium">Booked</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-center">💡 Booking Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Green dates are available for booking</li>
                  <li>• Red dates are already booked</li>
                  <li>• Check-out day is open for the next guest's check-in</li>
                  <li>• Weekend rates apply for Friday-Saturday bookings</li>
                  <li>• 50% downpayment required to secure your reservation</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityCalendar;
