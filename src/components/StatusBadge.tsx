import { cn } from '../utils/classNames';

export type StatusVariant =
  | 'active'
  | 'trial'
  | 'casual'
  | 'bench'
  | 'dead'
  | 'progress'
  | 'not-started'
  | 'main'
  | 'alt'
  | 'high'
  | 'medium';

const statusClasses: Record<StatusVariant, string> = {
  active: 'border-emerald-300/40 bg-emerald-500/15 text-emerald-100',
  trial: 'border-amber-300/40 bg-amber-500/15 text-amber-100',
  casual: 'border-indigo-300/40 bg-indigo-500/15 text-indigo-100',
  bench: 'border-zinc-300/25 bg-zinc-500/15 text-zinc-200',
  dead: 'border-emerald-300/40 bg-emerald-500/15 text-emerald-100',
  progress: 'border-ember-300/50 bg-ember-500/15 text-ember-50',
  'not-started': 'border-zinc-300/25 bg-zinc-500/10 text-zinc-300',
  main: 'border-forge-200/50 bg-forge-400/15 text-forge-200',
  alt: 'border-violet-300/35 bg-violet-500/15 text-violet-100',
  high: 'border-rose-300/45 bg-rose-500/15 text-rose-100',
  medium: 'border-forge-200/45 bg-forge-400/15 text-forge-200',
};

export function StatusBadge({ label, variant }: { label: string; variant: StatusVariant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold',
        statusClasses[variant],
      )}
    >
      {label}
    </span>
  );
}
