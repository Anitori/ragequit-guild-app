import type { CharacterKind, PlayerStatus, Role, RosterMember, WowClass } from '../types/roster';

const SPREADSHEET_ID = '1OUjSr5QwAuPJ9NMTbxH7etOj9-_SJFQxEpVVMLyeYXA';
const RAW_DATA_GID = '1533083597';

export const googleRosterCsvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${RAW_DATA_GID}`;

export interface RosterLoadResult {
  members: RosterMember[];
  refreshedAt?: string;
  sourceUrl: string;
}

export const roster: RosterMember[] = [
  {
    id: 'luminara',
    characterName: 'Luminara',
    className: 'Paladin',
    spec: 'Holy',
    role: 'Healer',
    itemLevel: 675,
    status: 'Activo',
    characterKind: 'Main',
    discordName: 'lumi',
    note: 'Raid lead healers',
  },
  {
    id: 'thorgar',
    characterName: 'Thorgar',
    className: 'Warrior',
    spec: 'Protection',
    role: 'Tank',
    itemLevel: 672,
    status: 'Activo',
    characterKind: 'Main',
    discordName: 'thorgar',
  },
  {
    id: 'nyxaria',
    characterName: 'Nyxaria',
    className: 'Warlock',
    spec: 'Demonology',
    role: 'DPS',
    itemLevel: 670,
    status: 'Activo',
    characterKind: 'Main',
    discordName: 'nyx',
  },
  {
    id: 'kaelthorn',
    characterName: 'Kaelthorn',
    className: 'Mage',
    spec: 'Fire',
    role: 'DPS',
    itemLevel: 668,
    status: 'Trial',
    characterKind: 'Main',
    note: 'Buen attendance de prueba',
  },
  {
    id: 'brumak',
    characterName: 'Brumak',
    className: 'Death Knight',
    spec: 'Blood',
    role: 'Tank',
    itemLevel: 671,
    status: 'Activo',
    characterKind: 'Main',
  },
  {
    id: 'eluneth',
    characterName: 'Eluneth',
    className: 'Priest',
    spec: 'Discipline',
    role: 'Healer',
    itemLevel: 669,
    status: 'Activo',
    characterKind: 'Main',
  },
  {
    id: 'zarnok',
    characterName: 'Zarnok',
    className: 'Shaman',
    spec: 'Enhancement',
    role: 'DPS',
    itemLevel: 666,
    status: 'Banco',
    characterKind: 'Main',
    note: 'Disponible para rotacion',
  },
  {
    id: 'veloria',
    characterName: 'Veloria',
    className: 'Druid',
    spec: 'Restoration',
    role: 'Healer',
    itemLevel: 667,
    status: 'Casual',
    characterKind: 'Alt',
  },
];

const classNames = new Set<WowClass>([
  'Death Knight',
  'Demon Hunter',
  'Druid',
  'Evoker',
  'Hunter',
  'Mage',
  'Monk',
  'Paladin',
  'Priest',
  'Rogue',
  'Shaman',
  'Warlock',
  'Warrior',
]);

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (character === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
    } else if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalizeClass(value: string): WowClass | null {
  const normalized = value.trim() as WowClass;
  return classNames.has(normalized) ? normalized : null;
}

function mapRole(sourceRole: string): Role {
  if (sourceRole === 'Tank') {
    return 'Tank';
  }

  if (sourceRole === 'Heal') {
    return 'Healer';
  }

  return 'DPS';
}

function mapSpec(sourceRole: string, role: Role) {
  if (sourceRole === 'Ranged') {
    return 'Ranged DPS';
  }

  if (sourceRole === 'Melee') {
    return 'Melee DPS';
  }

  if (sourceRole === 'Heal') {
    return 'Healer';
  }

  return role;
}

function mapStatus(rank: string): PlayerStatus {
  const normalized = rank.trim().toLowerCase();

  if (normalized === 'trial') {
    return 'Trial';
  }

  if (normalized === 'banca' || normalized === 'banco' || normalized === 'bench') {
    return 'Banco';
  }

  if (normalized === 'social' || normalized === 'casual') {
    return 'Casual';
  }

  return 'Activo';
}

function mapCharacterKind(rank: string): CharacterKind {
  return rank.trim().toLowerCase() === 'alt' ? 'Alt' : 'Main';
}

function makeId(name: string, realm: string) {
  return `${name}-${realm}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatRealm(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(' ');
}

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseWowAuditRosterCsv(csv: string): RosterLoadResult {
  const rows = parseCsv(csv);
  const metadata = rows[0] ?? [];
  const refreshedAt = metadata[9] || metadata[0] || undefined;

  const members = rows
    .slice(1)
    .map((row): RosterMember | null => {
      const characterName = row[0]?.trim();
      const className = normalizeClass(row[1] ?? '');
      const itemLevel = parseNumber(row[3] ?? '');

      if (!characterName || !className || itemLevel === undefined) {
        return null;
      }

      const realm = formatRealm(row[114] || row[2] || '');
      const sourceRole = row[92]?.trim() || 'DPS';
      const sourceRank = row[129]?.trim() || 'Main';
      const role = mapRole(sourceRole);
      const mythicPlusScore = parseNumber(row[158] ?? '');

      return {
        id: makeId(characterName, realm),
        characterName,
        className,
        spec: mapSpec(sourceRole, role),
        role,
        itemLevel,
        status: mapStatus(sourceRank),
        characterKind: mapCharacterKind(sourceRank),
        realm,
        sourceRole,
        sourceRank,
        mythicPlusScore,
        note: [realm, sourceRank, mythicPlusScore ? `M+ ${mythicPlusScore}` : undefined]
          .filter(Boolean)
          .join(' · '),
      } satisfies RosterMember;
    })
    .filter((member): member is RosterMember => member !== null)
    .sort((a, b) => b.itemLevel - a.itemLevel || a.characterName.localeCompare(b.characterName));

  return {
    members,
    refreshedAt,
    sourceUrl: googleRosterCsvUrl,
  };
}

export async function loadRosterFromGoogleSheet(): Promise<RosterLoadResult> {
  const response = await fetch(googleRosterCsvUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Google Sheets respondio ${response.status}`);
  }

  return parseWowAuditRosterCsv(await response.text());
}
