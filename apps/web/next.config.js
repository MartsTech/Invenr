/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/calendar',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
