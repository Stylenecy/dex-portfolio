import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import Motion from '@/components/site/Motion';
import MotionHint from '@/components/site/MotionHint';
import { MOTION_KEY, INTRO_KEY } from '@/components/site/motionPref';
import { profile } from '@/data/profile';

/* Self-hosted through next/font: no third-party request, no render-blocking
   stylesheet, no layout shift from a late font swap. */
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const TITLE = 'Dex Bennett — creative technologist, Yogyakarta';
const DESCRIPTION =
  'Dex Bennett designs systems, builds them, and pitches them. Track winner at the Mantle Turing Test Hackathon, 2nd at the BMC #12 international final, 1st at a national business plan competition — with case studies, sources, and what is still unfinished.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dex-portfolio.vercel.app'),
  title: { default: TITLE, template: '%s — Dex Bennett' },
  description: DESCRIPTION,
  keywords: [
    'Dex Bennett',
    'Stylenecy',
    'creative technologist',
    'Information Systems',
    'UKDW',
    'Yogyakarta',
    'Next.js',
    'Supabase',
    'Web3',
    'BNB Chain',
    'hackathon',
    'Sowan',
    'LEAP 2036',
  ],
  authors: [{ name: 'Dex Bennett', url: 'https://dex-portfolio.vercel.app' }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    locale: 'en_US',
    siteName: 'Dex Bennett',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c0d0d',
  colorScheme: 'dark',
};

/* Runs before first paint. Decides html[data-motion] ("on"/"off") from the
   visitor's Motion button, else from prefers-reduced-motion; flags the hint
   chip when the OS asks for reduced motion and nobody has chosen yet (Dex's
   own Windows does exactly that — BAD-03); and arms the intro once per
   session on the home page. Must stay tiny and dependency-free. */
const PREPAINT = `(function(){try{var d=document.documentElement,m=localStorage.getItem('${MOTION_KEY}'),s=matchMedia('(prefers-reduced-motion: reduce)').matches,off=m==='on'?false:(m==='off'?true:s);d.setAttribute('data-motion',off?'off':'on');if(s&&!m)d.setAttribute('data-motion-hint','1');if(!off&&location.pathname==='/'&&!sessionStorage.getItem('${INTRO_KEY}')){d.setAttribute('data-intro','1');setTimeout(function(){d.removeAttribute('data-intro')},2600);for(var i=1;i<8;i++){var l=document.createElement('link');l.rel='preload';l.as='image';l.href='/images/intro/f'+i+'.webp';document.head.appendChild(l);}}}catch(e){}})();`;

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.alias,
  url: 'https://dex-portfolio.vercel.app',
  image: 'https://dex-portfolio.vercel.app/images/dex/dex-cutout-720.webp',
  jobTitle: 'Information Systems student and creative technologist',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Universitas Kristen Duta Wacana' },
  address: { '@type': 'PostalAddress', addressLocality: 'Yogyakarta', addressCountry: 'ID' },
  sameAs: [profile.linkedin, profile.github, profile.instagram, profile.tiktok, profile.youtube],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREPAINT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip">Skip to content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <MotionHint />
        <Motion />
      </body>
    </html>
  );
}
