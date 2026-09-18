"use client";

import Link from "next/link";
import { Stay, Place } from "@/data/types";
import { localizeStay } from "@/data/stayTranslations";
import PlaceCard from "@/components/PlaceCard";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";
import { useLocale } from "@/lib/i18n";

export default function StayDetail({ stay: rawStay, nearby }: { stay: Stay; nearby: Place[] }) {
  const { t, locale } = useLocale();
  const stay = localizeStay(rawStay, locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/stays" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        {t("stay_back")}
      </Link>
      <h1 className="font-display mt-2 text-3xl font-semibold">{stay.name}</h1>
      <p style={{ color: "var(--muted)" }}>
        {stay.area} · {stay.type === "hotel" ? t("stay_type_hotel") : t("stay_type_apartment")}
      </p>
      <div className="mt-3 flex gap-2">
        <SaveButton kind="stay" id={stay.id} />
        <ShareButton title={stay.name} />
      </div>

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">{t("stay_guest_rating")}</h2>
        {stay.rating?.value != null ? (
          <div className="mt-2">
            <p className="text-2xl font-bold" style={{ color: "var(--bosphorus)" }}>
              {stay.rating.value}/{stay.rating.scale}
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {stay.rating.sourceName}
              {stay.rating.reviewCount ? ` · ${stay.rating.reviewCount.toLocaleString()}+ ${t("stay_reviews_suffix")}` : ""}
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {t("stay_checked")} {stay.rating.lastVerified}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {t("stay_rating_unverified")}
          </p>
        )}
      </section>

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">{t("stay_price")}</h2>
        <p className="mt-2">{stay.price.value ?? t("stay_price_unverified")}</p>
      </section>

      {stay.familyFeatures.length > 0 && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-lg font-semibold">{t("stay_family_features")}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {stay.familyFeatures.map((f) => (
              <li key={f}>☑️ {f}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">{t("stay_transport")}</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {stay.transport.map((tr) => (
            <li key={tr}>🚶 {tr}</li>
          ))}
        </ul>
      </section>

      {nearby.length > 0 && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-lg font-semibold">{t("stay_nearby")}</h2>
          <div className="mt-2 space-y-2">
            {nearby.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      )}

      {rawStay.officialUrl && (
        <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
          <a href={rawStay.officialUrl} target="_blank" rel="noopener noreferrer" className="tap-target inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--bosphorus)" }}>
            {t("stay_view_booking")}
          </a>
        </section>
      )}
    </div>
  );
}
