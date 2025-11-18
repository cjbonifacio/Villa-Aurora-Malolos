import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

interface BookedDate {
  date: string;
}

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  // Get the starting day of the week for the month
  const startDayOfWeek = monthStart.getDay();

  // Fetch booked dates from Google Calendar
  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // This would be your backend API endpoint that fetches from Google Calendar
        // For now, using mock data - you'll need to implement the backend API
        
        // Example backend implementation would be:
        // const response = await fetch('/api/calendar');
        // const data = await response.json();
        // setBookedDates(data.bookedDates);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockBookedDates = [
          "2025-11-16",
          "2025-11-21",
          "2025-11-22",
          "2025-11-23",
          "2025-11-30",
        ];
        
        setBookedDates(mockBookedDates);
      } catch (err) {
        setError("Failed to load calendar data. Please try again later.");
        console.error("Calendar fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, [currentMonth]);

  // Check if a date is booked
  const isBooked = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return bookedDates.includes(dateString);
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
              disabled={isLoading}
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
              disabled={isLoading}
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
          {error && !isLoading && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}

          {/* Calendar Grid */}
          {!isLoading && !error && (
            <>
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
                <Button 
                  variant="link" 
                  className="text-xs" 
                  asChild
                >
                  <a 
                    href="https://calendar.google.com/calendar/ical/villaauroramalolos%40gmail.com/public/basic.ics" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Subscribe to Google Calendar
                  </a>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Backend API Implementation Note */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">📝 Backend Implementation Required</h4>
        <p className="text-muted-foreground mb-2">
          To enable live Google Calendar integration, create a backend API endpoint at <code className="bg-background px-1 rounded">/api/calendar</code> that:
        </p>
        <ol className="text-muted-foreground space-y-1 ml-4 list-decimal">
          <li>Fetches data from: <code className="bg-background px-1 rounded text-xs break-all">https://calendar.google.com/calendar/ical/villaauroramalolos%40gmail.com/public/basic.ics</code></li>
          <li>Parses the iCal format using a library like <code className="bg-background px-1 rounded">node-ical</code></li>
          <li>Extracts booked dates and returns them as JSON: <code className="bg-background px-1 rounded">{`{ "bookedDates": ["2025-11-20", "2025-11-22"] }`}</code></li>
          <li>Ensures privacy: Only return availability status, never guest names or event details</li>
        </ol>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

/*
BACKEND API IMPLEMENTATION EXAMPLE (Vercel/Next.js):

Create a file: pages/api/calendar.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import ical from 'node-ical';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const calendarUrl = 'https://calendar.google.com/calendar/ical/villaauroramalolos%40gmail.com/public/basic.ics';
    
    // Fetch and parse iCal data
    const events = await ical.async.fromURL(calendarUrl);
    
    // Extract booked dates
    const bookedDates: string[] = [];
    
    for (const event of Object.values(events)) {
      if (event.type === 'VEVENT') {
        const startDate = new Date(event.start);
        const formattedDate = startDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        bookedDates.push(formattedDate);
      }
    }
    
    // Return only the dates, not event details (privacy)
    res.status(200).json({ bookedDates });
  } catch (error) {
    console.error('Calendar API error:', error);
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
}

Don't forget to install: npm install node-ical
*/
