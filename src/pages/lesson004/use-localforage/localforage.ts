import forage from "localforage";

class Localforage {
  get<T = never>(key: string): Promise<T | null>;
  get<T = never>(key: RegExp): Promise<T[] | null>;
  async get<T = never>(key: string | RegExp) {
    try {
      if (typeof key === "string") {
        return await forage.getItem<T>(key);
      } else {
        const result: T[] = [];
        const keys = await forage.keys();
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
      return null;
    }
  }

  async set<T = never>(key: string, value: T) {
    try {
      return await forage.setItem<T>(key, value);
    } catch (error) {
      return null;
    }
  }

  async remove(key: string | RegExp) {
    try {
      if (typeof key === "string") {
        await forage.removeItem(key);
      } else {
        const keys = await forage.keys();
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (key.test(k)) {
            await this.remove(k);
          }
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async clear() {
    try {
      await forage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  async has(key: string | RegExp) {
    try {
      const keys = await forage.keys();
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (typeof key === "string") {
          if (key === k) {
            return true;
          }
        } else if (key.test(k)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export const localforage = new Localforage();
