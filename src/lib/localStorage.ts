// Utility functions for localStorage-based data management
export const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const getCurrentTimestamp = () => new Date().toISOString();

export const getStorageData = <T>(key: string, defaultValue: T[] = []): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const setStorageData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const addToStorage = <T extends { id: string }>(key: string, item: Omit<T, 'id' | 'created_at' | 'updated_at'>): T => {
  const items = getStorageData<T>(key);
  const newItem = {
    ...item,
    id: generateId(),
    created_at: getCurrentTimestamp(),
    updated_at: getCurrentTimestamp()
  } as unknown as T;
  
  items.unshift(newItem);
  setStorageData(key, items);
  return newItem;
};

export const updateInStorage = <T extends { id: string }>(key: string, id: string, updates: Partial<T>): T | null => {
  const items = getStorageData<T>(key);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = {
    ...items[index],
    ...updates,
    updated_at: getCurrentTimestamp()
  };
  
  items[index] = updatedItem;
  setStorageData(key, items);
  return updatedItem;
};

export const deleteFromStorage = <T extends { id: string }>(key: string, id: string): boolean => {
  const items = getStorageData<T>(key);
  const filteredItems = items.filter(item => item.id !== id);
  
  if (filteredItems.length === items.length) return false;
  
  setStorageData(key, filteredItems);
  return true;
};