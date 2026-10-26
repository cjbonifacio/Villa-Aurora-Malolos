import { Link } from "react-router-dom";
import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/lib/booking";
import { usePageMeta } from "@/lib/usePageMeta";

// Plain-language terms. They repeat the house policies shown on the home page.
const Terms = () => {
  usePageMeta(
    "Terms & Conditions | Villa Aurora Malolos",
    "Booking, payment, cancellation and house rules for stays and day tours at Villa Aurora Private Resort, Malolos.",
    "/terms",
  );

  return (
    <LegalPage
      title="Terms & Conditions"
      updated="October 27, 2026"
      intro={
        <p>
          These terms apply when you use this website or book a stay at Villa Aurora Private Resort, #80 Independencia
          St., San Gabriel, Malolos, Bulacan. By sending a booking request or booking with us, you agree to them.
        </p>
      }
      sections={[
        {
          title: "Booking requests",
          body: (
            <>
              <p>
                Sending the form on this website is a <strong>request</strong>, not a confirmed booking. The calendar is
                updated regularly, but a date is only reserved for you after we confirm it with you and receive your
                downpayment.
              </p>
              <p>Rates shown on the website may change. The rate we confirm with you in writing is the one that applies.</p>
            </>
          ),
        },
        {
          title: "Payment",
          body: (
            <ul>
              <li>A 50% downpayment is required to secure your booking.</li>
              <li>The remaining balance is settled upon check-in.</li>
              <li>We accept GCash, BPI and BDO. Official receipts are available upon request.</li>
            </ul>
          ),
        },
        {
          title: "Cancellation and rebooking",
          body: (
            <ul>
              <li>Downpayments are non-refundable, except as stated below.</li>
              <li>Cancellations more than 14 days before check-in may be offered an 80% refund.</li>
              <li>Cancellations less than 7 days before check-in forfeit the downpayment.</li>
              <li>Rebooking is free with at least 7 days' notice, and is valid for 3 months from the original booking date.</li>
            </ul>
          ),
        },
        {
          title: "Check-in, capacity and extensions",
          body: (
            <ul>
              <li>Overnight stay: check-in 2:00 PM, check-out 12:00 NN the next day.</li>
              <li>Day tour: 2:00 PM to 10:00 PM.</li>
              <li>Maximum 22 overnight guests. Pool use is limited to 22 swimmers.</li>
              <li>Additional guests or swimmers: ₱250 per person. Extensions: ₱500 per hour, subject to availability.</li>
            </ul>
          ),
        },
        {
          title: "House rules",
          body: (
            <ul>
              <li>No smoking inside the rooms. Smoking is allowed only in open outdoor areas.</li>
              <li>2–3 pets are allowed with prior notice. They must be supervised and are not allowed on furniture or in the pool.</li>
              <li>Please keep noise at a level respectful of neighbors.</li>
              <li>Guests are responsible for any damage to the property during their stay.</li>
            </ul>
          ),
        },
        {
          title: "Safety and liability",
          body: (
            <p>
              Children must be supervised at all times, especially near the pools. Guests use the pools and facilities
              at their own risk. Villa Aurora is not responsible for lost or stolen personal belongings, or for injury
              caused by guests' own negligence, to the extent allowed by law.
            </p>
          ),
        },
        {
          title: "Use of this website",
          body: (
            <p>
              Please do not misuse the booking form (for example, by sending spam or false information). Photos and text
              on this site belong to Villa Aurora and may not be reused without permission. We handle your personal
              data as described in our <Link to="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          title: "Governing law and contact",
          body: (
            <p>
              These terms are governed by the laws of the Philippines. Questions? Email{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or message us on{" "}
              <a href={CONTACT.messengerUrl} target="_blank" rel="noopener noreferrer">
                Messenger
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
};

export default Terms;
