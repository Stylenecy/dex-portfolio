import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Design-system fonts, self-hosted via next/font (no render-block, no FOUT). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dex-portfolio.vercel.app"),
  title: {
    default: "Dex Bennett // System OS",
    template: "%s — Dex Bennett // System OS",
  },
  description:
    "The Operator — a System OS dashboard portfolio by Dex Bennett (Style). Creative Technologist building systems that don't just function, but feel alive.",
  keywords: [
    "Dex Bennett",
    "Stylenecy",
    "Creative Technologist",
    "Fullstack Developer",
    "Sowan.id",
    "Portfolio",
    "UKDW",
  ],
  authors: [{ name: "Dex Bennett" }],
  openGraph: {
    title: "Dex Bennett // System OS",
    description:
      "The Operator — a System OS dashboard portfolio. Systems that don't just function, but feel alive.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
