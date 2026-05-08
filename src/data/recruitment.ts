export interface RecruitmentNeed {
  id: string;
  label: string;
  priority: 'Alta' | 'Media';
  note?: string;
}

export const recruitmentNeeds: RecruitmentNeed[] = [
  { id: 'healer', label: '1 Healer', priority: 'Alta', note: 'Preferencia por raid cooldown fuerte' },
  { id: 'warlock', label: '1 Warlock', priority: 'Alta', note: 'Demonology o Destruction' },
  { id: 'mage', label: '1 Mage', priority: 'Media', note: 'Fire o Frost viable' },
  { id: 'ranged', label: 'DPS ranged con buen attendance', priority: 'Media' },
];

export const recruitmentCopy = {
  applyUrl: 'https://forms.gle/',
  schedule: 'Martes y miercoles',
  expectation: 'Buscamos jugadores consistentes, preparados y con ganas de progresar sin drama.',
};
