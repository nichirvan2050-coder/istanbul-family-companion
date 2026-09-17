import Link from "next/link";
import { placeById } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";

export const metadata = { title: "Day Trips" };

const outsideIstanbulIds = ["sapanca", "masukiye", "kartepe"];
const farIstanbulIds = ["buyukada", "sile", "agva", "polonezkoy", "riva"];

export default function DayTripsPage() {
  const outside = outsideIstanbulIds.map((id) => placeById(id)).filter(Boolean);
  const far = farIstanbulIds.map((id) => placeById(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/explore" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Explore
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">🚗 Day Trips</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Never mixed into normal Istanbul browsing without saying so — each trip below is clearly marked by distance and access.
      </p>

      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold">📍 Outside Istanbul</h2>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          A different province — Sakarya (Sapanca, Maşukiye) and Kocaeli (Kartepe). Not a same-day option without planning around traffic.
        </p>
        <div className="mt-2 space-y-3">
          {outside.map((p) => (
            <div key={p!.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/places/${p!.id}`} className="font-semibold hover:underline">
                  {p!.name}
                </Link>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
                  Outside Istanbul
                </span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{p!.summary}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs" style={{ color: "var(--muted)" }}>
                <p>🚗 {p!.transport[0]?.detail}</p>
                <p>⏱️ {p!.transport[0]?.duration ?? p!.duration}</p>
                <p>👨‍👩‍👧 {p!.family.level} with kids</p>
                <p>🗓️ {p!.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Further Within Istanbul Province</h2>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Still administratively part of Istanbul, but far enough from the center to plan as a dedicated day out.
        </p>
        <div className="mt-2 space-y-2">
          {far.map((p) => (
            <PlaceCard key={p!.id} place={p!} />
          ))}
        </div>
      </section>
    </div>
  );
}
