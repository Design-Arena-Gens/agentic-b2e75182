const signalPalette = [
  {
    label: "Strong Buy",
    description: "High conviction momentum with depth confirmation",
    color: "bg-emerald-400/15 text-emerald-400 border border-emerald-500/25",
  },
  {
    label: "Buy",
    description: "Constructive trend, moderate confirmation",
    color: "bg-emerald-300/15 text-emerald-300 border border-emerald-400/25",
  },
  {
    label: "Hold",
    description: "Mixed signals, await better alignment",
    color: "bg-amber-300/15 text-amber-300 border border-amber-400/25",
  },
  {
    label: "Sell",
    description: "Downside risk building across intervals",
    color: "bg-rose-400/15 text-rose-300 border border-rose-500/25",
  },
  {
    label: "Strong Sell",
    description: "Severe drawdown risk detected across the stack",
    color: "bg-rose-500/20 text-rose-300 border border-rose-600/25",
  },
];

export function SignalLegend() {
  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-sm text-zinc-300 shadow-xl shadow-emerald-500/5">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
        Signal map
      </h3>
      <p className="mt-2 text-xs text-zinc-500">
        Signals blend momentum, liquidity, volatility and depth metrics. No output is ever a guarantee.
      </p>
      <ul className="mt-4 space-y-3">
        {signalPalette.map((signal) => (
          <li
            key={signal.label}
            className={`rounded-2xl px-4 py-3 ${signal.color} backdrop-blur`}
          >
            <p className="text-sm font-semibold text-white">{signal.label}</p>
            <p className="text-xs text-zinc-300">{signal.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
