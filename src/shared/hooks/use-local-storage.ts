import { useSyncExternalStore } from "react";

const subscribeToKey = (key: string) => (callback: () => void) => {
  const listener = (e: StorageEvent) => {
    if (e.key === key && e.storageArea === localStorage) {
      callback();
    }
  };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
};

const getSnapshot = <T>(key: string, defaultValue: T) =>
  JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;

export const useLocalStorage = <T>(key: string, defaultValue: T) =>
  [
    useSyncExternalStore<T>(subscribeToKey(key), () =>
      getSnapshot<T>(key, defaultValue),
    ),
    (value: T) => localStorage.setItem(key, JSON.stringify(value)),
  ] as const;
