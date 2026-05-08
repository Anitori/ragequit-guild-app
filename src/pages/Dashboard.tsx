import {
  CalendarDays,
  ClipboardList,
  ExternalLink,
  Flame,
  ScrollText,
  ShieldAlert,
  Swords,
  Users,
} from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { importantLinks } from '../data/links';
import { raidProgress } from '../data/progress';
import type { Navigate } from '../types/navigation';

const appIconUrl = `${import.meta.env.BASE_URL}icons/icon.svg`;

const quickActions = [
  { label: 'Discord', page: null, linkId: 'discord', icon: ExternalLink },
  { label: 'Roster', page: 'roster', linkId: null, icon: Users },
  { label: 'Logs', page: null, linkId: 'logs', icon: ClipboardList },
  { label: 'Estrategias', page: 'strategies', linkId: null, icon: ScrollText },
] as const;

export function Dashboard({ navigate }: { navigate: Navigate }) {
  const mythicProgress = raidProgress.progress.find((item) => item.difficulty === 'Mythic');
  const progressText = raidProgress.progress
    .map((item) => `${item.difficulty} ${item.killed}/${item.total}`)
    .join(' | ');

  const getLink = (id: string) => importantLinks.find((link) => link.id === id)?.url ?? '#';

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-lg border border-ember-400/25 bg-void-850 shadow-ember">
        <div className="relative min-h-44 p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,101,22,0.26),transparent_34%),linear-gradient(135deg,rgba(85,19,13,0.88),rgba(8,7,6,0.96)_58%,rgba(48,35,31,0.94))]" />
          <div className="absolute right-5 top-5 hidden size-24 rounded-full border border-forge-200/25 bg-black/20 md:block" />
          <div className="relative flex items-start gap-4">
            <img
              src={appIconUrl}
              alt=""
              className="size-16 rounded-lg border border-forge-200/30 bg-black/20 p-2"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forge-200">
                RageQuit
              </p>
              <h2 className="mt-1 text-3xl font-black text-zinc-50">RageQuit</h2>
              <p className="mt-2 text-sm text-zinc-300">Panel central de la guild</p>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-zinc-400">Proximo raid</p>
              <p className="mt-1 font-bold text-zinc-50">{raidProgress.nextRaid}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-zinc-400">Horario</p>
              <p className="mt-1 font-bold text-zinc-50">{raidProgress.schedule}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <Swords className="text-ember-400" size={22} />
            <div>
              <p className="text-xs text-zinc-400">Raid actual</p>
              <p className="font-bold">{raidProgress.raidName}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Flame className="text-forge-200" size={22} />
            <div>
              <p className="text-xs text-zinc-400">Progress</p>
              <p className="font-bold">Mythic {mythicProgress?.killed ?? 0}/{mythicProgress?.total ?? 0}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-rose-300" size={22} />
            <div>
              <p className="text-xs text-zinc-400">Boss actual</p>
              <p className="font-bold">{raidProgress.currentBoss}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-200">
              Estado de raid
            </p>
            <h3 className="mt-1 text-xl font-black">Progress actual</h3>
          </div>
          <StatusBadge label={raidProgress.lastKill} variant="dead" />
        </div>
        <p className="mt-3 text-sm text-zinc-300">{progressText}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {raidProgress.progress.map((item) => (
            <div key={item.difficulty} className="rounded-lg bg-black/20 p-3 text-center">
              <p className="text-xs text-zinc-400">{item.difficulty}</p>
              <p className="mt-1 text-lg font-black text-zinc-50">
                {item.killed}/{item.total}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays size={18} className="text-forge-200" />
          <h3 className="font-bold">Avisos importantes</h3>
        </div>
        <ul className="space-y-2">
          {raidProgress.notices.map((notice) => (
            <li key={notice} className="flex gap-2 text-sm text-zinc-300">
              <span className="mt-2 size-1.5 rounded-full bg-ember-400" />
              <span>{notice}</span>
            </li>
          ))}
        </ul>
        {/* TODO: Reemplazar avisos locales por Discord webhook o panel de officers. */}
      </Card>

      <section>
        <h3 className="mb-3 font-bold">Accesos rapidos</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <Icon size={20} className="text-forge-200" />
                <span className="font-bold">{action.label}</span>
              </>
            );

            if (action.page) {
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => navigate(action.page)}
                  className="flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 text-left transition hover:border-ember-400/50"
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={action.label}
                href={getLink(action.linkId)}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-ember-400/50"
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
