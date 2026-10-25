import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/cookies",
    "/demo-hinweise",
  ].map((path) => ({
    url: `https://www.cod-st.com${path}`,
    lastModified: new Date("2026-10-25"),
    changeFrequency: path ? "yearly" : "monthly",
    priority: path ? 0.4 : 1,
  }));
}
