import { initialData } from '../data/mockData';

const STORAGE_KEY = 'box-levelup-gm-v1';

export function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  try {
    return JSON.parse(existing);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

export function getStoredData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : initStorage();
}

export function saveStoredData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetStoredData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}
