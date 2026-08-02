'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DOCK_ITEMS = [
  {
    hub: 'operator-metrics',
    href: '/operator-metrics',
    tooltip: 'Operator',
    ariaLabel: 'Operator Metrics — Stats & Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    hub: 'system-core',
    href: '/system-core',
    tooltip: 'System Core',
    ariaLabel: 'System Core — Technical Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    hub: 'operations',
    href: '/operations',
    tooltip: 'Operations',
    ariaLabel: 'Operations — Leadership & Events',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    hub: 'archives',
    href: '/archives',
    tooltip: 'Archives',
    ariaLabel: 'Archives — Gaming & Photography',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
];

export default function Dock() {
  const pathname = usePathname();

  return (
    <nav className="dock-container" aria-label="Hub Navigation Dock">
      <div className="dock" role="list">
        {DOCK_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.hub}
              className={`dock-item${isActive ? ' active' : ''}`}
              data-hub={item.hub}
              href={item.href}
              role="listitem"
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon}
              <span className="tooltip">{item.tooltip}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
