import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'min-w-0 max-w-full rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-ember backdrop-blur-sm',
        interactive && 'transition hover:border-ember-400/60 hover:bg-white/[0.07]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
