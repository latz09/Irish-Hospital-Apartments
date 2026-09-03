// Have counsel review before launch. This is a professional template, not legal advice.
import Section from '@/components/layout/Section';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';

// Static, client-specific values — update here as needed.
const effectiveDate = 'September 1, 2026'; // TODO: set to actual launch date once confirmed (expected mid-August 2026)
const rentalPlatformName = 'our resident portal'; // TODO: update to the actual platform name (RentRedi or TurboTenant) once Kristen decides

// secondary (#EABC66 / Gold) is the site's link accent per the client palette.
const linkClass = 'font-semibold underline text-secondary hover:opacity-80';

export default async function AccessibilityStatement() {
  const seo = await fetchSeoSettings();
  const businessName = seo?.businessName ?? 'Irish Hospital Apartments';
  const contactEmail = seo?.contactEmail ?? 'kristen@irishhospitalapartments.com';

  return (
    <Section className="bg-dark text-light py-[4rem] px-[1.5rem] pt-7.5 lg:pt-10">
      <article className="max-w-[64rem] mx-auto">
        <h1 className="text-secondary">Accessibility Statement</h1>
        <p className="text-paragraph-sm text-light mt-[0.5rem]">Effective Date: {effectiveDate}</p>

        <p className="text-paragraph text-light mt-[1.5rem]">
          {businessName} is committed to making our website accessible to everyone, including
          people with disabilities. We believe every visitor &ndash; prospective resident,
          current resident, or friend of the building &ndash; should be able to use our site
          easily and comfortably.
        </p>

        <h4 className="text-light mt-[4rem]">1. Our Commitment</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          As a good-faith effort, we strive to align our website with the Web Content
          Accessibility Guidelines (WCAG) 2.1, Level AA, published by the World Wide Web
          Consortium (W3C). While these guidelines are not formally mandated for a website of
          this kind, we treat them as our standard because they represent widely recognized best
          practices for accessible design.
        </p>

        <h4 className="text-light mt-[4rem]">2. Known Limitations</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Accessibility is an ongoing effort, and we want to be upfront about areas that are
          outside our direct control or still being improved:
        </p>
        <ul className="text-paragraph text-light mt-[0.75rem] space-y-[0.5rem] pl-[1.25rem] list-disc">
          <li>
            <strong className="text-secondary">Third-party resident platform.</strong> Our Resident Services panel links out
            to {rentalPlatformName} for applications, rent payments, and maintenance requests.
            That platform is operated and maintained independently, and its accessibility is
            governed by its own team, not by us.
          </li>
          <li>
            <strong className="text-secondary">External links.</strong> Our site may link to other third-party websites
            whose accessibility we do not control.
          </li>
          <li>
            <strong className="text-secondary">Ongoing improvements.</strong> We continue to review and refine our site as
            we become aware of accessibility gaps.
          </li>
        </ul>

        <h4 className="text-light mt-[4rem]">3. Alternative Ways to Reach Us</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          If any part of our website is difficult for you to use, we&rsquo;re happy to help
          directly. You can reach us by email at{' '}
          <a href={`mailto:${contactEmail}`} className={linkClass}>
            {contactEmail}
          </a>{' '}
          and we&rsquo;ll work with you to provide the information or assistance you need in a
          way that works for you.
        </p>

        <h4 className="text-light mt-[4rem]">4. Report an Accessibility Issue</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          We welcome your feedback. If you encounter an accessibility barrier on our website,
          please let us know so we can address it.
        </p>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Email:{' '}
          <a href={`mailto:${contactEmail}`} className={linkClass}>
            {contactEmail}
          </a>
        </p>
        <p className="text-paragraph-sm text-light mt-[0.75rem]">
          We aim to respond as quickly as possible.
        </p>

        <h4 className="text-light mt-[4rem]">5. Ongoing Efforts</h4>
        <p className="text-paragraph text-light mt-[0.75rem]">
          Accessibility is not a one-time project for us &ndash; it&rsquo;s an ongoing commitment.
          As our website evolves, we&rsquo;ll continue working to maintain and improve its
          usability for all visitors.
        </p>
      </article>
    </Section>
  );
}