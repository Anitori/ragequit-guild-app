import type { RaidProgress } from '../types/progress';

export const warcraftLogsGuildOverviewUrl = 'https://www.warcraftlogs.com/guild/id/702025';
export const warcraftLogsGuildProgressUrl =
  'https://www.warcraftlogs.com/guild/progress/702025?zone=46';
export const progressJsonUrl = `${import.meta.env.BASE_URL}data/progress.json`;

// TODO: Leer progress desde Warcraft Logs API/GraphQL con backend u OAuth, no desde scraping client-side.
export const raidProgress: RaidProgress = {
  raidName: 'Manaforge Omega',
  schedule: 'Martes y miercoles',
  nextRaid: 'Miercoles 21:30 ST',
  currentBoss: 'Boss 3',
  lastKill: 'Boss 2',
  warcraftLogsProgressUrl: warcraftLogsGuildProgressUrl,
  warcraftLogsOverviewUrl: warcraftLogsGuildOverviewUrl,
  progress: [
    { difficulty: 'Normal', killed: 8, total: 8 },
    { difficulty: 'Heroic', killed: 7, total: 8 },
    { difficulty: 'Mythic', killed: 2, total: 8 },
  ],
  notices: [
    'Confirmar asistencia antes del raid',
    'Traer consumibles',
    'Revisar estrategia del boss actual',
    'Actualizar personaje en el roster si cambio ilvl/spec',
  ],
  bosses: [
    {
      id: 'boss-1',
      name: 'Boss 1',
      status: 'Muerto',
      difficulty: 'Mythic',
      killDate: '2026-05-01',
      logUrl: warcraftLogsGuildProgressUrl,
    },
    {
      id: 'boss-2',
      name: 'Boss 2',
      status: 'Muerto',
      difficulty: 'Mythic',
      killDate: '2026-05-06',
      logUrl: warcraftLogsGuildProgressUrl,
    },
    {
      id: 'boss-3',
      name: 'Boss 3',
      status: 'En progreso',
      difficulty: 'Mythic',
      bestTry: '34%',
      logUrl: warcraftLogsGuildProgressUrl,
    },
    { id: 'boss-4', name: 'Boss 4', status: 'No intentado' },
    { id: 'boss-5', name: 'Boss 5', status: 'No intentado' },
    { id: 'boss-6', name: 'Boss 6', status: 'No intentado' },
    { id: 'boss-7', name: 'Boss 7', status: 'No intentado' },
    { id: 'boss-8', name: 'Boss 8', status: 'No intentado' },
  ],
  generatedAt: new Date(0).toISOString(),
  source: 'local',
  sourceNote: 'Fallback local incluido en la app.',
};

export async function loadRaidProgress(): Promise<RaidProgress> {
  const response = await fetch(progressJsonUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Progress JSON respondio ${response.status}`);
  }

  return {
    ...raidProgress,
    ...(await response.json()),
  };
}
