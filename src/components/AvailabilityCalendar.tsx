import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Info } from "lucide-react";
import { messengerLinkProps, startBooking } from "@/lib/booking";
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

import { MONTHS_AHEAD, fetchMonth, monthQueryKey } from "@/lib/availability";

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthKey = format(currentMonth, "yyyy-MM");
  const { data: ranges = [], isLoading, isError, refetch } = useQuery({
    queryKey: monthQueryKey(monthKey),
    queryFn: () => fetchMonth(monthKey),
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
    if (isPast(date)) return "bg-muted/60 text-foreground/35 border-transparent";
    if (isBooked(date)) return "bg-red-600 text-white border-red-600 opacity-90";
    return "bg-green-700 hover:bg-green-800 hover:scale-105 text-white border-green-700 cursor-pointer";
  };

  const getDateStatus = (date: Date) => {
    if (isPast(date)) return "Past date";
    if (isBooked(date)) return "Booked";
    return "Available";
  };

  // Don't let visitors page back before the current month.
  const canGoBack = startOfMonth(currentMonth) > startOfMonth(today);
  // ...or more than ~2 years ahead (the server only answers that far).
  const canGoForward = startOfMonth(currentMonth) < startOfMonth(addMonths(today, MONTHS_AHEAD));

  return (
    <div>
      <Card className="shadow-elegant border-0">
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
              disabled={!canGoForward}
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
                  <a {...messengerLinkProps()}>
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
                        disabled={isPast(date) || isBooked(date)}
                        onClick={() => startBooking({ checkIn: format(date, "yyyy-MM-dd") })}
                        aria-label={`${format(date, "MMMM d, yyyy")}: ${getDateStatus(date)}`}
                        className={`w-full h-full rounded-full border-2 text-sm sm:text-base font-semibold transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${getDateColor(date)}`}
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
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-700" aria-hidden="true" />
                  Available
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-600" aria-hidden="true" />
                  Booked
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-muted" aria-hidden="true" />
                  Past
                </span>
              </div>

              <div className="mt-6 flex gap-3 p-4 rounded-lg bg-villa-gold/10 border border-villa-gold/40 text-sm">
                <Info className="h-5 w-5 text-secondary shrink-0" aria-hidden="true" />
                <p className="text-foreground/80">
                  Check-out day is open for the next guest's check-in. Weekend rates apply Friday–Saturday. A 50%
                  downpayment secures your date.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityCalendar;
