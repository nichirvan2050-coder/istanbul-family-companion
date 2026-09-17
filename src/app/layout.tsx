import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AIWidget from "@/components/AIWidget";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";
import Footer from "@/components/Footer";
import { appName } from "@/data/settings";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: `${appName} — Istanbul, for your family`, template: `%s — ${appName}` },
  description:
    "A simple, intelligent, family-friendly guide for exploring Istanbul: places, history, transport, prices, Turkish phrases, and an AI assistant that searches the guide's own verified data.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: appName },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#00aeef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <main className="flex-1 pb-24">
          {children}
          <Footer />
        </main>
        <AIWidget />
        <BottomNav />
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
