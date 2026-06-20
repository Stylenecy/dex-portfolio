import Sidebar from '@/components/shell/Sidebar';
import Dock from '@/components/shell/Dock';
import AskTheOperator from '@/components/console/AskTheOperator';
import RevealObserver from '@/components/shell/RevealObserver';
import TiltLayer from '@/components/fx/TiltLayer';
import PageTransition from '@/components/fx/PageTransition';

export default function HubsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="dashboard">
        <Sidebar />
        <main className="dashboard__center" id="main-content" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <Dock />
      <AskTheOperator />
      <RevealObserver />
      <TiltLayer />
    </>
  );
}
