/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "litlang2.s3.amazonaws.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "drive.google.com" },
      { hostname: "img.clerk.com" },
      { hostname: "utfs.io" },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  // webpack: (config, { isServer, nextRuntime }) => {
  //   if (true) {
  //     config.snapshot.managedPaths = [];

  //     Object.defineProperty(config, "watchOptions", {
  //       ...Object.getOwnPropertyDescriptor(config, "watchOptions"),
  //       value: {
  //         ...config.watchOptions,
  //         ignored:
  //           /^((?:[^/]*(?:\/|$))*)(\.(git|next))(\/((?:[^/]*(?:\/|$))*)(?:$|\/))?/,
  //       },
  //     });
  //   }

  //   return config;
  // },
};

export default nextConfig;
