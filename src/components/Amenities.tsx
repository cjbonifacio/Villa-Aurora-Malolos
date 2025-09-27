import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Waves, 
  Bed, 
  Wifi, 
  Car, 
  ChefHat, 
  Music, 
  Tv, 
  Snowflake, 
  Utensils,
  Droplets,
  Users,
  Home
} from "lucide-react";
import poolImage from "@/assets/pool-amenity.jpg";
import roomImage from "@/assets/room-interior.jpg";

const Amenities = () => {
  const poolAmenities = [
    { icon: Waves, title: "Private Adult Pool", desc: "Crystal clear swimming pool" },
    { icon: Users, title: "Kiddie Pool", desc: "Safe area for children" },
    { icon: Droplets, title: "Outdoor Showers", desc: "2 outdoor shower areas" },
    { icon: Home, title: "Poolside Comfort Room", desc: "Convenient facilities" },
  ];

  const roomAmenities = [
    { icon: Bed, title: "3 AC Rooms", desc: "Fully air-conditioned" },
    { icon: Users, title: "Room 1", desc: "Good for 2 guests" },
    { icon: Users, title: "Room 2", desc: "Good for 8 guests" },
    { icon: Users, title: "Room 3", desc: "Good for 12 guests" },
  ];

  const kitchenAmenities = [
    { icon: ChefHat, title: "Full Kitchen", desc: "Complete cooking facilities" },
    { icon: Snowflake, title: "Refrigerator", desc: "Large capacity fridge" },
    { icon: Utensils, title: "Cooking Equipment", desc: "Induction stove, microwave, rice cooker" },
    { icon: ChefHat, title: "8-Burner BBQ Griller", desc: "Perfect for group cooking" },
  ];

  const entertainmentAmenities = [
    { icon: Music, title: "Sound System", desc: "Basic audio system included" },
    { icon: Tv, title: "Smart TV", desc: "YouTube & streaming access" },
    { icon: Wifi, title: "Free WiFi", desc: "Unlimited fast internet" },
    { icon: Car, title: "Parking", desc: "4-car open parking space" },
  ];

  return (
    <section id="amenities" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            Resort Amenities
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Everything You Need for Perfect Stay 🌿
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern amenities and luxury comforts designed for your ultimate relaxation
          </p>
        </div>

        {/* Pool Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <Waves className="w-8 h-8 text-accent mr-3" />
                Swimming Pool Area
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Dive into crystal-clear waters in our private pool area, designed for both relaxation and fun for the whole family.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {poolAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-accent/5 rounded-lg">
                    <amenity.icon className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{amenity.title}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={poolImage} 
                alt="Villa Aurora Swimming Pool" 
                className="rounded-2xl shadow-elegant w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Accommodations Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src={roomImage} 
                alt="Villa Aurora Room Interior" 
                className="rounded-2xl shadow-elegant w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <Bed className="w-8 h-8 text-primary mr-3" />
                Comfortable Accommodations
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Rest in comfort with our fully air-conditioned rooms, featuring quality bedding and modern amenities for up to 22 guests.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {roomAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg">
                    <amenity.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{amenity.title}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Amenities */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Kitchen Facilities */}
          <Card className="p-6 shadow-elegant">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <ChefHat className="w-7 h-7 text-secondary mr-3" />
                Kitchen Facilities
              </h3>
              <div className="space-y-4">
                {kitchenAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{amenity.title}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Entertainment & Parking */}
          <Card className="p-6 shadow-elegant">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Music className="w-7 h-7 text-resort-coral mr-3" />
                Entertainment & More
              </h3>
              <div className="space-y-4">
                {entertainmentAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="w-5 h-5 text-resort-coral flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{amenity.title}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Summary */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto p-8 gradient-subtle rounded-2xl shadow-elegant">
            <h3 className="text-2xl font-bold mb-6">Resort Capacity & Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">22</div>
                <div className="text-muted-foreground">Max Overnight Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50</div>
                <div className="text-muted-foreground">Max Day Tour Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">3</div>
                <div className="text-muted-foreground">AC Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-resort-coral mb-2">4</div>
                <div className="text-muted-foreground">Parking Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;