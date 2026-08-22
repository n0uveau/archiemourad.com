import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";

const firaCode = localFont({
  src: "./fonts/FiraCode-VF.woff2",
  variable: "--font-fira-code",
  weight: "300 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
});

const description =
  "Archie Mourad — graphics and systems programming in C++ and Rust.";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Archie Mourad",
  url: "https://www.archiemourad.com",
  sameAs: [
    "https://github.com/n0uveau",
    "https://www.linkedin.com/in/archiemourad",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.archiemourad.com"),
  title: {
    default: "Archie Mourad",
    template: "%s — Archie Mourad",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Archie Mourad",
    description,
    url: "https://www.archiemourad.com",
    siteName: "Archie Mourad",
    type: "profile",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
