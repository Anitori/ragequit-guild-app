import { useEffect, useMemo, useState } from 'react';
import { Layout } from './components/Layout';
import { Admin } from './pages/Admin';
import { Dashboard } from './pages/Dashboard';
import { Links } from './pages/Links';
import { More } from './pages/More';
import { Progress } from './pages/Progress';
import { Recruitment } from './pages/Recruitment';
import { Roster } from './pages/Roster';
import { Strategies } from './pages/Strategies';
import type { PageId } from './types/navigation';

const pageCopy: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Guild App', subtitle: 'Dashboard de raid y avisos' },
  roster: { title: 'Roster', subtitle: 'Jugadores, roles y estado' },
  progress: { title: 'Progress', subtitle: 'Raid actual y bosses' },
  links: { title: 'Links', subtitle: 'Accesos rapidos de la guild' },
  more: { title: 'Mas', subtitle: 'Estrategias, recruitment y officers' },
  strategies: { title: 'Estrategias', subtitle: 'Notas por boss y rol' },
  recruitment: { title: 'Recruitment', subtitle: 'Necesidades actuales' },
  admin: { title: 'Admin', subtitle: 'Panel de officers' },
};

const validPages = Object.keys(pageCopy) as PageId[];

function pageFromHash(): PageId {
  const value = window.location.hash.replace('#', '') as PageId;
  return validPages.includes(value) ? value : 'dashboard';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => pageFromHash());

  useEffect(() => {
    const handleHashChange = () => setActivePage(pageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageId) => {
    setActivePage(page);
    window.history.replaceState(null, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const page = useMemo(() => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'roster':
        return <Roster />;
      case 'progress':
        return <Progress />;
      case 'links':
        return <Links />;
      case 'strategies':
        return <Strategies />;
      case 'recruitment':
        return <Recruitment />;
      case 'admin':
        return <Admin />;
      case 'more':
      default:
        return <More navigate={navigate} />;
    }
  }, [activePage]);

  return (
    <Layout
      activePage={activePage}
      navigate={navigate}
      title={pageCopy[activePage].title}
      subtitle={pageCopy[activePage].subtitle}
    >
      {page}
    </Layout>
  );
}
