import Link from "next/link";
import { areas } from "@/data/areas";
import { activities } from "@/data/activities";
import { itinerary } from "@/data/itinerary";

export const metadata = { title: "Family" };

const walkingEmoji = { light: "🟢", moderate: "🟡", heavy: "🔴" };

export default function FamilyPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">👨‍👩‍👧 Family</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Areas are described factually and never ranked — pick based on what matters to your family.
      </p>

      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold">Family-Friendly Areas</h2>
        <div className="mt-2 space-y-2">
          {areas.map((a) => (
            <Link key={a.id} href={`/areas/${a.id}`} className="card block p-3">
              <p className="font-semibold">{a.name}</p>
              <p className="line-clamp-2 text-sm" style={{ color: "var(--muted)" }}>
                {a.whyFamilies}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Area Comparison</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--muted)" }}>
                <th className="py-1 pr-2">Area</th>
                <th className="py-1 pr-2">Waterfront/Parks</th>
                <th className="py-1 pr-2">Walking</th>
                <th className="py-1">Child suitability</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.id} className="border-t align-top" style={{ borderColor: "var(--border)" }}>
                  <td className="py-2 pr-2 font-medium">{a.name}</td>
                  <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>
                    {a.parksWaterfront ?? "—"}
                  </td>
                  <td className="py-2 pr-2">{walkingEmoji[a.walking]}</td>
                  <td className="py-2 capitalize">{a.childSuitability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
          No overall score — see each area&apos;s page for transport, food, shopping, and things to consider.
        </p>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">🧒 Family Activities</h2>
        <div className="mt-2 space-y-2">
          {activities.map((act) => (
            <Link key={act.id} href={`/activities/${act.id}`} className="card block p-3">
              <p className="font-semibold">{act.name}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {act.district} · {act.duration}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">🛏️ Family Stays</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Not a booking platform — a factual look at areas and independently verified guest ratings.
        </p>
        <Link href="/stays" className="tap-target mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--bosphorus)" }}>
          View Family Stays
        </Link>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Family-Friendly Days</h2>
        <div className="mt-2 space-y-2">
          {itinerary
            .filter((d) => d.familyFriendly)
            .map((d) => (
              <Link key={d.day} href={`/plan/day-${d.day}`} className="card flex items-center justify-between p-3">
                <span>
                  Day {d.day}: {d.title}
                </span>
                <span>{walkingEmoji[d.walking]}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
