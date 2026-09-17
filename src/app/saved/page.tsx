"use client";

import { useEffect, useState } from "react";
import { getSaved, SavedItem, removeSaved } from "@/lib/storage";
import { placeById } from "@/data/places";
import { activityById } from "@/data/activities";
import { stayById } from "@/data/stays";
import { areaById } from "@/data/areas";
import { phraseById } from "@/data/turkish";
import PlaceCard from "@/components/PlaceCard";
import PhraseCard from "@/components/PhraseCard";
import Link from "next/link";

export default function SavedPage() {
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const load = () => setItems(getSaved());
    load();
    window.addEventListener("my-istanbul:saved-changed", load);
    return () => window.removeEventListener("my-istanbul:saved-changed", load);
  }, []);

  const places = items.filter((i) => i.kind === "place").map((i) => placeById(i.id)).filter(Boolean);
  const activities = items.filter((i) => i.kind === "activity").map((i) => activityById(i.id)).filter(Boolean);
  const stays = items.filter((i) => i.kind === "stay").map((i) => stayById(i.id)).filter(Boolean);
  const areasSaved = items.filter((i) => i.kind === "area").map((i) => areaById(i.id)).filter(Boolean);
  const phrases = items.filter((i) => i.kind === "phrase").map((i) => phraseById(i.id)).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-6">
        <h1 className="font-display text-2xl font-semibold">❤️ Saved</h1>
        <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
          Nothing saved yet. Tap the ❤️ on any place, activity, stay, or Turkish phrase to keep it here — stored only on this device.
        </p>
        <Link href="/places" className="mt-4 inline-block text-sm underline" style={{ color: "var(--bosphorus)" }}>
          Browse places →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">❤️ Saved</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Stored only in this browser — nothing is sent anywhere.
      </p>

      {places.length > 0 && (
        <Section title="Places">
          {places.map((p) => (
            <PlaceCard key={p!.id} place={p!} />
          ))}
        </Section>
      )}
      {activities.length > 0 && (
        <Section title="Activities">
          {activities.map((a) => (
            <Link key={a!.id} href={`/activities/${a!.id}`} className="card block p-3">
              {a!.name}
            </Link>
          ))}
        </Section>
      )}
      {stays.length > 0 && (
        <Section title="Stays">
          {stays.map((s) => (
            <Link key={s!.id} href={`/stays/${s!.id}`} className="card block p-3">
              {s!.name}
            </Link>
          ))}
        </Section>
      )}
      {areasSaved.length > 0 && (
        <Section title="Areas">
          {areasSaved.map((a) => (
            <Link key={a!.id} href={`/areas/${a!.id}`} className="card block p-3">
              {a!.name}
            </Link>
          ))}
        </Section>
      )}
      {phrases.length > 0 && (
        <Section title="My Turkish">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {phrases.map((p) => (
              <PhraseCard key={p!.id} phrase={p!} />
            ))}
          </div>
        </Section>
      )}

      <button
        onClick={() => {
          items.forEach((i) => removeSaved(i.kind, i.id));
          setItems([]);
        }}
        className="mt-8 text-sm underline"
        style={{ color: "var(--danger)" }}
      >
        Clear all saved items
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}
