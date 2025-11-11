import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWeekend } from "date-fns";

// Mock booking data - In production, this would come from Google Calendar API
const mockBookedDates = [
  new Date(2025, 10, 16), // Nov 16
  new Date(2025, 10, 21), // Nov 21
  new Date(2025, 10, 22), // Nov 22
  new Date(2025, 10, 23), // Nov 23
  new Date(2025, 10, 30), // Nov 30
];

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  // Get the starting day of the week for the month
  const startDayOfWeek = monthStart.getDay();

  // Check if a date is booked
  const isBooked = (date: Date) => {
    return mockBookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  // Get date status color
  const getDateColor = (date: Date) => {
    if (isBooked(date)) {
      return "bg-red-500 hover:bg-red-600 text-white border-red-600";
    }
    return "bg-green-500 hover:bg-green-600 text-white border-green-600";
  };

  const getDateStatus = (date: Date) => {
    if (isBooked(date)) {
      return "Fully Booked";
    }
    return "Available";
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="shadow-elegant">
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={previousMonth}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-2xl font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-sm text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Actual days */}
            {daysInMonth.map((date) => {
              const dateColor = getDateColor(date);
              const dateStatus = getDateStatus(date);
              const isHovered = hoveredDate && isSameDay(hoveredDate, date);

              return (
                <div
                  key={date.toISOString()}
                  className="relative aspect-square"
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <button
                    className={`w-full h-full rounded-full border-2 font-semibold transition-all duration-200 hover:scale-110 ${dateColor}`}
                  >
                    {format(date, "d")}
                  </button>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border whitespace-nowrap text-sm">
                      <div className="font-semibold">{format(date, "MMMM d, yyyy")}</div>
                      <div className="text-xs">{dateStatus}</div>
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-yellow-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">07</span>
              </div>
              <span className="text-sm font-medium">Partially Available</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2 text-center">💡 Booking Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Green dates are available for booking</li>
              <li>• Red dates are fully booked</li>
              <li>• Yellow dates have partial availability (contact us for details)</li>
              <li>• Weekend rates apply for Friday-Saturday bookings</li>
              <li>• 50% downpayment required to secure your reservation</li>
            </ul>
          </div>

          {/* Google Calendar Integration Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Calendar synced with our booking system
            </p>
            <Button variant="link" className="text-xs">
              Subscribe to Google Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityCalendar;
