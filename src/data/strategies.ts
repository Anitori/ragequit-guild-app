export interface BossStrategy {
  id: string;
  bossName: string;
  summary: string;
  tankNotes: string[];
  healerNotes: string[];
  dpsNotes: string[];
  weakAuraUrl?: string;
  videoUrl?: string;
  referenceLogUrl?: string;
}

// TODO: Migrar estas estrategias a una fuente editable por officers.
export const strategies: BossStrategy[] = [
  {
    id: 'boss-1',
    bossName: 'Boss 1',
    summary: 'Pelea de control: swaps limpios, interrupciones y defensivos en cada descarga.',
    tankNotes: ['Swap a 2 stacks.', 'Mover el boss fuera de zonas activas.', 'Guardar defensivo para Frenesi.'],
    healerNotes: ['Cooldown de raid en Descarga 2 y 4.', 'Pre-hot antes de cada soak.', 'Dispelear solo objetivos marcados.'],
    dpsNotes: ['Cortar casteos asignados.', 'Priorizar adds antes del boss.', 'No romper CC temprano.'],
    weakAuraUrl: 'https://wago.io/',
    videoUrl: 'https://www.youtube.com/',
    referenceLogUrl: 'https://www.warcraftlogs.com/',
  },
  {
    id: 'boss-2',
    bossName: 'Boss 2',
    summary: 'DPS check con ventanas de burst y posicionamiento estricto en marcas.',
    tankNotes: ['Mantener el boss centrado.', 'Separar adds grandes del grupo.', 'Taunt inmediato tras Golpe pesado.'],
    healerNotes: ['Rotar CDs en marcas dobles.', 'Priorizar jugadores con debuff persistente.', 'Mana conserve hasta fase final.'],
    dpsNotes: ['Burst en vulnerabilidad.', 'Usar defensivos personales en marcas.', 'Ranged separado por 6 yd.'],
    weakAuraUrl: 'https://wago.io/',
    referenceLogUrl: 'https://www.warcraftlogs.com/',
  },
  {
    id: 'boss-3',
    bossName: 'Boss 3',
    summary: 'Boss actual de progress. La prioridad es sobrevivir a intermission y limpiar orbes.',
    tankNotes: ['Planear ruta antes de intermission.', 'No girar el boss hacia melee.', 'Comunicar externos antes del tercer golpe.'],
    healerNotes: ['Asignar CDs por oleada.', 'Marcar dispels por orden.', 'Guardar throughput para 40% en adelante.'],
    dpsNotes: ['Cambiar a orbes instantaneo.', 'Usar movilidad para salir de lineas.', 'Guardar CDs de 2 min para burn final.'],
    weakAuraUrl: 'https://wago.io/',
    videoUrl: 'https://www.youtube.com/',
    referenceLogUrl: 'https://www.warcraftlogs.com/',
  },
  {
    id: 'boss-4',
    bossName: 'Boss 4',
    summary: 'Estrategia preliminar pendiente de pull en Mythic.',
    tankNotes: ['Revisar timers antes del primer pull.'],
    healerNotes: ['Preparar asignacion de CDs al confirmar damage pattern.'],
    dpsNotes: ['Traer talentos flexibles para cleave o single target.'],
  },
  {
    id: 'boss-5',
    bossName: 'Boss 5',
    summary: 'Notas placeholder hasta tener logs de referencia.',
    tankNotes: ['Definir posicion inicial.'],
    healerNotes: ['Revisar ventanas de raid damage.'],
    dpsNotes: ['Confirmar prioridad de adds.'],
  },
  {
    id: 'boss-6',
    bossName: 'Boss 6',
    summary: 'Notas placeholder hasta avanzar el progress.',
    tankNotes: ['Preparar swaps segun stacks.'],
    healerNotes: ['Reservar CDs para fase final.'],
    dpsNotes: ['Optimizar cooldowns para burn.'],
  },
  {
    id: 'boss-7',
    bossName: 'Boss 7',
    summary: 'Pendiente de estrategia definitiva.',
    tankNotes: ['Leer dungeon journal antes del pull.'],
    healerNotes: ['Definir CDs despues de los primeros logs.'],
    dpsNotes: ['Mantener consumibles y runas activas.'],
  },
  {
    id: 'boss-8',
    bossName: 'Boss 8',
    summary: 'Final boss. Espacio reservado para estrategia de avance.',
    tankNotes: ['Definir rutas y swaps con officers.'],
    healerNotes: ['Plan de CDs completo requerido.'],
    dpsNotes: ['Preparar builds de execute y defensivos.'],
  },
];
