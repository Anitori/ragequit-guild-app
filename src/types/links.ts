export type LinkCategory = 'Comunidad' | 'Raid' | 'Herramientas' | 'Apply';

export interface ImportantLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: LinkCategory;
}
