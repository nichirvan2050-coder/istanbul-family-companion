"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { places } from "@/data/places";
import { stations } from "@/data/stations";
import PlaceCard from "@/components/PlaceCard";
import StationCard from "@/components/StationCard";
import { haversineKm } from "@/lib/geo";
import { Station } from "@/data/types";

type Status = "idle" | "loading" | "granted" | "denied" | "unsupported";

const modeFilters: { id: Station["modes"][number] | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🚏" },
  { id: "tram", label: "Tram", icon: "🚋" },
  { id: "metro", label: "Metro", icon: "🚇" },
  { id: "marmaray", label: "Marmaray", icon: "🚆" },
  { id: "ferry", label: "Ferry", icon: "⛴️" },
  { id: "funicular", label: "Funicular", icon: "🚡" },
];

export default function NearMePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [modeFilter, setModeFilter] = useState<Station["modes"][number] | "all">("all");
  const [placeCount, setPlaceCount] = useState(8);

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  const nearestPlaces = useMemo(() => {
    if (!coords) return [];
    return places
      .filter((p) => p.coordinates)
      .map((p) => ({ p, d: haversineKm(coords, p.coordinates!) }))
      .sort((a, b) => a.d - b.d);
  }, [coords]);

  const nearestStations = useMemo(() => {
    if (!coords) return [];
    return stations
      .filter((s) => modeFilter === "all" || s.modes.includes(modeFilter))
      .map((s) => ({ s, d: haversineKm(coords, s.coordinates) }))
      .sort((a, b) => a.d - b.d);
  }, [coords, modeFilter]);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">📍 Near Me</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Every place and transit stop in this guide, sorted by real straight-line distance from where you are right now.
      </p>

      {status !== "granted" && (
        <div className="card mt-4 p-5 text-center">
          <p className="text-3xl">🧭</p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {status === "denied" && "Location access is off. Enable it in your browser settings, or browse by area from Explore instead."}
            {status === "unsupported" && "Your browser doesn't support location. Browse by area from Explore instead."}
            {(status === "idle" || status === "loading") && "Nothing is stored or sent anywhere — this only runs in your browser, once, when you tap the button."}
          </p>
          {status !== "denied" && status !== "unsupported" && (
            <button
              onClick={requestLocation}
              disabled={status === "loading"}
              className="tap-target mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--bosphorus)" }}
            >
              {status === "loading" ? "Locating…" : "Use my location"}
            </button>
          )}
          {status !== "denied" && (
            <Link href="/explore" className="mt-3 block text-sm underline" style={{ color: "var(--bosphorus)" }}>
              Or browse by area
            </Link>
          )}
        </div>
      )}

      {status === "granted" && coords && (
        <>
          <section className="mt-5">
            <h2 className="font-display text-lg font-semibold">🚏 Nearest Transit</h2>
            <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
              {modeFilters.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModeFilter(m.id)}
                  className="shrink-0 rounded-full border px-3 py-1.5 text-sm"
                  style={{ borderColor: "var(--border)", background: modeFilter === m.id ? "var(--bosphorus)" : "transparent", color: modeFilter === m.id ? "white" : "var(--foreground)" }}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {nearestStations.slice(0, 6).map(({ s, d }) => (
                <StationCard key={s.id} station={s} distanceKm={d} />
              ))}
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
              Station coordinates are approximate (street-block accuracy) — confirm the exact exit/platform once you arrive.
            </p>
          </section>

          <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <h2 className="font-display text-lg font-semibold">📍 Nearest Places</h2>
            <div className="mt-3 space-y-2">
              {nearestPlaces.slice(0, placeCount).map(({ p, d }) => (
                <PlaceCard key={p.id} place={p} distanceKm={d} />
              ))}
            </div>
            {placeCount < nearestPlaces.length && (
              <button
                onClick={() => setPlaceCount((c) => c + 10)}
                className="tap-target mt-3 w-full rounded-full border py-2.5 text-sm font-medium"
                style={{ borderColor: "var(--border)" }}
              >
                Show more
              </button>
            )}
          </section>
        </>
      )}
    </div>
  );
}
