import type { RaidProgress } from '../types/progress';

// TODO: Leer progress desde Raider.IO o Blizzard API y enriquecer kills con Warcraft Logs.
export const raidProgress: RaidProgress = {
  raidName: 'Manaforge Omega',
  schedule: 'Martes y miercoles',
  nextRaid: 'Miercoles 21:30 ST',
  currentBoss: 'Boss 3',
  lastKill: 'Boss 2',
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
      logUrl: 'https://www.warcraftlogs.com/',
    },
    {
      id: 'boss-2',
      name: 'Boss 2',
      status: 'Muerto',
      difficulty: 'Mythic',
      killDate: '2026-05-06',
      logUrl: 'https://www.warcraftlogs.com/',
    },
    {
      id: 'boss-3',
      name: 'Boss 3',
      status: 'En progreso',
      difficulty: 'Mythic',
      bestTry: '34%',
      logUrl: 'https://www.warcraftlogs.com/',
    },
    { id: 'boss-4', name: 'Boss 4', status: 'No intentado' },
    { id: 'boss-5', name: 'Boss 5', status: 'No intentado' },
    { id: 'boss-6', name: 'Boss 6', status: 'No intentado' },
    { id: 'boss-7', name: 'Boss 7', status: 'No intentado' },
    { id: 'boss-8', name: 'Boss 8', status: 'No intentado' },
  ],
};
