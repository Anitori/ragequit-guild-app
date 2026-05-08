import { ChevronRight, ScrollText, Settings, UserPlus } from 'lucide-react';
import { Card } from '../components/Card';
import type { Navigate, PageId } from '../types/navigation';

const moreItems: Array<{
  page: PageId;
  title: string;
  description: string;
  icon: typeof ScrollText;
}> = [
  {
    page: 'strategies',
    title: 'Estrategias',
    description: 'Notas por boss, rol, WeakAuras y logs',
    icon: ScrollText,
  },
  {
    page: 'recruitment',
    title: 'Recruitment',
    description: 'Roles y clases que busca la guild',
    icon: UserPlus,
  },
  {
    page: 'admin',
    title: 'Admin',
    description: 'Placeholder para officers',
    icon: Settings,
  },
];

export function More({ navigate }: { navigate: Navigate }) {
  return (
    <div className="grid gap-3">
      {moreItems.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.page} type="button" onClick={() => navigate(item.page)} className="text-left">
            <Card interactive>
              <div className="flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20">
                  <Icon size={20} className="text-forge-200" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-black">{item.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                </div>
                <ChevronRight size={18} className="text-zinc-500" />
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
