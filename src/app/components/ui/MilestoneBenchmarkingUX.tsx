/**
 * MilestoneBenchmarkingUX — standalone "fintech clean" component.
 * Handoff from Claude Design (claude.ai/design), reimplemented pixel-perfect
 * in plain React/Tailwind. Self-contained: no props required, data hardcoded.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

interface Metric {
  name: string;
  wallet: number;
  spendee: number;
  insight: string;
}

const METRICS: Metric[] = [
  { name: "Learnability",         wallet: 3.5, spendee: 4.2, insight: "Spendee comunica mejor la simplicidad inicial." },
  { name: "Efficiency",           wallet: 4.5, spendee: 3.8, insight: "Wallet gana por su fuerte sync bancario." },
  { name: "Cognitive Load",       wallet: 2.8, spendee: 3.7, insight: "Wallet se percibe más complejo de interpretar." },
  { name: "Habit Retention",      wallet: 3.0, spendee: 3.2, insight: "Ninguna logra sostener el hábito en el tiempo." },
  { name: "Trust & Confidence",   wallet: 2.9, spendee: 2.7, insight: "Ambas fallan en generar confianza sostenida." },
];

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ width: 52, font: `600 10.5px ${FONT}`, color: "#7b8494" }}>{label}</span>
      <div className="flex-1 h-[7px] rounded-full overflow-hidden" style={{ background: "#eef0f3" }}>
        <div className="h-full rounded-full" style={{ background: color, width: `${(value / 5) * 100}%` }} />
      </div>
      <span style={{ width: 28, textAlign: "right", font: `700 11px ${FONT}`, color }}>{value}</span>
    </div>
  );
}

export function MilestoneBenchmarkingUX() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>UX</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Benchmarking competitivo</span>
      </div>
      <h1 style={{ font: `700 30px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>
        Wallet by BudgetBakers <span style={{ color: "#c3c8d4", fontWeight: 600 }}>vs</span> Spendee
      </h1>
      <p style={{ font: `400 15px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 32px", maxWidth: 640 }}>
        Los usuarios no abandonan estas apps por falta de intención — abandonan porque generan fricción, complejidad y poca continuidad de hábito. Cinco métricas UX, evaluadas 1–5.
      </p>

      <div className="overflow-x-auto">
      <div className="rounded-2xl" style={{ background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 12px 32px -20px rgba(18,20,26,.12)", padding: "8px 0", minWidth: 640 }}>
        <div className="flex" style={{ padding: "14px 28px", font: `600 11px ${FONT}`, letterSpacing: ".03em", textTransform: "uppercase", color: "#a2a8b5", borderBottom: "1px solid #eef0f3" }}>
          <div style={{ flex: 1.4 }}>Métrica UX</div>
          <div style={{ flex: 2 }}>Comparación</div>
          <div style={{ flex: 2.2 }}>Insight clave</div>
        </div>

        {METRICS.map((m, i) => (
          <div key={m.name} className="flex items-center" style={{ padding: "18px 28px", borderBottom: i < METRICS.length - 1 ? "1px solid #f2f3f6" : "none", gap: 18 }}>
            <div style={{ flex: 1.4 }}>
              <div style={{ font: `700 13.5px ${FONT}`, color: "#12141a" }}>{m.name}</div>
            </div>
            <div className="flex flex-col gap-2" style={{ flex: 2 }}>
              <MetricBar label="Wallet" value={m.wallet} color="#4F6BF6" />
              <MetricBar label="Spendee" value={m.spendee} color="#22B8A0" />
            </div>
            <div style={{ flex: 2.2, font: `400 12.5px/1.5 ${FONT}`, color: "#5b6373" }}>{m.insight}</div>
          </div>
        ))}
      </div>
      </div>

      <div className="rounded-2xl" style={{ marginTop: 28, padding: "22px 26px", background: "#12141a" }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#8fa0ff", marginBottom: 8 }}>
          Oportunidad estratégica
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "#fff", margin: 0 }}>
          "El mercado no necesita otra app de tracking — necesita una que enseñe sin abrumar y genere continuidad real."
        </p>
      </div>
    </div>
  );
}
