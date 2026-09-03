// Have counsel review before launch. This is a professional template, not legal advice.
import Section from '@/components/layout/Section';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';

// Static, client-specific values — update here as needed.
const effectiveDate = 'September 1, 2026'; // TODO: set to actual launch date once confirmed (expected mid-August 2026)
const businessLocation = 'Forest City, Iowa, United States';
const rentalPlatformName = 'our resident portal'; // TODO: update to the actual platform name (RentRedi or TurboTenant) once Kristen decides

// secondary (#EABC66 / Gold) is the site's link accent per the client palette.
const linkClass = 'font-semibold underline text-secondary hover:opacity-80';

export default async function PrivacyPolicy() {
  const seo = await fetchSeoSettings();
  const businessName = seo?.businessName ?? 'Irish Hospital Apartments';
  const contactEmail = seo?.contactEmail ?? 'kristen@irishhospitalapartments.com';

  return (
    <Section className="bg-dark text-light py-[4rem] px-[1.5rem] pt-7.5 lg:pt-10">
      <article className="max-w-[64rem] mx-auto">
        <h1 className="text-secondary">Privacy Policy</h1>
        <p className="text-paragraph-sm text-light mt-[0.5rem]">Effective Date: {effectiveDate}</p>

        <p className="text-paragraph text-light mt-[1.5rem]">
          {businessName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your
          privacy and is committed to protecting the personal information of visitors to our
          website. This Privacy Policy explains what information we collect, how we use it, and
          the choices you have.
        </p>
      

        <h4 className=" mt-[4rem]">1. Information We Collect</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We aim to collect only the information necessary to run our website and connect
          residents and prospective residents with our services.
        </p>
        <ul className="text-paragraph text-light mt-[0.75rem] space-y-[0.5rem] pl-[1.25rem] list-disc">
          <li>
            <strong className="text-secondary">Contact Information.</strong> If you reach out to us directly by email, we
            collect your name, email address, and the content of your message.
          </li>
          <li>
            <strong className="text-secondary">Resident Services Information.</strong> Our website links out to {rentalPlatformName},
            a third-party rental management platform, for rental applications, rent payments, and
            maintenance requests. Any information you submit through that platform &ndash;
            including application details and payment information &ndash; is collected and
            processed directly by that third party under its own privacy policy. We do not
            receive, store, or process that information ourselves.
          </li>
          <li>
            <strong className="text-secondary">Device &amp; Usage Information.</strong> Our hosting provider automatically
            collects standard technical information when you visit our site, such as your IP
            address, browser type, and the pages you view.
          </li>
        </ul>

        <h4 className="text-light mt-[4rem]">2. Legal Bases for Processing (GDPR)</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          If you are located in the European Economic Area, our legal bases for processing your
          personal information include: your consent, our legitimate interests in operating and
          improving our website, and our need to take steps at your request prior to entering
          into an agreement with you.
        </p>

        <h4 className="text-light mt-[4rem]">3. How We Use Information</h4>
        <ul className="text-paragraph text-light mt-[0.75rem] space-y-[0.5rem] pl-[1.25rem] list-disc">
          <li>To respond to inquiries sent to us directly.</li>
          <li>To connect prospective and current residents with our resident services platform.</li>
          <li>To maintain, secure, and improve our website.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h4 className="text-light mt-[4rem]">4. Cookies &amp; Similar Technologies</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Our website uses only the cookies and similar technologies necessary for basic site
          functionality and security. We do not use our own advertising or tracking cookies. If
          you follow a link to {rentalPlatformName}, that platform&rsquo;s own cookie practices
          will apply and are governed by its privacy policy, not ours.
        </p>

        <h4 className="text-light mt-[4rem]">5. Sharing of Information</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We do not sell or rent your personal information. We share information only with the
          following categories of service providers, and only as needed to operate our website:
        </p>
        <ul className="text-paragraph text-light mt-[0.75rem] space-y-[0.5rem] pl-[1.25rem] list-disc">
          <li>
            <strong className="text-secondary">Hosting.</strong> Our website is hosted by Vercel Inc.
          </li>
          <li>
            <strong className="text-secondary">Resident Services.</strong> Rental applications, payments, and maintenance
            requests are handled directly by {rentalPlatformName}, an independent third-party
            platform we link to from our site.
          </li>
        </ul>

        <h4 className="text-light mt-[4rem]">6. Data Retention</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We retain personal information only for as long as necessary to fulfill the purposes
          described in this Privacy Policy, unless a longer retention period is required or
          permitted by law.
        </p>

        <h4 className="text-light mt-[4rem]">7. International Transfers</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We are based in {businessLocation}. If you are accessing our website from outside the
          United States, please be aware that your information may be transferred to, stored,
          and processed in the United States, where data protection laws may differ from those in
          your jurisdiction.
        </p>

        <h4 className="text-light mt-[4rem]">8. Your Privacy Rights</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Depending on where you live, you may have the right to access, correct, delete, or
          restrict the use of your personal information. California residents have the right to
          opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information under
          the CCPA; we do not sell or share personal information as those terms are defined by
          California law. To exercise any of these rights, contact us using the information
          below.
        </p>

        <h4 className="text-light mt-[4rem]">9. Children&rsquo;s Privacy</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Our website is not directed to children under the age of 13, and we do not knowingly
          collect personal information from children.
        </p>

        <h4 className="text-light mt-[4rem]">10. Security</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We use reasonable administrative and technical measures to protect the information we
          hold. However, no method of electronic transmission or storage is completely secure,
          and we cannot guarantee absolute security.
        </p>

        <h4 className="text-light mt-[4rem]">11. Changes to This Policy</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with a revised effective date.
        </p>

        <h4 className="text-light mt-[4rem]">12. Contact Us</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href={`mailto:${contactEmail}`} className={linkClass}>
            {contactEmail}
          </a>
          .
        </p>
      </article>
    </Section>
  );
}