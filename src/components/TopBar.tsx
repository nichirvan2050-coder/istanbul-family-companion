import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { appName } from "@/data/settings";

export default function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b px-4 py-2.5 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/85"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <Link href="/" className="font-display text-base font-semibold" style={{ color: "var(--bosphorus-dark)" }}>
        {appName}
      </Link>
      <LanguageSwitcher compact />
    </header>
  );
}
