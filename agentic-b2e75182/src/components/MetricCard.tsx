interface MetricCardProps {
  label: string;
  value: string;
  delta?: {
    label: string;
    value: number;
  };
  tone?: "positive" | "negative" | "neutral";
}

const toneColor: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  positive: "from-emerald-500/20 via-emerald-400/10 to-transparent border-emerald-300/40",
  negative: "from-rose-500/20 via-rose-400/10 to-transparent border-rose-300/40",
  neutral: "from-sky-500/20 via-sky-400/10 to-transparent border-sky-300/40",
};

export function MetricCard({ label, value, delta, tone = "neutral" }: MetricCardProps) {
  const deltaSign = delta ? (delta.value > 0 ? "+" : delta.value < 0 ? "−" : "") : "";
  const deltaColor =
    delta && delta.value !== 0
      ? delta.value > 0
        ? "text-emerald-400"
        : "text-rose-400"
      : "text-zinc-400";

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/80 p-5 text-zinc-300 shadow-inner shadow-black/40`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneColor[tone]} opacity-80`} />
      <div className="relative space-y-2">
        <p className="text-xs uppercase tracking-widest text-zinc-400">{label}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
        {delta && (
          <p className={`text-xs font-medium ${deltaColor}`}>
            {deltaSign}
            {Math.abs(delta.value).toFixed(2)}% {delta.label}
          </p>
        )}
      </div>
    </div>
  );
}
