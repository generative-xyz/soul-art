const path = require("path");
const needPrefix = (process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'develop');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.generative.xyz',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "@Styles/_tools.scss";@import "@Styles/_setting.scss";@import '~bootstrap/scss/mixins';`,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/souls',
        permanent: true,
      }
    ];
  },
  assetPrefix: needPrefix ? '/souls' : undefined,
};

module.exports = nextConfig;
