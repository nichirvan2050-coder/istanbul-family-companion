import Link from "next/link";
import { fareTable } from "@/data/transport";
import { freeAttractions, paidAttractions, museumPass } from "@/data/prices";
import { VerificationBadge } from "@/components/SourceTag";
import { PageTitle } from "@/components/PageTitle";

export const metadata = { title: "Tickets & Prices" };

export default function PricesPage() {
  const paidTotal = paidAttractions.filter((a) => a.status !== "unverified" && a.price);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <PageTitle k="prices_title" />
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Every changing figure below shows its source and the date it was checked. Treat 🟡 as a strong current estimate, not a live price.
      </p>

      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold">🚋 Transport fares</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--muted)" }}>
                <th className="py-1 pr-2">Transport</th>
                <th className="py-1 pr-2">Fare</th>
                <th className="py-1 pr-2">Type</th>
                <th className="py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {fareTable.map((row) => (
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
          Full transport guide →
        </Link>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">🆓 Free</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {freeAttractions.map((a) => (
            <Link
              key={a.name}
              href={a.placeId ? `/places/${a.placeId}` : "#"}
              className="rounded-full px-3 py-1.5 text-sm"
              style={{ background: "rgba(22,163,74,0.12)", color: "var(--success)" }}
            >
              {a.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">💰 Paid</h2>
        <div className="mt-2 space-y-2">
          {paidAttractions.map((a) => (
            <Link key={a.name} href={a.placeId ? `/places/${a.placeId}` : "/prices"} className="card flex items-center justify-between p-3">
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {a.sourceName} · Checked {a.lastVerified}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{a.price}</p>
                <VerificationBadge status={a.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-lg font-semibold">🏛️ Museum Pass Istanbul</h2>
        <div className="card mt-2 p-4">
          <p className="text-lg font-semibold">{museumPass.price.value}</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Valid {museumPass.price.validity}
          </p>
          <div className="mt-1">
            <VerificationBadge status={museumPass.price.status} />
            <span className="ml-2 text-xs" style={{ color: "var(--muted)" }}>
              Source: {museumPass.price.sourceName} · Checked {museumPass.price.lastVerified}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">✅ Included</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {museumPass.included.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">❌ Not included</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {museumPass.excluded.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            {museumPass.conditions}
          </p>
          <p className="mt-3 rounded-lg p-3 text-sm" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
            {museumPass.note}
          </p>
        </div>
        {paidTotal.length > 0 && (
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            This app does not calculate an individual-tickets-vs-pass total, since which sites you&apos;ll actually visit determines the answer — compare the prices above against the pass yourself.
          </p>
        )}
      </section>
    </div>
  );
}
