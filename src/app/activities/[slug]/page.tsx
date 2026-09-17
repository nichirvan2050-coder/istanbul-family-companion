import Link from "next/link";
import { notFound } from "next/navigation";
import { activities, activityById } from "@/data/activities";
import SourceTag from "@/components/SourceTag";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = activityById(slug);
  return a ? { title: a.name } : {};
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activityById(slug);
  if (!activity) notFound();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/activities" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Family Activities
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{activity.name}</h1>
      <p style={{ color: "var(--muted)" }}>{activity.district}</p>
      <div className="mt-3 flex gap-2">
        <SaveButton kind="activity" id={activity.id} />
        <ShareButton title={activity.name} />
      </div>

      <Section title="Age suitability">
        <p>{activity.ageSuitability}</p>
      </Section>
      <Section title="Duration">
        <p>{activity.duration}</p>
      </Section>
      <Section title="Price">
        {activity.price ? (
          <div>
            <p className="font-semibold">{activity.price.value}</p>
            {activity.price.note && <p className="text-sm" style={{ color: "var(--muted)" }}>{activity.price.note}</p>}
            <div className="mt-1">
              <SourceTag sourceName={activity.price.sourceName} sourceUrl={activity.price.sourceUrl} lastVerified={activity.price.lastVerified} status={activity.price.status} />
            </div>
          </div>
        ) : (
          <p>Price not currently verified.</p>
        )}
      </Section>
      <Section title="Location">
        <p>{activity.location}</p>
      </Section>
      <Section title="Transport">
        <ul className="space-y-1 text-sm">
          {activity.transport.map((t, i) => (
            <li key={i}>
              {t.detail ?? t.mode} {t.duration ? `(${t.duration})` : ""}
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Stroller suitability">
        <p>{activity.strollerSuitability}</p>
      </Section>
      {activity.toilets && (
        <Section title="Toilets">
          <p>{activity.toilets}</p>
        </Section>
      )}
      {activity.nearbyFood && (
        <Section title="Nearby food">
          <p>{activity.nearbyFood}</p>
        </Section>
      )}
      {activity.officialUrl && (
        <Section title="Official">
          <a href={activity.officialUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
            {activity.officialUrl}
          </a>
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
