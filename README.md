# My Istanbul

A simple, intelligent, family-friendly Istanbul travel companion: a real 10-day itinerary, ~35 curated places with history and family info, transport + Istanbulkart guidance, current ticket prices with sources, a practical Turkish phrasebook with audio, and an on-device AI assistant that only ever searches this app's own verified data.

## Stack

Next.js (App Router) + React + TypeScript + Tailwind CSS. No database — all content lives in `src/data/*.ts`. No external AI API — `src/lib/ai.ts` is a rule-based search engine over the app's own data, and speech (voice input + Turkish pronunciation) uses the browser's built-in Web Speech API.

## Development

```bash
npm install
npm run dev
```

## Data & content

Every place, price, and fare shows a source and a "last checked" date (🟢 verified / 🟡 check before visiting / 🔴 not verified). See `/about` and `/sources` in the running app for the verification policy and source directory.

## Deploy

A standard Next.js app — deploys as-is to Vercel, Netlify, or any Node host. No environment variables are required.
