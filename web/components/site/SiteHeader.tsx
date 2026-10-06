'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/#work', label: 'Work', match: (p: string) => p.startsWith('/work') },
  { href: '/record', label: 'Record', match: (p: string) => p.startsWith('/record') },
  { href: '/about', label: 'About', match: (p: string) => p.startsWith('/about') },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="hdr">
      <div className="shell hdr__in">
        <Link href="/" className="hdr__mark" aria-label="Dex Bennett — home">
          <span className="hdr__dot" aria-hidden="true" />
          Dex Bennett <b>/ Stylenecy</b>
        </Link>
        <nav className="hdr__nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hdr__link"
              aria-current={item.match(pathname) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
