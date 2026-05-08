export type Difficulty = 'Normal' | 'Heroic' | 'Mythic';

export type BossStatus = 'Muerto' | 'En progreso' | 'No intentado';

export interface DifficultyProgress {
  difficulty: Difficulty;
  killed: number;
  total: number;
}

export interface BossProgress {
  id: string;
  name: string;
  status: BossStatus;
  difficulty?: Difficulty;
  bestTry?: string;
  killDate?: string;
  logUrl?: string;
}

export interface RaidProgress {
  raidName: string;
  schedule: string;
  nextRaid: string;
  currentBoss: string;
  lastKill: string;
  warcraftLogsProgressUrl?: string;
  warcraftLogsOverviewUrl?: string;
  progress: DifficultyProgress[];
  bosses: BossProgress[];
  notices: string[];
}
