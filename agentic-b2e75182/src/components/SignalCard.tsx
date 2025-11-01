import Image from "next/image";
import type { EnrichedSignal } from "@/types/market";

const changeClass = (value: number) =>
  value > 0 ? "text-emerald-500" : value < 0 ? "text-rose-500" : "text-zinc-400";

const signalAccent: Record<EnrichedSignal["signal"], string> = {
  "Strong Buy": "from-emerald-500/20 via-emerald-500/10 to-transparent border-emerald-400/40",
  Buy: "from-emerald-400/20 via-emerald-400/10 to-transparent border-emerald-300/40",
  Hold: "from-amber-400/20 via-amber-400/10 to-transparent border-amber-300/40",
  Sell: "from-rose-400/20 via-rose-400/10 to-transparent border-rose-300/40",
  "Strong Sell": "from-rose-500/20 via-rose-500/10 to-transparent border-rose-400/40",
};

const riskTone: Record<EnrichedSignal["risk"], string> = {
  Low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Moderate: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  Elevated: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  High: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  Extreme: "bg-rose-600/15 text-rose-500 border border-rose-600/25",
};

interface Props {
  coin: EnrichedSignal;
}

export function SignalCard({ coin }: Props) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/40 bg-zinc-950/70 p-6 text-zinc-100 shadow-xl shadow-emerald-500/5 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:shadow-emerald-500/10 dark:border-zinc-800/50`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${signalAccent[coin.signal]} opacity-90`} />

      <div className="relative flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-zinc-900 ring-2 ring-white/5">
            <Image src={coin.logo} alt={coin.name} fill className="object-contain" sizes="56px" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              {coin.symbol}
            </p>
            <h3 className="text-xl font-semibold text-white">{coin.name}</h3>
            <p className="text-sm text-zinc-400">
              Signal horizon:{" "}
              <span className="font-medium text-zinc-200">{coin.horizon}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end text-right">
          <p className="text-sm text-zinc-400">Spot</p>
          <p className="text-2xl font-semibold text-white">
            ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-zinc-400">
            24h high ${coin.high24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs text-zinc-400">1h</p>
          <p className={`text-base font-semibold ${changeClass(coin.change1h)}`}>
            {coin.change1h.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">24h</p>
          <p className={`text-base font-semibold ${changeClass(coin.change24h)}`}>
            {coin.change24h.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">7d</p>
          <p className={`text-base font-semibold ${changeClass(coin.change7d)}`}>
            {coin.change7d.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-white">
          {coin.signal}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${riskTone[coin.risk]}`}>
          Risk: {coin.risk}
        </span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
          Confidence {coin.confidence}%
        </span>
      </div>

      <div className="relative mt-4 space-y-3 text-sm text-zinc-300">
        <p>{coin.narrative}</p>
        <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-wider text-zinc-400">
          <div>
            <p className="text-zinc-500">Momentum</p>
            <p className="text-zinc-100">{coin.momentumScore}%</p>
          </div>
          <div>
            <p className="text-zinc-500">Volatility</p>
            <p className="text-zinc-100">{coin.volatilityScore}%</p>
          </div>
          <div>
            <p className="text-zinc-500">Depth</p>
            <p className="text-zinc-100">{coin.valueScore}%</p>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-xs text-zinc-400">
        <p>Volume 24h ${coin.volume24h.toLocaleString()}</p>
        <p>Market Cap ${coin.marketCap.toLocaleString()}</p>
      </div>

      <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300"
          style={{ width: `${coin.confidence}%` }}
        />
      </div>
    </article>
  );
}
