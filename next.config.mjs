/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "drive.google.com" },
      { hostname: "img.clerk.com" },
      { hostname: "utfs.io" },
    ],
  },
};

export default nextConfig;
