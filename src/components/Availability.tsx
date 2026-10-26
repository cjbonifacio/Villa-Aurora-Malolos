import { Badge } from "@/components/ui/badge";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

// Live availability. Dates come from our own /api/availability (Supabase), so no
// guest names or booking details are ever shown publicly.
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
          <AvailabilityCalendar />
        </div>
      </div>
    </section>
  );
};

export default Availability;
