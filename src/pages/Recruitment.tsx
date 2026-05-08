import { ExternalLink, UserPlus } from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { recruitmentCopy, recruitmentNeeds } from '../data/recruitment';

export function Recruitment() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-ember-400/35 bg-ember-500/15">
            <UserPlus size={21} className="text-forge-200" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-200">
              Recruitment
            </p>
            <h2 className="mt-1 text-2xl font-black">Busquedas actuales</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{recruitmentCopy.expectation}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3">
        {recruitmentNeeds.map((need) => (
          <Card key={need.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black">{need.label}</h3>
                {need.note && <p className="mt-1 text-sm text-zinc-400">{need.note}</p>}
              </div>
              <StatusBadge label={need.priority} variant={need.priority === 'Alta' ? 'high' : 'medium'} />
            </div>
          </Card>
        ))}
      </div>

      <a
        href={recruitmentCopy.applyUrl}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-ember-500 px-4 font-black text-white shadow-ember transition hover:bg-ember-400"
      >
        Aplicar a la guild <ExternalLink size={17} />
      </a>
    </div>
  );
}
