import Link from "next/link";
import TodayPlanCard from "@/components/TodayPlanCard";
import OpenAIButton from "@/components/OpenAIButton";
import { quickPrompts } from "@/lib/ai";

const familyQuickAccess = [
  { label: "Family Places", icon: "👨‍👩‍👧", href: "/places?family=easy" },
  { label: "Family Stays", icon: "🛏️", href: "/stays" },
  { label: "Parks", icon: "🌳", href: "/places?category=park" },
  { label: "Kids Activities", icon: "🧒", href: "/activities" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-xl">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-5 pb-10 pt-14 text-white"
        style={{ background: "linear-gradient(160deg, var(--bosphorus-dark), var(--bosphorus) 55%, var(--terracotta) 130%)" }}
      >
        <svg className="pointer-events-none absolute -right-10 -top-10 opacity-20" width="220" height="220" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1.5" />
        </svg>
        <p className="text-sm font-medium tracking-wide opacity-90">Kurdistan Next family trip guide</p>
        <h1 className="font-display mt-1 text-5xl font-bold tracking-tight">ISTANBUL</h1>
        <p className="font-display mt-2 text-xl">See the city. Understand its story.</p>
        <p className="mt-3 text-sm opacity-90">10 Days • Family • History • Transport • AI</p>
        <Link
          href="/plan"
          className="tap-target mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold shadow"
          style={{ color: "var(--bosphorus-dark)" }}
        >
          Start Exploring
        </Link>
      </section>

      <div className="space-y-8 px-4 py-6">
        {/* Today's plan / next stop */}
        <section>
          <TodayPlanCard />
        </section>

        {/* Ask Istanbul AI */}
        <section className="card p-4">
          <h2 className="font-display text-lg font-semibold">✨ Ask Istanbul AI</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            &quot;What can we visit near here with our daughter?&quot;
          </p>
          <div className="mt-3 flex gap-2">
            <OpenAIButton
              className="tap-target flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
              style={{ background: "var(--terracotta)" }}
            >
              🎙️ Tap to Speak
            </OpenAIButton>
            <OpenAIButton
              className="tap-target flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold"
              style={{ borderColor: "var(--border)" }}
            >
              ⌨️ Ask anything
            </OpenAIButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <OpenAIButton key={q.label} query={q.query} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: "var(--border)" }}>
                {q.label}
              </OpenAIButton>
            ))}
          </div>
        </section>

        {/* Family quick access */}
        <section>
          <h2 className="font-display text-lg font-semibold">Traveling with Family?</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {familyQuickAccess.map((item) => (
              <Link key={item.label} href={item.href} className="card flex items-center gap-3 p-3">
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link href="/transport/istanbulkart" className="card p-4">
            <p className="text-2xl">💳</p>
            <p className="mt-1 font-semibold">Istanbulkart</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Get set up on transport
            </p>
          </Link>
          <Link href="/turkish" className="card p-4">
            <p className="text-2xl">🇹🇷</p>
            <p className="mt-1 font-semibold">Turkish for Your Trip</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Practical phrases + audio
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
