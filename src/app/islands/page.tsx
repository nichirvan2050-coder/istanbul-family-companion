"use client";

import { useState } from "react";
import Link from "next/link";
import { placeById } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";

const islandIds = ["buyukada", "heybeliada", "burgazada", "kinaliada"];

const comparison = [
  { id: "buyukada", character: "Largest, grandest mansions", nature: "Pine-forested hills", beaches: "Yes", history: "Deep — Ottoman/Republican elite summer retreat", walking: "Moderate–heavy (hilly)", family: "Easy in town, harder on the Aya Yorgi hill", visit: "Half–full day" },
  { id: "heybeliada", character: "Quieter, greener, naval heritage", nature: "Pine forest + nature park", beaches: "Yes", history: "Naval school; historic Halki Theological School", walking: "Light–moderate", family: "Easy around town", visit: "Half day" },
  { id: "burgazada", character: "Small, literary, intimate", nature: "Limited, mostly town/coast", beaches: "Small", history: "Sait Faik Abasıyanık's home/museum", walking: "Light", family: "Easy", visit: "2–4 hours" },
  { id: "kinaliada", character: "Smallest, closest to the city", nature: "Limited", beaches: "Small", history: "Armenian community heritage", walking: "Light", family: "Easy", visit: "Half day" },
];

export default function IslandsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const island = selected ? placeById(selected) : null;
  const islands = islandIds.map((id) => placeById(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/explore" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Explore
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">🏝️ Princes&apos; Islands</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Nine islands in total; four are regularly served by public ferries. No private cars on any of them — walk, cycle, or take an electric shuttle.
      </p>

      <div className="mt-4 space-y-3">
        {islands.map((p) => (
          <PlaceCard key={p!.id} place={p!} />
        ))}
      </div>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Island Comparison</h2>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Factual characteristics only — not ranked, no &quot;best island.&quot;
        </p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--muted)" }}>
                <th className="py-1 pr-2">Island</th>
                <th className="py-1 pr-2">Character</th>
                <th className="py-1 pr-2">Nature</th>
                <th className="py-1 pr-2">Beaches</th>
                <th className="py-1 pr-2">Walking</th>
                <th className="py-1">Typical visit</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.id} className="border-t align-top" style={{ borderColor: "var(--border)" }}>
                  <td className="py-2 pr-2 font-medium">{placeById(row.id)?.name}</td>
                  <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>{row.character}</td>
                  <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>{row.nature}</td>
                  <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>{row.beaches}</td>
                  <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>{row.walking}</td>
                  <td className="py-2" style={{ color: "var(--muted)" }}>{row.visit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">One-Island Day Trip</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Pick an island to see a realistic day structure built from this guide&apos;s verified places.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {islandIds.map((id) => (
            <button
              key={id}
              onClick={() => setSelected(selected === id ? null : id)}
              className="rounded-full border px-3 py-1.5 text-sm"
              style={{ borderColor: "var(--border)", background: selected === id ? "var(--bosphorus)" : "transparent", color: selected === id ? "white" : "var(--foreground)" }}
            >
              {placeById(id)?.name}
            </button>
          ))}
        </div>

        {island && (
          <ol className="mt-4 space-y-3 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
            <li>
              <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>⛴️ Ferry</p>
              <p className="text-sm">{island.transport[0]?.detail ?? `${island.transport[0]?.from ?? "Kabataş / Kadıköy / Bostancı"} → ${island.name}`} {island.transport[0]?.duration}</p>
            </li>
            <li>
              <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>📍 Arrival & main sights</p>
              <p className="text-sm">{island.whyVisit[0]}</p>
            </li>
            {island.nearby.slice(0, 2).map((id) => {
              const sub = placeById(id);
              if (!sub) return null;
              return (
                <li key={id}>
                  <Link href={`/places/${sub.id}`} className="text-sm underline" style={{ color: "var(--bosphorus)" }}>
                    {sub.name}
                  </Link>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{sub.summary}</p>
                </li>
              );
            })}
            <li>
              <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>🍽️ Lunch</p>
              <p className="text-sm">Casual restaurants around the ferry pier and town center.</p>
            </li>
            <li>
              <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>⛴️ Return ferry</p>
              <p className="text-sm">Check the current Şehir Hatları timetable for the last return sailing.</p>
            </li>
          </ol>
        )}
      </section>
    </div>
  );
}
