import type { Metadata } from 'next';
import { skillModules } from '@/data/skills';
import { deployedModules } from '@/data/deployedModules';
import { missions } from '@/data/missions';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'System Core',
  description: 'Technical arsenal — deployed systems, active prototypes, and engineering capabilities.',
};

export default function SystemCorePage() {
  return (
    <div id="hub-system-core" className="hub" data-hub="system-core" role="region" aria-label="System Core hub">
      <header className="hub__header">
        <span className="hub__label">SYSTEM_CORE</span>
        <h2 className="hub__title">Technical Arsenal</h2>
        <p className="hub__desc">
          Deployed systems, active prototypes, and core engineering capabilities.
          Every entry here is built with intent — not just written, but architected.
        </p>
      </header>

      {/* Live Status Strip */}
      <div className="system-core__live-strip" aria-label="Quick stats">
        <div className="system-core__live-stat">
          <span className="dot" aria-hidden="true" />
          <span>Projects: <strong>{profile.stats.projects}</strong></span>
        </div>
        <div className="system-core__live-divider" aria-hidden="true" />
        <div className="system-core__live-stat">
          <span>Stack: <strong>Fullstack</strong></span>
        </div>
        <div className="system-core__live-divider" aria-hidden="true" />
        <div className="system-core__live-stat">
          <span>Phase: <strong>Reforging</strong></span>
        </div>
        <div className="system-core__live-divider" aria-hidden="true" />
        <div className="system-core__live-stat">
          <span>Status: <strong>Building</strong></span>
        </div>
      </div>

      {/* ── Deployed Modules (5 live apps) ── */}
      <section aria-labelledby="deployed-heading" className="mt-xl">
        <div className="hub__header hub__header--compact">
          <span className="hub__label hub__label--xs">LIVE DEPLOYMENTS</span>
          <h3 id="deployed-heading" className="hub__title hub__title--lg">Deployed Modules</h3>
        </div>
        <div className="arsenal-grid">
          {deployedModules.map((mod) => (
            <a
              key={mod.id}
              href={mod.url}
              target="_blank"
              rel="noopener noreferrer"
              className="arsenal-card arsenal-card--deployed reveal"
              aria-label={`${mod.name} — ${mod.highlight ?? mod.desc.slice(0, 60)}`}
            >
              {mod.highlight && (
                <span className="hub__label hub__label--xs" style={{ marginBottom: 'var(--space-2)' }}>
                  {mod.highlight}
                </span>
              )}
              <h4 className="arsenal-card-title">{mod.name}</h4>
              <p className="card-desc">{mod.desc}</p>
              <div className="tech-stack">
                {mod.tags.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <span className="arsenal-card__live-badge">● LIVE</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section aria-labelledby="capabilities-heading" className="mt-xl">
        <div className="hub__header hub__header--compact">
          <span className="hub__label hub__label--xs">SYSTEM CAPABILITIES</span>
          <h3 id="capabilities-heading" className="hub__title hub__title--lg">Module Registry</h3>
        </div>
        <div className="arsenal-grid">
          {skillModules.map((mod, i) => (
            <div key={mod.id} className={`arsenal-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <h4 className="arsenal-card-title">{mod.title}</h4>
              <p className="card-desc">{mod.desc}</p>
              <div className="tech-stack">
                {mod.tags.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission Log ── */}
      <section aria-labelledby="mission-log-heading" className="mt-xl">
        <div className="hub__header hub__header--relaxed">
          <span className="hub__label hub__label--xs">DEPLOYED & CONCEPTUAL SYSTEMS</span>
          <h3 id="mission-log-heading" className="hub__title hub__title--lg">Mission Log</h3>
        </div>
        <div className="mission-container">
          {missions.map((m, i) => (
            <article key={m.id} className={`mission-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="mission-visual">
                {m.image && (
                  <img
                    src={m.image}
                    className="mission-visual-img"
                    alt={`${m.name} preview`}
                    loading="lazy"
                  />
                )}
                <div className={`visual-placeholder gradient-${i + 1}`} aria-hidden="true" />
              </div>
              <div className="mission-content">
                <span className={`mission-status ${m.status}`}>• {m.statusLabel}</span>
                <h4>{m.name}</h4>
                <p>{m.desc}</p>
                <div className="tech-stack-mini">
                  {m.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                {m.links && m.links.length > 0 && (
                  <div className="mission-links">
                    {m.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={link.variant === 'text' ? 'link-text' : 'btn-outline'}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Signal Frequencies (Contact) ── */}
      <section className="contact-section mt-xl" aria-labelledby="contact-heading">
        <div className="contact-card reveal">
          <div className="signal-indicator" role="status">
            <span className="blink" aria-hidden="true">●</span>
            SIGNAL ACTIVE
          </div>
          <h3 id="contact-heading" className="contact-title">Signal Frequencies</h3>
          <p className="contact-desc">
            Open channel for collaboration, project discussions, or a casual chat about system design and creative tech.
          </p>
          <a href={`mailto:${profile.email}`} className="contact-cta">
            Send Transmission
          </a>
          <div className="frequency-list" role="list" aria-label="Contact frequencies">
            {[
              { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
              { name: 'LinkedIn', value: 'dex-bennett', href: profile.linkedin, external: true },
              { name: 'GitHub', value: '@Stylenecy', href: profile.github, external: true },
              { name: 'Instagram', value: '@dex.bennett', href: profile.instagram, external: true },
              { name: 'YouTube', value: 'Dex Bennett', href: profile.youtube, external: true },
            ].map((freq) => (
              <div key={freq.name} className="frequency-row" role="listitem">
                <div className="frequency-row__label">
                  <span className="frequency-row__name">{freq.name}</span>
                  <span className="frequency-row__value">{freq.value}</span>
                </div>
                <a
                  href={freq.href}
                  target={freq.external ? '_blank' : undefined}
                  rel={freq.external ? 'noopener noreferrer' : undefined}
                  className="frequency-row__action"
                  aria-label={`Open ${freq.name}`}
                >→</a>
              </div>
            ))}
          </div>
        </div>
        <footer className="system-footer reveal reveal-delay-2">
          <p>Dex Bennett © 2026 — Reforging Phase.</p>
          <p className="footer-sub">System built with intent.</p>
        </footer>
      </section>
    </div>
  );
}
