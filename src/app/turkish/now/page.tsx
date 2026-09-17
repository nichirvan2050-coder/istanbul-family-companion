import Link from "next/link";
import { needThisNowIds, phraseById } from "@/data/turkish";
import PhraseCard from "@/components/PhraseCard";

export const metadata = { title: "I Need This Now" };

export default function NeedThisNowPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/turkish" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← Turkish
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">🆘 I Need This Now</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        The essentials, large and simple, for when you need them fast.
      </p>
      <div className="mt-4 space-y-3">
        {needThisNowIds.map((id) => {
          const p = phraseById(id);
          if (!p) return null;
          return <PhraseCard key={id} phrase={p} />;
        })}
      </div>
    </div>
  );
}
