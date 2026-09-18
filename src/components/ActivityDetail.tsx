"use client";

import { Activity } from "@/data/types";
import { localizeActivity } from "@/data/activityTranslations";
import SourceTag from "@/components/SourceTag";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";
import { useLocale } from "@/lib/i18n";
import Link from "next/link";

export default function ActivityDetail({ activity: rawActivity }: { activity: Activity }) {
  const { t, locale } = useLocale();
  const activity = localizeActivity(rawActivity, locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/activities" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        {t("activity_back")}
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{activity.name}</h1>
      <p style={{ color: "var(--muted)" }}>{activity.district}</p>
      <div className="mt-3 flex gap-2">
        <SaveButton kind="activity" id={activity.id} />
        <ShareButton title={activity.name} />
      </div>

      <Section title={t("activity_age_suitability")}>
        <p>{activity.ageSuitability}</p>
      </Section>
      <Section title={t("activity_duration")}>
        <p>{activity.duration}</p>
      </Section>
      <Section title={t("activity_price")}>
        {activity.price ? (
          <div>
            <p className="font-semibold">{activity.price.value}</p>
            {activity.price.note && <p className="text-sm" style={{ color: "var(--muted)" }}>{activity.price.note}</p>}
            <div className="mt-1">
              <SourceTag sourceName={activity.price.sourceName} sourceUrl={activity.price.sourceUrl} lastVerified={activity.price.lastVerified} status={activity.price.status} />
            </div>
          </div>
        ) : (
          <p>{t("activity_price_unverified")}</p>
        )}
      </Section>
      <Section title={t("activity_location")}>
        <p>{activity.location}</p>
      </Section>
      <Section title={t("activity_transport")}>
        <ul className="space-y-1 text-sm">
          {activity.transport.map((tr, i) => (
            <li key={i}>
              {tr.detail ?? tr.mode} {tr.duration ? `(${tr.duration})` : ""}
            </li>
          ))}
        </ul>
      </Section>
      <Section title={t("activity_stroller_suitability")}>
        <p>{activity.strollerSuitability}</p>
      </Section>
      {activity.toilets && (
        <Section title={t("activity_toilets")}>
          <p>{activity.toilets}</p>
        </Section>
      )}
      {activity.nearbyFood && (
        <Section title={t("activity_nearby_food")}>
          <p>{activity.nearbyFood}</p>
        </Section>
      )}
      {activity.officialUrl && (
        <Section title={t("activity_official")}>
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
