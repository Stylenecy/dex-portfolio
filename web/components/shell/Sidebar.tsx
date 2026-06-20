'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';

const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 460;
const SIDEBAR_COLLAPSED = 64; /* matches --sidebar-min-width used by .sidebar--collapsed */
const SIDEBAR_DEFAULT = 268;

const NAV_ITEMS = [
  {
    hub: 'operator-metrics',
    href: '/operator-metrics',
    label: 'Operator Metrics',
    ariaLabel: 'Operator Metrics hub',
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
    label: 'System Core',
    ariaLabel: 'System Core hub',
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
    label: 'Operations',
    ariaLabel: 'Operations hub',
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
    label: 'Archives',
    ariaLabel: 'Archives hub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef<number>(SIDEBAR_DEFAULT);

  const setWidth = (w: number) =>
    document.documentElement.style.setProperty('--sidebar-width', `${w}px`);

  // Drag-to-resize the sidebar by its right-edge handle.
  const startResize = useCallback((e: React.MouseEvent) => {
    if (collapsed) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW =
      document.documentElement.style.getPropertyValue('--sidebar-width')
        ? parseInt(document.documentElement.style.getPropertyValue('--sidebar-width'), 10)
        : SIDEBAR_DEFAULT;
    handleRef.current?.classList.add('sidebar__resize-handle--active');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';

    const onMove = (ev: MouseEvent) => {
      const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startW + (ev.clientX - startX)));
      setWidth(next);
      prevWidthRef.current = next;
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      handleRef.current?.classList.remove('sidebar__resize-handle--active');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [collapsed]);

  const toggleCollapse = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      if (next) setWidth(SIDEBAR_COLLAPSED);
      else setWidth(prevWidthRef.current || SIDEBAR_DEFAULT);
      return next;
    });
  }, []);

  // Close lightbox on Escape.
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <aside
      className={`dashboard__sidebar glass--frosted${collapsed ? ' sidebar--collapsed' : ''}`}
      role="complementary"
      aria-label="Operator Profile"
    >
      <div
        className="sidebar__resize-handle"
        onMouseDown={startResize}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
      />

      <button
        className={`sidebar__collapse-btn${collapsed ? ' sidebar__collapse-btn--collapsed' : ''}`}
        onClick={toggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16} aria-hidden="true">
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </button>

      <div className="sidebar__brand">
        <span className="sidebar__brand-tag">// SYS_OS v2.0</span>
        <h1 className="sidebar__brand-title">
          Dex <span>&quot;Style&quot;</span> Bennett
        </h1>
        <p className="sidebar__brand-sub">Reforging Phase — Active</p>
      </div>

      <div className="sidebar__avatar-wrap">
        <div
          className="sidebar__avatar-frame"
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxOpen(true); } }}
          role="button"
          tabIndex={0}
          aria-label="Expand operator profile photo"
        >
          <Image
            src="/images/profile-dex.webp"
            alt="Dex Bennett — Operator Profile Photo"
            width={120}
            height={120}
            priority
          />
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </div>
      </div>

      <div className="sidebar__identity">
        <p className="sidebar__name">Dex Bennett</p>
        <p className="sidebar__role">Aspiring Fullstack &amp; System Thinker</p>
        <div className="sidebar__meta">
          <div className="sidebar__meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Indonesia — FTI UKDW
          </div>
          <div className="sidebar__meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Information Systems
          </div>
        </div>
      </div>

      <div className="sidebar__divider" role="separator" />

      <div className="sidebar__status" role="status" aria-label="System status: online">
        <span className="sidebar__status-dot" aria-hidden="true" />
        <span className="sidebar__status-label">Signal Active</span>
      </div>

      <nav className="sidebar__nav" aria-label="Hub Navigation">
        <span className="sidebar__nav-label">// Navigation</span>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.hub}
              className={`sidebar__nav-item${isActive ? ' active' : ''}`}
              data-hub={item.hub}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.ariaLabel}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__divider" role="separator" />

      <div className="sidebar__phase">
        <span className="sidebar__phase-label">// Current Phase</span>
        <div
          className="sidebar__phase-track"
          role="progressbar"
          aria-label="Phase 2 of 3: Reforging Architecture"
        >
          <div className="sidebar__phase-node done">
            <div className="sidebar__phase-dot" />
            <span className="sidebar__phase-node-name">Init</span>
          </div>
          <div className="sidebar__phase-line done" aria-hidden="true" />
          <div className="sidebar__phase-node current">
            <div className="sidebar__phase-dot" />
            <span className="sidebar__phase-node-name">Reforge</span>
          </div>
          <div className="sidebar__phase-line" aria-hidden="true" />
          <div className="sidebar__phase-node locked">
            <div className="sidebar__phase-dot" />
            <span className="sidebar__phase-node-name">Deploy</span>
          </div>
        </div>
      </div>

      <div className="sidebar__stats" role="list" aria-label="System stats">
        <div className="sidebar__stat-row" role="listitem">
          <span className="sidebar__stat-label">Projects</span>
          <span className="sidebar__stat-value">05</span>
        </div>
        <div className="sidebar__stat-row" role="listitem">
          <span className="sidebar__stat-label">Roles Held</span>
          <span className="sidebar__stat-value">08+</span>
        </div>
        <div className="sidebar__stat-row" role="listitem">
          <span className="sidebar__stat-label">Phase</span>
          <span className="sidebar__stat-value">2 / 3</span>
        </div>
      </div>

      <div className="sidebar__divider" role="separator" />

      <div className="sidebar__socials" role="list" aria-label="Social links">
        <a
          className="sidebar__social-link"
          href="mailto:dex.bennett28@gmail.com"
          aria-label="Send email to Dex Bennett"
          role="listitem"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
        <a
          className="sidebar__social-link"
          href="https://www.linkedin.com/in/dex-bennett-313b40293/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          role="listitem"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          className="sidebar__social-link"
          href="https://github.com/Stylenecy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          role="listitem"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>

      <div className="sidebar__signature">
        <span className="sidebar__sig-id">ID: DEX-2026-SYS</span>
        <span className="sidebar__sig-id">UKDW / FTI / INFO</span>
        <span className="sidebar__sig-id">BUILD: 2.0.0-reforge</span>
      </div>

      {/* Profile photo lightbox — opens on avatar click */}
      <div
        className={`photo-lightbox${lightboxOpen ? ' is-open' : ''}`}
        onClick={() => setLightboxOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Operator profile photo"
        aria-hidden={!lightboxOpen}
      >
        <div className="photo-lightbox__frame" onClick={(e) => e.stopPropagation()}>
          <span className="photo-lightbox__corner photo-lightbox__corner--tl" />
          <span className="photo-lightbox__corner photo-lightbox__corner--tr" />
          <span className="photo-lightbox__corner photo-lightbox__corner--bl" />
          <span className="photo-lightbox__corner photo-lightbox__corner--br" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="photo-lightbox__img"
            src="/images/profile-dex.webp"
            alt="Dex Bennett — Operator Profile Photo, enlarged"
          />
          <button
            className="photo-lightbox__close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18} aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="photo-lightbox__label">
            <div className="photo-lightbox__label-name">Dex Bennett</div>
            <div className="photo-lightbox__label-role">Creative Technologist</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
