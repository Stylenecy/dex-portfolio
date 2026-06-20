import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { operatorStats } from '@/data/stats';

export const metadata: Metadata = {
  title: 'Operator Metrics',
  description: 'Stats, profile, and performance metrics for Dex Bennett — the Operator.',
};

export default function OperatorMetricsPage() {
  return (
    <div id="hub-operator-metrics" className="hub" data-hub="operator-metrics" role="region" aria-label="Operator Metrics hub">
      <header className="hub__header">
        <span className="hub__label">OPERATOR_METRICS</span>
        <h2 className="hub__title">Operator Profile</h2>
        <p className="hub__desc">
          Raw system data on the operator behind the dashboard.
          Stats, physical parameters, and phase evolution log.
        </p>
      </header>

      {/* Power Banner */}
      <div className="power-banner reveal">
        <div className="power-banner__left">
          <span className="power-banner__label">// OVERALL ASSESSMENT</span>
          <h3 className="power-banner__title">System Power Level</h3>
          <p className="power-banner__desc">
            Aggregate score across strength, speed, potential, intelligence, and endurance.
            Currently in active reforging — trajectory is upward.
          </p>
        </div>
        <div className="power-banner__score-wrap">
          <div className="power-banner__score" aria-label={`Power score: ${profile.power.score}`}>
            {profile.power.score}
          </div>
          <span className="power-banner__score-label">/ {profile.power.maxScore} pts</span>
          <span className="power-banner__rank-chip">Rank {profile.power.rank}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid mt-md">

        {/* RPG Stat Block — Questism */}
        <div className="metrics-cell metrics-cell--stat-block reveal">
          <div className="status-window questism-style-v3">
            <div className="quest-grid-bg" aria-hidden="true" />
            <div className="quest-content">
              <div className="quest-header-v3">
                <div className="header-name-box">
                  <span className="label-tiny">SYSTEM USER</span>
                  <span className="name-text-v3">{profile.name}</span>
                </div>
                <div className="header-stats-box">
                  <div className="p-row">HEIGHT: {profile.physical.height.toUpperCase()}</div>
                  <div className="p-row">WEIGHT: {profile.physical.weight.toUpperCase()}</div>
                </div>
              </div>

              <div className="quest-stats-v3" role="list" aria-label="Operator stats">
                {operatorStats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`stat-row-v3${stat.awakened ? ' awakened-mode' : ''}`}
                    role="listitem"
                  >
                    <div className="label-box">{stat.label}</div>
                    <div
                      className={`rank-box rank-${stat.rank.toLowerCase().replace('-', '')}`}
                      aria-label={`Rank ${stat.rank}`}
                    >
                      {stat.rank.includes('-')
                        ? <>{stat.rank[0]}<span className="sub-rank">-</span></>
                        : stat.rank
                      }
                    </div>
                    <div
                      className="bar-box"
                      aria-label={`${stat.filled} out of ${stat.max}${stat.awakened ? ' — Awakened' : ''}`}
                      role="meter"
                      aria-valuenow={stat.filled}
                      aria-valuemax={stat.max}
                    >
                      {Array.from({ length: stat.max }, (_, i) => (
                        <div
                          key={i}
                          className={`q-block${i < stat.filled ? ` ${stat.color} active` : ''}`}
                        />
                      ))}
                      {stat.awakened && (
                        <div className="awakened-overlay" aria-hidden="true">
                          <span className="glitch-text" data-text="AWAKENED (覚醒)">AWAKENED (覚醒)</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="stat-total">
                <span className="stat-total__label">Total Power</span>
                <span className="stat-total__value">{profile.power.score}</span>
                <span className="stat-total__rank">Rank {profile.power.rank}</span>
              </div>

              <div className="stat-block-footer">
                <span className="stat-block-footer__id">{profile.systemId}</span>
                <span className="stat-block-footer__phase">REFORGING_PHASE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operator Bio Panel */}
        <div className="metrics-cell metrics-cell--bio reveal reveal-delay-1">
          <div className="metrics-cell__header">
            <div className="metrics-cell__title-group">
              <div className="metrics-cell__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <div className="metrics-cell__title">Operator Profile</div>
                <div className="metrics-cell__subtitle">Identity Data</div>
              </div>
            </div>
            <span className="metrics-cell__badge">Active</span>
          </div>
          <div className="metrics-bio">
            <div className="metrics-bio__top">
              <div className="metrics-bio__avatar">
                <img src="/images/profile-dex.webp" alt="Dex Bennett profile photo" loading="lazy" />
              </div>
              <div className="metrics-bio__identity">
                <div className="metrics-bio__name">{profile.name}</div>
                <div className="metrics-bio__handle">{profile.alias}</div>
                <div className="metrics-bio__affiliation">{profile.affiliation}</div>
              </div>
            </div>
            <div className="physical-table" role="table" aria-label="Physical parameters">
              {Object.entries({
                Origin: profile.physical.origin,
                Height: profile.physical.height,
                Weight: profile.physical.weight,
                Sport: profile.physical.sports,
                Phase: 'Reforging',
              }).map(([label, value]) => (
                <div key={label} className="physical-row" role="row">
                  <span className="physical-row__label" role="rowheader">{label}</span>
                  <span
                    className={`physical-row__value${label === 'Height' || label === 'Phase' ? ' highlight' : label === 'Origin' || label === 'Sport' ? ' neutral' : ''}`}
                    role="cell"
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="metrics-bio__id">
              <span className="metrics-bio__id-code">{profile.systemId}</span>
              <span className="metrics-bio__phase-tag">RUNTIME_PROCESS</span>
            </div>
          </div>
        </div>

        {/* Physical Endurance Panel */}
        <div className="metrics-cell metrics-cell--physical reveal">
          <div className="metrics-cell__header">
            <div className="metrics-cell__title-group">
              <div className="metrics-cell__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <div className="metrics-cell__title">Physical Endurance</div>
                <div className="metrics-cell__subtitle">Activity Tracking</div>
              </div>
            </div>
          </div>
          <div className="metrics-divider">
            <span className="metrics-divider__label">// Active Disciplines</span>
            <div className="metrics-divider__line" aria-hidden="true" />
          </div>
          <div className="endurance-grid">
            {[
              { name: 'Badminton', pct: 85, intensity: 'high' },
              { name: 'Table Tennis', pct: 72, intensity: 'mid' },
            ].map((sport) => (
              <div key={sport.name} className="endurance-card">
                <div className="endurance-ring" aria-label={`${sport.name}: ${sport.pct}% activity level`}>
                  <svg viewBox="0 0 60 60" aria-hidden="true">
                    <circle className="endurance-ring__track" cx="30" cy="30" r="24" />
                    <circle
                      className={`endurance-ring__progress intensity-${sport.intensity}`}
                      cx="30" cy="30" r="24"
                      style={{ strokeDashoffset: `calc(175.9 * (1 - ${sport.pct / 100}))` }}
                    />
                  </svg>
                  <div className="endurance-ring__label">
                    <span className="endurance-ring__percent">{sport.pct}</span>
                    <span className="endurance-ring__unit">%</span>
                  </div>
                </div>
                <span className="endurance-card__name">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
