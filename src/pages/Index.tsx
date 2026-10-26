import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import InfoTabs from "@/components/InfoTabs";
import Availability from "@/components/Availability";
import Weddings from "@/components/Weddings";
import EnhancedContact from "@/components/EnhancedContact";
import MobileBookingBar from "@/components/MobileBookingBar";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";

const Index = () => {
  usePageMeta(
    "Villa Aurora Malolos | Private Resort with Pool in Bulacan",
    "Book the whole Villa Aurora private resort in Malolos, Bulacan: 3 AC rooms, 2 pools, up to 22 overnight guests. Overnight stays, day tours and wedding prep near Barasoain Church.",
  );

  // Links like /#contact from other pages: scroll to that section after loading.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Packages />
        <InfoTabs />
        <Availability />
        <Weddings />
        <EnhancedContact />
      </main>
      <Footer withMobileBar />
      <MobileBookingBar />
    </div>
  );
};

export default Index;
