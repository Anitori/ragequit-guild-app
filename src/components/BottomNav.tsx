import { Home, Link2, Menu, Trophy, Users } from 'lucide-react';
import type { PageId, Navigate } from '../types/navigation';
import { cn } from '../utils/classNames';

const navItems: Array<{
  id: PageId;
  label: string;
  icon: typeof Home;
}> = [
  { id: 'dashboard', label: 'Inicio', icon: Home },
  { id: 'roster', label: 'Roster', icon: Users },
  { id: 'progress', label: 'Progress', icon: Trophy },
  { id: 'links', label: 'Links', icon: Link2 },
  { id: 'more', label: 'Mas', icon: Menu },
];

const morePages: PageId[] = ['more', 'strategies', 'recruitment', 'admin'];

export function BottomNav({ activePage, navigate }: { activePage: PageId; navigate: Navigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-void-900/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activePage === item.id || (item.id === 'more' && morePages.includes(activePage));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={cn(
                'flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold text-zinc-400 transition',
                isActive && 'bg-ember-500/15 text-ember-50 ring-1 ring-ember-400/35',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
