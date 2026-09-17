"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { places } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import { FamilyLevel, Place, DestType, Region, regionGroups, regionLabels, RegionGroup } from "@/data/types";
import { useLocale } from "@/lib/i18n";

const categories: { id: Place["category"][number]; label: string; icon: string }[] = [
  { id: "history", label: "History", icon: "🏛️" },
  { id: "bosphorus", label: "Bosphorus", icon: "🌊" },
  { id: "city", label: "City", icon: "🏙️" },
  { id: "market", label: "Markets", icon: "🛍️" },
  { id: "park", label: "Parks", icon: "🌳" },
  { id: "religious", label: "Religious", icon: "🕌" },
  { id: "viewpoint", label: "Viewpoints", icon: "🔭" },
];

const destTypes: { id: DestType; label: string }[] = [
  { id: "neighborhood", label: "Neighborhood" },
  { id: "museum", label: "Museum" },
  { id: "palace", label: "Palace" },
  { id: "mosque", label: "Mosque" },
  { id: "market", label: "Market" },
  { id: "park", label: "Park" },
  { id: "waterfront", label: "Waterfront" },
  { id: "viewpoint", label: "Viewpoint" },
  { id: "beach", label: "Beach" },
  { id: "shopping", label: "Shopping" },
  { id: "nature", label: "Nature" },
  { id: "island", label: "Island" },
  { id: "island_attraction", label: "Island attraction" },
  { id: "historic_site", label: "Historic site" },
  { id: "food_area", label: "Food area" },
  { id: "transport_experience", label: "Transport experience" },
  { id: "attraction", label: "Attraction" },
];

function PlacesContent() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(searchParams.get("category"));
  const [familyOnly, setFamilyOnly] = useState<FamilyLevel | null>(searchParams.get("family") as FamilyLevel | null);
  const [destType, setDestType] = useState<DestType | null>(searchParams.get("type") as DestType | null);
  const [superRegion, setSuperRegion] = useState<RegionGroup | null>(searchParams.get("superRegion") as RegionGroup | null);
  const [region, setRegion] = useState<Region | null>(searchParams.get("region") as Region | null);

  const filtered = useMemo(() => {
    const activeRegions: Region[] | null = superRegion ? regionGroups[superRegion].regions : region ? [region] : null;
    return places.filter((p) => {
      if (activeRegions && !(p.region && activeRegions.includes(p.region))) return false;
      if (destType && p.destType !== destType) return false;
      if (category && !p.category.includes(category as Place["category"][number])) return false;
      if (familyOnly && p.family.level !== familyOnly) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!`${p.name} ${p.area} ${p.district} ${p.summary}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [superRegion, region, destType, category, familyOnly, query]);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-semibold">{t("places_title")}</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {places.length} destinations — {t("places_subtitle")}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5">
          <Link href="/near-me" className="tap-target rounded-full border px-3 py-1.5 text-center text-xs font-medium" style={{ borderColor: "var(--border)" }}>
            📍 Near Me
          </Link>
          <Link href="/explore" className="tap-target rounded-full border px-3 py-1.5 text-center text-xs font-medium" style={{ borderColor: "var(--border)" }}>
            🧭 Explore
          </Link>
        </div>
      </div>

      {(superRegion || region) && (
        <button
          onClick={() => {
            setSuperRegion(null);
            setRegion(null);
          }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
          style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}
        >
          📍 {superRegion ? regionGroups[superRegion].label : region ? regionLabels[region] : ""} ✕
        </button>
      )}

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search places, areas..."
        className="tap-target mt-3 w-full rounded-full border px-4 py-2.5 text-sm outline-none"
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

      <div className="mt-2 flex flex-wrap items-center gap-2">
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
        <select
          value={destType ?? ""}
          onChange={(e) => setDestType((e.target.value || null) as DestType | null)}
          className="rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--surface)" }}
        >
          <option value="">All types</option>
          {destTypes.map((dt) => (
            <option key={dt.id} value={dt.id}>
              {dt.label}
            </option>
          ))}
        </select>
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
