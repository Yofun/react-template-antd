import { useState, useCallback, useEffect } from "react";
import { localforage } from "./localforage";

interface Localforage {
  clear(): Promise<boolean>;
  has(key: string | RegExp): Promise<boolean>;
}

interface LocalforageReturn<T> extends Localforage {
  data: T | null;
  set(value: T): Promise<T | null>;
  get(): Promise<T | null>;
  remove(key?: string | RegExp): Promise<boolean>;
}
interface LocalforageKeyReturn<T> extends Localforage {
  set(key: string, value: T): Promise<T | null>;
  get(key: string): Promise<T | null>;
  get(key: RegExp): Promise<T[] | null>;
  remove(key: string | RegExp): Promise<boolean>;
}

export function useLocalforage<T = never>(key: string): LocalforageReturn<T>;

export function useLocalforage<T = never>(): LocalforageKeyReturn<T>;

export function useLocalforage<T = never>(key?: string) {
  const [data, setData] = useState<T | null>(null);

  const set = useCallback(
    async (value: T) => {
      if (!key) return null;
      const v = await localforage.set(key, value);
      setData(v);
      return v;
    },
    [key]
  );

  const setKey = useCallback(async (key: string, value: T) => {
    if (!key) return null;
    const v = await localforage.set(key, value);
    return v;
  }, []);

  const get = useCallback(async () => {
    if (!key) return null;
    const v = await localforage.get<T>(key);
    setData(v);
    return v;
  }, [key]);

  function getKey(key: string): Promise<T | null>;
  function getKey(key: RegExp): Promise<T[] | null>;
  async function getKey(key: string | RegExp) {
    if (!key) return null;
    if (typeof key === "string") {
      return await localforage.get<T>(key);
    } else {
      return await localforage.get<T>(key);
    }
  }

  const remove = useCallback(
    async (k?: string | RegExp) => {
      if (!k && key) {
        const result = await localforage.remove(key);
        result && setData(null);
        return result;
      } else if (k) {
        const result = await localforage.remove(k);
        return result;
      } else {
        return false;
      }
    },
    [key]
  );

  const clear = useCallback(async () => {
    const result = await localforage.clear();
    setData(null);
    return result;
  }, []);

  const has = useCallback(async (k: string | RegExp) => {
    return await localforage.has(k);
  }, []);

  useEffect(() => {
    if (!key) return;
    get().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !!key
    ? { data, set, get, remove, clear, has }
    : { set: setKey, get: getKey, remove, clear, has };
}
