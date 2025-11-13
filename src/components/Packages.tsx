import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, Sparkles, Sun, Moon } from "lucide-react";

const Packages = () => {
  const overnightWeekdayRates = [
    { pax: "5-8", price: "₱10,000" },
    { pax: "9-12", price: "₱12,000" },
    { pax: "13-18", price: "₱14,000" },
    { pax: "19-22", price: "₱17,000" },
  ];

  return (
    <section id="packages" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 font-montserrat">
            Packages & Rates
          </Badge>
          <h2 className="text-4xl md:text-5xl font-cheetah title-outline text-primary mb-6">
            Choose Your Perfect Stay
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-lato">
            Exclusive resort packages designed for intimate getaways and special celebrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Overnight Stay Package */}
          <Card className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-smooth">
            <div className="absolute inset-0 gradient-ocean opacity-5"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-2">
                <Moon className="w-8 h-8 text-primary" />
                <Badge variant="default">Most Popular</Badge>
              </div>
              <CardTitle className="text-2xl text-primary">Overnight Stay Package</CardTitle>
              <CardDescription className="text-lg">
                22 hours of exclusive luxury • 2:00 PM - 12:00 PM next day
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-6">
              {/* Weekday Rates */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <Sun className="w-5 h-5 mr-2 text-secondary" />
                  Weekday Rates (Sunday - Thursday)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {overnightWeekdayRates.map((rate, index) => (
                    <div key={index} className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{rate.pax} pax</span>
                      <span className="font-bold text-primary">{rate.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekend Rates */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-resort-coral" />
                  Weekend/Holiday Rates (Friday - Saturday)
                </h4>
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Up to 22 guests</span>
                    <span className="font-bold text-2xl text-secondary">₱20,000</span>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Package Inclusions:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Exclusive use of the entire resort</li>
                  <li>✓ 3 fully air-conditioned rooms</li>
                  <li>✓ Pool access & kitchen with appliances</li>
                  <li>✓ Basic sound system & Smart TV</li>
                  <li>✓ BBQ griller, tables & chairs for 22</li>
                  <li>✓ Free WiFi & 4-car parking</li>
                </ul>
              </div>

              <Button variant="ocean" className="w-full" size="lg">
                <Calendar className="w-5 h-5" />
                Book Overnight Stay
              </Button>
            </CardContent>
          </Card>

          {/* Day Tour Package */}
          <Card className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-smooth">
            <div className="absolute inset-0 gradient-sunset opacity-5"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-2">
                <Sun className="w-8 h-8 text-resort-sunset" />
                <Badge variant="outline">Day Event</Badge>
              </div>
              <CardTitle className="text-2xl text-resort-sunset">Day Tour Package</CardTitle>
              <CardDescription className="text-lg">
                8 hours of outdoor fun • 2:00 PM - 10:00 PM
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-6">
              {/* Rate */}
              <div className="text-center p-6 bg-resort-sunset/5 rounded-lg border border-resort-sunset/20">
                <div className="text-4xl font-bold text-resort-sunset mb-2">₱15,000</div>
                <div className="text-muted-foreground">Up to 50 guests</div>
                <div className="text-sm text-muted-foreground mt-1">
                  (Pool limited to 22 swimmers)
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Package Inclusions:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Pool access & outdoor open space</li>
                  <li>✓ 22-seater tables and chairs</li>
                  <li>✓ Basic sound system</li>
                  <li>✓ Refrigerator & water dispenser</li>
                  <li>✓ Outdoor sink & facilities</li>
                  <li>✗ No room access</li>
                </ul>
              </div>

              {/* Additional Info */}
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Additional Charges:</h5>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>• Excess swimmers: ₱250/person</div>
                  <div>• Extension: ₱500/hour</div>
                  <div>• Professional sound: ₱2,000</div>
                </div>
              </div>

              <Button variant="sunset" className="w-full" size="lg">
                <Clock className="w-5 h-5" />
                Book Day Tour
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-garamond font-bold mb-4">Booking Information 📋</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-card rounded-lg shadow-elegant">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-garamond font-semibold mb-2">50% Downpayment</h4>
                <p className="text-sm text-muted-foreground font-lato">Required to secure your booking</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-elegant">
                <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-garamond font-semibold mb-2">Flexible Rebooking</h4>
                <p className="text-sm text-muted-foreground font-lato">Free rebooking with 7-day notice</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-elegant">
                <Sparkles className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h4 className="font-garamond font-semibold mb-2">Official Receipts</h4>
                <p className="text-sm text-muted-foreground font-lato">Provided upon request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;