import { useEffect, useRef, useState } from "react";
import { addDays, format, parseISO } from "date-fns";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, CheckCircle2, Loader2, Copy, Navigation } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { CONTACT, PACKAGE_LABELS, messengerLink, onStartBooking } from "@/lib/booking";

// Client-side check for quick feedback. The server (/api/request) validates again.
const formSchema = z
  .object({
    guest_name: z.string().trim().min(2, "Please enter your full name"),
    phone: z.string().trim().regex(/^[0-9+()\-\s]{7,30}$/, "Please enter a valid phone number"),
    email: z.string().trim().email("Please enter a valid email").or(z.literal("")),
    check_in: z.string().min(1, "Please pick a check-in date"),
    check_out: z.string().min(1, "Please pick a check-out date"),
    pax: z.coerce.number().int().min(1, "At least 1 guest").max(50, "Maximum of 50 guests"),
    package_type: z.string().min(1, "Please choose a package"),
    message: z.string().max(500, "Message is too long (max 500 characters)"),
    website: z.string(),
  })
  .refine((f) => f.check_out > f.check_in, { message: "Check-out must be after check-in", path: ["check_out"] });

type FormData = z.infer<typeof formSchema>;

const emptyForm = {
  guest_name: "",
  phone: "",
  email: "",
  check_in: "",
  check_out: "",
  pax: "",
  package_type: "",
  message: "",
  website: "", // honeypot (hidden)
};

const niceDate = (d: string) => format(parseISO(d), "EEE, MMM d, yyyy");

// The text that gets pre-typed in Messenger.
function buildMessage(f: FormData) {
  const isDayTour = f.package_type === "daytour";
  const lines = [
    "Hi Villa Aurora! I'd like to request a booking:",
    `• Name: ${f.guest_name}`,
    `• Package: ${PACKAGE_LABELS[f.package_type] ?? f.package_type}`,
    isDayTour ? `• Date: ${niceDate(f.check_in)}` : `• Check-in: ${niceDate(f.check_in)}`,
    !isDayTour && `• Check-out: ${niceDate(f.check_out)}`,
    `• Guests: ${f.pax}`,
    `• Phone: ${f.phone}`,
    f.email && `• Email: ${f.email}`,
    f.message && `• Notes: ${f.message}`,
  ];
  return lines.filter(Boolean).join("\n");
}

const Field = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const EnhancedContact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const isDayTour = form.package_type === "daytour";
  const today = format(new Date(), "yyyy-MM-dd");

  // "Book" buttons elsewhere on the page pre-fill the package and/or date.
  useEffect(
    () =>
      onStartBooking(({ packageType, checkIn }) => {
        setStatus("idle");
        setError(null);
        setForm((f) => ({
          ...f,
          package_type: packageType ?? f.package_type,
          check_in: checkIn ?? f.check_in,
          check_out: checkIn ? format(addDays(parseISO(checkIn), 1), "yyyy-MM-dd") : f.check_out,
        }));
        setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
      }),
    [],
  );

  const update =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // A day tour uses one day, so check-out is simply the next day.
    const payload = {
      ...form,
      check_out: isDayTour && form.check_in ? format(addDays(parseISO(form.check_in), 1), "yyyy-MM-dd") : form.check_out,
    };
    const parsed = formSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    const text = buildMessage(parsed.data);
    const link = messengerLink(text);

    // Open the Messenger tab right away (browsers block pop-ups opened later),
    // and copy the message in case Messenger doesn't pre-fill it.
    const messengerTab = window.open("", "_blank");
    copyMessage(text);

    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      // Dates taken or form invalid: stop here so the guest can fix it.
      if (res.status === 409 || res.status === 400 || res.status === 429) {
        messengerTab?.close();
        setStatus("idle");
        setError(data.error || "Please check your details.");
        return;
      }
      // Any other server problem: still send them to Messenger so the request isn't lost.
    } catch {
      // Network problem: same, Messenger still gets the request.
    }

    if (messengerTab) messengerTab.location.href = link;
    else window.location.href = link;

    setSentMessage(text);
    setStatus("sent");
    setForm(emptyForm);
  };

  return (
    <section id="contact" className="py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Book Your Stay"
          title="Request to Book"
          subtitle="Send your details and we'll reply on Facebook Messenger to confirm your dates and downpayment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Booking form */}
          <Card id="book" className="lg:col-span-3 min-w-0 shadow-elegant border-0 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl">Your booking details</CardTitle>
              <p className="text-sm text-foreground/70">
                Fields marked * are required. This is a request only. Your booking is confirmed once we reply and
                receive the downpayment.
              </p>
            </CardHeader>
            <CardContent>
              {status === "sent" ? (
                <div className="text-center space-y-4 py-6" role="status">
                  <CheckCircle2 className="h-12 w-12 text-villa-forest-green mx-auto" />
                  <h3 className="text-2xl font-semibold">Almost done! Tap Send in Messenger</h3>
                  <p className="text-foreground/70 max-w-md mx-auto">
                    We opened Messenger with your booking details. Just press <strong>Send</strong> so it reaches us.
                    {copied && " The message is also copied, so you can paste it if the chat box is empty."}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button variant="messenger" size="lg" asChild>
                      <a href={messengerLink(sentMessage)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle />
                        Open Messenger again
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => copyMessage(sentMessage)}>
                      <Copy />
                      {copied ? "Copied" : "Copy message"}
                    </Button>
                  </div>
                  <button
                    type="button"
                    className="text-sm underline underline-offset-4 text-foreground/70 hover:text-foreground min-h-11"
                    onClick={() => setStatus("idle")}
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot: hidden from people, bots fill it in */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={update("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="guest_name" label="Full name *">
                      <Input id="guest_name" ref={nameRef} autoComplete="name" placeholder="Juan Dela Cruz" value={form.guest_name} onChange={update("guest_name")} required />
                    </Field>
                    <Field id="phone" label="Mobile number *">
                      <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="0917 123 4567" value={form.phone} onChange={update("phone")} required />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="package_type" label="Package *">
                      <select
                        id="package_type"
                        value={form.package_type}
                        onChange={update("package_type")}
                        required
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Choose a package</option>
                        {Object.entries(PACKAGE_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="pax" label="Number of guests *">
                      <Input id="pax" type="number" inputMode="numeric" placeholder="e.g. 12" min="1" max="50" value={form.pax} onChange={update("pax")} required />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="check_in" label={isDayTour ? "Date *" : "Check-in *"}>
                      <Input id="check_in" type="date" min={today} value={form.check_in} onChange={update("check_in")} required />
                    </Field>
                    {!isDayTour && (
                      <Field id="check_out" label="Check-out *">
                        <Input id="check_out" type="date" min={form.check_in || today} value={form.check_out} onChange={update("check_out")} required />
                      </Field>
                    )}
                  </div>

                  <Field id="email" label="Email (optional)">
                    <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
                  </Field>

                  <Field id="message" label="Notes (optional)">
                    <Textarea
                      id="message"
                      placeholder="Occasion, arrival time, pets, add-ons, questions..."
                      className="min-h-[100px] text-base"
                      maxLength={500}
                      value={form.message}
                      onChange={update("message")}
                    />
                  </Field>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-destructive bg-destructive/10 rounded-md p-3">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="messenger" size="xl" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Checking your dates...
                      </>
                    ) : (
                      <>
                        <MessageCircle />
                        Request to Book via Messenger
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-foreground/60 text-center">
                    Opens Facebook Messenger with your details filled in. Just tap Send.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact details */}
          <div className="lg:col-span-2 min-w-0 space-y-6">
            <Card className="shadow-elegant border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Talk to us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <a href={CONTACT.messengerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md p-2 -mx-2 min-h-11 hover:bg-muted transition-colors">
                  <MessageCircle className="h-5 w-5 text-[#0084FF] shrink-0" />
                  <span>Message us on Messenger</span>
                </a>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 rounded-md p-2 -mx-2 min-h-11 hover:bg-muted transition-colors">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <span>{CONTACT.phoneLabel} <span className="text-foreground/60 text-sm">(bookings)</span></span>
                </a>
                <a href={`tel:${CONTACT.caretakerPhone}`} className="flex items-center gap-3 rounded-md p-2 -mx-2 min-h-11 hover:bg-muted transition-colors">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <span>{CONTACT.caretakerPhoneLabel} <span className="text-foreground/60 text-sm">({CONTACT.caretakers}, on-site)</span></span>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-md p-2 -mx-2 min-h-11 hover:bg-muted transition-colors break-all">
                  <Mail className="h-5 w-5 text-secondary shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
                <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md p-2 -mx-2 min-h-11 hover:bg-muted transition-colors">
                  <Facebook className="h-5 w-5 text-secondary shrink-0" />
                  <span>facebook.com/villaaurora.malolos</span>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Check-in times
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <span className="font-medium">Overnight (22 hrs)</span>
                  <span className="text-foreground/70 text-right">2:00 PM – 12:00 NN next day</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-medium">Day Tour (8 hrs)</span>
                  <span className="text-foreground/70 text-right">2:00 PM – 10:00 PM</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="font-medium">{CONTACT.address}</p>
                <ul className="text-foreground/70 space-y-1">
                  <li>In front of TAVERNA by Bahay na Tisa</li>
                  <li>Behind P. Bonifacio Lumber</li>
                  <li>Along the road to Barasoain Church</li>
                </ul>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="lg" className="flex-1 px-3" asChild>
                    <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin />
                      Google Maps
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 px-3" asChild>
                    <a href={CONTACT.wazeUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation />
                      Waze
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-elegant aspect-[4/3] sm:aspect-[16/7] bg-muted">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent("Villa Aurora, Independencia St, Malolos, Bulacan")}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map to Villa Aurora Malolos"
          />
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;
