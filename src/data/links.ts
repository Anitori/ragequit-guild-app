import type { ImportantLink } from '../types/links';
import { googleRosterCsvUrl } from './roster';
import { warcraftLogsGuildOverviewUrl, warcraftLogsGuildProgressUrl } from './progress';

const googleRosterSheetUrl =
  'https://docs.google.com/spreadsheets/d/1OUjSr5QwAuPJ9NMTbxH7etOj9-_SJFQxEpVVMLyeYXA/edit?gid=997148295#gid=997148295';

// TODO: Actualizar URLs reales de Discord, Raider.IO, calendario y apply cuando esten definidos.
export const importantLinks: ImportantLink[] = [
  {
    id: 'discord',
    title: 'Discord',
    description: 'Canales de raid, anuncios y voz',
    url: 'https://discord.gg/ragequit',
    category: 'Comunidad',
  },
  {
    id: 'logs',
    title: 'Warcraft Logs Overview',
    description: 'Overview publico de la guild',
    url: warcraftLogsGuildOverviewUrl,
    category: 'Raid',
  },
  {
    id: 'wcl-progress',
    title: 'Warcraft Logs Progress',
    description: 'Progress oficial de la raid actual',
    url: warcraftLogsGuildProgressUrl,
    category: 'Raid',
  },
  {
    id: 'raiderio',
    title: 'Raider.IO',
    description: 'Perfil de la guild y progress',
    url: 'https://raider.io/',
    category: 'Raid',
  },
  {
    id: 'sheet',
    title: 'Google Sheet del roster',
    description: 'Roster actualizado desde WoW Audit',
    url: googleRosterSheetUrl,
    category: 'Raid',
  },
  {
    id: 'sheet-csv',
    title: 'Roster CSV',
    description: 'Fuente publica usada por la app',
    url: googleRosterCsvUrl,
    category: 'Raid',
  },
  {
    id: 'weakauras',
    title: 'WeakAuras',
    description: 'Auras requeridas para raid',
    url: 'https://wago.io/',
    category: 'Herramientas',
  },
  {
    id: 'raidbots',
    title: 'Raidbots',
    description: 'Sims, upgrades y droptimizer',
    url: 'https://www.raidbots.com/',
    category: 'Herramientas',
  },
  {
    id: 'wowhead',
    title: 'Wowhead',
    description: 'Guias, spells y drops',
    url: 'https://www.wowhead.com/',
    category: 'Herramientas',
  },
  {
    id: 'calendar',
    title: 'Calendario',
    description: 'Eventos y horarios de raid',
    url: 'https://calendar.google.com/',
    category: 'Comunidad',
  },
  {
    id: 'apply',
    title: 'Formulario de apply',
    description: 'Postularse para entrar a RageQuit',
    url: 'https://forms.gle/',
    category: 'Apply',
  },
];
