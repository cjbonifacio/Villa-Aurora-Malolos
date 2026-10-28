import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Waves, Users,
  Image as ImageIcon, FileText, PawPrint, CalendarX, CigaretteOff, Wallet, Home, MessageCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { messengerLinkProps } from "@/lib/booking";
import { amenityCategories } from "@/lib/amenities";
import { photo, largePhoto, type PhotoName } from "@/lib/photos";

// Photo gallery, in walking order: outside, pool, entertainment, inside.
const photos = (
  [
    { name: "aerial-view", alt: "Aerial view of the house, courtyard and pool" },
    { name: "exterior-evening", alt: "The house and wooden staircase lit up in the evening" },
    { name: "pool-waterfall", alt: "Pool waterfall with blue mosaic tiles" },
    { name: "pool", alt: "Adult pool and kiddie pool" },
    { name: "pool-dusk", alt: "Pool and lounge chairs at dusk" },
    { name: "pool-night", alt: "Pool lit up at night" },
    { name: "pool-steps", alt: "Pool seen from the covered pavilion" },
    { name: "exterior-day", alt: "Courtyard, staircase and covered pavilion" },
    { name: "pavilion", alt: "Covered pavilion next to the pool" },
    { name: "videoke", alt: "Videoke corner by the Villa Aurora green wall" },
    { name: "veranda", alt: "Upstairs veranda with the Villa Aurora sign" },
    { name: "veranda-lounge", alt: "Rattan lounge chairs on the veranda" },
    { name: "living-dining", alt: "Living and dining hall" },
    { name: "living-room", alt: "Living room with sofa and capiz windows" },
    { name: "dining-room", alt: "Dining table for the whole group" },
    { name: "room-1", alt: "Room 1 with a queen bed" },
    { name: "room-2", alt: "Room 2 with a queen bed and double deck" },
    { name: "room-3", alt: "Room 3 with three double-deck beds" },
    { name: "bathroom", alt: "Bathroom with hot and cold shower" },
    { name: "kitchen-counter", alt: "Kitchen counter with rice cooker, kettle, knives and utensils" },
    { name: "kitchen-cooktop", alt: "Induction stove with two pans" },
    { name: "kitchenware", alt: "Plates, glasses, cups and spoons for 22 guests" },
    { name: "kitchen-sink", alt: "Double kitchen sink with Filipino-style tiles" },
    { name: "bbq-grill", alt: "BBQ grill beside the garden" },
  ] as { name: PhotoName; alt: string }[]
).map((p) => ({ ...p, ...photo(p.name, "(min-width: 768px) 33vw, 50vw"), large: largePhoto(p.name) }));

const policies = [
  {
    title: "Pet Policy",
    icon: PawPrint,
    items: [
      "2–3 pets allowed with prior notice",
      "Pets must be supervised at all times",
      "Bring their own bedding/diapers",
      "Not allowed on furniture or in the pool",
      "₱500 damage fee may apply",
    ],
  },
  {
    title: "Cancellation & Rebooking",
    icon: CalendarX,
    items: [
      "Downpayments are non-refundable",
      "Rebooking allowed with at least 7 days' notice before check-in",
      "Rebooking is valid for 3 months from the original booking date",
      "Cancellations more than 14 days before check-in may get an 80% refund",
      "Cancellations less than 7 days before check-in forfeit the downpayment",
    ],
  },
  {
    title: "Smoking",
    icon: CigaretteOff,
    items: ["No smoking inside the rooms", "Smoking only in open outdoor areas", "Please dispose of cigarette butts properly"],
  },
  {
    title: "Visitors & Capacity",
    icon: Users,
    items: [
      "Maximum overnight capacity: 22 guests",
      "Day visitors allowed as long as overnight guests stay at 22 or fewer",
      "Additional guest fee: ₱250 per person",
      "Pool use limited to 22 swimmers (extra charges apply)",
    ],
  },
  {
    title: "Payment",
    icon: Wallet,
    items: [
      "50% downpayment to secure the booking",
      "Balance settled upon check-in",
      "GCash, BPI and BDO accepted",
      "Official receipts upon request",
    ],
  },
  {
    title: "House Rules",
    icon: Home,
    items: [
      "Overnight: check-in 2:00 PM, check-out 12:00 NN",
      "Day tour: 2:00 PM to 10:00 PM",
      "Keep noise respectful of neighbors",
      "Guests are responsible for property damage",
      "Extension: ₱500 per hour (subject to availability)",
    ],
  },
];

const Gallery = () => {
  const [open, setOpen] = useState<number | null>(null);
  const show = (i: number) => setOpen((i + photos.length) % photos.length);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.alt}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-lg bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              // First photo is large on bigger screens (24 photos fill the grid evenly on phones and computers)
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
            }`}
            aria-label={`View photo: ${photo.alt}`}
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes={i === 0 ? "(min-width: 768px) 66vw, 50vw" : photo.sizes}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl p-2 sm:p-3 bg-black border-0">
          {open !== null && (
            <>
              <DialogTitle className="sr-only">Photo {open + 1} of {photos.length}</DialogTitle>
              <DialogDescription className="sr-only">{photos[open].alt}</DialogDescription>
              <img src={photos[open].large} alt={photos[open].alt} className="w-full max-h-[80vh] object-contain rounded" />
              <div className="flex items-center justify-between gap-2 pt-2">
                <Button variant="ghost" size="icon" className="h-11 w-11 text-white hover:bg-white/10 hover:text-white" onClick={() => show(open - 1)} aria-label="Previous photo">
                  <ChevronLeft className="!size-6" />
                </Button>
                <p className="text-white/80 text-sm text-center">{photos[open].alt}</p>
                <Button variant="ghost" size="icon" className="h-11 w-11 text-white hover:bg-white/10 hover:text-white" onClick={() => show(open + 1)} aria-label="Next photo">
                  <ChevronRight className="!size-6" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const InfoTabs = () => {
  return (
    <section id="info" className="py-20 md:py-28 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="The Resort"
          title="Amenities & Gallery"
          subtitle="Everything you need for a perfect stay, from the pool to the kitchen."
        />

        <Tabs defaultValue="amenities" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto mb-10 h-auto p-1">
            <TabsTrigger value="amenities" className="py-3 text-sm sm:text-base gap-2">
              <Waves className="w-4 h-4 hidden sm:block" aria-hidden="true" />
              Amenities
            </TabsTrigger>
            <TabsTrigger value="gallery" className="py-3 text-sm sm:text-base gap-2">
              <ImageIcon className="w-4 h-4 hidden sm:block" aria-hidden="true" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="terms" className="py-3 text-sm sm:text-base gap-2">
              <FileText className="w-4 h-4 hidden sm:block" aria-hidden="true" />
              House Rules
            </TabsTrigger>
          </TabsList>

          <TabsContent value="amenities">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {amenityCategories.map(({ title, icon: Icon, items, photo: name, alt }) => (
                <Card key={title} className="border-0 shadow-elegant overflow-hidden">
                  <div className="aspect-[16/10] bg-muted">
                    <img
                      {...photo(name, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-11 w-11 rounded-full bg-villa-gold/20 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-villa-dark-brown" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold">{title}</h3>
                    </div>
                    <ul className="space-y-2 text-[15px] text-foreground/80">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-villa-gold shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <Gallery />
          </TabsContent>

          <TabsContent value="terms">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {policies.map(({ title, icon: Icon, items }) => (
                <Card key={title} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                      {title}
                    </h3>
                    <ul className="space-y-1.5 text-[15px] text-foreground/80 list-disc pl-5 marker:text-villa-gold">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center p-6 rounded-lg bg-villa-gold/10 border border-villa-gold/40">
              <h3 className="text-xl font-semibold mb-1">Questions about our policies?</h3>
              <p className="text-foreground/70 mb-4">Message us anytime, we're happy to help.</p>
              <Button variant="messenger" size="lg" asChild>
                <a {...messengerLinkProps()}>
                  <MessageCircle />
                  Ask on Messenger
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InfoTabs;
