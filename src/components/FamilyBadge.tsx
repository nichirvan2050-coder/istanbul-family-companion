import { FamilyLevel } from "@/data/types";

const config: Record<FamilyLevel, { emoji: string; label: string; color: string; bg: string }> = {
  easy: { emoji: "🟢", label: "Easy", color: "#1a9c63", bg: "rgba(31,174,110,0.14)" },
  moderate: { emoji: "🟡", label: "Moderate", color: "#c98a00", bg: "rgba(255,194,51,0.20)" },
  difficult: { emoji: "🔴", label: "Difficult", color: "#d84a35", bg: "rgba(232,84,61,0.14)" },
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
