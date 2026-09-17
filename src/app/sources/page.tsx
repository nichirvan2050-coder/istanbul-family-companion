import { sourceDirectory } from "@/data/sources";
import { PageTitle } from "@/components/PageTitle";

export const metadata = { title: "Sources" };

const typeLabel: Record<string, string> = { official: "🟢 Official", reputable: "🔵 Reputable", community: "🟠 Community", unverified: "⚪ Unverified" };

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <PageTitle k="sources_title" />
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        The official and reputable sources used throughout this guide.
      </p>
      <div className="mt-4 space-y-3">
        {sourceDirectory.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="card block p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold">{s.name}</p>
              <span className="shrink-0 text-xs" style={{ color: "var(--muted)" }}>
                {typeLabel[s.type]}
              </span>
            </div>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              {s.description}
            </p>
            <p className="mt-1 truncate text-xs underline" style={{ color: "var(--bosphorus)" }}>
              {s.url}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
