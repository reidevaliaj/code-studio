import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Note: Removed 'output: export' to allow middleware usage
  // If you need static export, you'll need to remove the middleware.ts file
};

export default withNextIntl(nextConfig);