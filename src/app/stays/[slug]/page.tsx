import Link from "next/link";
import { notFound } from "next/navigation";
import { stays, stayById } from "@/data/stays";
import { placeById } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stayById(slug);
  return s ? { title: s.name } : {};
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stay = stayById(slug);
  if (!stay) notFound();

  const nearby = stay.nearby.map((id) => placeById(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/stays" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Family Stays
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{stay.name}</h1>
      <p style={{ color: "var(--muted)" }}>
        {stay.area} · {stay.type === "hotel" ? "Hotel" : "Apartment"}
      </p>
      <div className="mt-3 flex gap-2">
        <SaveButton kind="stay" id={stay.id} />
        <ShareButton title={stay.name} />
      </div>

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Guest rating</h2>
        {stay.rating?.value != null ? (
          <div className="mt-2">
            <p className="text-2xl font-bold" style={{ color: "var(--bosphorus)" }}>
              {stay.rating.value}/{stay.rating.scale}
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {stay.rating.sourceName}
              {stay.rating.reviewCount ? ` · ${stay.rating.reviewCount.toLocaleString()}+ reviews` : ""}
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Checked {stay.rating.lastVerified}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Rating not currently verified for this build.
          </p>
        )}
      </section>

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Price</h2>
        <p className="mt-2">{stay.price.value ?? "Current price not verified — check the official booking channel."}</p>
      </section>

      {stay.familyFeatures.length > 0 && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-lg font-semibold">Family features</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {stay.familyFeatures.map((f) => (
              <li key={f}>☑️ {f}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">Transport</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {stay.transport.map((t) => (
            <li key={t}>🚶 {t}</li>
          ))}
        </ul>
      </section>

      {nearby.length > 0 && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-lg font-semibold">Nearby</h2>
          <div className="mt-2 space-y-2">
            {nearby.map((p) => (
              <PlaceCard key={p!.id} place={p!} />
            ))}
          </div>
        </section>
      )}

      {stay.officialUrl && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <a href={stay.officialUrl} target="_blank" rel="noopener noreferrer" className="tap-target inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--bosphorus)" }}>
            View on Booking.com
          </a>
        </section>
      )}
    </div>
  );
}
