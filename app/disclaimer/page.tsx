import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Disclaimer — TechEchelon",
  description: "Editorial and investment disclaimer for TechEchelon coverage.",
};

export default function DisclaimerPage() {
  return (
    <StaticPage eyebrow="Editorial Notice" title="Disclaimer">
      <p>
        The content of this website is published in the United States of America and persons who access it agree to do so in accordance with applicable U.S. law.
      </p>
      <p>
        All opinions expressed by the analysts quoted here are solely their opinions and do not reflect the opinions of TechEchelon or affiliates, and may have been previously disseminated by other parties on television, radio, Internet or another medium.
      </p>
      <p>
        You should not treat any opinion expressed on this website as a specific inducement to make a particular investment or follow a particular strategy, but only as an expression of an opinion. Such opinions are based upon information the analysts consider reliable, but neither TechEchelon nor its affiliates and/or subsidiaries warrant its completeness or accuracy, and it should not be relied upon as such.
      </p>
      <p>
        The analysts, TechEchelon, its affiliates and/or subsidiaries are not under any obligation to update or correct any information available on this website. Some TechEchelon participants are professional traders who may be actively involved in securities discussed herein, on behalf of themselves, their companies and their clients.
      </p>
      <p>
        Also, the opinions expressed by the analysts may be short term in nature and are subject to change without notice.
      </p>
      <p>
        The analysts and TechEchelon do not guarantee any specific outcome or profit. You should be aware of the real risk of loss in following any strategy or investment discussed on this website. Strategies or investments discussed may fluctuate in price or value. Investors may get back less than invested. Investments or strategies mentioned on this website may not be suitable for you. This material does not take into account your particular investment objectives, financial situation or needs and is not intended as recommendations appropriate for you.
      </p>
      <p>
        You must make an independent decision regarding investments or strategies mentioned on this website. Before acting on information on this website, you should consider whether it is suitable for your particular circumstances and strongly consider seeking advice from your own financial or investment adviser.
      </p>
    </StaticPage>
  );
}
