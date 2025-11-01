## Agentic Signal Core

AI-driven crypto trading cockpit delivering live directional signals across top liquidity-weighted assets. Built with Next.js, Tailwind CSS and a serverless signal engine that blends momentum, volatility, liquidity depth and supply metrics.

## Features

- Live market snapshots sourced from CoinGecko
- AI signal engine categorising assets into Strong Buy → Strong Sell bands
- Confidence, risk and narrative context per asset
- Auto-refreshing dashboard with compliance memo and signal legend

## Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the dashboard. Signals refresh automatically every 60 seconds from the integrated API route.

## Production Build

```bash
npm run build
npm run start
```

Deploy-ready for Vercel via `vercel deploy --prod`.
