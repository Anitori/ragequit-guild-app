import { ExternalLink, Shield, Sparkles, Sword } from 'lucide-react';
import { Card } from '../components/Card';
import { strategies } from '../data/strategies';

function NoteList({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Shield }) {
  return (
    <div className="rounded-lg bg-black/20 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={16} className="text-forge-200" />
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-zinc-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Strategies() {
  return (
    <div className="grid gap-4">
      {strategies.map((strategy) => (
        <Card key={strategy.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forge-200">
                Estrategia
              </p>
              <h2 className="mt-1 text-xl font-black">{strategy.bossName}</h2>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-300">{strategy.summary}</p>

          <div className="mt-4 grid gap-3">
            <NoteList title="Tanks" items={strategy.tankNotes} icon={Shield} />
            <NoteList title="Healers" items={strategy.healerNotes} icon={Sparkles} />
            <NoteList title="DPS" items={strategy.dpsNotes} icon={Sword} />
          </div>

          {(strategy.weakAuraUrl || strategy.videoUrl || strategy.referenceLogUrl) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {strategy.weakAuraUrl && (
                <a
                  href={strategy.weakAuraUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-forge-200"
                >
                  WeakAura <ExternalLink size={14} />
                </a>
              )}
              {strategy.videoUrl && (
                <a
                  href={strategy.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-forge-200"
                >
                  Video <ExternalLink size={14} />
                </a>
              )}
              {strategy.referenceLogUrl && (
                <a
                  href={strategy.referenceLogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-forge-200"
                >
                  Log <ExternalLink size={14} />
                </a>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
