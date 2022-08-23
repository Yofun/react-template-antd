import { useCallback, useState, useEffect } from "react";
import localforage from "localforage";

interface Localforage {
  clear(): Promise<void>;
}

interface LocalforageKeyReturnValue<T> extends Localforage {
  set(key: string, value: T): Promise<T | null>;
  get(key: string): Promise<T | null>;
  remove(key: string | RegExp): Promise<void>;
}

interface LocalforageReturnValue<T> extends Localforage {
  data: T | null;
  set(value: T): Promise<T | null>;
  get(): Promise<T | null>;
  remove(key?: string | RegExp): Promise<void>;
}

export function useLocalforage<V>(): LocalforageKeyReturnValue<V>;
export function useLocalforage<V>(key: string): LocalforageReturnValue<V>;

export function useLocalforage<V>(
  key?: string
): LocalforageKeyReturnValue<V> | LocalforageReturnValue<V> {
  const [data, setData] = useState<V | null>(null);

  const set = useCallback(
    async (k: string | V, v: V) => {
      try {
        if (key) {
          const value = await localforage.setItem(key, k as V);
          setData(value);
          return value;
        } else {
          const value = await localforage.setItem(k as string, v);
          setData(value);
          return value;
        }
      } catch (error) {
        setData(null);
        return null;
      }
    },
    [key]
  );

  const get = useCallback(
    async (k: string) => {
      try {
        const value = await localforage.getItem<V | null>(key || k);
        setData(value);
        return value;
      } catch (error) {
        setData(null);
        return null;
      }
    },
    [key]
  );

  const remove = useCallback(
    async (k?: string | RegExp) => {
      try {
        if (!k && key) {
          await localforage.removeItem(key);
          setData(null);
        } else if (k) {
          if (typeof k === "string") {
            await localforage.removeItem(k);
          } else {
            const keys = await localforage.keys();
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              if (k.test(key)) {
                await localforage.removeItem(key);
              }
            }
          }
        }
      } catch (error) {}
    },
    [key]
  );

  const clear = useCallback(async () => {
    try {
      await localforage.clear();
      setData(null);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (!key) return;
    get(key).then((res) => {
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get]);

  return key
    ? {
        data,
        set,
        get,
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
