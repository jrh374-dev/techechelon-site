import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Disclaimer — TechEchelon",
  description: "Editorial disclaimer for TechEchelon coverage of markets, securities, and financial topics.",
};

export default function DisclaimerPage() {
  return (
    <StaticPage
      eyebrow="Editorial Notice"
      title="Disclaimer"
      dek="Coverage of markets, securities, and financial topics is reported for informational purposes only."
    >
      <p>
        TechEchelon publishes coverage of public and private companies, securities, market events, cryptocurrencies, and other tradeable instruments. The reporting on this site is provided for general informational and educational purposes only. It does not constitute, and should not be construed as, financial, investment, legal, tax, or other professional advice.
      </p>
      <p>
        Nothing on TechEchelon is a recommendation, solicitation, or offer to buy or sell any security, derivative, digital asset, or other financial instrument. Past performance is not indicative of future results. Markets are volatile; an investment decision based on a TechEchelon article alone is not a sound one.
      </p>
      <h2>Conflicts and disclosures</h2>
      <p>
        TechEchelon is independent and not compensated by any company we cover. We do not accept payment, equity, or other consideration in exchange for coverage. Specific reporter disclosures, where applicable, appear at the bottom of the relevant article.
      </p>
      <h2>Accuracy and corrections</h2>
      <p>
        TechEchelon aims for accuracy in every article. Errors are corrected promptly when identified, with a transparent note appended to the article. To report a correction, see the <a href="/corrections">Corrections</a> page.
      </p>
      <h2>Consult a professional</h2>
      <p>
        Before making any investment, tax, or legal decision, consult a qualified, licensed professional who can evaluate your specific circumstances. Readers are solely responsible for their own decisions and actions.
      </p>
    </StaticPage>
  );
}
