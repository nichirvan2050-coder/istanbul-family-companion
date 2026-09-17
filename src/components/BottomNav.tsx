"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";
import { TranslationKey } from "@/locales/translations";

const navItems: { href: string; icon: string; key: TranslationKey }[] = [
  { href: "/", icon: "🏠", key: "nav_home" },
  { href: "/plan", icon: "🗓️", key: "nav_plan" },
  { href: "/places", icon: "📍", key: "nav_places" },
  { href: "/transport", icon: "🚋", key: "nav_transport" },
  { href: "/saved", icon: "❤️", key: "nav_saved" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/90 bg-[var(--surface)]"
      style={{ borderColor: "var(--border)" }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-xl items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors"
              style={{ color: active ? "var(--bosphorus)" : "var(--muted)" }}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
