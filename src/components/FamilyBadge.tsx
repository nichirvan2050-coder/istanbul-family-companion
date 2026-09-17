import { FamilyLevel } from "@/data/types";

const config: Record<FamilyLevel, { emoji: string; label: string; color: string; bg: string }> = {
  easy: { emoji: "🟢", label: "Easy", color: "#2f7d5a", bg: "rgba(47,125,90,0.12)" },
  moderate: { emoji: "🟡", label: "Moderate", color: "#b8912f", bg: "rgba(184,145,47,0.14)" },
  difficult: { emoji: "🔴", label: "Difficult", color: "#b34638", bg: "rgba(179,70,56,0.12)" },
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
