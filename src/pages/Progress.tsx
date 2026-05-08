import { ExternalLink, FileBarChart, Skull, Target, Trophy } from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge, type StatusVariant } from '../components/StatusBadge';
import { raidProgress } from '../data/progress';
import type { BossProgress, BossStatus } from '../types/progress';

const bossStatusVariant: Record<BossStatus, StatusVariant> = {
  Muerto: 'dead',
  'En progreso': 'progress',
  'No intentado': 'not-started',
};

function BossCard({ boss }: { boss: BossProgress }) {
  const Icon = boss.status === 'Muerto' ? Trophy : boss.status === 'En progreso' ? Target : Skull;

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20">
            <Icon size={20} className="text-forge-200" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black">{boss.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{boss.difficulty ?? 'Mythic pendiente'}</p>
          </div>
        </div>
        <StatusBadge label={boss.status} variant={bossStatusVariant[boss.status]} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-black/20 p-3">
          <p className="text-xs text-zinc-500">Mejor try</p>
          <p className="mt-1 font-bold">{boss.bestTry ?? '-'}</p>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <p className="text-xs text-zinc-500">Kill</p>
          <p className="mt-1 font-bold">{boss.killDate ?? '-'}</p>
        </div>
      </div>

      {boss.logUrl && (
        <a
          href={boss.logUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forge-200"
        >
          Ver log <ExternalLink size={15} />
        </a>
      )}
    </Card>
  );
}

export function Progress() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20">
            <FileBarChart size={20} className="text-forge-200" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-200">
              Raid actual
            </p>
            <h2 className="mt-1 text-2xl font-black">{raidProgress.raidName}</h2>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          Ultimo kill: <span className="font-semibold text-zinc-200">{raidProgress.lastKill}</span> | Progress:{' '}
          <span className="font-semibold text-zinc-200">{raidProgress.currentBoss}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {raidProgress.warcraftLogsProgressUrl && (
            <a
              href={raidProgress.warcraftLogsProgressUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ember-400/35 bg-ember-500/15 px-3 py-2 text-sm font-semibold text-forge-200"
            >
              WCL Progress <ExternalLink size={14} />
            </a>
          )}
          {raidProgress.warcraftLogsOverviewUrl && (
            <a
              href={raidProgress.warcraftLogsOverviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-200"
            >
              Guild Overview <ExternalLink size={14} />
            </a>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {raidProgress.progress.map((item) => (
          <Card key={item.difficulty} className="p-3 text-center">
            <p className="text-xs text-zinc-400">{item.difficulty}</p>
            <p className="mt-1 text-xl font-black">
              {item.killed}/{item.total}
            </p>
          </Card>
        ))}
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {raidProgress.bosses.map((boss) => (
          <BossCard key={boss.id} boss={boss} />
        ))}
      </section>
    </div>
  );
}
