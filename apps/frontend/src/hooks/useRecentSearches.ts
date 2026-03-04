import { useState, useEffect } from "react";

const STORAGE_KEY = "recentSearches";
const MAX_ITEMS = 5;

function loadFromStorage(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    loadFromStorage(),
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch {}
  }, [recentSearches]);

  const addSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      // LIFO & Remove duplicate if it exists
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== trimmed.toLowerCase(),
      );
      return [trimmed, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const clearSearches = () => {
    setRecentSearches([]);
  };

  return { recentSearches, addSearch, clearSearches };
}

export default useRecentSearches;
