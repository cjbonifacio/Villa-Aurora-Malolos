import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen, Wifi, ScrollText, Waves, Wallet, MapPin, Siren, Star, Copy, Check, Navigation } from "lucide-react";
import { amenityCategories } from "@/lib/amenities";
import { CONTACT } from "@/lib/booking";
import { REVIEW_URL, rowsOf, valueOf, type GuideRow } from "@/lib/guide";
import { photo } from "@/lib/photos";

const GuideCard = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: typeof Wifi; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20">
    <Card className="border-0 shadow-elegant">
      <CardContent className="p-5 sm:p-6">
        <h2 className="flex items-center gap-3 text-3xl font-cheetah title-outline mb-4">
          <span className="h-11 w-11 rounded-full bg-villa-gold/20 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-villa-dark-brown" aria-hidden="true" />
          </span>
          {title}
        </h2>
        {children}
      </CardContent>
    </Card>
  </section>
);

// Bulleted lines, each with an optional Tagalog explanation underneath.
const Bullets = ({ rows }: { rows: GuideRow[] }) => (
  <ul className="space-y-3 text-[15px] text-foreground/85">
    {rows.map((r) => (
      <li key={r.key} className="flex gap-2">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-villa-gold shrink-0" aria-hidden="true" />
        <span>
          {r.value}
          {r.value_tl && <span className="block text-sm italic text-foreground/65">{r.value_tl}</span>}
        </span>
      </li>
    ))}
  </ul>
);

// "Label ........ value" lines. If the row has a link, the value becomes a tappable link.
const Pairs = ({ rows }: { rows: GuideRow[] }) => (
  <dl className="divide-y divide-border text-[15px]">
    {rows.map((r) => {
      const external = r.link.startsWith("http");
      return (
        <div key={r.key} className="flex items-start justify-between gap-4 py-3">
          <dt className="font-medium">{r.key}</dt>
          <dd className="text-right text-foreground/80">
            {r.link ? (
              <a
                href={r.link}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-block py-1 underline underline-offset-4 decoration-villa-gold"
              >
                {r.value}
              </a>
            ) : (
              r.value
            )}
          </dd>
        </div>
      );
    })}
  </dl>
);

// Copies the WiFi password. Falls back silently if the browser blocks clipboard access.
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the password is visible on screen, so guests can still type it */
    }
  };
  return (
    <Button variant="outline" size="lg" onClick={copy}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy password"}
    </Button>
  );
};

export const GuideSections = ({ rows }: { rows: GuideRow[] }) => {
  const wifiName = valueOf(rows, "wifi", "name");
  const wifiPassword = valueOf(rows, "wifi", "password");

  return (
    <div className="space-y-6">
      <GuideCard id="checkin" title="Check-in & Check-out" icon={DoorOpen}>
        <Bullets rows={rowsOf(rows, "checkin")} />
        <div className="flex flex-wrap gap-3 mt-5">
          <Button variant="hero" size="lg" asChild>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin />
              Open in Google Maps
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={CONTACT.wazeUrl} target="_blank" rel="noopener noreferrer">
              <Navigation />
              Open in Waze
            </a>
          </Button>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-3">Check-out checklist</h3>
        <Bullets rows={rowsOf(rows, "checkout")} />
      </GuideCard>

      <GuideCard id="wifi" title="WiFi" icon={Wifi}>
        {wifiName || wifiPassword ? (
          <>
            <dl className="space-y-2 text-[15px]">
              {wifiName && (
                <div>
                  <dt className="text-sm text-foreground/70">Network</dt>
                  <dd className="text-lg font-semibold">{wifiName}</dd>
                </div>
              )}
              {wifiPassword && (
                <div>
                  <dt className="text-sm text-foreground/70">Password</dt>
                  <dd className="text-lg font-semibold break-all">{wifiPassword}</dd>
                </div>
              )}
            </dl>
            {wifiPassword && (
              <div className="mt-4">
                <CopyButton text={wifiPassword} />
              </div>
            )}
          </>
        ) : (
          <p className="text-[15px] text-foreground/80">Please ask the caretakers for the WiFi details.</p>
        )}
      </GuideCard>

      <GuideCard id="rules" title="House Rules" icon={ScrollText}>
        <Bullets rows={rowsOf(rows, "rules")} />
      </GuideCard>

      <GuideCard id="amenities" title="Amenities" icon={Waves}>
        <div className="grid gap-4 sm:grid-cols-2">
          {amenityCategories.map(({ title, items, photo: name, alt }) => (
            <div key={title} className="overflow-hidden rounded-lg border border-border">
              <img
                {...photo(name, "(min-width: 640px) 45vw, 100vw")}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{title}</h3>
                <ul className="space-y-1 text-sm text-foreground/80 list-disc pl-5 marker:text-villa-gold">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] text-foreground/80">
          Not sure how something works? Call the caretakers at{" "}
          <a href={`tel:${CONTACT.caretakerPhone}`} className="underline underline-offset-4 decoration-villa-gold">
            {CONTACT.caretakerPhoneLabel}
          </a>
          .
        </p>
      </GuideCard>

      <GuideCard id="fees" title="Fees & Add-ons" icon={Wallet}>
        <Pairs rows={rowsOf(rows, "fees")} />
      </GuideCard>

      <GuideCard id="explore" title="Explore Malolos" icon={MapPin}>
        <p className="text-sm text-foreground/70 mb-2">Walking times from the resort. Tap a place to open it in Google Maps.</p>
        <Pairs rows={rowsOf(rows, "explore")} />
      </GuideCard>

      <GuideCard id="emergency" title="Emergency" icon={Siren}>
        <Pairs rows={rowsOf(rows, "emergency")} />
      </GuideCard>

      <GuideCard id="review" title="Leave a Review" icon={Star}>
        <p className="text-[15px] text-foreground/85 mb-4">
          Enjoyed your stay? A short Google review helps other families find Villa Aurora. Thank you!
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
            <Star />
            Write a Google review
          </a>
        </Button>
        <div className="mt-5 flex items-center gap-4">
          <img src="/images/review-qr.png" alt="QR code to leave a Google review" width={144} height={144} className="h-36 w-36 rounded-md border border-border" />
          <p className="text-sm text-foreground/70">Or scan this code with another phone.</p>
        </div>
      </GuideCard>
    </div>
  );
};
