import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import heroImage from "@/assets/villa-exterior.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="text-white/80 font-medium">Premium Private Resort</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-cheetah title-outline text-white mb-6 leading-tight">
            Villa Aurora
            <span className="block text-3xl md:text-4xl font-lato font-light text-secondary mt-2">
              Your Luxurious Haven
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-lato text-white/90 mb-8 max-w-2xl leading-relaxed">
            Experience the perfect blend of modern comfort and cultural charm in Malolos, Bulacan. 
            Your home away from home for intimate getaways and special celebrations. 🏡
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex items-center space-x-2 text-white/80">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>Near Barasoain Church, Malolos</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Users className="w-5 h-5 text-secondary" />
              <span>Up to 22 Guests</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="hero" size="xl" className="font-montserrat">
              <Calendar className="w-5 h-5" />
              Book Your Stay
            </Button>
            <Button variant="luxury" size="xl" className="font-montserrat">
              View Packages & Rates
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-white/70 text-sm">AC Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2</div>
              <div className="text-white/70 text-sm">Pools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">22</div>
              <div className="text-white/70 text-sm">Max Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <div className="text-white/70 text-sm">Parking Slots</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;