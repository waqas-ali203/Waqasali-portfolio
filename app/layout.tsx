import './globals.css';
import '../css/imports.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeConfig from '@/lib/ThemeConfig';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import NavigationMenu from '@/components/NavigationMenu';
import Background from '@/components/Background';
import Canvas from '@/components/canvas';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://waqasthedev.com'),
  title: {
    default: "Waqas Ali | Software Engineer | Full Stack Developer",
    template: "%s | Waqas Ali | Software Engineer"
  },
  description: "Expert Full Stack Developer creating innovative web solutions with cutting-edge MERN stack technologies. Transform your digital vision into reality.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "MERN Stack",
    "Web Development",
    "React",
    "Node.js",
    "Next.js",
    "JavaScript",
    "TypeScript"
  ],
  authors: [{ name: "Waqas Ali" }],
  creator: "Waqas Ali",
  publisher: "Waqas Ali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waqasthedev.com',
    title: "Waqas Ali | Software Engineer",
    description: "Full Stack Developer crafting innovative web solutions",
    siteName: "Waqas Ali Portfolio",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Waqas Ali | Software Engineer",
    description: "Full Stack Developer | Innovative Web Solutions",
    images: ['/twitter-image.jpg']
  }, verification: {
    google: 'gbkf_s8PmKqJTnD6BwRo2q4lwtWelCbVgqBfanbv3oc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <ThemeConfig>
          <Background />
          {/* Full-page layout */}
          <div id="root" className="flex flex-col min-h-screen">
            {/* Header with some height */}
            <header className="flex-none h-16 lg:h-20 ">
              <Header />
            </header>

            {/* Main content area */}
            <main className="flex-1 flex items-center justify-center px-2 sm:px-4 lg:px-16">
              {children}
            </main>
            <span className="hidden lg:block">
              <NavigationMenu />
            </span>
            {/* Footer with some height */}
            <footer className="flex-none h-16 lg:h-20 ">
              <Footer />
            </footer>
          </div>
          <Canvas />
          <Analytics />
        </ThemeConfig>
      </body>
    </html>
  );
}