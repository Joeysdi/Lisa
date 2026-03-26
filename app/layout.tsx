import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lisa Modeling Protection | AI Likeness Defense",
  description:
    "AI-powered platform protecting models, creators, and public figures from deepfakes, unauthorized use, and likeness theft. Real-time scanning, automated DMCA, and Dark Web monitoring.",
  keywords: [
    "likeness protection", "deepfake detection", "DMCA", "model protection",
    "AI content detection", "voice cloning protection", "digital rights",
  ],
  openGraph: {
    title: "Lisa Modeling Protection",
    description: "Your image, your rules. AI-powered protection from deepfakes and unauthorized use.",
    url: "https://www.lotiai.com",
    siteName: "Lisa Modeling Protection",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisa Modeling Protection",
    description: "Your image, your rules. AI-powered protection from deepfakes and unauthorized use.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
