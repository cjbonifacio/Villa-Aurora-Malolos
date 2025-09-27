import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const galleryCategories = [
    {
      title: "Swimming Pool & Outdoor Area",
      description: "Dive into relaxation at our pristine pools",
      images: [
        { placeholder: "Family enjoying a sunny day by the pool" },
        { placeholder: "Evening poolside ambiance with lighting" },
        { placeholder: "Kids splashing in the kiddie pool" },
        { placeholder: "Poolside BBQ gathering with friends" }
      ]
    },
    {
      title: "Cozy Rooms & Accommodations",
      description: "Comfortable spaces for your perfect stay",
      images: [
        { placeholder: "Spacious air-conditioned master bedroom" },
        { placeholder: "Bunk beds perfect for family groups" },
        { placeholder: "Cozy room setup for intimate gatherings" },
        { placeholder: "Well-appointed room with modern amenities" }
      ]
    },
    {
      title: "Kitchen & Dining",
      description: "Fully equipped for your culinary adventures",
      images: [
        { placeholder: "Modern kitchen with complete appliances" },
        { placeholder: "BBQ griller setup for outdoor cooking" },
        { placeholder: "Dining area set for family meals" },
        { placeholder: "Kitchen island perfect for food preparation" }
      ]
    },
    {
      title: "Guest Celebrations",
      description: "Memorable moments and joyful gatherings",
      images: [
        { placeholder: "Birthday celebration by the poolside" },
        { placeholder: "Family reunion group photo" },
        { placeholder: "Wedding preparation in the bridal suite" },
        { placeholder: "Anniversary dinner setup under the stars" }
      ]
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <ImageIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Villa Aurora Gallery
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the beauty and charm of Villa Aurora through our collection of spaces designed for your perfect getaway
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="space-y-20">
          {galleryCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>

              {/* Image Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.images.map((image, imageIndex) => (
                  <Card key={imageIndex} className="group overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        {/* Placeholder Content */}
                        <div className="text-center p-6">
                          <Camera className="h-12 w-12 text-primary/60 mx-auto mb-3 group-hover:text-primary/80 transition-colors" />
                          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {image.placeholder}
                          </p>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* View Button (appears on hover) */}
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 shadow-elegant">
            <CardContent className="p-8">
              <ImageIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Share Your Villa Aurora Moments</h3>
              <p className="text-muted-foreground mb-6">
                We love seeing the memories you create at our resort! Tag us on social media to be featured in our gallery.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="bg-muted/50 px-3 py-1 rounded-full">#VillaAuroraMalolos</span>
                <span className="bg-muted/50 px-3 py-1 rounded-full">#ResortLife</span>
                <span className="bg-muted/50 px-3 py-1 rounded-full">#BulacnGetaway</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;