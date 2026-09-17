"use client";

import Link from "next/link";
import { Place } from "@/data/types";
import { localizePlace } from "@/data/placeTranslations";
import { useLocale } from "@/lib/i18n";

export default function DayTripOutsideCard({ place: rawPlace }: { place: Place }) {
  const { locale, t } = useLocale();
  const place = localizePlace(rawPlace, locale);
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/places/${place.id}`} className="font-semibold hover:underline">
          {place.name}
        </Link>
        <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
          {t("daytrip_outside_istanbul")}
        </span>
      </div>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{place.summary}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs" style={{ color: "var(--muted)" }}>
        <p>🚗 {rawPlace.transport[0]?.detail}</p>
        <p>⏱️ {rawPlace.transport[0]?.duration ?? place.duration}</p>
        <p>👨‍👩‍👧 {place.family.level} with kids</p>
        <p>🗓️ {place.duration}</p>
      </div>
    </div>
  );
}
