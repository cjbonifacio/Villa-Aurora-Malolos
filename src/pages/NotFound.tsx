import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import SimplePageLayout from "@/components/SimplePageLayout";
import { messengerLinkProps } from "@/lib/booking";
import { usePageMeta } from "@/lib/usePageMeta";
import { photo } from "@/lib/photos";

const NotFound = () => {
  usePageMeta("Page not found | Villa Aurora Malolos", "This page doesn't exist. Head back to Villa Aurora Malolos.");

  return (
    <SimplePageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center max-w-5xl">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Error 404</p>
          <h1 className="text-5xl md:text-6xl font-cheetah title-outline mb-4">Oops, wrong turn</h1>
          <p className="text-lg text-foreground/75 mb-8">
            This page took a dip and never came back. Let's get you back to the villa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button variant="hero" size="xl" className="px-8" asChild>
              <Link to="/">
                <Home />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="px-8" asChild>
              <a {...messengerLinkProps()}>
                <MessageCircle />
                Message Us
              </a>
            </Button>
          </div>
        </div>
        <img {...photo("pool-area", "(min-width: 768px) 50vw, 100vw")} alt="The pool at Villa Aurora" className="rounded-xl shadow-elegant aspect-[4/3] object-cover w-full" />
      </div>
    </SimplePageLayout>
  );
};

export default NotFound;
