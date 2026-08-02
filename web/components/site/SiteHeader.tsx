'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/record', label: 'Record' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' || pathname.startsWith('/work') : pathname.startsWith(href);

  return (
    <header className="hdr">
      <div className="shell hdr__in">
        <Link href="/" className="hdr__mark">
          <span className="hdr__dot" aria-hidden="true" />
          Dex&nbsp;Bennett
        </Link>
        <nav className="hdr__nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hdr__link"
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
