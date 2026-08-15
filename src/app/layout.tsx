import type { Metadata, Viewport } from "next";
import { Syne, Outfit, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubhmanfitnessarena.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shubhman Fitness Arena — Become More.",
    template: "%s | Shubhman Fitness Arena",
  },
  description:
    "Premium performance training. Discipline, strength, recovery, and community. Train with purpose at Shubhman Fitness Arena.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shubhman Fitness Arena — Become More.",
    description:
      "Premium performance training. Discipline, strength, recovery, and community.",
    type: "website",
    locale: "en_US",
    siteName: "Shubhman Fitness Arena",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhman Fitness Arena — Become More.",
    description:
      "Premium performance training. Discipline, strength, recovery, and community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <JsonLd />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppProviders>
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
