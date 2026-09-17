"use client";

import Link from "next/link";
import TodayPlanCard from "@/components/TodayPlanCard";
import OpenAIButton from "@/components/OpenAIButton";
import { quickPrompts } from "@/lib/ai";
import { useLocale } from "@/lib/i18n";

export default function Home() {
  const { t } = useLocale();

  const familyQuickAccess = [
    { label: t("home_family_places"), icon: "👨‍👩‍👧", href: "/places?family=easy" },
    { label: t("home_family_stays"), icon: "🛏️", href: "/stays" },
    { label: t("home_family_parks"), icon: "🌳", href: "/places?category=park" },
    { label: t("home_family_kids"), icon: "🧒", href: "/activities" },
  ];

  return (
    <div className="mx-auto max-w-xl">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-5 pb-12 pt-14 text-white"
        style={{ background: "linear-gradient(140deg, var(--bosphorus-dark) 0%, var(--bosphorus) 60%, var(--terracotta) 130%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" aria-hidden />
        <svg className="pointer-events-none absolute -right-16 -top-16 opacity-25" width="260" height="260" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1" />
        </svg>
        <svg className="pointer-events-none absolute -bottom-20 -left-16 opacity-20" width="220" height="220" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="50" fill="#FFFFFF" />
        </svg>
        <div className="relative">
          <p className="text-sm font-medium tracking-wide opacity-90">{t("home_kicker")}</p>
          <h1 className="font-display mt-1 text-6xl font-bold tracking-tight drop-shadow-sm">{t("home_title")}</h1>
          <p className="font-display mt-2 text-xl opacity-95">{t("home_subtitle")}</p>
          <p className="mt-3 text-sm opacity-85">{t("home_tags")}</p>
          <Link
            href="/plan"
            className="tap-target mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-lg transition-transform active:scale-95"
            style={{ color: "var(--bosphorus-dark)" }}
          >
            {t("home_cta")}
          </Link>
        </div>
      </section>

      <div className="space-y-8 px-4 py-6">
        {/* Today's plan / next stop */}
        <section>
          <TodayPlanCard />
        </section>

        {/* Ask Istanbul AI */}
        <section
          className="card p-4"
          style={{ background: "linear-gradient(160deg, var(--surface), var(--terracotta-light))" }}
        >
          <h2 className="font-display text-lg font-semibold">{t("home_ai_title")}</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {t("home_ai_example")}
          </p>
          <div className="mt-3 flex gap-2">
            <OpenAIButton
              className="tap-target flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-md"
              style={{ background: "linear-gradient(135deg, var(--terracotta), var(--gold))" }}
            >
              {t("home_ai_speak")}
            </OpenAIButton>
            <OpenAIButton
              className="tap-target flex flex-1 items-center justify-center gap-2 rounded-full border bg-white/60 py-3 text-sm font-semibold"
              style={{ borderColor: "var(--border)" }}
            >
              {t("home_ai_ask")}
            </OpenAIButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <OpenAIButton
                key={q.label}
                query={q.query}
                className="rounded-full border bg-white/70 px-3 py-1.5 text-sm"
                style={{ borderColor: "var(--border)" }}
              >
                {q.label}
              </OpenAIButton>
            ))}
          </div>
        </section>

        {/* Family quick access */}
        <section>
          <h2 className="font-display text-lg font-semibold">{t("home_family_title")}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {familyQuickAccess.map((item) => (
              <Link key={item.label} href={item.href} className="card flex items-center gap-3 p-3 transition-shadow hover:shadow-md">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
                  style={{ background: "var(--terracotta-light)" }}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link href="/transport/istanbulkart" className="card p-4 transition-shadow hover:shadow-md">
            <p className="text-2xl">💳</p>
            <p className="mt-1 font-semibold">{t("home_istanbulkart_title")}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {t("home_istanbulkart_subtitle")}
            </p>
          </Link>
          <Link href="/turkish" className="card p-4 transition-shadow hover:shadow-md">
            <p className="text-2xl">🇹🇷</p>
            <p className="mt-1 font-semibold">{t("home_turkish_title")}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {t("home_turkish_subtitle")}
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
