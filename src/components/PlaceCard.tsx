"use client";

import Link from "next/link";
import { Place } from "@/data/types";
import FamilyBadge from "./FamilyBadge";
import { useLocale } from "@/lib/i18n";
import { formatDistance } from "@/lib/geo";

const categoryEmoji: Record<string, string> = {
  history: "🏛️",
  byzantine: "🏺",
  ottoman: "🕌",
  bosphorus: "🌊",
  city: "🏙️",
  family: "👨‍👩‍👧",
  park: "🌳",
  market: "🛍️",
  religious: "🕌",
  viewpoint: "🔭",
};

export default function PlaceCard({ place, distanceKm }: { place: Place; distanceKm?: number }) {
  const { t } = useLocale();
  const emoji = categoryEmoji[place.category[0]] ?? "📍";
  return (
    <Link
      href={`/places/${place.id}`}
      className="card group flex gap-3 p-3 transition-shadow hover:shadow-md animate-fade-in-up"
    >
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
        style={{ background: "linear-gradient(135deg, var(--bosphorus), var(--bosphorus-dark))" }}
        aria-hidden
      >
        {emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-display text-base font-semibold">{place.name}</h3>
        </div>
        <p className="truncate text-sm" style={{ color: "var(--muted)" }}>
          📍 {place.area}
          {distanceKm !== undefined ? ` · ${formatDistance(distanceKm)}` : ""}
        </p>
        <p className="mt-1 line-clamp-2 text-sm">{place.summary}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <FamilyBadge level={place.family.level} />
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            ⏱️ {place.duration}
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {place.ticket.free ? `🎟️ ${t("common_free")}` : `🎟️ ${t("common_paid")}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
