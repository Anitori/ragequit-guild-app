import type { ImportantLink } from '../types/links';

// TODO: Actualizar URLs reales de Discord, Warcraft Logs, Raider.IO y Google Sheets.
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
    title: 'Warcraft Logs',
    description: 'Logs de kills, wipes y revisiones',
    url: 'https://www.warcraftlogs.com/',
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
    description: 'Roster editable y asistencia',
    url: 'https://docs.google.com/spreadsheets/',
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
