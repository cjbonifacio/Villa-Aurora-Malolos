import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarDays, MapPin, Users } from "lucide-react";
import { photo } from "@/lib/photos";
import { scrollToSection, startBooking } from "@/lib/booking";

const hero = photo("exterior-evening");

const STATS = [
  { value: "3", label: "AC Rooms" },
  { value: "2", label: "Pools" },
  { value: "22", label: "Overnight Guests" },
  { value: "4", label: "Parking Slots" },
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden">
      <img
        src={hero.src}
        srcSet={hero.srcSet}
        sizes={hero.sizes}
        alt="Villa Aurora's Filipino-style house and courtyard, lit up in the evening"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Darker on the left so the text is easy to read */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.12em] md:tracking-[0.2em] text-villa-gold mb-4">
            Private Resort · Malolos, Bulacan
          </p>

          <h1 className="text-6xl md:text-8xl font-cheetah title-on-dark leading-none mb-4">Villa Aurora</h1>
          <p className="text-2xl md:text-3xl font-light text-white mb-6">Your luxurious haven</p>

          <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
            The whole resort is yours: modern comfort with Filipino charm, minutes from Barasoain Church. Made for
            family getaways, celebrations and wedding preparations.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-white/90">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-villa-gold" />
              Near Barasoain Church
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5 text-villa-gold" />
              Up to 22 overnight guests
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="xl" className="px-8" onClick={() => startBooking()}>
              <CalendarCheck />
              Book Now
            </Button>
            <Button variant="luxury" size="xl" className="px-8" onClick={() => scrollToSection("#availability")}>
              <CalendarDays />
              Check Availability
            </Button>
          </div>

          <dl className="grid grid-cols-4 gap-4 mt-12 pt-6 border-t border-white/25 max-w-lg">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl md:text-4xl font-bold text-white">{s.value}</dd>
                <dd className="text-white/75 text-xs md:text-sm leading-tight">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
