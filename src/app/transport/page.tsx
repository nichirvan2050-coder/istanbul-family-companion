import Link from "next/link";
import { transportModes } from "@/data/transport";

export const metadata = { title: "Transport" };

export default function TransportPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">🚋 Istanbul Transport</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Times are approximate (e.g. ~15–25 min) — actual travel time depends on crowds and traffic.
      </p>

      <Link href="/transport/istanbulkart" className="card mt-4 flex items-center gap-3 p-4">
        <span className="text-2xl">💳</span>
        <div>
          <p className="font-semibold">Istanbulkart</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            The one card for nearly all public transport
          </p>
        </div>
      </Link>

      <div className="mt-4 space-y-4">
        {transportModes.map((mode) => (
          <section key={mode.id} id={mode.id} className="card p-4">
            <h2 className="font-display text-lg font-semibold">
              {mode.icon} {mode.title}
            </h2>
            <p className="mt-1 text-sm">{mode.summary}</p>
            {mode.lines && mode.lines.length > 0 && (
              <ul className="mt-2 space-y-2">
                {mode.lines.map((line) => (
                  <li key={line.name} className="rounded-lg p-2 text-sm" style={{ background: "var(--background)" }}>
                    <p className="font-semibold">{line.name}</p>
                    <p style={{ color: "var(--muted)" }}>{line.usefulFor}</p>
                    {line.keyStops && (
                      <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                        Key stops: {line.keyStops.join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--muted)" }}>
              {mode.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link href="/prices" className="card mt-4 flex items-center gap-3 p-4">
        <span className="text-2xl">🎟️</span>
        <div>
          <p className="font-semibold">Fares & attraction prices</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Full current fare table with sources
          </p>
        </div>
      </Link>
    </div>
  );
}
