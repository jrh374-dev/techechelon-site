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
      <p>
        The fastest way to reach TechEchelon is by email. We read every message and respond to legitimate inquiries promptly.
      </p>
      <h2>Story tips</h2>
      <p>
        Send tips to <a href="mailto:press@techechelon.com">press@techechelon.com</a>. For sensitive material, mark the subject line with &quot;Confidential.&quot; Signal available on request.
      </p>
      <h2>Corrections</h2>
      <p>
        Spotted an error? See the <a href="/corrections">Corrections</a> page for our process, or email <a href="mailto:press@techechelon.com">press@techechelon.com</a> with the article URL and the issue.
      </p>
      <h2>Partnerships, sponsorship, and events</h2>
      <p>
        Editorial independence is non-negotiable, but we do work with carefully selected partners on sponsorship slots and events. Reach out at <a href="mailto:press@techechelon.com">press@techechelon.com</a>.
      </p>
      <h2>Press</h2>
      <p>
        Press inquiries: <a href="mailto:press@techechelon.com">press@techechelon.com</a>.
      </p>
    </StaticPage>
  );
}
