import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Camera, MapPin } from "lucide-react";

const Weddings = () => {
  const handleWeddingInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Wedding inquiry submitted");
  };

  return (
    <section id="weddings" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-resort-coral" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Your Dream Wedding Begins at Villa Aurora
            </h1>
            <Heart className="h-8 w-8 text-resort-coral" />
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Located minutes away from the historic Barasoain Church, Villa Aurora offers the perfect sanctuary for intimate pre-wedding preparations. Let your special day unfold in our luxurious yet accessible haven, where every moment becomes a cherished memory.
          </p>
        </div>

        {/* Wedding Capacity & Policies */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-resort-coral/20 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-resort-coral" />
                <h3 className="text-2xl font-bold">Overnight Accommodation</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our resort can accommodate up to <strong>22 guests</strong> for an overnight stay the night before your wedding, ensuring your bridal party and closest family members are well-rested and ready for your special day.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 3 fully air-conditioned rooms</li>
                <li>• Private pool area for relaxation</li>
                <li>• Complete kitchen facilities</li>
                <li>• Unlimited WiFi and entertainment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-resort-sage/20 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="h-6 w-6 text-resort-sage" />
                <h3 className="text-2xl font-bold">Day Access for Wedding Team</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We welcome your wedding coordinators, makeup artists, photographers, and wedding party members (abay) for daytime access to help with preparations, creating the perfect getting-ready experience.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Professional makeup and hair styling space</li>
                <li>• Beautiful natural lighting for photos</li>
                <li>• Peaceful environment for preparations</li>
                <li>• Easy coordination with your team</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Wedding Photo Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Wedding Moments at Villa Aurora</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-resort-coral/20 to-resort-sunset/20 flex items-center justify-center border border-resort-coral/20">
              <div className="text-center">
                <Camera className="h-12 w-12 text-resort-coral mx-auto mb-2" />
                <p className="text-sm font-medium">Bridal Suite Prep</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-resort-sage/20 to-resort-sky/20 flex items-center justify-center border border-resort-sage/20">
              <div className="text-center">
                <Camera className="h-12 w-12 text-resort-sage mx-auto mb-2" />
                <p className="text-sm font-medium">Groom's Quarters</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-resort-sky/20 to-resort-coral/20 flex items-center justify-center border border-resort-sky/20">
              <div className="text-center">
                <Camera className="h-12 w-12 text-resort-sky mx-auto mb-2" />
                <p className="text-sm font-medium">First Look by the Pool</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-resort-sunset/20 to-resort-sage/20 flex items-center justify-center border border-resort-sunset/20">
              <div className="text-center">
                <Camera className="h-12 w-12 text-resort-sunset mx-auto mb-2" />
                <p className="text-sm font-medium">Garden Ceremony Prep</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Inquiry Form */}
        <Card className="max-w-2xl mx-auto border-primary/20 shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Plan Your Perfect Wedding Preparation</h3>
              <p className="text-muted-foreground">Let us help make your special day unforgettable</p>
            </div>
            
            <form onSubmit={handleWeddingInquiry} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bride's Name</label>
                  <Input placeholder="Enter bride's name" className="border-resort-coral/30 focus:border-resort-coral" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Groom's Name</label>
                  <Input placeholder="Enter groom's name" className="border-resort-coral/30 focus:border-resort-coral" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Wedding Date</label>
                  <Input type="date" className="border-resort-coral/30 focus:border-resort-coral" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Guests</label>
                  <Input type="number" placeholder="Number of overnight guests" className="border-resort-coral/30 focus:border-resort-coral" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <Input type="email" placeholder="your.email@example.com" className="border-resort-coral/30 focus:border-resort-coral" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input type="tel" placeholder="+63 XXX XXX XXXX" className="border-resort-coral/30 focus:border-resort-coral" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Special Requests & Additional Details</label>
                <Textarea 
                  placeholder="Tell us about your vision, special requirements, or any questions you have..."
                  className="border-resort-coral/30 focus:border-resort-coral min-h-[120px]"
                />
              </div>
              
              <Button type="submit" variant="booking" className="w-full">
                <Heart className="h-5 w-5 mr-2" />
                Submit Wedding Inquiry
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Location Highlight */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-resort-coral" />
            <h3 className="text-xl font-semibold">Perfect Location</h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Just minutes away from the historic Barasoain Church, Villa Aurora provides convenient access to one of the Philippines' most significant wedding venues while offering a peaceful retreat for your preparations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Weddings;