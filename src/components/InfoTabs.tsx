import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Bed, Wifi, Car, ChefHat, Music, Gamepad2, Utensils, Users, Droplets, Camera, Image as ImageIcon, CalendarIcon, FileText } from "lucide-react";
import AvailabilityCalendar from "./AvailabilityCalendar";

const InfoTabs = () => {

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

  const galleryCategories = [
    {
      title: "Swimming Pool & Outdoor Area",
      images: [
        { placeholder: "Family enjoying a sunny day by the pool" },
        { placeholder: "Evening poolside ambiance with lighting" },
        { placeholder: "Kids splashing in the kiddie pool" },
        { placeholder: "Poolside BBQ gathering with friends" }
      ]
    },
    {
      title: "Cozy Rooms & Accommodations",
      images: [
        { placeholder: "Spacious air-conditioned master bedroom" },
        { placeholder: "Bunk beds perfect for family groups" },
        { placeholder: "Cozy room setup for intimate gatherings" },
        { placeholder: "Well-appointed room with modern amenities" }
      ]
    },
    {
      title: "Kitchen & Dining",
      images: [
        { placeholder: "Modern kitchen with complete appliances" },
        { placeholder: "BBQ griller setup for outdoor cooking" },
        { placeholder: "Dining area set for family meals" },
        { placeholder: "Kitchen island perfect for food preparation" }
      ]
    },
    {
      title: "Guest Celebrations",
      images: [
        { placeholder: "Birthday celebration by the poolside" },
        { placeholder: "Family reunion group photo" },
        { placeholder: "Wedding preparation in the bridal suite" },
        { placeholder: "Anniversary dinner setup under the stars" }
      ]
    }
  ];

  return (
    <section id="info" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="amenities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-3xl mx-auto mb-12 h-auto">
            <TabsTrigger value="amenities" className="py-4 text-base">
              <Waves className="w-4 h-4 mr-2" />
              Amenities & Gallery
            </TabsTrigger>
            <TabsTrigger value="calendar" className="py-4 text-base">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Check Availability
            </TabsTrigger>
            <TabsTrigger value="terms" className="py-4 text-base">
              <FileText className="w-4 h-4 mr-2" />
              Terms of Use
            </TabsTrigger>
          </TabsList>

          {/* Amenities & Gallery Tab */}
          <TabsContent value="amenities" className="space-y-16">
            {/* Amenities Section */}
            <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary mb-4">Resort Amenities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-lato">
                Everything you need for a perfect stay, from relaxation to entertainment and comfort
              </p>
            </div>
              
              <div className="space-y-12">
                {amenityCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>

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
            </div>

            {/* Gallery Section */}
            <div>
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                  <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary">Photo Gallery</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-lato">
                  Discover the beauty and charm of Villa Aurora through our collection of spaces
                </p>
              </div>

              <div className="space-y-16">
                {galleryCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.images.map((image, imageIndex) => (
                        <Card key={imageIndex} className="group overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-0">
                            <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <div className="text-center p-6">
                                <Camera className="h-12 w-12 text-primary/60 mx-auto mb-3 group-hover:text-primary/80 transition-colors" />
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                  {image.placeholder}
                                </p>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                  <ImageIcon className="h-6 w-6 text-primary" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary mb-4">Check Availability</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-lato">
                View our real-time availability calendar - Green dates are available, Red dates are booked
              </p>
            </div>

            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="terms">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary mb-4">Terms of Use & Policies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-lato">
                Please review our policies to ensure a smooth and enjoyable experience at Villa Aurora
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Pet Policy */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🐾 Pet Policy
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• 2-3 pets are allowed with prior notice</p>
                    <p>• Pets must be supervised at all times</p>
                    <p>• Must have their own bedding/diapers</p>
                    <p>• Not allowed on furniture or in the pool</p>
                    <p>• ₱500 damage fee may apply if property is damaged</p>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation & Rebooking */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    📋 Cancellation & Rebooking Policy
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• <strong>Downpayments are non-refundable</strong></p>
                    <p>• Rebooking is possible if notified at least 7 days prior to check-in date</p>
                    <p>• Rebooking is valid for 3 months from original booking date</p>
                    <p>• For cancellations more than 14 days before check-in, an 80% refund may be offered</p>
                    <p>• Cancellations less than 7 days before check-in will forfeit the downpayment</p>
                  </div>
                </CardContent>
              </Card>

              {/* Smoking Policy */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🚭 Smoking Policy
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• No smoking is allowed inside any of the rooms</p>
                    <p>• Smoking is permitted in open outdoor areas only</p>
                    <p>• Please dispose of cigarette butts properly</p>
                  </div>
                </CardContent>
              </Card>

              {/* Visitors & Capacity */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    👥 Visitors & Capacity Policy
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• Maximum overnight capacity: 22 guests</p>
                    <p>• Day visitors are allowed as long as overnight guests do not exceed 22</p>
                    <p>• Additional guest fee: ₱250 per person</p>
                    <p>• Pool use is limited to 22 swimmers (additional charges apply for more)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    💳 Payment Terms
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• 50% downpayment required to secure booking</p>
                    <p>• Remaining balance must be settled upon check-in</p>
                    <p>• Accepted payment methods: GCash, BPI, BDO</p>
                    <p>• Official receipts provided upon request</p>
                  </div>
                </CardContent>
              </Card>

              {/* House Rules */}
              <Card className="shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🏡 House Rules
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• Check-in: 2:00 PM | Check-out: 12:00 PM (Overnight)</p>
                    <p>• Day Tour: 2:00 PM - 10:00 PM</p>
                    <p>• Please keep noise levels respectful of neighbors</p>
                    <p>• Guests are responsible for any property damage</p>
                    <p>• Please help us keep the resort clean and well-maintained</p>
                    <p>• Extension fees: ₱500 per hour (subject to availability)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact for Questions */}
              <Card className="shadow-elegant bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Questions About Our Policies?</h3>
                  <p className="text-muted-foreground mb-4">
                    Feel free to contact us for clarification or special requests
                  </p>
                  <p className="font-semibold text-primary">📞 (0953) 357 2419</p>
                  <p className="text-sm text-muted-foreground">Kuya Rudy & Ate Ruby</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InfoTabs;
