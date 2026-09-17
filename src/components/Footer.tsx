import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mt-10 max-w-xl px-4 pb-6 text-xs" style={{ color: "var(--muted)" }}>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/about">About</Link>
        <Link href="/sources">Sources</Link>
        <Link href="/before-you-go">Before Istanbul</Link>
        <Link href="/prices">Prices</Link>
        <Link href="/family">Family</Link>
      </div>
    </footer>
  );
}
