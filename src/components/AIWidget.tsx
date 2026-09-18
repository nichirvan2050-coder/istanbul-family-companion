"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { askIstanbulAI, quickPrompts, AICard, AIResponse } from "@/lib/ai";
import { aiStrings } from "@/lib/aiStrings";
import { canListen, listen, speak, canSpeak } from "@/lib/speech";
import { formatDistance } from "@/lib/geo";
import { useLocale } from "@/lib/i18n";
import { Locale } from "@/locales/translations";

// No dedicated Kurdish voice/speech-recognition is generally available in
// browsers; Arabic shares the script and is closer than an English voice
// trying to read Arabic-script text, so it's used as a best-effort fallback.
const speechLang: Record<Locale, string> = { en: "en-US", ar: "ar-SA", ku: "ar-SA" };

interface Turn {
  query: string;
  response: AIResponse;
}

function CardRow({ card }: { card: AICard }) {
  const isExternal = card.href.startsWith("http");
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{card.title}</p>
        {card.subtitle && (
          <p className="truncate text-xs" style={{ color: "var(--muted)" }}>
            {card.subtitle}
            {card.distanceKm !== undefined ? ` · ${formatDistance(card.distanceKm)}` : ""}
          </p>
        )}
      </div>
      {card.price && (
        <span className="line-clamp-2 max-w-[35%] shrink-0 text-right text-xs font-medium" style={{ color: "var(--bosphorus)" }}>
          {card.price}
        </span>
      )}
    </>
  );
  const className = "card flex items-center justify-between gap-2 p-2.5 text-left transition-shadow hover:shadow-sm";
  return isExternal ? (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={card.href} className={className}>
      {content}
    </Link>
  );
}

export default function AIWidget() {
  const { t, locale } = useLocale();
  const s = aiStrings[locale];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [listening, setListening] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const stopListenRef = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  useEffect(() => {
    function handler(e: Event) {
      setOpen(true);
      const q = (e as CustomEvent<{ query?: string }>).detail?.query;
      if (q) runQuery(q, quickPrompts.find((p) => p.query === q)?.labels[locale]);
    }
    window.addEventListener("my-istanbul:open-ai", handler);
    return () => window.removeEventListener("my-istanbul:open-ai", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turns, coords]);

  function runQuery(q: string, displayLabel?: string) {
    if (!q.trim()) return;
    const lastCards = turns[turns.length - 1]?.response.cards;
    const response = askIstanbulAI(q, { lastCards, userCoords: coords }, locale);
    setTurns((prev) => [...prev, { query: displayLabel ?? q, response }]);
    setInput("");
    if (canSpeak() && response.text) speak(response.text, speechLang[locale]);
  }

  function requestLocation(then?: (c: { lat: number; lng: number }) => void) {
    if (!("geolocation" in navigator)) {
      runQuery("near me");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(c);
        then?.(c);
      },
      () => runQuery("near me"),
      { timeout: 5000 }
    );
  }

  function handleMic() {
    if (listening) {
      stopListenRef.current?.();
      setListening(false);
      return;
    }
    if (!canListen()) {
      setTurns((prev) => [...prev, { query: "🎙️", response: { intent: "unknown", text: s.voiceNotSupported, cards: [] } }]);
      return;
    }
    setListening(true);
    const stop = listen(
      (transcript) => {
        setListening(false);
        runQuery(transcript);
      },
      () => setListening(false),
      speechLang[locale]
    );
    stopListenRef.current = stop;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-lg tap-target"
        style={{ background: "linear-gradient(135deg, var(--terracotta), var(--gold))" }}
        aria-label={t("ai_widget_open_aria")}
      >
        ✨ AI
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" role="dialog" aria-modal="true" aria-label={t("ai_widget_title")}>
          <div className="flex h-[85vh] w-full max-w-lg flex-col rounded-t-2xl sm:rounded-2xl card" style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-display text-lg font-semibold">{t("ai_widget_title")}</h2>
              <button onClick={() => setOpen(false)} className="tap-target rounded-full px-2 text-xl" aria-label={t("ai_widget_close_aria")}>
                ×
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {turns.length === 0 && (
                <div>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {t("ai_widget_intro")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quickPrompts.map((q) => (
                      <button
                        key={q.query}
                        onClick={() =>
                          q.query === "What's near me right now?"
                            ? requestLocation((c) => setTurns((prev) => [...prev, { query: q.labels[locale], response: askIstanbulAI(q.query, { userCoords: c }, locale) }]))
                            : runQuery(q.query, q.labels[locale])
                        }
                        className="rounded-full border px-3 py-1.5 text-sm"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {q.labels[locale]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {turns.map((turn, i) => (
                <div key={i} className="space-y-2 animate-fade-in-up">
                  <p className="ml-auto max-w-[85%] rounded-2xl px-3 py-2 text-sm text-white" style={{ background: "var(--bosphorus)", width: "fit-content" }}>
                    {turn.query}
                  </p>
                  <div className="max-w-[95%] space-y-2">
                    <p className="text-sm">{turn.response.text}</p>
                    {turn.response.cards.length > 0 && (
                      <div className="space-y-1.5">
                        {turn.response.cards.map((c) => (
                          <CardRow key={`${c.kind}-${c.id}`} card={c} />
                        ))}
                      </div>
                    )}
                    {turn.response.sourceNote && (
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        {t("ai_widget_source_prefix")} {turn.response.sourceNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                runQuery(input);
              }}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                type="button"
                onClick={handleMic}
                className="tap-target flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ background: listening ? "var(--terracotta)" : "var(--terracotta-light)", color: listening ? "white" : "var(--terracotta)" }}
                aria-label={listening ? t("ai_widget_mic_stop_aria") : t("ai_widget_mic_start_aria")}
              >
                🎙️
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai_widget_placeholder")}
                className="tap-target flex-1 rounded-full border px-4 py-2 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--background)" }}
              />
              <button type="submit" className="tap-target rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--bosphorus)" }}>
                {t("ai_widget_ask")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
