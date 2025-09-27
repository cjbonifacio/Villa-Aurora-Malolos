import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Navigation, 
  CreditCard, 
  Clock,
  MessageCircle,
  Calendar,
  Users
} from "lucide-react";

const Contact = () => {
  const paymentMethods = [
    { name: "GCash", details: "0906 233 6008, C.B", icon: Phone },
    { name: "BPI", details: "Account #: 4719366215, Account Name: Cedric Bonifacio", icon: CreditCard },
    { name: "BDO", details: "Account #: 000928036539, Account Name: Aurora Bonifacio", icon: CreditCard },
  ];

  return (
    <section id="contact" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            Contact & Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Plan Your Perfect Stay 📞
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Malolos, near the historic Barasoain Church
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Location */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  Resort Location
                </CardTitle>
                <CardDescription>Easy to find, close to major landmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Address:</h4>
                  <p className="text-muted-foreground">
                    #80 Independencia St., San Gabriel, 3000 Malolos, Philippines
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Landmarks:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• In front of TAVERNA by Bahay na Tisa</li>
                    <li>• Behind P. Bonifacio Lumber</li>
                    <li>• Along the road going to Barasoain Church</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="ocean" size="sm" className="flex-1">
                    <Navigation className="w-4 h-4" />
                    Open in Waze
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="w-4 h-4" />
                    Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-6 h-6 text-accent mr-3" />
                  Contact Information
                </CardTitle>
                <CardDescription>For inquiries and reservations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-accent/5 rounded-lg">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <h4 className="font-semibold">Caretakers</h4>
                    <p className="text-muted-foreground">Kuya Rudy and Ate Ruby</p>
                    <p className="font-medium text-accent">(0953) 357 2419</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Available for ocular visits and arrival coordination</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Process */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-6 h-6 text-secondary mr-3" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Secure payment options for your booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <method.icon className="w-5 h-5 text-secondary" />
                      <h4 className="font-semibold">{method.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      {method.details}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Booking Process */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 text-resort-coral mr-3" />
                  Booking Process
                </CardTitle>
                <CardDescription>Simple steps to secure your reservation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Contact Us</h4>
                      <p className="text-sm text-muted-foreground">Call or message to check availability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">50% Downpayment</h4>
                      <p className="text-sm text-muted-foreground">Secure your booking with half payment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Balance on Check-in</h4>
                      <p className="text-sm text-muted-foreground">Pay remaining balance upon arrival</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 gradient-ocean text-white shadow-glow">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Ready to Book Your Stay? 🏡</h3>
              <p className="mb-6 text-white/90">
                Contact us now to check availability and secure your perfect getaway at Villa Aurora
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="luxury" size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Phone className="w-5 h-5" />
                  Call (0953) 357 2419
                </Button>
                <Button variant="secondary" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 text-muted-foreground mr-2" />
                Important Booking Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Downpayments are non-refundable</li>
                  <li>• Free rebooking with 7-day notice</li>
                  <li>• Cancellations &gt;14 days: 80% refund possible</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Official receipts provided upon request</li>
                  <li>• Extension fee: ₱500/hour (subject to availability)</li>
                  <li>• Maximum 22 overnight guests</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;