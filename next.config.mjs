/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/de", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/de/:path*", destination: "/:path*", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      ...[
        "services",
        "partners",
        "case-studies",
        "website-rebuild",
        "real-estate-landing",
      ].map((path) => ({
        source: `/${path}/:path*`,
        destination: "/",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
