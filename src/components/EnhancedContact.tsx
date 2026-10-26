import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { addDays, format, parseISO } from "date-fns";
import { z } from "zod";

const MESSENGER_URL = "https://m.me/villaaurora.malolos";

// Client-side check. The server (/api/request) validates again — this is just for quick feedback.
const formSchema = z
  .object({
    guest_name: z.string().trim().min(2, "Please enter your full name"),
    phone: z.string().trim().regex(/^[0-9+()\-\s]{7,30}$/, "Please enter a valid phone number"),
    email: z.string().trim().email("Please enter a valid email"),
    check_in: z.string().min(1, "Please pick a check-in date"),
    check_out: z.string().min(1, "Please pick a check-out date"),
    pax: z.coerce.number().int().min(1, "At least 1 guest").max(22, "Maximum of 22 guests"),
    package_type: z.string(),
    message: z.string().max(500, "Message is too long (max 500 characters)"),
    website: z.string(),
  })
  .refine((f) => f.check_out > f.check_in, { message: "Check-out must be after check-in", path: ["check_out"] });

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

const EnhancedContact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const isDayTour = form.package_type === "daytour";
  const today = format(new Date(), "yyyy-MM-dd");

  const update = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

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

    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your request.");
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Could not send your request.");
    }
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
                  <a href="https://www.facebook.com/villaaurora.malolos" target="_blank" rel="noopener noreferrer">
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
                <CardTitle>Request a Booking</CardTitle>
                <p className="text-muted-foreground">We'd love to help plan your perfect stay</p>
              </CardHeader>
              <CardContent>
                {status === "sent" ? (
                  <div className="text-center space-y-4 py-8">
                    <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-semibold">Request received!</h3>
                    <p className="text-muted-foreground">
                      This is a booking <strong>request</strong>, not a confirmed booking yet. We'll check your dates
                      and contact you to confirm and arrange the downpayment.
                    </p>
                    <p className="text-muted-foreground">For a faster reply, message us on Facebook Messenger.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <Button variant="booking" asChild>
                        <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                          Message us on Messenger
                        </a>
                      </Button>
                      <Button variant="outline" onClick={() => setStatus("idle")}>
                        Send another request
                      </Button>
                    </div>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="guest_name" className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input id="guest_name" placeholder="Your full name" value={form.guest_name} onChange={update("guest_name")} required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input id="phone" type="tel" placeholder="+63 XXX XXX XXXX" value={form.phone} onChange={update("phone")} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" value={form.email} onChange={update("email")} required />
                  </div>

                  <div>
                    <label htmlFor="package_type" className="block text-sm font-medium mb-2">Package Interest</label>
                    <select
                      id="package_type"
                      value={form.package_type}
                      onChange={update("package_type")}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select a package</option>
                      <option value="overnight">Overnight Stay</option>
                      <option value="daytour">Day Tour</option>
                      <option value="wedding">Wedding Preparation</option>
                      <option value="other">Other Event</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="check_in" className="block text-sm font-medium mb-2">
                        {isDayTour ? "Date *" : "Check-in Date *"}
                      </label>
                      <Input id="check_in" type="date" min={today} value={form.check_in} onChange={update("check_in")} required />
                    </div>
                    {!isDayTour && (
                      <div>
                        <label htmlFor="check_out" className="block text-sm font-medium mb-2">Check-out Date *</label>
                        <Input
                          id="check_out"
                          type="date"
                          min={form.check_in || today}
                          value={form.check_out}
                          onChange={update("check_out")}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pax" className="block text-sm font-medium mb-2">Number of Guests *</label>
                    <Input id="pax" type="number" placeholder="How many guests?" min="1" max="22" value={form.pax} onChange={update("pax")} required />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message & Special Requirements</label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your event, special requirements, dietary restrictions, or any questions you have..."
                      className="min-h-[120px]"
                      maxLength={500}
                      value={form.message}
                      onChange={update("message")}
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-red-600 text-center">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="booking" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This sends a request only. Your booking is confirmed once we contact you and receive the downpayment.
                  </p>
                </form>
                )}
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