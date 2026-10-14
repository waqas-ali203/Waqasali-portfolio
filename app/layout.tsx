import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { PreferencesProvider } from "@/components/preferences";
import { Navigation, Footer } from "@/components/shell";
import { StudioEffects } from "@/components/effects";
import "./globals.css";
import "./themes.css";
import { themeBoot } from "@/lib/theme";
const space = localFont({
  src: "../public/fonts/SpaceGrotesk.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});
const manrope = localFont({
  src: "../public/fonts/Manrope.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
});
export const metadata: Metadata = {
  title: {
    default: `${site.name} • Orbital Engineering Studio`,
    template: `%s • ${site.name}`,
  },
  description: site.description,
  ...(site.canonical
    ? { metadataBase: new URL(site.canonical), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    title: `${site.name} / ${site.title}`,
    description: site.description,
    type: "website",
    images: [{ url: site.socialImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [site.socialImage],
    title: `${site.name} / ${site.title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${space.variable} ${manrope.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <PreferencesProvider>
          <Navigation />
          <StudioEffects />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </PreferencesProvider>
      </body>
    </html>
  );
}
