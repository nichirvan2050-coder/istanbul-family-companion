"use client";

import Link from "next/link";
import { itinerary } from "@/data/itinerary";
import { setTripStart, getTripStart } from "@/lib/trip";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

const walkingConfig = { light: { emoji: "🟢", label: "Light" }, moderate: { emoji: "🟡", label: "Moderate" }, heavy: { emoji: "🔴", label: "Heavy" } };

export default function PlanPage() {
  const { t } = useLocale();
  const [start, setStart] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only and unavailable during SSR
    setStart(getTripStart() ?? "");
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">{t("plan_title")}</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {t("plan_subtitle")}
      </p>

      <div className="card mt-4 flex items-center gap-3 p-3">
        <label className="text-sm font-medium" htmlFor="trip-start">
          Trip start date
        </label>
        <input
          id="trip-start"
          type="date"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            setTripStart(e.target.value);
          }}
          className="rounded-lg border px-2 py-1 text-sm"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <ol className="mt-6 space-y-4 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
        {itinerary.map((day) => (
          <li key={day.day} className="relative">
            <span
              className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "var(--bosphorus)" }}
            >
              {day.day}
            </span>
            <Link href={`/plan/day-${day.day}`} className="card block p-4">
              <h2 className="font-display text-lg font-semibold">{day.title}</h2>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {day.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {day.transport.map((t) => (
                  <span key={t} className="rounded-full px-2 py-0.5" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
                    {t}
                  </span>
                ))}
                <span style={{ color: "var(--muted)" }}>
                  {walkingConfig[day.walking].emoji} {walkingConfig[day.walking].label} walking
                </span>
                {day.familyFriendly && <span>👨‍👩‍👧</span>}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
