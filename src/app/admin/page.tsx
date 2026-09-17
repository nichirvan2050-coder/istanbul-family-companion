"use client";

import { useState } from "react";
import { places } from "@/data/places";
import { areas } from "@/data/areas";
import { activities } from "@/data/activities";
import { stays } from "@/data/stays";
import { turkishPhrases } from "@/data/turkish";
import { itinerary } from "@/data/itinerary";
import { sourceDirectory } from "@/data/sources";

const datasets = [
  { name: "Places", file: "src/data/places.ts", data: places },
  { name: "Areas", file: "src/data/areas.ts", data: areas },
  { name: "Activities", file: "src/data/activities.ts", data: activities },
  { name: "Stays", file: "src/data/stays.ts", data: stays },
  { name: "Turkish phrases", file: "src/data/turkish.ts", data: turkishPhrases },
  { name: "Itinerary", file: "src/data/itinerary.ts", data: itinerary },
  { name: "Sources", file: "src/data/sources.ts", data: sourceDirectory },
];

// This is a lightweight local gate for convenience only — not real
// authentication. The app has no backend/database, so there is nothing to
// secure server-side: all content lives in version-controlled TypeScript
// data files (see each dataset's "file" path below) and updating the app
// means editing those files and redeploying, as explained on this page.
export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [openDataset, setOpenDataset] = useState<string | null>(null);

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-xl px-4 py-6">
        <h1 className="font-display text-2xl font-semibold">Admin</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          For the person maintaining this guide&apos;s content only.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === "istanbul") setUnlocked(true);
          }}
          className="card mt-4 space-y-3 p-4"
        >
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Passphrase"
            className="tap-target w-full rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
          />
          <button type="submit" className="tap-target w-full rounded-full py-2 text-sm font-semibold text-white" style={{ background: "var(--bosphorus)" }}>
            Enter
          </button>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            This is a basic local gate, not real authentication — the app has no user accounts or server.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">Admin — Data Overview</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        This app has no database or backend — every fact lives in a version-controlled TypeScript file under{" "}
        <code>src/data/</code>. To update content: edit the relevant file, commit, and redeploy (see the
        implementation report for deploy steps). This page is a read-only overview so you can see what
        exists and how many records each dataset has before opening the file.
      </p>

      <div className="mt-4 space-y-3">
        {datasets.map((d) => (
          <div key={d.name} className="card p-4">
            <button className="flex w-full items-center justify-between text-left" onClick={() => setOpenDataset(openDataset === d.name ? null : d.name)}>
              <span className="font-semibold">
                {d.name} ({d.data.length})
              </span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {d.file}
              </span>
            </button>
            {openDataset === d.name && (
              <pre className="mt-3 max-h-64 overflow-auto rounded-lg p-3 text-xs" style={{ background: "var(--background)" }}>
                {JSON.stringify(d.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
