import forage from 'localforage';
import _clone from 'lodash/cloneDeep';

class Localforage {
  private forage: typeof forage;
  private cache: Record<string, any> = {};

  constructor() {
    this.forage = forage.createInstance({
      driver: forage.INDEXEDDB,
    });
  }

  get<T = never>(key: string): Promise<T | null>;
  get<T = never>(key: RegExp): Promise<T[] | null>;
  async get<T = never>(key: string | RegExp) {
    try {
      if (typeof key === 'string') {
        return await this.forage.getItem<T>(key);
      } else {
        const result: T[] = [];
        const keys = await this.forage.keys();
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (key.test(k)) {
            const value = await this.get<T>(k);
            !!value && result.push(value);
          }
        }
        return result.length ? result : null;
      }
    } catch (error) {
      if (typeof key === 'string') {
        return this.cache[key] as T;
      }
      return null;
    }
  }

  async set<T = never>(key: string, value: T) {
    if (!key) return null;
    try {
      return await this.forage.setItem<T>(key, value);
    } catch (error) {
      const v = _clone(value);
      this.cache[key] = v;
      return v;
    }
  }

  async remove(key: string | RegExp) {
    try {
      if (typeof key === 'string') {
        await this.forage.removeItem(key);
      } else {
        const keys = await this.forage.keys();
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (key.test(k)) {
            await this.remove(k);
          }
        }
      }
      return true;
    } catch (error) {
      if (typeof key === 'string') {
        delete this.cache[key];
        return true;
      }
      return false;
    }
  }

  async clear() {
    try {
      await this.forage.clear();
    } catch (error) {
      this.cache = {};
    }
    return true;
  }

  async has(key: string | RegExp) {
    try {
      const keys = await this.forage.keys();
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (typeof key === 'string') {
          if (key === k) {
            return true;
          }
        } else if (key.test(k)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return !!Object.keys(this.cache).find((v) => {
        if (typeof key === 'string') {
          return v === key;
        } else {
          return key.test(v);
        }
      });
    }
  }
}

export const localforage = new Localforage();
