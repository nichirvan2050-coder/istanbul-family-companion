"use client";

import Link from "next/link";
import { transportModes } from "@/data/transport";
import { localizeTransportMode } from "@/data/transportTranslations";
import { PageTitle } from "@/components/PageTitle";
import { useLocale } from "@/lib/i18n";

export default function TransportPageContent() {
  const { t, locale } = useLocale();
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <PageTitle k="transport_title" />
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {t("transport_times_approx")}
      </p>

      <Link href="/transport/istanbulkart" className="card mt-4 flex items-center gap-3 p-4">
        <span className="text-2xl">💳</span>
        <div>
          <p className="font-semibold">{t("transport_istanbulkart_title")}</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {t("transport_istanbulkart_subtitle")}
          </p>
        </div>
      </Link>

      <div className="mt-4 space-y-4">
        {transportModes.map((rawMode) => {
          const mode = localizeTransportMode(rawMode, locale);
          return (
            <section key={mode.id} id={mode.id} className="card p-4">
              <h2 className="font-display text-lg font-semibold">
                {mode.icon} {mode.title}
              </h2>
              <p className="mt-1 text-sm">{mode.summary}</p>
              {mode.lines && mode.lines.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {mode.lines.map((line) => (
                    <li key={line.name} className="rounded-lg p-2 text-sm" style={{ background: "var(--background)" }}>
                      <p className="font-semibold">{line.name}</p>
                      <p style={{ color: "var(--muted)" }}>{line.usefulFor}</p>
                      {line.keyStops && (
                        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                          {t("transport_key_stops")} {line.keyStops.join(" · ")}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--muted)" }}>
                {mode.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <Link href="/prices" className="card mt-4 flex items-center gap-3 p-4">
        <span className="text-2xl">🎟️</span>
        <div>
          <p className="font-semibold">{t("transport_fares_title")}</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {t("transport_fares_subtitle")}
          </p>
        </div>
      </Link>
    </div>
  );
}
