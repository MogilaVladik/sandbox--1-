/**
 * Safe localStorage wrapper that handles incognito mode and storage errors
 */

export const storage = {
  isAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem(key: string): string | null {
    try {
      if (!this.isAvailable()) return null;
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`Failed to get item from localStorage: ${key}`, e);
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn(`Failed to set item in localStorage: ${key}`, e);
      return false;
    }
  },

  removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`Failed to remove item from localStorage: ${key}`, e);
      return false;
    }
  },
};
