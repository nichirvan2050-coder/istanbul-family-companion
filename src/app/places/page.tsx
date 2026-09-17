"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { places } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import { FamilyLevel, Place } from "@/data/types";

const categories: { id: Place["category"][number]; label: string; icon: string }[] = [
  { id: "history", label: "History", icon: "🏛️" },
  { id: "bosphorus", label: "Bosphorus", icon: "🌊" },
  { id: "city", label: "City", icon: "🏙️" },
  { id: "market", label: "Markets", icon: "🛍️" },
  { id: "park", label: "Parks", icon: "🌳" },
  { id: "religious", label: "Religious", icon: "🕌" },
  { id: "viewpoint", label: "Viewpoints", icon: "🔭" },
];

function PlacesContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(searchParams.get("category"));
  const [familyOnly, setFamilyOnly] = useState<FamilyLevel | null>(searchParams.get("family") as FamilyLevel | null);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      if (category && !p.category.includes(category as Place["category"][number])) return false;
      if (familyOnly && p.family.level !== familyOnly) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!`${p.name} ${p.area} ${p.summary}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [category, familyOnly, query]);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">📍 Places</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {places.length} curated places — not the whole city, just what&apos;s worth your time.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search places, areas..."
        className="tap-target mt-4 w-full rounded-full border px-4 py-2.5 text-sm outline-none"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      />

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory(null)}
          className="shrink-0 rounded-full border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", background: category === null ? "var(--bosphorus)" : "transparent", color: category === null ? "white" : "var(--foreground)" }}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(category === c.id ? null : c.id)}
            className="shrink-0 rounded-full border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)", background: category === c.id ? "var(--bosphorus)" : "transparent", color: category === c.id ? "white" : "var(--foreground)" }}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-2">
        {(["easy", "moderate", "difficult"] as FamilyLevel[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFamilyOnly(familyOnly === lvl ? null : lvl)}
            className="rounded-full border px-3 py-1 text-xs capitalize"
            style={{ borderColor: "var(--border)", background: familyOnly === lvl ? "var(--terracotta-light)" : "transparent", color: familyOnly === lvl ? "var(--terracotta)" : "var(--muted)" }}
          >
            {lvl} with kids
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((p) => (
          <PlaceCard key={p.id} place={p} />
        ))}
        {filtered.length === 0 && <p className="py-10 text-center text-sm" style={{ color: "var(--muted)" }}>No places match those filters.</p>}
      </div>
    </div>
  );
}

export default function PlacesPage() {
  return (
    <Suspense fallback={null}>
      <PlacesContent />
    </Suspense>
  );
}
