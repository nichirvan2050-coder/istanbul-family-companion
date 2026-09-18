"use client";

import Link from "next/link";
import { fareTable } from "@/data/transport";
import { localizeFareTable } from "@/data/transportTranslations";
import { VerificationBadge } from "@/components/SourceTag";
import { useLocale } from "@/lib/i18n";

export default function FareTableSection() {
  const { t, locale } = useLocale();
  const rows = localizeFareTable(fareTable, locale);

  return (
    <section className="mt-6">
      <h2 className="font-display text-lg font-semibold">🚋 {t("prices_transport_fares")}</h2>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr className="text-left" style={{ color: "var(--muted)" }}>
              <th className="py-1 pr-2">{t("prices_col_transport")}</th>
              <th className="py-1 pr-2">{t("prices_col_fare")}</th>
              <th className="py-1 pr-2">{t("prices_col_type")}</th>
              <th className="py-1">{t("prices_col_status")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.transport} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-2 pr-2 font-medium">{row.transport}</td>
                <td className="py-2 pr-2">{row.fare}</td>
                <td className="py-2 pr-2" style={{ color: "var(--muted)" }}>
                  {row.fareType}
                </td>
                <td className="py-2">
                  <VerificationBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/transport" className="mt-2 inline-block text-sm underline" style={{ color: "var(--bosphorus)" }}>
        {t("prices_full_transport_guide")}
      </Link>
    </section>
  );
}
