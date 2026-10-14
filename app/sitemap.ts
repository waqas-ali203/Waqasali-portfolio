import type { MetadataRoute } from "next";
import { site, routes } from "@/content/site";
import { publishedProjects } from "@/content/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.canonical) return [];
  return [
    "/",
    ...routes.map((r) => r.href),
    ...publishedProjects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({
    url: `${site.canonical}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
