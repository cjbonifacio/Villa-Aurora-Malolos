import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Bed, Wifi, Car, ChefHat, Music, Gamepad2, Utensils, Users, Droplets } from "lucide-react";

const EnhancedAmenities = () => {
  const amenityCategories = [
    {
      title: "Pool Area",
      description: "Refreshing aquatic facilities for all ages",
      items: [
        { icon: Waves, name: "Private Adult Pool", detail: "3-5 ft depth for swimming and relaxation" },
        { icon: Waves, name: "Kiddie Pool", detail: "2 ft depth, perfect for children" },
        { icon: Droplets, name: "Outdoor Showers", detail: "2 convenient shower areas" },
        { icon: Users, name: "Poolside Comfort Room", detail: "Clean facilities right by the pool" }
      ]
    },
    {
      title: "Accommodations",
      description: "Comfortable sleeping arrangements for groups",
      items: [
        { icon: Bed, name: "Room 1", detail: "Air-conditioned room for 2 guests" },
        { icon: Bed, name: "Room 2", detail: "8 guests (Queen bed, double deck, pull-out)" },
        { icon: Bed, name: "Room 3", detail: "12 guests with 3 double deck beds" },
        { icon: Users, name: "Total Capacity", detail: "22 guests maximum overnight stay" }
      ]
    },
    {
      title: "Entertainment",
      description: "Fun activities and modern conveniences",
      items: [
        { icon: Music, name: "Unlimited Videoke", detail: "Sing your heart out with friends" },
        { icon: Gamepad2, name: "Billiards", detail: "Classic pool table for group fun" },
        { icon: Music, name: "Basic Sound System", detail: "Perfect for parties and events" },
        { icon: Music, name: "Smart TV with YouTube", detail: "Entertainment and streaming access" }
      ]
    },
    {
      title: "Kitchen Facilities",
      description: "Fully equipped for cooking and dining",
      items: [
        { icon: ChefHat, name: "Complete Kitchen Setup", detail: "Refrigerator, water dispenser, rice cooker" },
        { icon: Utensils, name: "Cooking Equipment", detail: "Induction stove with pans and pots" },
        { icon: ChefHat, name: "Microwave", detail: "Quick heating and food preparation" },
        { icon: ChefHat, name: "8-Burner BBQ Griller", detail: "Perfect for outdoor cooking parties" }
      ]
    },
    {
      title: "General Amenities",
      description: "Essential services for your comfort",
      items: [
        { icon: Wifi, name: "Free Unlimited Fast WiFi", detail: "High-speed internet throughout property" },
        { icon: Car, name: "Secure Parking", detail: "Open parking space for up to 4 cars" },
        { icon: Users, name: "Tables & Chairs", detail: "Seating arrangements for 22 guests" },
        { icon: Music, name: "Event Ready", detail: "Perfect setup for celebrations" }
      ]
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">Resort Amenities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a perfect stay, from relaxation to entertainment and comfort
          </p>
        </div>
        
        <div className="space-y-12">
          {amenityCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              {/* Amenity Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  return (
                    <Card key={index} className="group hover:shadow-glow transition-all duration-300 border-0 shadow-elegant hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {amenity.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {amenity.detail}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Photo Placeholder Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Amenity Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              "Private pool with crystal clear water",
              "Cozy air-conditioned bedrooms",
              "Fully equipped modern kitchen",
              "Spacious dining and entertainment area",
              "Secure parking and outdoor spaces"
            ].map((placeholder, index) => (
              <div key={index} className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="text-center p-4">
                  <ChefHat className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                  <p className="text-xs font-medium text-muted-foreground">{placeholder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAmenities;