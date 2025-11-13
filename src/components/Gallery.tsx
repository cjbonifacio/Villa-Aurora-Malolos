import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image as ImageIcon } from "lucide-react";
import roomSimple from "@/assets/room-simple.jpg";
import roomBunk from "@/assets/room-bunk.jpg";
import roomFamily from "@/assets/room-family.jpg";
import poolArea from "@/assets/pool-area.jpg";
import outdoorSpace from "@/assets/outdoor-space.jpg";
import diningArea from "@/assets/dining-area.jpg";
import loungeArea from "@/assets/lounge-area.jpg";
import aerialView from "@/assets/aerial-view.jpg";

const Gallery = () => {
  const galleryCategories = [
    {
      title: "Cozy Rooms & Accommodations",
      description: "Comfortable spaces for your perfect stay",
      images: [
        { src: roomSimple, alt: "Spacious air-conditioned room with queen bed" },
        { src: roomBunk, alt: "Bunk beds perfect for family groups" },
        { src: roomFamily, alt: "Family suite with traditional Filipino design" },
      ]
    },
    {
      title: "Swimming Pool & Outdoor Area",
      description: "Dive into relaxation at our pristine pools",
      images: [
        { src: poolArea, alt: "Main swimming pool area" },
        { src: outdoorSpace, alt: "Lush outdoor garden space" },
        { src: aerialView, alt: "Aerial view of Villa Aurora" },
      ]
    },
    {
      title: "Common Areas & Entertainment",
      description: "Shared spaces for gathering and creating memories",
      images: [
        { src: loungeArea, alt: "Comfortable lounge and living area" },
        { src: diningArea, alt: "Spacious dining area for gatherings" },
        { src: outdoorSpace, alt: "Outdoor entertainment space" },
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
                <h2 className="text-3xl font-bold mb-4 font-cheetah title-outline">{category.title}</h2>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>

              {/* Image Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imageIndex) => (
                  <Card key={imageIndex} className="group overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* View Button (appears on hover) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <Camera className="h-8 w-8 text-primary" />
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
                <span className="bg-muted/50 px-3 py-1 rounded-full">#BulacanGetaway</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
