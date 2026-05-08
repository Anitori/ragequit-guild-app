import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { RoleBadge } from '../components/RoleBadge';
import { StatusBadge, type StatusVariant } from '../components/StatusBadge';
import { loadRosterFromGoogleSheet, roster } from '../data/roster';
import type { PlayerStatus, Role, RosterMember, WowClass } from '../types/roster';
import { cn } from '../utils/classNames';

type FilterValue<T extends string> = 'Todos' | T;

const rosterCacheKey = 'ragequit:last-good-roster';

const roleOptions: Array<FilterValue<Role>> = ['Todos', 'Tank', 'Healer', 'DPS'];
const statusOptions: Array<FilterValue<PlayerStatus>> = [
  'Todos',
  'Activo',
  'Trial',
  'Casual',
  'Banco',
];

const statusVariant: Record<PlayerStatus, StatusVariant> = {
  Activo: 'active',
  Trial: 'trial',
  Casual: 'casual',
  Banco: 'bench',
};

const classText: Record<WowClass, string> = {
  'Death Knight': 'text-rose-200',
  'Demon Hunter': 'text-fuchsia-200',
  Druid: 'text-orange-200',
  Evoker: 'text-emerald-200',
  Hunter: 'text-lime-200',
  Mage: 'text-cyan-200',
  Monk: 'text-emerald-100',
  Paladin: 'text-pink-200',
  Priest: 'text-zinc-100',
  Rogue: 'text-yellow-200',
  Shaman: 'text-blue-200',
  Warlock: 'text-violet-200',
  Warrior: 'text-amber-200',
};

function RosterCard({ member }: { member: RosterMember }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black">{member.characterName}</h3>
          <p className={cn('mt-1 text-sm font-semibold', classText[member.className])}>
            {member.className} - {member.spec}
          </p>
        </div>
        <RoleBadge role={member.role} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-black/20 p-2">
          <p className="text-xs text-zinc-500">Ilvl</p>
          <p className="font-bold">{member.itemLevel}</p>
        </div>
        <div className="rounded-lg bg-black/20 p-2">
          <p className="text-xs text-zinc-500">Tipo</p>
          <StatusBadge
            label={member.characterKind}
            variant={member.characterKind === 'Main' ? 'main' : 'alt'}
          />
        </div>
        <div className="rounded-lg bg-black/20 p-2">
          <p className="text-xs text-zinc-500">Estado</p>
          <StatusBadge label={member.status} variant={statusVariant[member.status]} />
        </div>
      </div>
      {(member.discordName || member.note) && (
        <div className="mt-3 space-y-1 text-sm text-zinc-400">
          {member.discordName && <p>Discord: {member.discordName}</p>}
          {member.note && <p>{member.note}</p>}
        </div>
      )}
    </Card>
  );
}

export function Roster() {
  const [members, setMembers] = useState<RosterMember[]>(roster);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sourceLabel, setSourceLabel] = useState('Datos locales');
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<FilterValue<Role>>('Todos');
  const [className, setClassName] = useState<FilterValue<WowClass>>('Todos');
  const [status, setStatus] = useState<FilterValue<PlayerStatus>>('Todos');

  useEffect(() => {
    let isMounted = true;

    const cached = window.localStorage.getItem(rosterCacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as {
          members: RosterMember[];
          refreshedAt?: string;
        };
        if (Array.isArray(parsed.members) && parsed.members.length > 0) {
          setMembers(parsed.members);
          setRefreshedAt(parsed.refreshedAt ?? null);
          setSourceLabel('Cache local');
        }
      } catch {
        window.localStorage.removeItem(rosterCacheKey);
      }
    }

    loadRosterFromGoogleSheet()
      .then((result) => {
        if (!isMounted) {
          return;
        }

        if (result.members.length === 0) {
          throw new Error('El Sheet no devolvio miembros validos');
        }

        setMembers(result.members);
        setRefreshedAt(result.refreshedAt ?? null);
        setSourceLabel('Google Sheets');
        setLoadError(null);
        window.localStorage.setItem(
          rosterCacheKey,
          JSON.stringify({ members: result.members, refreshedAt: result.refreshedAt }),
        );
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setLoadError(error instanceof Error ? error.message : 'No se pudo cargar Google Sheets');
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const classOptions = useMemo(
    () => ['Todos', ...Array.from(new Set(members.map((member) => member.className))).sort()] as Array<
      FilterValue<WowClass>
    >,
    [members],
  );

  const filteredRoster = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        member.characterName.toLowerCase().includes(normalizedQuery) ||
        member.discordName?.toLowerCase().includes(normalizedQuery) ||
        member.realm?.toLowerCase().includes(normalizedQuery);
      const matchesRole = role === 'Todos' || member.role === role;
      const matchesClass = className === 'Todos' || member.className === className;
      const matchesStatus = status === 'Todos' || member.status === status;

      return matchesQuery && matchesRole && matchesClass && matchesStatus;
    });
  }, [className, members, query, role, status]);

  return (
    <div className="space-y-4">
      <Card>
        <label className="block text-sm font-semibold text-zinc-300" htmlFor="roster-search">
          Buscar personaje
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3">
          <Search size={18} className="text-zinc-500" />
          <input
            id="roster-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nombre o Discord"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as FilterValue<Role>)}
            className="h-11 rounded-lg border border-white/10 bg-void-800 px-3 text-sm outline-none"
            aria-label="Filtrar por rol"
          >
            {roleOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={className}
            onChange={(event) => setClassName(event.target.value as FilterValue<WowClass>)}
            className="h-11 rounded-lg border border-white/10 bg-void-800 px-3 text-sm outline-none"
            aria-label="Filtrar por clase"
          >
            {classOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as FilterValue<PlayerStatus>)}
            className="h-11 rounded-lg border border-white/10 bg-void-800 px-3 text-sm outline-none"
            aria-label="Filtrar por estado"
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <StatusBadge label={sourceLabel} variant={loadError ? 'trial' : 'active'} />
          {isLoading && <span>Cargando roster actualizado...</span>}
          {!isLoading && refreshedAt && <span>Actualizado: {refreshedAt}</span>}
          {!isLoading && loadError && <span>Fallback activo: {loadError}</span>}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {filteredRoster.length} de {members.length} jugadores
        </p>
      </div>

      <div className="grid gap-3 md:hidden">
        {filteredRoster.map((member) => (
          <RosterCard key={member.id} member={member} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-white/10 md:block">
        <table className="w-full table-fixed border-collapse bg-white/[0.035] text-left text-sm">
          <thead className="bg-black/25 text-xs uppercase tracking-[0.12em] text-zinc-400">
            <tr>
              <th className="px-4 py-3">Personaje</th>
              <th className="px-4 py-3">Clase</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Ilvl</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Tipo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredRoster.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3">
                  <p className="font-bold">{member.characterName}</p>
                  {member.discordName && <p className="text-xs text-zinc-500">{member.discordName}</p>}
                </td>
                <td className="px-4 py-3">
                  <p className={cn('font-semibold', classText[member.className])}>{member.className}</p>
                  <p className="text-xs text-zinc-500">{member.spec}</p>
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={member.role} />
                </td>
                <td className="px-4 py-3 font-bold">{member.itemLevel}</td>
                <td className="px-4 py-3">
                  <StatusBadge label={member.status} variant={statusVariant[member.status]} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge
                    label={member.characterKind}
                    variant={member.characterKind === 'Main' ? 'main' : 'alt'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRoster.length === 0 && (
        <Card>
          <p className="text-sm text-zinc-400">No hay jugadores que coincidan con los filtros.</p>
        </Card>
      )}
    </div>
  );
}
