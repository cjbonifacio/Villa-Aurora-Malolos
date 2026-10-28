import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Camera, MapPin, MessageCircle, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { messengerLinkProps, startBooking } from "@/lib/booking";
import { photo } from "@/lib/photos";

const features = [
  {
    icon: Users,
    title: "Overnight for your entourage",
    text: "Up to 22 guests the night before, so the bridal party and family are rested and ready.",
    items: ["3 air-conditioned rooms", "Private pool for relaxing", "Full kitchen", "Unlimited WiFi"],
  },
  {
    icon: Camera,
    title: "Day access for your wedding team",
    text: "Coordinators, makeup artists, photographers and abay are welcome during preparations.",
    items: ["Space for hair and makeup", "Natural light for photos", "Calm, private setting", "Easy coordination"],
  },
];

const photos = [
  { ...photo("room-2", "(min-width: 768px) 25vw, 50vw"), alt: "Bright bedroom for getting ready" },
  { ...photo("veranda-lounge", "(min-width: 768px) 25vw, 50vw"), alt: "Veranda with the Villa Aurora sign, for portraits" },
  { ...photo("living-room", "(min-width: 768px) 25vw, 50vw"), alt: "Air-conditioned living room for the entourage" },
  { ...photo("exterior-evening", "(min-width: 768px) 25vw, 50vw"), alt: "The house and staircase lit up in the evening" },
];

const Weddings = () => {
  return (
    <section id="weddings" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40 scroll-mt-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Weddings"
          title="Your Wedding Day Starts Here"
          subtitle="Minutes from the historic Barasoain Church, Villa Aurora is a private, peaceful place for your pre-wedding preparations."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-6xl mx-auto mb-10">
          {photos.map((p) => (
            <div key={p.alt} className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <img src={p.src} srcSet={p.srcSet} sizes={p.sizes} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          {features.map(({ icon: Icon, title, text, items }) => (
            <Card key={title} className="border-0 shadow-elegant">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 rounded-full bg-villa-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-villa-dark-brown" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
                </div>
                <p className="text-foreground/75 mb-4">{text}</p>
                <ul className="grid sm:grid-cols-2 gap-2 text-[15px]">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="w-5 h-5 text-villa-forest-green shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center rounded-xl bg-villa-dark-brown text-white p-8 md:p-10 shadow-elegant">
          <Heart className="h-8 w-8 text-villa-gold mx-auto mb-3" aria-hidden="true" />
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Plan your wedding preparation</h3>
          <p className="text-white/80 mb-6 flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 text-villa-gold" aria-hidden="true" />
            Minutes from Barasoain Church
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="xl" className="px-8 bg-white text-villa-dark-brown hover:bg-white/90 font-semibold" onClick={() => startBooking({ packageType: "wedding" })}>
              <Heart />
              Request a Wedding Booking
            </Button>
            <Button variant="luxury" size="xl" className="px-8" asChild>
              <a {...messengerLinkProps("Hi Villa Aurora! I'd like to ask about wedding preparation at the villa.")}>
                <MessageCircle />
                Ask on Messenger
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weddings;
