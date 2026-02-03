import { useEffect, useState } from 'react';

type Initializer<T> = T | (() => T);

const isBrowser = typeof window !== 'undefined';

const readStoredValue = <T,>(key: string, fallback: Initializer<T>): T => {
  if (!isBrowser) return typeof fallback === 'function' ? (fallback as () => T)() : fallback;

  const raw = window.localStorage.getItem(key);
  if (raw === null) {
    return typeof fallback === 'function' ? (fallback as () => T)() : fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return typeof fallback === 'function' ? (fallback as () => T)() : fallback;
  }
};

const usePersistedState = <T,>(key: string, initialValue: Initializer<T>) => {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue));

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default usePersistedState;
