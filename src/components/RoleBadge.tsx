import type { Role } from '../types/roster';
import { cn } from '../utils/classNames';

const roleClasses: Record<Role, string> = {
  Tank: 'border-sky-300/40 bg-sky-500/15 text-sky-100',
  Healer: 'border-emerald-300/40 bg-emerald-500/15 text-emerald-100',
  DPS: 'border-ember-400/45 bg-ember-500/15 text-ember-50',
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-14 items-center justify-center rounded-md border px-2 py-1 text-xs font-semibold',
        roleClasses[role],
      )}
    >
      {role}
    </span>
  );
}
