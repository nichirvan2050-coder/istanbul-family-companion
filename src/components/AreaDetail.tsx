"use client";

import Link from "next/link";
import { Area } from "@/data/types";
import { Place } from "@/data/types";
import { localizeArea } from "@/data/areaTranslations";
import PlaceCard from "@/components/PlaceCard";
import ShareButton from "@/components/ShareButton";
import { useLocale } from "@/lib/i18n";
import { aiStrings } from "@/lib/aiStrings";

export default function AreaDetail({ area: rawArea, attractions }: { area: Area; attractions: Place[] }) {
  const { t, locale } = useLocale();
  const s = aiStrings[locale];
  const area = localizeArea(rawArea, locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/family" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        {t("area_back_to_family")}
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{area.name}</h1>
      <div className="mt-2">
        <ShareButton title={area.name} text={area.whyFamilies} />
      </div>

      <Section title={t("area_why_families")}>
        <p>{area.whyFamilies}</p>
      </Section>
      <Section title={t("area_transport")}>
        <p>{area.transport}</p>
      </Section>
      <Section title={t("area_walking_conditions")}>
        <p>{s.walkingLevel(area.walking)}</p>
      </Section>
      {area.parksWaterfront && (
        <Section title={t("area_parks_waterfront")}>
          <p>{area.parksWaterfront}</p>
        </Section>
      )}
      {area.food && (
        <Section title={t("area_food")}>
          <p>{area.food}</p>
        </Section>
      )}
      {area.shopping && (
        <Section title={t("area_shopping")}>
          <p>{area.shopping}</p>
        </Section>
      )}
      {area.evening && (
        <Section title={t("area_evening")}>
          <p>{area.evening}</p>
        </Section>
      )}
      <Section title={t("area_child_suitability")}>
        <p>{s.familyLevel(area.childSuitability)}</p>
      </Section>
      {area.considerations && (
        <Section title={t("area_considerations")}>
          <p>{area.considerations}</p>
        </Section>
      )}
      {attractions.length > 0 && (
        <Section title={t("area_nearby_attractions")}>
          <div className="space-y-2">
            {attractions.map((p) => (
              <PlaceCard key={p.id} place={p} />
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
