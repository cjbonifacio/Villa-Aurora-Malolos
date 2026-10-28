import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/villa-aurora-logo.webp";
import { GuideSections } from "@/components/guide/GuideSections";
import NotFound from "@/pages/NotFound";
import { CONTACT, messengerLinkProps } from "@/lib/booking";
import { fetchGuide, GuideNotFound, GUIDE_NAV } from "@/lib/guide";
import { photo } from "@/lib/photos";

// Private guest guide at /guide/<secret>. A wrong secret shows the normal 404 page.
const Guide = () => {
  const { key = "" } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["guide", key],
    queryFn: () => fetchGuide(key),
    retry: (count, err) => !(err instanceof GuideNotFound) && count < 2,
    staleTime: 5 * 60_000,
  });

  // Keep this page out of search results.
  useEffect(() => {
    document.title = "Guest Guide | Villa Aurora";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  if (error instanceof GuideNotFound) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <header className="relative h-60 sm:h-72 overflow-hidden">
        <img {...photo("exterior-evening", "100vw")} alt="Villa Aurora lit up in the evening" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-center text-white">
          <img src={logo} alt="" className="mx-auto mb-2 h-14 w-14 object-contain" />
          <p className="text-xs font-medium uppercase tracking-[0.28em] mb-1">Guest Guide</p>
          <h1 className="text-5xl font-cheetah text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">Welcome to Villa Aurora</h1>
        </div>
      </header>

      <nav aria-label="Guide sections" className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <ul className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GUIDE_NAV.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-full border border-villa-gold/60 px-4 text-sm font-medium text-villa-dark-brown hover:bg-villa-gold/20">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="lg" asChild>
            <a href={`tel:${CONTACT.caretakerPhone}`}>
              <Phone />
              Call the caretakers
            </a>
          </Button>
          <Button variant="messenger" size="lg" asChild>
            <a {...messengerLinkProps()}>
              <MessageCircle />
              Message us
            </a>
          </Button>
        </div>

        {isLoading && <p className="py-16 text-center text-foreground/70">Loading your guide…</p>}
        {error && !isLoading && (
          <p className="py-10 text-center text-foreground/80">
            We couldn't load the guide right now. Please try again, or message us on Messenger and we'll help right away.
          </p>
        )}
        {data && <GuideSections rows={data} />}

        <p className="pt-4 pb-10 text-center text-sm text-foreground/60">Thank you for staying at Villa Aurora. Enjoy your stay!</p>
      </main>
    </div>
  );
};

export default Guide;
