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
    ];
  },
};

module.exports = nextConfig;
