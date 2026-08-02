import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import Reveal from '@/components/site/Reveal';

/* Self-hosted through next/font: no third-party request, no render-blocking
   stylesheet, no layout shift from a late font swap. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const DESCRIPTION =
  'Dex Bennett builds software that ends up in the hands of people software usually skips — elderly mentors, church volunteers, high-school students. Case studies with the decisions, the numbers, and what is still unfinished.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dex-portfolio.vercel.app'),
  title: {
    default: 'Dex Bennett — builds software people actually use',
    template: '%s — Dex Bennett',
  },
  description: DESCRIPTION,
  keywords: [
    'Dex Bennett',
    'Information Systems',
    'UKDW',
    'Yogyakarta',
    'Next.js',
    'Supabase',
    'accessibility',
    'Sowan',
    'LEAP 2036',
  ],
  authors: [{ name: 'Dex Bennett' }],
  openGraph: {
    title: 'Dex Bennett — builds software people actually use',
    description: DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    siteName: 'Dex Bennett',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip">Skip to content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
