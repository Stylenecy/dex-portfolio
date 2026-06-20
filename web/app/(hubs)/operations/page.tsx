import type { Metadata } from 'next';
import { commandRoles } from '@/data/roles';
import { operationLogs } from '@/data/operations';
import { arenaRecords } from '@/data/arena';
import { timelineEntries } from '@/data/timeline';

export const metadata: Metadata = {
  title: 'Operations',
  description: 'Command deployments, leadership roles, certifications, and field operations.',
};

const featuredRole = commandRoles.find((r) => r.featured);
const nonFeaturedRoles = commandRoles.filter((r) => !r.featured);

const arenaResultColors: Record<string, string> = {
  champion:     '#fbbf24',
  finalist:     '#c084fc',
  semifinalist: '#c084fc',
  competitor:   'var(--text-muted)',
};

export default function OperationsPage() {
  return (
    <div id="hub-operations" className="hub" data-hub="operations" role="region" aria-label="Operations hub">
      <header className="hub__header">
        <span className="hub__label">OPERATIONS</span>
        <h2 className="hub__title">Operations Log</h2>
        <p className="hub__desc">
          Leadership executed, organizations built, communities moved forward.
          Every certificate is a clearance earned, every role a system deployed beyond the screen.
        </p>
      </header>

      {/* Impact Metrics Row */}
      <div className="ops-metrics-row" role="list" aria-label="Impact statistics">
        {[
          { number: '50+', label: 'Students Reached', sub: 'across 3 forum series' },
          { number: '9',    label: 'Command Clearances', sub: 'leadership roles held' },
          { number: '18+',  label: 'Operations Completed', sub: 'events & certifications' },
          { number: '9+',   label: 'Organizations', sub: 'Sowan.id · Synapse Labs · Peran Gendis · PPB · BPMFTI' },
        ].map((m, i) => (
          <div key={m.label} className={`ops-metric-tile reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} role="listitem">
            <div className="ops-metric-tile__number">
              {m.number.replace(/\D/g, '')}<span className="ops-metric-tile__suffix">{m.number.replace(/\d/g, '')}</span>
            </div>
            <div className="ops-metric-tile__label">{m.label}</div>
            <div className="ops-metric-tile__sub">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Featured Role */}
      {featuredRole && (
        <div className="ops-role-card reveal mt-lg" data-tilt>
          <span className="tilt-sheen" aria-hidden />
          <span className="ops-role-card__sys-label">// CURRENT DEPLOYMENT</span>
          <h3 className="ops-role-card__title">{featuredRole.title}</h3>
          <div className="ops-role-card__org">{featuredRole.org}</div>
          <p className="ops-role-card__desc">{featuredRole.featuredDesc}</p>
          <span className="ops-role-card__period">{featuredRole.period}</span>
          <div className="ops-role-card__actions">
            <span className="role-badge role-badge--chairman">Chairman</span>
            <span className="org-tag org-tag--bordered">KFC Tournament</span>
          </div>
        </div>
      )}

      {/* Command Deployments */}
      <div className="ops-section-label">
        <span className="ops-section-label__prefix">// COMMAND DEPLOYMENTS</span>
        <div className="ops-section-label__line" aria-hidden="true" />
      </div>
      <div className="ops-cert-grid">
        {nonFeaturedRoles.map((role, i) => (
          <div key={role.id} className={`ops-cert-card reveal${i > 0 ? ` reveal-delay-${i % 5}` : ''}`} data-tilt>
            <span className="tilt-sheen" aria-hidden />
            <div className={`ops-cert-card__thumb${!role.certImage ? ' ops-cert-card__thumb--placeholder' : ''}`}>
              {role.certImage
                ? <img src={role.certImage} alt={`${role.title} certificate`} loading="lazy" />
                : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              }
            </div>
            <span className="ops-cert-card__badge ops-cert-card__badge--command">Command</span>
            <div className="ops-cert-card__body">
              <h4 className="ops-cert-card__name">{role.title}</h4>
              <span className="ops-cert-card__org">{role.org}</span>
            </div>
            <div className="ops-cert-card__footer">
              <span
                className="ops-cert-card__year"
                style={role.status === 'active' ? { color: '#64d2ff' } : undefined}
              >
                {role.period ?? (role.status === 'certified' ? 'CERTIFIED' : role.status.toUpperCase())}
              </span>
              {role.certPdf && (
                <a href={role.certPdf} target="_blank" rel="noopener noreferrer" className="ops-cert-card__view">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  View
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Operations Logs */}
      <div className="ops-section-label">
        <span className="ops-section-label__prefix">// OPERATIONS LOGS</span>
        <div className="ops-section-label__line" aria-hidden="true" />
      </div>
      <div className="ops-cert-grid">
        {operationLogs.map((op, i) => (
          <div key={op.id} className={`ops-cert-card reveal${i > 0 ? ` reveal-delay-${i % 5}` : ''}`} data-tilt>
            <span className="tilt-sheen" aria-hidden />
            <div className={`ops-cert-card__thumb${!op.certImage ? ' ops-cert-card__thumb--placeholder' : ''}`}>
              {op.certImage
                ? <img src={op.certImage} alt={`${op.name} certificate`} loading="lazy" />
                : <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              }
            </div>
            <span className="ops-cert-card__badge ops-cert-card__badge--operations">Operations</span>
            <div className="ops-cert-card__body">
              <h4 className="ops-cert-card__name">{op.name}</h4>
              <span className="ops-cert-card__org">{op.org}</span>
            </div>
            <div className="ops-cert-card__footer">
              <span className="ops-cert-card__year">{op.role}{op.year ? ` · ${op.year}` : ''}</span>
              {op.certPdf && (
                <a href={op.certPdf} target="_blank" rel="noopener noreferrer" className="ops-cert-card__view">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  View
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arena Records */}
      <div className="ops-section-label">
        <span className="ops-section-label__prefix">// ARENA RECORDS</span>
        <div className="ops-section-label__line" aria-hidden="true" />
      </div>
      <div className="ops-cert-grid">
        {arenaRecords.map((rec, i) => (
          <div key={rec.id} className={`ops-cert-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} data-tilt>
            <span className="tilt-sheen" aria-hidden />
            <div className={`ops-cert-card__thumb${!rec.certImage ? ' ops-cert-card__thumb--placeholder' : ''}`}>
              {rec.certImage
                ? <img src={rec.certImage} alt={`${rec.name} certificate`} loading="lazy" />
                : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 6 9 6 9z" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 18 9 18 9z" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
              }
            </div>
            <span className="ops-cert-card__badge ops-cert-card__badge--arena">Arena</span>
            <div className="ops-cert-card__body">
              <h4 className="ops-cert-card__name">{rec.name}</h4>
              <span className="ops-cert-card__org">{rec.org}</span>
            </div>
            <div className="ops-cert-card__footer">
              <span className="ops-cert-card__year" style={{ color: arenaResultColors[rec.result] }}>
                {rec.resultLabel}
              </span>
              {rec.certPdf && (
                <a href={rec.certPdf} target="_blank" rel="noopener noreferrer" className="ops-cert-card__view">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  View
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Execution Log Timeline */}
      <section aria-labelledby="timeline-heading" className="mt-xl">
        <div className="hub__header hub__header--relaxed">
          <span className="hub__label hub__label--xs">SYSTEM HISTORY</span>
          <h3 id="timeline-heading" className="hub__title hub__title--lg">Execution Logs</h3>
        </div>
        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true" />
          {timelineEntries.map((entry, i) => (
            <div key={entry.id} className={`timeline-item reveal${i > 0 ? ` reveal-delay-${i % 3}` : ''}`}>
              <div className="timeline-dot-wrap">
                <div className={`timeline-dot ${entry.status}`} aria-label={entry.status} />
              </div>
              <div className="timeline-date">{entry.year}</div>
              <div className="timeline-content">
                <h4>{entry.title}</h4>
                <span className={`log-tag log-tag--${entry.tag}`}>{entry.tagLabel}</span>
                <p>{entry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
