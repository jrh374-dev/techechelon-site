/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  // Retired duplicate articles point at the story they repeated, so links
  // already sent in The Brief, shared, or indexed keep working.
  async redirects() {
    return [
      {
        // Same story as the earlier piece, published two hours later; both
        // ran in The Brief on 2026-11-18.
        source: "/post/nvidia-shares-slide-24-in-november-as-board-rules-out-jensen-huangs-return",
        destination: "/post/nvidia-shares-slide-amid-huang-fallout-as-u-s-china-tech-tensions-deepen",
        permanent: true,
      },
      // Older repeats found on 2026-11-18; each later story reported the
      // same development as the earlier one it now points to.
      {
        source: "/post/metas-18-billion-settlement-puts-tiktok-youtube-and-snap-on-notice-over-teen-safety",
        destination: "/post/meta-agrees-to-17-billion-settlement-with-52-attorneys-general-over-teen-safety-failures",
        permanent: true,
      },
      {
        source: "/post/spacex-pursues-40-billion-financing-to-expand-nvidia-gpu-holdings-as-fcc-moves-to-auction-prime",
        destination: "/post/apollo-and-banks-in-talks-to-finance-spacexs-40-billion-nvidia-gpu-purchase",
        permanent: true,
      },
      {
        source: "/post/google-loses-chief-scientist-jeff-dean-as-ai-talent-exodus-widens",
        destination: "/post/jeff-dean-exits-google-after-27-years-to-launch-ai-startup-as-demis-hassabis-steps-back-from",
        permanent: true,
      },
      {
        source: "/post/jensen-huang-resigns-as-nvidia-ceo-after-affair-disclosures-shares-post-sixth-straight-weekly-loss",
        destination: "/post/jensen-huang-resigns-as-nvidia-ceo-cfo-colette-kress-named-interim-chief",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
