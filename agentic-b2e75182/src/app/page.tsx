import Link from "next/link";

import { MarketDashboard } from "@/components/MarketDashboard";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 scale-150 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_55%)]" />
      </div>
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-10">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Agentic Terminal
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Autonomous AI trading cockpit for crypto execution teams
            </h1>
            <p className="mt-4 text-base text-zinc-300 sm:text-lg">
              Stream live market structure, generate directional bias, and act
              instantly. The signal core processes volatility, depth, velocity,
              and liquidity layers to project real-time buy and sell triggers.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Coverage: Top liquidity-weighted digital assets
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Engine latency: &lt; 750ms
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Refresh cadence: 60s
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
            <span>Momentum</span>
            <span>Volatility</span>
            <span>Liquidity</span>
            <span>Depth</span>
            <span>Risk</span>
          </div>
        </header>

        <MarketDashboard />

        <footer className="mt-20 flex flex-col gap-3 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Agentic Signal Core. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="https://coingecko.com" className="hover:text-white" target="_blank" rel="noreferrer">
              Data courtesy of CoinGecko
            </Link>
            <Link href="https://vercel.com" className="hover:text-white" target="_blank" rel="noreferrer">
              Deploy on Vercel
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
