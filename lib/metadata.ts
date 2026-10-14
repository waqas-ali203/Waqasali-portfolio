import type { Metadata } from "next";
import { site } from "@/content/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(site.canonical ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: `${title} • ${site.name}`,
      description,
      url: site.canonical ? `${site.canonical}${path}` : undefined,
      images: [site.socialImage],
    },
  };
}
