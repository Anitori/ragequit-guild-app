import { Settings } from 'lucide-react';
import { Card } from '../components/Card';

const futureFeatures = [
  'Editar roster',
  'Actualizar progress',
  'Marcar asistencia',
  'Agregar avisos',
  'Editar estrategias',
];

export function Admin() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20">
            <Settings size={21} className="text-forge-200" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-200">
              Officers
            </p>
            <h2 className="mt-1 text-2xl font-black">Panel de officers en desarrollo</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Esta pantalla queda reservada para administracion. Todavia no hay login ni
              escritura de datos.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold">Futuras funciones</h3>
        <ul className="mt-3 space-y-2">
          {futureFeatures.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-zinc-300">
              <span className="mt-2 size-1.5 rounded-full bg-ember-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {/* TODO: Agregar Discord OAuth para login de officers antes de habilitar ediciones. */}
      </Card>
    </div>
  );
}
