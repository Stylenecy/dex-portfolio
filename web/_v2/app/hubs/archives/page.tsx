import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archives',
  description: 'Gaming achievements, photography, creative work, and personal media vault.',
};

export default function ArchivesPage() {
  return (
    <div id="hub-archives" className="hub" data-hub="archives" role="region" aria-label="Archives hub">
      <header className="hub__header">
        <span className="hub__label">ARCHIVES</span>
        <h2 className="hub__title">Media Vault</h2>
        <p className="hub__desc">
          Gaming achievements, photography, creative work, and personal records.
          The other side of the Operator.
        </p>
      </header>

      <div className="glass-card glass-noise" style={{ padding: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
        <span className="hub__label hub__label--xs">// STATUS</span>
        <h4 style={{ marginTop: 'var(--space-3)', color: 'var(--hub-accent)' }}>Gallery loading...</h4>
        <p className="card-desc" style={{ marginTop: 'var(--space-2)' }}>
          Media vault incoming — F1.4. Images being compressed before deployment.
        </p>
      </div>
    </div>
  );
}
