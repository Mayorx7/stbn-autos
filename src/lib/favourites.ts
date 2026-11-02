const FAVOURITES_KEY = "stbn-autos-favourites";

export function getFavouriteIds(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = JSON.parse(window.localStorage.getItem(FAVOURITES_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((id): id is number => typeof id === "number") : [];
  } catch {
    return [];
  }
}

export function toggleFavourite(id: number): number[] {
  const current = getFavouriteIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("stbn-favourites-changed"));
  return next;
}
