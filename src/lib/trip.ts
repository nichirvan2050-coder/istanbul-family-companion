"use client";

const KEY = "my-istanbul:trip-start";

export function getTripStart(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setTripStart(dateIso: string) {
  try {
    window.localStorage.setItem(KEY, dateIso);
    window.dispatchEvent(new Event("my-istanbul:trip-start-changed"));
  } catch {
    // ignore
  }
}

// Returns 1-10, defaulting to Day 1 when no trip start date has been set.
export function getCurrentDayNumber(): number {
  const start = getTripStart();
  if (!start) return 1;
  const startDate = new Date(start);
  const today = new Date();
  const diffDays = Math.floor((today.setHours(0, 0, 0, 0) - startDate.setHours(0, 0, 0, 0)) / 86400000);
  const day = diffDays + 1;
  if (day < 1) return 1;
  if (day > 10) return 10;
  return day;
}
