/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // enables `next export`
    images: {
      unoptimized: true, // required if you use next/image in static export
    },
    i18n: {
      locales: ['en', 'de'],
      defaultLocale: 'en',
      localeDetection: true, // optional
    },
  };
  
  export default nextConfig;
  