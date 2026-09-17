import { VerificationStatus } from "@/data/types";

const statusConfig: Record<VerificationStatus, { emoji: string; label: string; color: string }> = {
  verified: { emoji: "🟢", label: "Verified", color: "#2f7d5a" },
  check: { emoji: "🟡", label: "Check before visiting", color: "#b8912f" },
  unverified: { emoji: "🔴", label: "Not verified", color: "#b34638" },
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const c = statusConfig[status];
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: c.color }}>
      <span aria-hidden>{c.emoji}</span>
      {c.label}
    </span>
  );
}

export default function SourceTag({
  sourceName,
  sourceUrl,
  lastVerified,
  status,
}: {
  sourceName: string;
  sourceUrl?: string;
  lastVerified: string;
  status?: VerificationStatus;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs" style={{ color: "var(--muted)" }}>
      {status && <VerificationBadge status={status} />}
      <span>
        Source:{" "}
        {sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: "var(--bosphorus)" }}>
            {sourceName}
          </a>
        ) : (
          sourceName
        )}
      </span>
      <span>· Checked {lastVerified}</span>
    </div>
  );
}
