import { ExternalLink, Link2 } from 'lucide-react';
import { Card } from '../components/Card';
import { importantLinks } from '../data/links';
import type { LinkCategory } from '../types/links';

const categories: LinkCategory[] = ['Comunidad', 'Raid', 'Herramientas', 'Apply'];

export function Links() {
  return (
    <div className="space-y-5">
      {categories.map((category) => {
        const links = importantLinks.filter((link) => link.category === category);
        if (links.length === 0) {
          return null;
        }

        return (
          <section key={category}>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-forge-200">
              {category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                  <Card interactive className="min-h-28">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20">
                        <Link2 size={19} className="text-forge-200" />
                      </div>
                      <ExternalLink size={16} className="shrink-0 text-zinc-500" />
                    </div>
                    <h3 className="mt-4 font-black">{link.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{link.description}</p>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
