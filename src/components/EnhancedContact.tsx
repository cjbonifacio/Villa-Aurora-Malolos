import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";

const EnhancedContact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to book your perfect getaway? Get in touch with us today
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  Phone & Caretakers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">(0953) 357 2419</p>
                <p className="text-muted-foreground font-medium">Kuya Rudy & Ate Ruby</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Available for ocular visits, arrival coordination, and on-site assistance
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">villaauroramalolos@gmail.com</p>
                <p className="text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Facebook className="h-6 w-6 text-primary" />
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <a href="https://www.google.com/search?q=Facebook.com/VillaAurora.Malolos" target="_blank" rel="noopener noreferrer">
                    Visit our Facebook Page
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Follow us for updates, photos, and special offers
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Location & Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-3">
                  #80 Independencia St., San Gabriel<br />
                  3000 Malolos, Philippines
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-medium mb-2">Landmarks:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• In front of TAVERNA by Bahay na Tisa</li>
                    <li>• Behind P. Bonifacio Lumber</li>
                    <li>• Along the road going to Barasoain Church</li>
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://waze.com/ul/hwdtumnvmj" target="_blank" rel="noopener noreferrer">
                      Open in Waze
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://maps.app.goo.gl/6dyApRiAA6cQs46U9" target="_blank" rel="noopener noreferrer">
                      Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  Check-in & Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-primary mb-1">Overnight Stay (22 hours)</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">12:00 PM next day</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-medium text-secondary mb-1">Day Tour Package (8 hours)</p>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">2:00 PM - 10:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-muted-foreground">We'd love to help plan your perfect stay</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input placeholder="+63 XXX XXX XXXX" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input type="email" placeholder="your.email@example.com" required />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Dates</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Guests</label>
                      <Input type="number" placeholder="How many guests?" min="1" max="22" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Interest</label>
                    <select className="w-full p-2 border border-input rounded-md bg-background">
                      <option value="">Select a package</option>
                      <option value="overnight">Overnight Stay</option>
                      <option value="daytour">Day Tour</option>
                      <option value="wedding">Wedding Preparation</option>
                      <option value="other">Other Event</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message & Special Requirements</label>
                    <Textarea 
                      placeholder="Tell us about your event, special requirements, dietary restrictions, or any questions you have..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button type="submit" variant="booking" className="w-full">
                    Send Inquiry
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="mt-16">
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-center">Find Villa Aurora Malolos</CardTitle>
              <p className="text-center text-muted-foreground">
                Located in the heart of Malolos, minutes from Barasoain Church
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.234567890!2d120.812345!3d14.856789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDUxJzI0LjQiTiAxMjDCsDQ4JzQ0LjQiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa Aurora Malolos Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Can't find us? Call our caretakers for assistance
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+639533572419">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (0953) 357 2419
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;