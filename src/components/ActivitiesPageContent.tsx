"use client";

import Link from "next/link";
import { activities } from "@/data/activities";
import { localizeActivity } from "@/data/activityTranslations";
import { VerificationBadge } from "@/components/SourceTag";
import { useLocale } from "@/lib/i18n";

export default function ActivitiesPageContent() {
  const { t, locale } = useLocale();

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">{t("activities_title")}</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {t("activities_intro")}
      </p>
      <div className="mt-4 space-y-3">
        {activities.map((rawAct) => {
          const a = localizeActivity(rawAct, locale);
          return (
            <Link key={a.id} href={`/activities/${a.id}`} className="card block p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{a.name}</p>
                <VerificationBadge status={a.status} />
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {a.district} · {a.duration}
              </p>
              <p className="mt-1 text-sm">{a.ageSuitability}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
