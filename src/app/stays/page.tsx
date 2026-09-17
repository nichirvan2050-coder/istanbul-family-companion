import Link from "next/link";
import { stays } from "@/data/stays";

export const metadata = { title: "Family Stays" };

export default function StaysPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">🛏️ Family-Friendly Stays</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Not a booking platform — this helps you understand areas and shows independent guest ratings only, never combined, re-scored, or ranked.
      </p>
      <div className="mt-4 space-y-3">
        {stays.map((s) => (
          <Link key={s.id} href={`/stays/${s.id}`} className="card block p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {s.area} · {s.type === "hotel" ? "Hotel" : "Apartment"}
                </p>
              </div>
              {s.rating?.value != null && (
                <div className="text-right">
                  <p className="font-semibold" style={{ color: "var(--bosphorus)" }}>
                    {s.rating.value}/{s.rating.scale}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {s.rating.sourceName.split(" ")[0]}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
