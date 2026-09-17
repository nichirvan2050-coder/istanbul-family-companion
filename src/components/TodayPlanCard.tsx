"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentDayNumber } from "@/lib/trip";
import { dayByNumber } from "@/data/itinerary";
import { placeById } from "@/data/places";

export default function TodayPlanCard() {
  const [dayNum, setDayNum] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- trip start date lives in localStorage, client-only
    setDayNum(getCurrentDayNumber());
    const onChange = () => setDayNum(getCurrentDayNumber());
    window.addEventListener("my-istanbul:trip-start-changed", onChange);
    return () => window.removeEventListener("my-istanbul:trip-start-changed", onChange);
  }, []);

  const day = dayByNumber(dayNum);
  if (!day) return null;
  const firstPlace = day.places[0] ? placeById(day.places[0]) : undefined;

  return (
    <div className="space-y-3">
      <div className="card p-4 animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--terracotta)" }}>
          Day {day.day}
        </p>
        <h3 className="font-display text-xl font-semibold">{day.title}</h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {day.subtitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {day.transport.map((t) => (
            <span key={t} className="rounded-full px-2 py-1" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
              {t}
            </span>
          ))}
        </div>
        <Link
          href={`/plan/day-${day.day}`}
          className="tap-target mt-3 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--bosphorus)" }}
        >
          Start Today&apos;s Plan
        </Link>
      </div>

      {firstPlace && (
        <Link href={`/places/${firstPlace.id}`} className="card flex items-center gap-3 p-3 animate-fade-in-up">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: "linear-gradient(135deg, var(--terracotta), var(--gold))" }} aria-hidden>
            📍
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
              Next Stop
            </p>
            <p className="truncate font-semibold">{firstPlace.name}</p>
            <p className="truncate text-xs" style={{ color: "var(--muted)" }}>
              {firstPlace.area} · ⏱️ {firstPlace.duration} · {firstPlace.ticket.free ? "🎟️ Free" : "🎟️ Paid"}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
