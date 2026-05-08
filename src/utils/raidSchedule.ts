const raidDays = [
  { day: 2, label: 'Martes' },
  { day: 3, label: 'Miércoles' },
] as const;

const raidHour = 20;
const raidMinute = 0;

export const raidScheduleLabel = 'Martes y miércoles';

export function getNextRaidLabel(now = new Date()) {
  for (let offset = 0; offset <= 7; offset += 1) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + offset);
    candidate.setHours(raidHour, raidMinute, 0, 0);

    const raidDay = raidDays.find((item) => item.day === candidate.getDay());

    if (raidDay && candidate.getTime() >= now.getTime()) {
      return `${raidDay.label} 20:00 ST`;
    }
  }

  return 'Martes 20:00 ST';
}
