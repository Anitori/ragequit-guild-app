import { useEffect, useState } from 'react';
import { loadRaidProgress, raidProgress } from '../data/progress';
import type { RaidProgress } from '../types/progress';

const cacheKey = 'ragequit:last-good-progress';

export function useRaidProgress() {
  const [progress, setProgress] = useState<RaidProgress>(raidProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cached = window.localStorage.getItem(cacheKey);

    if (cached) {
      try {
        setProgress({ ...raidProgress, ...(JSON.parse(cached) as RaidProgress) });
      } catch {
        window.localStorage.removeItem(cacheKey);
      }
    }

    loadRaidProgress()
      .then((loadedProgress) => {
        if (!isMounted) {
          return;
        }

        setProgress(loadedProgress);
        setError(null);
        window.localStorage.setItem(cacheKey, JSON.stringify(loadedProgress));
      })
      .catch((caughtError: unknown) => {
        if (!isMounted) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : 'No se pudo cargar progress');
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { progress, isLoading, error };
}
