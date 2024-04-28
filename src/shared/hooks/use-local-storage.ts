import { useEffect, useState } from "react";

const subscribeToKey = (key: string) => (callback: () => void) => {
  const listener = (e: StorageEvent) => {
    if (e.key === key) {
      callback();
    }
  };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    const unsubscribe = subscribeToKey(key)(() => {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue ? JSON.parse(storedValue) : defaultValue);
    });

    return unsubscribe;
  }, [key, defaultValue]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
