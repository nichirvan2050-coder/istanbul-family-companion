import Link from "next/link";
import { regionGroups, RegionGroup } from "@/data/types";

export const metadata = { title: "Explore" };

const groupOrder: RegionGroup[] = ["europe", "asia", "bosphorus", "islands", "nature", "day-trip"];

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">Explore Istanbul</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Where do you want to go?
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {groupOrder.map((key) => {
          const g = regionGroups[key];
          return (
            <Link
              key={key}
              href={`/places?superRegion=${key}`}
              className="card flex flex-col items-start gap-2 p-4 transition-shadow hover:shadow-md"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-2xl"
                style={{ background: "var(--terracotta-light)" }}
                aria-hidden
              >
                {g.icon}
              </span>
              <span className="font-semibold">{g.label}</span>
            </Link>
          );
        })}

        <Link
          href="/places?family=easy"
          className="card col-span-2 flex items-center gap-3 p-4 transition-shadow hover:shadow-md"
          style={{ background: "linear-gradient(135deg, var(--surface), var(--terracotta-light))" }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full text-2xl" style={{ background: "var(--terracotta-light)" }} aria-hidden>
            👨‍👩‍👧
          </span>
          <span>
            <span className="block font-semibold">Family-Friendly</span>
            <span className="block text-xs" style={{ color: "var(--muted)" }}>
              Only easy-with-kids places across all of Istanbul
            </span>
          </span>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/islands" className="card p-4 transition-shadow hover:shadow-md">
          <p className="font-semibold">🏝️ Island Guide</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Compare Büyükada, Heybeliada, Burgazada, Kınalıada
          </p>
        </Link>
        <Link href="/day-trips" className="card p-4 transition-shadow hover:shadow-md">
          <p className="font-semibold">🚗 Day Trips</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Sapanca, Maşukiye, Kartepe — outside Istanbul
          </p>
        </Link>
      </div>
    </div>
  );
}
