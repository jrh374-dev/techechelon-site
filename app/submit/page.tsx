import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Submit an Op-Ed — TechEchelon",
  description:
    "Guidelines for submitting an op-ed to TechEchelon: what we publish, what a piece needs, and how to send it.",
};

export default function SubmitPage() {
  return (
    <StaticPage
      eyebrow="Contribute"
      title="Submit an Op-Ed"
      dek="TechEchelon publishes argument from people who work inside the industries we cover. Here is what we look for and how to send it."
    >
      <h2>What we publish</h2>
      <p>
        Op-eds run in our <a href="/category/opinion">Opinion</a> section alongside the Executive Q&amp;A series. The topic should sit where TechEchelon reports: technology, markets, policy, cybersecurity, and artificial intelligence, and especially the places where they collide. A founder on the regulation about to reshape her sector. An investor on a pattern in the earnings data that the coverage is missing. A security practitioner on what a breach post-mortem actually shows.
      </p>
      <p>
        The strongest submissions make an argument only the author can make, from a vantage point our readers do not otherwise get. If the piece could run anywhere, it is probably not for us. We do not publish general commentary, product announcements, or pieces whose purpose is to promote a company, product, or service.
      </p>

      <h2>What a piece needs</h2>
      <ul>
        <li>
          <strong>At least 600 words.</strong> There is no hard maximum, but tighter is better. If the argument needs 1,500 words, every paragraph should earn its place.
        </li>
        <li>
          <strong>A grounded argument.</strong> Claims should be supported by data, documents, filings, published research, or firsthand experience you can describe specifically. Assertion is not evidence. Prefer primary sources (the filing, the study, the transcript) over coverage of them.
        </li>
        <li>
          <strong>Hyperlinks to your sources,</strong> placed in the text where the claim is made. We check them before publication.
        </li>
        <li>
          <strong>Original and exclusive.</strong> The piece should not have been published elsewhere, including on your own blog or LinkedIn, and should not be under consideration elsewhere while we review it.
        </li>
        <li>
          <strong>Your own work.</strong> The argument, and the words, should be yours.
        </li>
        <li>
          <strong>Full disclosure.</strong> Tell us about any employer, client, investment, or financial interest relevant to the argument. We disclose relevant relationships in the published piece, the same standard we apply to <a href="/ethics">our own writers</a>. A conflict discovered after publication will get the piece taken down.
        </li>
      </ul>

      <h2>How to submit</h2>
      <p>
        Email <a href="mailto:press@techechelon.com">press@techechelon.com</a> with the subject line <strong>Op-ed: [proposed headline]</strong>.
      </p>
      <ul>
        <li>
          <strong>Paste the full piece in the body of the email.</strong> No attachments. We do not open them.
        </li>
        <li>A proposed headline.</li>
        <li>A one- or two-sentence bio, written the way you would like it to appear.</li>
        <li>Your affiliation and any disclosures.</li>
      </ul>
      <p>
        If we accept the piece, we will ask for a headshot at that point.
      </p>
      <p>
        Pitching an executive for the Q&amp;A series instead? Same inbox, with the subject line <strong>Q&amp;A: [name, title, company]</strong> and a few sentences on why their perspective matters right now.
      </p>

      <h2>What happens next</h2>
      <p>
        We read every submission. If you have not heard from us within seven business days, assume we have passed; we cannot respond individually to every piece. Accepted pieces are edited for clarity, length, and house style, and we will show you any substantive changes before publication. We write the headline. We do not pay for op-eds.
      </p>
      <p>
        Once a piece is published, it is subject to the same standards as everything else we run. If a fact turns out to be wrong, we correct it transparently and note the correction on the piece. See <a href="/corrections">Corrections</a>.
      </p>
    </StaticPage>
  );
}
