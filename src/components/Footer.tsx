import { Link } from "react-router-dom";
import { Facebook, MessageCircle, Phone } from "lucide-react";
import { CONTACT, messengerLinkProps } from "@/lib/booking";
import { openCookieSettings } from "@/lib/consent";

const Footer = ({ withMobileBar = false }: { withMobileBar?: boolean }) => (
  // Extra bottom padding on phones so the sticky booking bar doesn't cover the footer
  <footer className={`bg-villa-dark-brown text-white pt-10 ${withMobileBar ? "pb-28 md:pb-10" : "pb-10"}`}>
    <div className="container mx-auto px-4 text-center">
      <p className="text-4xl font-cheetah title-on-dark mb-2">Villa Aurora</p>
      <p className="text-white/80 mb-6">Your luxurious haven in Malolos, Bulacan</p>
      <div className="flex justify-center gap-2 mb-6">
        <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook page" className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <Facebook className="h-5 w-5" />
        </a>
        <a {...messengerLinkProps()} aria-label="Messenger" className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <MessageCircle className="h-5 w-5" />
        </a>
        <a href={`tel:${CONTACT.phone}`} aria-label={`Call ${CONTACT.phoneLabel}`} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <Phone className="h-5 w-5" />
        </a>
      </div>
      <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm mb-4">
        <Link to="/privacy" className="text-white/85 hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center">Privacy Policy</Link>
        <Link to="/terms" className="text-white/85 hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center">Terms &amp; Conditions</Link>
        <button type="button" onClick={openCookieSettings} className="text-white/85 hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center">Cookie Settings</button>
      </nav>
      <p className="text-sm text-white/75">{CONTACT.address}</p>
      <p className="text-sm text-white/75 mt-1">&copy; {new Date().getFullYear()} Villa Aurora Private Resort. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
