"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { MetricCard } from "@/components/MetricCard";
import { SignalCard } from "@/components/SignalCard";
import { SignalLegend } from "@/components/SignalLegend";
import type { EnrichedSignal, MarketResponse } from "@/types/market";

interface DashboardState {
  loading: boolean;
  error: string | null;
  snapshot: MarketResponse | null;
}

const REFRESH_INTERVAL_MS = 60_000;

const initialState: DashboardState = {
  loading: true,
  error: null,
  snapshot: null,
};

const emptySummary = {
  avgConfidence: 0,
  dominantSignal: "Hold" as EnrichedSignal["signal"],
  buyRatio: 0,
  avgChange24h: 0,
  timestamp: "",
};

export function MarketDashboard() {
  const [state, setState] = useState<DashboardState>(initialState);

  const pullSnapshot = useCallback(async () => {
    try {
      const response = await fetch("/api/markets?limit=12", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to load");
      }
      const payload: MarketResponse = await response.json();
      setState({ loading: false, error: null, snapshot: payload });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Unable to load market snapshot. Retry shortly.",
      }));
      console.error(error);
    }
  }, []);

  useEffect(() => {
    pullSnapshot();
    const interval = setInterval(pullSnapshot, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [pullSnapshot]);

  const summary = useMemo(() => {
    const coins = state.snapshot?.coins ?? [];
    if (!coins.length) {
      return emptySummary;
    }

    const avgConfidence =
      coins.reduce((acc, item) => acc + item.confidence, 0) / coins.length;

    const buySignals = coins.filter(
      (coin) => coin.signal === "Strong Buy" || coin.signal === "Buy"
    ).length;

    const avgChange24h =
      coins.reduce((acc, item) => acc + item.change24h, 0) / coins.length;

    const strongest =
      coins.slice().sort((a, b) => b.confidence - a.confidence)[0]?.signal ??
      "Hold";

    return {
      avgConfidence,
      buyRatio: buySignals / coins.length,
      avgChange24h,
      dominantSignal: strongest,
      timestamp: state.snapshot?.timestamp ?? "",
    };
  }, [state.snapshot]);

  if (state.loading) {
    return (
      <section className="rounded-3xl border border-white/10 bg-zinc-950/60 p-10 text-zinc-300 shadow-lg shadow-emerald-500/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Compiling signals
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Streaming live orderflow...
            </h2>
          </div>
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-emerald-400/40 border-t-transparent" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-3xl bg-white/5" />
          ))}
        </div>
      </section>
    );
  }

  if (state.error) {
    return (
      <section className="rounded-3xl border border-rose-500/30 bg-rose-950/60 p-10 text-rose-200 shadow-lg shadow-rose-500/20">
        <h2 className="text-2xl font-semibold">Signal engine offline</h2>
        <p className="mt-3 text-sm">{state.error}</p>
        <button
          type="button"
          onClick={() => {
            setState(initialState);
            pullSnapshot();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-rose-400"
        >
          Retry
        </button>
      </section>
    );
  }

  const coins = state.snapshot?.coins ?? [];

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 text-white shadow-emerald-500/10 backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
              Agentic Signal Core
            </p>
            <h2 className="mt-2 text-4xl font-semibold">
              AI-powered crypto execution dashboard
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-zinc-300">
              Signals blend price momentum, depth, volatility and supply
              dynamics to surface directional bias across the top crypto assets.
              Refreshes automatically every minute with live market data.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-zinc-300">
            <p className="uppercase tracking-[0.25em] text-zinc-500">Snapshot</p>
            <p className="mt-2 font-mono text-sm text-white">
              {new Date(summary.timestamp || Date.now()).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Average confidence"
            value={`${summary.avgConfidence.toFixed(1)}%`}
            tone="positive"
            delta={{
              label: "vs buy-side participation",
              value: summary.buyRatio * 100 - 50,
            }}
          />
          <MetricCard
            label="Buy-side concentration"
            value={`${(summary.buyRatio * 100).toFixed(1)}%`}
            tone="positive"
            delta={{
              label: "dominant signal share",
              value: summary.dominantSignal === "Strong Buy" ? 12 : 0,
            }}
          />
          <MetricCard
            label="Average 24h change"
            value={`${summary.avgChange24h.toFixed(2)}%`}
            tone={summary.avgChange24h >= 0 ? "positive" : "negative"}
            delta={{
              label: "directional drift",
              value: summary.avgConfidence / 10,
            }}
          />
          <MetricCard
            label="Dominant signal"
            value={summary.dominantSignal}
            tone="neutral"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
          {coins.map((coin) => (
            <SignalCard key={coin.id} coin={coin} />
          ))}
        </div>
        <div className="space-y-6">
          <SignalLegend />
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-xs text-zinc-400">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Compliance memo
            </h3>
            <p className="mt-3">
              Signals are generated by heuristic scoring and machine
              aggregation. Markets remain probabilistic—no indicator provides
              certainty and automated execution should be paired with human
              oversight. Always validate sizing, liquidity and counterparty risk
              before acting.
            </p>
            <p className="mt-4 font-mono text-[0.7rem] text-zinc-500">
              Engine refresh cadence: {REFRESH_INTERVAL_MS / 1000}s • Data
              provider: CoinGecko
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
