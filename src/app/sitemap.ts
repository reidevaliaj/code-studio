import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const existingPages: MetadataRoute.Sitemap = [
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
  return [
    ...existingPages,
    {
      url: "https://www.cod-st.com/imobiliare",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
