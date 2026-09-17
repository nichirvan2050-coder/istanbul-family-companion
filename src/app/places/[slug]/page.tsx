import { notFound } from "next/navigation";
import Link from "next/link";
import { places, placeById } from "@/data/places";
import FamilyBadge from "@/components/FamilyBadge";
import SaveButton from "@/components/SaveButton";
import SourceTag from "@/components/SourceTag";
import ShareButton from "@/components/ShareButton";
import PlaceCard from "@/components/PlaceCard";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = placeById(slug);
  if (!place) return {};
  return {
    title: place.name,
    description: place.summary,
    openGraph: { title: place.name, description: place.summary },
    alternates: { canonical: `/places/${place.id}` },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = placeById(slug);
  if (!place) notFound();

  const nearby = place.nearby.map((id) => placeById(id)).filter(Boolean) as typeof places;
  const withChild = (place.withChildNearby ?? []).map((id) => placeById(id)).filter(Boolean) as typeof places;

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/places" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← All places
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

      <Section title="📍 Location">
        <p>
          {place.area}, {place.district}
        </p>
      </Section>

      <Section title="🏛️ What is it?">
        <p>{place.whatIsIt}</p>
      </Section>

      <Section title="📖 History">
        <p>{place.history}</p>
      </Section>

      {place.timeline && place.timeline.length > 0 && (
        <Section title="🕰️ Timeline">
          <ol className="space-y-3 border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
            {place.timeline.map((t, i) => (
              <li key={i}>
                <p className="text-sm font-semibold" style={{ color: "var(--terracotta)" }}>
                  {t.year}
                </p>
                <p className="text-sm">{t.label}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section title="⭐ Why visit?">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {place.whyVisit.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </Section>

      <Section title="⏱️ Time needed">
        <p>{place.duration}</p>
      </Section>

      <Section title="🎟️ Entrance">
        {place.ticket.free ? (
          <p className="font-semibold" style={{ color: "var(--success)" }}>
            Free
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

      <Section title="🕐 Opening hours">
        <p>{place.openingHours.value}</p>
        <div className="mt-1">
          <SourceTag sourceName={place.openingHours.sourceName} sourceUrl={place.openingHours.sourceUrl} lastVerified={place.openingHours.lastVerified} status={place.openingHours.status} />
        </div>
      </Section>

      <Section title="👨‍👩‍👧 Family">
        <FamilyBadge level={place.family.level} size="md" />
        <ul className="mt-2 space-y-1 text-sm">
          {place.family.stroller && <li>🧸 Stroller: {place.family.stroller}</li>}
          {place.family.toilets && <li>🚻 Toilets: {place.family.toilets}</li>}
          {place.family.seating && <li>💺 Seating: {place.family.seating}</li>}
          {place.family.walking && <li>🚶 Walking: {place.family.walking}</li>}
          {place.family.crowd && <li>👥 Crowd: {place.family.crowd}</li>}
          {place.family.shade && <li>☀️ Shade: {place.family.shade}</li>}
        </ul>
      </Section>

      {place.dontMiss && place.dontMiss.length > 0 && (
        <Section title="📸 Don't miss">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {place.dontMiss.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="🚋 How to get there">
        <ul className="space-y-1 text-sm">
          {place.transport.map((t, i) => (
            <li key={i}>
              {t.mode === "tram" ? "🚋" : t.mode === "ferry" ? "⛴️" : t.mode === "marmaray" ? "🚆" : t.mode === "metro" ? "🚇" : t.mode === "bus" ? "🚌" : t.mode === "funicular" ? "🚡" : "🚶"}{" "}
              {t.line ? `${t.line} ` : ""}
              {t.from ? `${t.from} → ` : ""}
              {t.to ?? ""} {t.detail ?? ""} {t.duration ? `(${t.duration})` : ""}
            </li>
          ))}
        </ul>
      </Section>

      {withChild.length > 0 && (
        <Section title="👨‍👩‍👧 With a child nearby">
          <div className="space-y-2">
            {withChild.map((p) => (
              <PlaceCard key={p!.id} place={p!} />
            ))}
          </div>
        </Section>
      )}

      {nearby.length > 0 && (
        <Section title="📍 Nearby">
          <div className="space-y-2">
            {nearby.map((p) => (
              <PlaceCard key={p!.id} place={p!} />
            ))}
          </div>
        </Section>
      )}

      <Section title="🗺️ Map">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--bosphorus)" }}
        >
          Open in Google Maps
        </a>
      </Section>

      {place.officialUrl && (
        <Section title="🔗 Official">
          <a href={place.officialUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "var(--bosphorus)" }}>
            {place.officialUrl}
          </a>
        </Section>
      )}

      <Section title="Evidence">
        <ul className="space-y-1 text-sm">
          {place.sources.map((s, i) => (
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
