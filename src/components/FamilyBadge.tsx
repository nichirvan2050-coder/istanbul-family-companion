import { FamilyLevel } from "@/data/types";

const config: Record<FamilyLevel, { emoji: string; label: string; color: string; bg: string }> = {
  easy: { emoji: "🟢", label: "Easy", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  moderate: { emoji: "🟡", label: "Moderate", color: "#d97706", bg: "rgba(217,119,6,0.14)" },
  difficult: { emoji: "🔴", label: "Difficult", color: "#dc2626", bg: "rgba(220,38,38,0.12)" },
};

export default function FamilyBadge({ level, size = "sm" }: { level: FamilyLevel; size?: "sm" | "md" }) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}`}
      style={{ color: c.color, background: c.bg }}
    >
      <span aria-hidden>{c.emoji}</span>
      {c.label} with kids
    </span>
  );
}
