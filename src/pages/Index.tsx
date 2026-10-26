import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import InfoTabs from "@/components/InfoTabs";
import Availability from "@/components/Availability";
import Weddings from "@/components/Weddings";
import EnhancedContact from "@/components/EnhancedContact";
import MobileBookingBar from "@/components/MobileBookingBar";
import { Facebook, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/booking";

const Index = () => {
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

      {/* Extra bottom padding on phones so the sticky booking bar doesn't cover the footer */}
      <footer className="bg-villa-dark-brown text-white pt-10 pb-28 md:pb-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-4xl font-cheetah title-outline mb-2">Villa Aurora</p>
          <p className="text-white/80 mb-6">Your luxurious haven in Malolos, Bulacan</p>
          <div className="flex justify-center gap-2 mb-6">
            <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook page" className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={CONTACT.messengerUrl} target="_blank" rel="noopener noreferrer" aria-label="Messenger" className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={`tel:${CONTACT.phone}`} aria-label={`Call ${CONTACT.phoneLabel}`} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Phone className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-white/70">{CONTACT.address}</p>
          <p className="text-sm text-white/60 mt-1">&copy; {new Date().getFullYear()} Villa Aurora Private Resort. All rights reserved.</p>
        </div>
      </footer>

      <MobileBookingBar />
    </div>
  );
};

export default Index;
