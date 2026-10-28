import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Moon, Sun, CalendarCheck, Wallet, CalendarClock, Receipt } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { startBooking } from "@/lib/booking";

const overnightWeekdayRates = [
  { pax: "5–8", price: "₱10,000" },
  { pax: "9–12", price: "₱12,000" },
  { pax: "13–18", price: "₱14,000" },
  { pax: "19–22", price: "₱17,000" },
];

// Same lists as the "Amenities: Overnight" and "Amenities: Daytour" marketing graphics.
const overnightInclusions = [
  "Exclusive use of the two-story Filipino-style villa",
  "3 air-conditioned bedrooms",
  "Swimming pool with kiddie area",
  "Indoor & outdoor dining, plus a fully equipped kitchen",
  "Living room with Smart TV (YouTube)",
  "Videoke speaker with 2 microphones",
  "Outdoor lounge with pool view, big BBQ griller",
  "Free unlimited fast WiFi & 4-car parking",
];

const dayTourInclusions = [
  "Common areas from 2:00 PM to 10:00 PM",
  "Swimming pool with kiddie area",
  "Outdoor lounge, indoor & outdoor dining",
  "Outdoor shower & comfort room",
  "Videoke speaker with 2 microphones",
  "Big BBQ griller & kitchen space",
  "Free unlimited fast WiFi & 4-car parking",
];

const bookingInfo = [
  { icon: Wallet, title: "50% Downpayment", text: "Secures your date" },
  { icon: CalendarClock, title: "Flexible Rebooking", text: "Free with 7-day notice" },
  { icon: Receipt, title: "Official Receipts", text: "Provided upon request" },
];

const Inclusions = ({ items, excluded }: { items: string[]; excluded?: string[] }) => (
  <ul className="space-y-2 text-[15px]">
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <Check className="w-5 h-5 text-villa-forest-green shrink-0" aria-hidden="true" />
        {item}
      </li>
    ))}
    {excluded?.map((item) => (
      <li key={item} className="flex gap-2 text-foreground/70">
        <X className="w-5 h-5 shrink-0" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

const Packages = () => {
  return (
    <section id="packages" className="py-20 md:py-28 gradient-subtle scroll-mt-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Packages & Rates"
          title="Choose Your Perfect Stay"
          subtitle="The whole resort is exclusively yours, for an overnight stay or a day of fun."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Overnight */}
          <Card className="flex flex-col shadow-elegant border-0">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Moon className="w-7 h-7 text-secondary" aria-hidden="true" />
                <Badge className="bg-villa-dark-brown hover:bg-villa-dark-brown">Most Popular</Badge>
              </div>
              <CardTitle className="text-2xl">Overnight Stay</CardTitle>
              <CardDescription className="text-base text-foreground/70">22 hours · 2:00 PM to 12:00 NN next day</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-6">
              <div>
                <h4 className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 mb-3">Weekdays (Sun–Thu)</h4>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                  {overnightWeekdayRates.map((rate) => (
                    <div key={rate.pax} className="flex justify-between items-baseline p-3 bg-muted/60 rounded-lg">
                      <span className="text-sm whitespace-nowrap">{rate.pax} pax</span>
                      <span className="font-display font-semibold text-lg text-villa-dark-brown">{rate.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 mb-3">Weekends & Holidays (Fri–Sat)</h4>
                <div className="flex justify-between items-baseline p-4 rounded-lg border border-villa-gold/60 bg-villa-gold/10">
                  <span>Up to 22 guests</span>
                  <span className="font-display font-semibold text-3xl text-villa-dark-brown">₱20,000</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Included</h4>
                <Inclusions items={overnightInclusions} />
              </div>

              <Button variant="hero" size="lg" className="w-full mt-auto" onClick={() => startBooking({ packageType: "overnight" })}>
                <CalendarCheck />
                Book Overnight Stay
              </Button>
            </CardContent>
          </Card>

          {/* Day tour */}
          <Card className="flex flex-col shadow-elegant border-0">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Sun className="w-7 h-7 text-secondary" aria-hidden="true" />
                <Badge variant="outline" className="border-secondary text-secondary">Day Event</Badge>
              </div>
              <CardTitle className="text-2xl">Day Tour</CardTitle>
              <CardDescription className="text-base text-foreground/70">8 hours · 2:00 PM to 10:00 PM</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-6">
              <div className="text-center p-5 rounded-lg border border-villa-gold/60 bg-villa-gold/10">
                <div className="font-display text-5xl font-semibold text-villa-dark-brown mb-1">₱15,000</div>
                <div>Up to 50 guests</div>
                <div className="text-sm text-foreground/70 mt-1">Pool limited to 22 swimmers</div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Included</h4>
                <Inclusions items={dayTourInclusions} excluded={["No bedroom access"]} />
              </div>

              <div className="bg-muted/60 p-4 rounded-lg">
                <h4 className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 mb-2">Additional charges</h4>
                <dl className="text-sm space-y-1">
                  <div className="flex justify-between"><dt>Excess swimmers</dt><dd className="font-medium">₱250 / person</dd></div>
                  <div className="flex justify-between"><dt>Extension</dt><dd className="font-medium">₱500 / hour</dd></div>
                  <div className="flex justify-between"><dt>Professional sound</dt><dd className="font-medium">₱2,000</dd></div>
                </dl>
              </div>

              <Button variant="hero" size="lg" className="w-full mt-auto" onClick={() => startBooking({ packageType: "daytour" })}>
                <CalendarCheck />
                Book Day Tour
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-10">
          {bookingInfo.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-elegant">
              <div className="h-11 w-11 rounded-full bg-villa-gold/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-villa-dark-brown" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold leading-tight">{title}</h4>
                <p className="text-sm text-foreground/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
