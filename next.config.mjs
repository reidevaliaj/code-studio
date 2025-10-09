import createNextIntlPlugin from 'next-intl/plugin';

// Wrap your Next.js config with the plugin
const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  // ✅ Ignore build-time TypeScript & ESLint errors on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optional: if you want static HTML export later
  // output: 'export',
};

export default withNextIntl(nextConfig);
