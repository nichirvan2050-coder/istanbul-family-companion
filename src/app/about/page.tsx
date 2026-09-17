export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">About My Istanbul</h1>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed">
        <p>
          This guide combines curated Istanbul information with official and reliable sources. Historical
          information is presented in a concise, travel-friendly format, while changing information such as
          prices, schedules, opening hours, and ratings is accompanied by a source and a verification date.
          Because travel information changes, you should check official sources before visiting when
          information is time-sensitive.
        </p>
        <p>
          This is not a booking platform, a travel marketplace, or a social network. It was built first for
          one family&apos;s ten-day Istanbul trip, and kept intentionally simple: places, a realistic
          itinerary, transport, prices, a practical Turkish phrasebook, and an AI assistant that only ever
          searches this app&apos;s own verified data.
        </p>
        <h2 className="font-display text-lg font-semibold">How verification works</h2>
        <p>
          Every place shows 🟢 Verified, 🟡 Check before visiting, or 🔴 Not verified next to time-sensitive
          facts, along with the source name, a link, and the date it was last checked. See{" "}
          <a href="/sources" className="underline" style={{ color: "var(--bosphorus)" }}>
            the source directory
          </a>{" "}
          for the official sites used throughout.
        </p>
        <h2 className="font-display text-lg font-semibold">Istanbul AI</h2>
        <p>
          The AI assistant is a rule-based search engine over this app&apos;s own data files — it does not
          call an external language model, and it cannot invent a place, price, or fact that isn&apos;t
          already in the guide. Voice input and phrase pronunciation both use your device&apos;s built-in
          browser speech features; nothing is recorded or sent to a server.
        </p>
        <h2 className="font-display text-lg font-semibold">Privacy</h2>
        <p>
          Saved places, activities, stays, and phrases are stored only in this browser&apos;s local storage —
          not on any server, and not tied to an account. Location is only used if you grant permission for
          &quot;Near Me&quot; searches, and is never stored.
        </p>
      </div>
    </div>
  );
}
