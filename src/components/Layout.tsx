import { Shield } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Navigate, PageId } from '../types/navigation';

interface LayoutProps {
  activePage: PageId;
  title: string;
  subtitle: string;
  navigate: Navigate;
  children: React.ReactNode;
}

export function Layout({ activePage, title, subtitle, navigate, children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-void-900/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="grid size-10 place-items-center rounded-lg border border-ember-400/35 bg-ember-500/15"
            aria-label="Ir a inicio"
          >
            <Shield size={22} className="text-forge-200" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-200">
              RageQuit
            </p>
            <h1 className="truncate text-lg font-black text-zinc-50">{title}</h1>
            <p className="truncate text-xs text-zinc-400">{subtitle}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4 md:pb-28">{children}</main>
      <BottomNav activePage={activePage} navigate={navigate} />
    </div>
  );
}
