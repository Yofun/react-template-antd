import { useCallback, useState, useEffect } from "react";
// import localforage from "localforage";
import { localforage } from "./localforage";

interface Localforage {
  clear(): Promise<boolean>;
}

interface LocalforageKeyReturnValue<T> extends Localforage {
  set(key: string, value: T): Promise<T | null>;
  get(key: string): Promise<T | null>;
  get(key: RegExp): Promise<T[] | null>;
  remove(key: string | RegExp): Promise<boolean>;
}

interface LocalforageReturnValue<T> extends Localforage {
  data: T | null;
  set(value: T): Promise<T | null>;
  get(): Promise<T | null>;
  remove(key?: string | RegExp): Promise<boolean>;
}

export function useLocalforage<V = never>(): LocalforageKeyReturnValue<V>;
export function useLocalforage<V = never>(
  key: string
): LocalforageReturnValue<V>;

export function useLocalforage<V = never>(
  key?: string
): LocalforageKeyReturnValue<V> | LocalforageReturnValue<V> {
  const [data, setData] = useState<V | null>(null);

  const set = useCallback(
    async (k: string | V, v: V) => {
      if (key) {
        const value = await localforage.set<V>(key, k as V);
        setData(value);
        return value;
      } else {
        const value = await localforage.set<V>(k as string, v);
        setData(value);
        return value;
      }
    },
    [key]
  );

  const getKey = useCallback(async () => {
    if (key) {
      const value = await localforage.get<V>(key);
      setData(value);
      return value;
    }
    return null;
  }, [key]);

  const get = useCallback(async (k: string | RegExp) => {
    if (typeof k === "string") {
      const value = await localforage.get<V>(k);
      return value;
    } else {
      const values = await localforage.get<V>(k);
      return values;
    }
  }, []);

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
    return await localforage.clear();
  }, []);

  useEffect(() => {
    if (!key) return;
    getKey().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get]);

  return key
    ? {
        data,
        set,
        get: getKey,
        remove,
        clear,
      }
    : {
        set,
        get,
        remove,
        clear,
      };
}
