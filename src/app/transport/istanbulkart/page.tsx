import Link from "next/link";
import { istanbulkart } from "@/data/transport";
import SourceTag from "@/components/SourceTag";

export const metadata = { title: "Istanbulkart" };

export default function IstanbulkartPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/transport" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Transport
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">💳 Istanbulkart</h1>

      <Section title="What it is">
        <p>{istanbulkart.whatIsIt}</p>
      </Section>

      <Section title="Where to get it">
        <p>{istanbulkart.whereToGet}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <a href={istanbulkart.officialUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
            Official site
          </a>
          <a href={istanbulkart.centersUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
            Service/application centers
          </a>
        </div>
      </Section>

      <Section title="How to load it">
        <p>{istanbulkart.howToLoad}</p>
      </Section>

      <Section title="How to use it">
        <p>{istanbulkart.howToUse}</p>
      </Section>

      <Section title="Card cost">
        <p className="font-semibold">{istanbulkart.cardFee.value}</p>
        <div className="mt-1">
          <SourceTag sourceName={istanbulkart.cardFee.sourceName} sourceUrl={istanbulkart.cardFee.sourceUrl} lastVerified={istanbulkart.cardFee.lastVerified} status={istanbulkart.cardFee.status} />
        </div>
      </Section>

      <Section title="For two adults and a child">
        <p>Two adults: 2 standard Istanbulkart cards.</p>
        <p className="mt-2 font-semibold" style={{ color: "var(--warning)" }}>
          🟡 {istanbulkart.familyNote}
        </p>
      </Section>
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
