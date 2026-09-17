"use client";

import { useEffect, useState } from "react";

const checklist = [
  "Istanbulkart (or plan where to buy it on arrival)",
  "Google Maps — download the Istanbul area for offline use",
  "Translation / Turkish phrases (this app works offline for saved phrases)",
  "Payment / some cash for small vendors and markets",
  "Comfortable shoes — cobblestones are common in the historic areas",
  "Child essentials (stroller vs. carrier — see each place's family info)",
  "Check attraction hours for your travel dates",
  "Check ticket prices for your travel dates",
  "Save important places to your Saved list",
  "Check official sources for anything time-sensitive",
];

const goodToKnow = [
  "Public transport can become very crowded, especially rush hour and weekends.",
  "Road traffic can significantly affect bus and taxi travel time.",
  "Ferry schedules can change by season — check the day of travel.",
  "Attraction prices can change — this app shows a checked date, not a live price.",
  "Mosque access can be affected by prayer times, especially Friday midday.",
  "Some historic areas (Balat, Fener, Galata) involve significant walking on hills.",
  "Cobblestones can make strollers difficult — a carrier is often easier.",
  "Always check official information before visiting anything time-sensitive.",
  "Keep belongings secure in crowded areas like the bazaars and ferries.",
];

const KEY = "my-istanbul:checklist";

export default function BeforeYouGoPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only and unavailable during SSR
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function toggle(item: string) {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">Before Istanbul</h1>
      <ul className="mt-4 space-y-2">
        {checklist.map((item) => (
          <li key={item}>
            <label className="card flex cursor-pointer items-start gap-3 p-3">
              <input type="checkbox" checked={!!checked[item]} onChange={() => toggle(item)} className="mt-1 h-5 w-5" />
              <span className={checked[item] ? "line-through opacity-60" : ""}>{item}</span>
            </label>
          </li>
        ))}
      </ul>

      <h2 className="font-display mt-8 text-lg font-semibold">Good to Know</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
        {goodToKnow.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
