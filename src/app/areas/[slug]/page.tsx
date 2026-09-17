import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, areaById } from "@/data/areas";
import { placeById } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaById(slug);
  return area ? { title: area.name, description: area.whyFamilies } : {};
}

const walkingLabel = { light: "🟢 Light", moderate: "🟡 Moderate", heavy: "🔴 Heavy" };

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaById(slug);
  if (!area) notFound();

  const attractions = area.attractions.map((id) => placeById(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/family" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Family
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{area.name}</h1>
      <div className="mt-2">
        <ShareButton title={area.name} text={area.whyFamilies} />
      </div>

      <Section title="Why families may choose it">
        <p>{area.whyFamilies}</p>
      </Section>
      <Section title="Transport">
        <p>{area.transport}</p>
      </Section>
      <Section title="Walking conditions">
        <p>{walkingLabel[area.walking]}</p>
      </Section>
      {area.parksWaterfront && (
        <Section title="Parks / waterfront">
          <p>{area.parksWaterfront}</p>
        </Section>
      )}
      {area.food && (
        <Section title="Food">
          <p>{area.food}</p>
        </Section>
      )}
      {area.shopping && (
        <Section title="Shopping">
          <p>{area.shopping}</p>
        </Section>
      )}
      {area.evening && (
        <Section title="Evening atmosphere">
          <p>{area.evening}</p>
        </Section>
      )}
      <Section title="Child suitability">
        <p className="capitalize">{area.childSuitability}</p>
      </Section>
      {area.considerations && (
        <Section title="Things to consider">
          <p>{area.considerations}</p>
        </Section>
      )}
      {attractions.length > 0 && (
        <Section title="Nearby attractions">
          <div className="space-y-2">
            {attractions.map((p) => (
              <PlaceCard key={p!.id} place={p!} />
            ))}
          </div>
        </Section>
      )}
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
