import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Contact — TechEchelon",
};

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Get in touch"
      title="Contact"
      dek="Tips, corrections, partnership inquiries, and other newsroom matters."
    >
      <h2>Story tips</h2>
      <p>
        Send tips to <a href="mailto:tips@techechelon.com">tips@techechelon.com</a>. For sensitive material, you can reach the editor at <a href="mailto:sara@techechelon.com">sara@techechelon.com</a> (Signal available on request).
      </p>
      <h2>Corrections</h2>
      <p>
        See the <a href="/corrections">Corrections</a> page for the process. For quick corrections, email <a href="mailto:corrections@techechelon.com">corrections@techechelon.com</a>.
      </p>
      <h2>Partnerships and sponsorship</h2>
      <p>
        TechEchelon&apos;s sponsorship slots are limited and editorial independence is non-negotiable. Reach out at <a href="mailto:partnerships@techechelon.com">partnerships@techechelon.com</a>.
      </p>
      <h2>Press</h2>
      <p>
        Press inquiries: <a href="mailto:press@techechelon.com">press@techechelon.com</a>.
      </p>
    </StaticPage>
  );
}
