export type Role = 'Tank' | 'Healer' | 'DPS';

export type PlayerStatus = 'Activo' | 'Trial' | 'Casual' | 'Banco';

export type CharacterKind = 'Main' | 'Alt';

export type WowClass =
  | 'Death Knight'
  | 'Druid'
  | 'Mage'
  | 'Paladin'
  | 'Priest'
  | 'Shaman'
  | 'Warlock'
  | 'Warrior';

export interface RosterMember {
  id: string;
  characterName: string;
  className: WowClass;
  spec: string;
  role: Role;
  itemLevel: number;
  status: PlayerStatus;
  characterKind: CharacterKind;
  discordName?: string;
  note?: string;
}
