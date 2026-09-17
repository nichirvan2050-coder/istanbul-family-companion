import Link from "next/link";
import { notFound } from "next/navigation";
import { itinerary, dayByNumber } from "@/data/itinerary";
import { placeById } from "@/data/places";
import { phraseById } from "@/data/turkish";
import PlaceCard from "@/components/PlaceCard";
import ListenButton from "@/components/ListenButton";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  return itinerary.map((d) => ({ day: `day-${d.day}` }));
}

const transportEmoji: Record<string, string> = { tram: "🚋", metro: "🚇", marmaray: "🚆", ferry: "⛴️", bus: "🚌", funicular: "🚡", walk: "🚶", taxi: "🚕" };

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = await params;
  const dayNum = parseInt(dayParam.replace("day-", ""), 10);
  const day = dayByNumber(dayNum);
  if (!day) notFound();

  const prev = dayByNumber(dayNum - 1);
  const next = dayByNumber(dayNum + 1);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/plan" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← 10-Day Plan
      </Link>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--terracotta)" }}>
        Day {day.day}
      </p>
      <h1 className="font-display text-3xl font-semibold">{day.title}</h1>
      <p style={{ color: "var(--muted)" }}>{day.subtitle}</p>
      <div className="mt-2">
        <ShareButton title={`Day ${day.day}: ${day.title}`} text={day.subtitle} />
      </div>

      {day.flexible && (
        <div className="card mt-4 p-4 text-sm" style={{ background: "var(--terracotta-light)" }}>
          This day is intentionally flexible — use it to revisit a saved favorite or pick from the suggestions below.
        </div>
      )}

      <ol className="mt-6 space-y-5 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
        {day.timeline.map((stop, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[25px] top-0.5 text-xs font-semibold" style={{ color: "var(--muted)" }}>
              ●
            </span>
            <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>
              {stop.time !== "flexible" ? stop.time : "Flexible"}
            </p>
            {stop.type === "place" && stop.placeId && (
              <div className="mt-1">
                <PlaceCard place={placeById(stop.placeId)!} />
                {stop.detail && (
                  <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                    {stop.detail}
                  </p>
                )}
              </div>
            )}
            {stop.type === "transport" && stop.transport && (
              <div className="card mt-1 p-3">
                <p className="font-semibold">
                  {transportEmoji[stop.transport.mode]} {stop.label ?? stop.transport.mode}
                </p>
                {(stop.transport.from || stop.transport.to) && (
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {stop.transport.from ?? ""} {stop.transport.from && stop.transport.to ? "→" : ""} {stop.transport.to ?? ""}
                  </p>
                )}
                {stop.transport.duration && <p className="text-xs" style={{ color: "var(--muted)" }}>{stop.transport.duration}</p>}
                {stop.detail && <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{stop.detail}</p>}
              </div>
            )}
            {stop.type === "break" && (
              <div className="mt-1 rounded-xl border border-dashed p-3 text-sm" style={{ borderColor: "var(--border)" }}>
                🍽️ {stop.label}
                {stop.detail && <p className="text-xs" style={{ color: "var(--muted)" }}>{stop.detail}</p>}
              </div>
            )}
            {stop.type === "note" && (
              <div className="card mt-1 p-3 text-sm">
                <p className="font-semibold">{stop.label}</p>
                {stop.detail && <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{stop.detail}</p>}
              </div>
            )}
          </li>
        ))}
      </ol>

      {day.turkishPhraseIds.length > 0 && (
        <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-lg font-semibold">🇹🇷 Today&apos;s Turkish</h2>
          <div className="mt-3 space-y-2">
            {day.turkishPhraseIds.map((id) => {
              const ph = phraseById(id);
              if (!ph) return null;
              return (
                <div key={id} className="card flex items-center justify-between gap-2 p-3">
                  <div>
                    <p className="font-semibold">{ph.turkish}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {ph.english}
                    </p>
                  </div>
                  <ListenButton text={ph.turkish} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-8 flex justify-between border-t pt-5 text-sm" style={{ borderColor: "var(--border)" }}>
        {prev ? (
          <Link href={`/plan/day-${prev.day}`} style={{ color: "var(--bosphorus)" }}>
            ← Day {prev.day}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/plan/day-${next.day}`} style={{ color: "var(--bosphorus)" }}>
            Day {next.day} →
          </Link>
        )}
      </div>
    </div>
  );
}
