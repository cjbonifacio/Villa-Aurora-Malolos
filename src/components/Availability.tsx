import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Availability = () => {
  return (
    <section id="availability" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            Check Availability
          </Badge>
          <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary mb-6">
            Live Calendar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            View our real-time availability and plan your perfect getaway
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              {/* 
                PRIVACY NOTE: For this Google Calendar embed to be privacy-safe 
                (hide guest names and event details), you must set your calendar's 
                public sharing settings to "See only free/busy (hide details)".
                
                To do this:
                1. Go to Google Calendar settings
                2. Find "villaauroramalolos@gmail.com" calendar
                3. Under "Access permissions", choose "See only free/busy (hide details)"
              */}
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=villaauroramalolos%40gmail.com&ctz=Asia%2FManila" 
                style={{ 
                  border: 0, 
                  margin: '0 auto', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }} 
                width="100%" 
                height="600" 
                frameBorder="0" 
                scrolling="no"
                title="Villa Aurora Availability Calendar"
              />
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Calendar synced with our booking system • Updated in real-time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Availability;
