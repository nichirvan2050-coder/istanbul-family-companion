import Link from "next/link";
import { activities } from "@/data/activities";
import { VerificationBadge } from "@/components/SourceTag";

export const metadata = { title: "Family Activities" };

export default function ActivitiesPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">🧒 Family Activities</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Only activities we could source and describe factually — operating status can change, so check before visiting.
      </p>
      <div className="mt-4 space-y-3">
        {activities.map((a) => (
          <Link key={a.id} href={`/activities/${a.id}`} className="card block p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{a.name}</p>
              <VerificationBadge status={a.status} />
            </div>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {a.district} · {a.duration}
            </p>
            <p className="mt-1 text-sm">{a.ageSuitability}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
