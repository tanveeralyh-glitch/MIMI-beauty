import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://mimibeauty.com";
  const paths = [
    "",
    "/shop",
    "/bundles",
    "/build-your-set",
    "/quiz",
    "/blog",
    "/about",
    "/brand-philosophy",
    "/who-we-are",
    "/contact",
    "/ingredients",
    "/product/dew",
    "/product/veil",
    "/product/herbe",
    "/product/halo",
    "/product/pearl",
    "/product/amalfi",
    "/product/santorini",
  ];

  return paths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
