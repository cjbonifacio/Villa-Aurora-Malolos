import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import SectionHeader from "@/components/SectionHeader";

// Live availability. Dates come from our own /api/availability (Supabase), so no
// guest names or booking details are ever shown publicly.
const Availability = () => {
  return (
    <section id="availability" className="py-20 md:py-28 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Check Availability"
          title="Live Calendar"
          subtitle="Green dates are open. Tap one to start your booking request."
        />
        <div className="max-w-3xl mx-auto">
          <AvailabilityCalendar />
        </div>
      </div>
    </section>
  );
};

export default Availability;
