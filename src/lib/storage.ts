"use client";

// Everything saved lives only in this browser's localStorage — no accounts,
// no server-side tracking. See /about for the privacy policy.

export type SavedKind = "place" | "area" | "stay" | "activity" | "phrase";

export interface SavedItem {
  kind: SavedKind;
  id: string;
  savedAt: string;
}

const KEY = "my-istanbul:saved";

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("my-istanbul:saved-changed"));
  } catch {
    // localStorage unavailable (private browsing etc.) — save silently no-ops
  }
}

export function getSaved(): SavedItem[] {
  return read();
}

export function isSaved(kind: SavedKind, id: string): boolean {
  return read().some((i) => i.kind === kind && i.id === id);
}

export function toggleSaved(kind: SavedKind, id: string): boolean {
  const items = read();
  const idx = items.findIndex((i) => i.kind === kind && i.id === id);
  if (idx >= 0) {
    items.splice(idx, 1);
    write(items);
    return false;
  }
  items.push({ kind, id, savedAt: new Date().toISOString() });
  write(items);
  return true;
}

export function removeSaved(kind: SavedKind, id: string) {
  write(read().filter((i) => !(i.kind === kind && i.id === id)));
}
