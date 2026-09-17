import { Station } from "@/data/types";
import { formatDistance, walkingMinutes } from "@/lib/geo";

const modeIcon: Record<string, string> = { tram: "🚋", metro: "🚇", marmaray: "🚆", ferry: "⛴️", funicular: "🚡" };

export default function StationCard({ station, distanceKm }: { station: Station; distanceKm?: number }) {
  const icon = modeIcon[station.modes[0]] ?? "🚏";
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${station.name} ${station.area} Istanbul`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex items-center gap-3 p-3 transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: "var(--terracotta-light)" }} aria-hidden>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{station.name}</p>
        <p className="truncate text-xs" style={{ color: "var(--muted)" }}>
          {station.lines.join(" · ")} · {station.area}
        </p>
      </div>
      {distanceKm !== undefined && (
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold" style={{ color: "var(--bosphorus)" }}>
            {formatDistance(distanceKm)}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            ~{walkingMinutes(distanceKm)} min walk
          </p>
        </div>
      )}
    </a>
  );
}
