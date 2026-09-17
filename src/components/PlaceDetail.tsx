"use client";

import Link from "next/link";
import { Place } from "@/data/types";
import { localizePlace } from "@/data/placeTranslations";
import FamilyBadge from "./FamilyBadge";
import SaveButton from "./SaveButton";
import SourceTag from "./SourceTag";
import ShareButton from "./ShareButton";
import PlaceCard from "./PlaceCard";
import { useLocale } from "@/lib/i18n";

export default function PlaceDetail({ place: rawPlace, nearby, withChild }: { place: Place; nearby: Place[]; withChild: Place[] }) {
  const { t, locale } = useLocale();
  const place = localizePlace(rawPlace, locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/places" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← {t("place_all_places")}
      </Link>

      <h1 className="font-display mt-2 text-3xl font-semibold">{place.name}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <FamilyBadge level={place.family.level} />
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          ⏱️ {place.duration}
        </span>
      </div>
      <div className="mt-3 flex gap-2">
        <SaveButton kind="place" id={place.id} />
        <ShareButton title={place.name} text={place.summary} />
      </div>

      <Section title={t("place_location")}>
        <p>
          {place.area}, {place.district}
        </p>
      </Section>

      <Section title={t("place_what_is_it")}>
        <p>{place.whatIsIt}</p>
      </Section>

      <Section title={t("place_history")}>
        <p>{place.history}</p>
      </Section>

      {place.timeline && place.timeline.length > 0 && (
        <Section title={t("place_timeline")}>
          <ol className="space-y-3 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
            {place.timeline.map((tl, i) => (
              <li key={i}>
                <p className="text-sm font-semibold" style={{ color: "var(--terracotta)" }}>
                  {tl.year}
                </p>
                <p className="text-sm">{tl.label}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section title={t("place_why_visit")}>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {place.whyVisit.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </Section>

      <Section title={t("place_time_needed")}>
        <p>{place.duration}</p>
      </Section>

      <Section title={t("place_entrance")}>
        {place.ticket.free ? (
          <p className="font-semibold" style={{ color: "var(--success)" }}>
            {t("common_free")}
          </p>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold">{place.ticket.price?.value}</p>
            {place.ticket.price?.note && (
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {place.ticket.price.note}
              </p>
            )}
            {place.ticket.price && <SourceTag sourceName={place.ticket.price.sourceName} sourceUrl={place.ticket.price.sourceUrl} lastVerified={place.ticket.price.lastVerified} status={place.ticket.price.status} />}
          </div>
        )}
      </Section>

      <Section title={t("place_opening_hours")}>
        <p>{place.openingHours.value}</p>
        <div className="mt-1">
          <SourceTag sourceName={place.openingHours.sourceName} sourceUrl={place.openingHours.sourceUrl} lastVerified={place.openingHours.lastVerified} status={place.openingHours.status} />
        </div>
      </Section>

      <Section title={t("place_family")}>
        <FamilyBadge level={place.family.level} size="md" />
        <ul className="mt-2 space-y-1 text-sm">
          {place.family.stroller && (
            <li>
              {t("place_family_stroller")} {place.family.stroller}
            </li>
          )}
          {place.family.toilets && (
            <li>
              {t("place_family_toilets")} {place.family.toilets}
            </li>
          )}
          {place.family.seating && (
            <li>
              {t("place_family_seating")} {place.family.seating}
            </li>
          )}
          {place.family.walking && (
            <li>
              {t("place_family_walking")} {place.family.walking}
            </li>
          )}
          {place.family.crowd && (
            <li>
              {t("place_family_crowd")} {place.family.crowd}
            </li>
          )}
          {place.family.shade && (
            <li>
              {t("place_family_shade")} {place.family.shade}
            </li>
          )}
        </ul>
      </Section>

      {place.dontMiss && place.dontMiss.length > 0 && (
        <Section title={t("place_dont_miss")}>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {place.dontMiss.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t("place_how_to_get_there")}>
        <ul className="space-y-1 text-sm">
          {place.transport.map((tr, i) => (
            <li key={i}>
              {tr.mode === "tram" ? "🚋" : tr.mode === "ferry" ? "⛴️" : tr.mode === "marmaray" ? "🚆" : tr.mode === "metro" ? "🚇" : tr.mode === "bus" ? "🚌" : tr.mode === "funicular" ? "🚡" : "🚶"}{" "}
              {tr.line ? `${tr.line} ` : ""}
              {tr.from ? `${tr.from} → ` : ""}
              {tr.to ?? ""} {tr.detail ?? ""} {tr.duration ? `(${tr.duration})` : ""}
            </li>
          ))}
        </ul>
      </Section>

      {withChild.length > 0 && (
        <Section title={t("place_with_child_nearby")}>
          <div className="space-y-2">
            {withChild.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </Section>
      )}

      {nearby.length > 0 && (
        <Section title={t("place_nearby")}>
          <div className="space-y-2">
            {nearby.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </Section>
      )}

      <Section title={t("place_map")}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawPlace.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--bosphorus)" }}
        >
          {t("place_open_in_maps")}
        </a>
      </Section>

      {rawPlace.officialUrl && (
        <Section title={t("place_official")}>
          <a href={rawPlace.officialUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "var(--bosphorus)" }}>
            {rawPlace.officialUrl}
          </a>
        </Section>
      )}

      <Section title={t("place_evidence")}>
        <ul className="space-y-1 text-sm">
          {rawPlace.sources.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
                {s.name}
              </a>{" "}
              <span style={{ color: "var(--muted)" }}>({s.type})</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-2 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
