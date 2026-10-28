import { Link } from "react-router-dom";
import LegalPage from "@/components/LegalPage";
import { CONTACT, messengerLinkProps } from "@/lib/booking";
import { usePageMeta } from "@/lib/usePageMeta";
import { openCookieSettings } from "@/lib/consent";

// Plain-language privacy policy. Review with a lawyer if your setup changes.
const Privacy = () => {
  usePageMeta(
    "Privacy Policy | Villa Aurora Malolos",
    "How Villa Aurora Malolos collects, uses and protects your personal data under the Philippine Data Privacy Act of 2012.",
    "/privacy",
  );

  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 27, 2026"
      intro={
        <p>
          Villa Aurora Private Resort ("Villa Aurora", "we", "us") respects your privacy. This policy explains what
          personal data we collect through this website, why, and your rights under the Philippine Data Privacy Act of
          2012 (Republic Act No. 10173).
        </p>
      }
      sections={[
        {
          title: "What we collect",
          body: (
            <>
              <p>When you send a booking request, we collect:</p>
              <ul>
                <li>Your name, mobile number and (optional) email address</li>
                <li>Your preferred package, dates and number of guests</li>
                <li>Any notes you write in the form</li>
              </ul>
              <p>
                We also receive basic, anonymous visit statistics (pages viewed, device type, country) to see how the
                site is used. These do not identify you and use no cookies.
              </p>
            </>
          ),
        },
        {
          title: "How we use it",
          body: (
            <ul>
              <li>To check availability and reply to your booking request</li>
              <li>To confirm, manage and prepare for your stay</li>
              <li>To keep records required for receipts and accounting</li>
              <li>To prevent spam and abuse of the booking form</li>
            </ul>
          ),
        },
        {
          title: "Where it is stored and who sees it",
          body: (
            <>
              <p>
                Booking requests are stored in a secure database (Supabase, servers in Singapore). Only the Villa
                Aurora owner and staff who handle bookings can see them. We never sell or rent your data.
              </p>
              <p>
                When you choose "Request to Book via Messenger", your details are also sent through Facebook Messenger,
                and{" "}
                <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
                  Meta's Privacy Policy
                </a>{" "}
                applies to that conversation. The website is hosted by Vercel.
              </p>
            </>
          ),
        },
        {
          title: "Cookies",
          body: (
            <>
              <p>
                We use your browser's storage only to remember your cookie choice. If you click "Accept all", we load an
                embedded Google Map, which may set Google cookies. We use no advertising or tracking cookies.
              </p>
              <p>
                <button type="button" onClick={openCookieSettings} className="text-secondary underline underline-offset-2">
                  Change your cookie settings
                </button>
              </p>
            </>
          ),
        },
        {
          title: "How long we keep it",
          body: (
            <p>
              We keep booking requests and records for up to 2 years after your stay (or after your request, if you did
              not book), unless the law requires us to keep them longer. Then we delete them.
            </p>
          ),
        },
        {
          title: "Your rights",
          body: (
            <>
              <p>Under the Data Privacy Act, you may:</p>
              <ul>
                <li>Ask what personal data we hold about you and get a copy</li>
                <li>Ask us to correct wrong or outdated data</li>
                <li>Ask us to delete your data or stop using it</li>
                <li>Withdraw consent at any time</li>
                <li>
                  File a complaint with the{" "}
                  <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer">
                    National Privacy Commission
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Security",
          body: (
            <p>
              The site uses HTTPS encryption. Database access keys stay on our server and are never sent to your
              browser. The public calendar shows only booked dates, never guest names or details.
            </p>
          ),
        },
        {
          title: "Contact us",
          body: (
            <p>
              For any privacy question or request, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, call{" "}
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneLabel}</a>, or message us on{" "}
              <a {...messengerLinkProps()}>
                Messenger
              </a>
              . See also our <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>
          ),
        },
      ]}
    />
  );
};

export default Privacy;
