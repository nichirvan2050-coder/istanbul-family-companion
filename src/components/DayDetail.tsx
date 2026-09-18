"use client";

import Link from "next/link";
import { ItineraryDay } from "@/data/types";
import { localizeItineraryDay } from "@/data/itineraryTranslations";
import { placeById } from "@/data/places";
import { phraseById } from "@/data/turkish";
import PlaceCard from "@/components/PlaceCard";
import ListenButton from "@/components/ListenButton";
import ShareButton from "@/components/ShareButton";
import { useLocale } from "@/lib/i18n";

const transportEmoji: Record<string, string> = { tram: "🚋", metro: "🚇", marmaray: "🚆", ferry: "⛴️", bus: "🚌", funicular: "🚡", walk: "🚶", taxi: "🚕" };

export default function DayDetail({ day: rawDay, prev, next }: { day: ItineraryDay; prev: ItineraryDay | undefined; next: ItineraryDay | undefined }) {
  const { t, locale } = useLocale();
  const day = localizeItineraryDay(rawDay, locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/plan" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← {t("plan_title")}
      </Link>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--terracotta)" }}>
        {t("family_day_label")} {day.day}
      </p>
      <h1 className="font-display text-3xl font-semibold">{day.title}</h1>
      <p style={{ color: "var(--muted)" }}>{day.subtitle}</p>
      <div className="mt-2">
        <ShareButton title={`${t("family_day_label")} ${day.day}: ${day.title}`} text={day.subtitle} />
      </div>

      {day.flexible && (
        <div className="card mt-4 p-4 text-sm" style={{ background: "var(--terracotta-light)" }}>
          {t("day_flexible_note")}
        </div>
      )}

      <ol className="mt-6 space-y-5 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
        {day.timeline.map((stop, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[25px] top-0.5 text-xs font-semibold" style={{ color: "var(--muted)" }}>
              ●
            </span>
            <p className="text-xs font-semibold" style={{ color: "var(--terracotta)" }}>
              {stop.time !== "flexible" ? stop.time : t("day_flexible")}
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
          <h2 className="font-display text-lg font-semibold">{t("day_todays_turkish")}</h2>
          <div className="mt-3 space-y-2">
            {day.turkishPhraseIds.map((id) => {
              const ph = phraseById(id);
              if (!ph) return null;
              return (
                <div key={id} className="card flex items-center justify-between gap-2 p-3">
                  <div>
                    <p className="font-semibold">{ph.turkish}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {locale === "ar" ? ph.arabic : locale === "ku" ? ph.kurdish : ph.english}
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
            {t("day_prev")} {prev.day}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/plan/day-${next.day}`} style={{ color: "var(--bosphorus)" }}>
            {t("day_next")} {next.day} →
          </Link>
        )}
      </div>
    </div>
  );
}
