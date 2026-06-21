import { StaticPage } from "@/components/StaticPage";

export const metadata = { title: "Accessibility — TechEchelon" };

export default function AccessibilityPage() {
  return (
    <StaticPage
      eyebrow="Newsroom"
      title="Accessibility"
      dek="Our approach to making TechEchelon usable for all readers."
    >
      <p>
        TechEchelon is committed to making our journalism accessible to readers with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, level AA, where reasonably achievable.
      </p>
      <h2>What we do</h2>
      <p>
        We build with semantic HTML, meaningful image alt text, sufficient color contrast, keyboard navigability, and screen-reader-friendly structure. Articles render comfortably at common assistive-technology zoom levels, and our typography uses adjustable units rather than fixed pixel sizes.
      </p>
      <h2>Known limitations</h2>
      <p>
        Some content imported from our prior publishing platform may have less descriptive image alt text than we&apos;d like. We are working through the archive to add or improve descriptions. Live data displays (such as the stock ticker bar) include non-text elements that we&apos;re continuing to refine.
      </p>
      <h2>Tell us when something doesn&apos;t work</h2>
      <p>
        If you encounter a page, image, or feature on TechEchelon that isn&apos;t accessible to you, please email <a href="mailto:press@techechelon.com">press@techechelon.com</a> with the URL and a description. We treat accessibility issues with the same priority as factual corrections.
      </p>
    </StaticPage>
  );
}
