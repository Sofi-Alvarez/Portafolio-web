/**
 * MilestonePersonaPainMap — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

const TRAITS = [
  { label: "Digitalización",              value: "Alta" },
  { label: "Constancia de registro",       value: "Baja" },
  { label: "Educación financiera",         value: "Nula" },
  { label: "Confianza en apps nuevas",     value: "Media" },
];

const MOTIVATIONS = ["Alivio y control emocional", "Ahorro real semanal", "Entender inversión sin miedo", "No sumar otra app"];

const SEVERITY_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  critico: { bg: "#FDEAEA", color: "#C23B3B", label: "Crítico" },
  alto:    { bg: "#FFF1DE", color: "#B5732A", label: "Alto" },
  medio:   { bg: "#EDF1FE", color: "#4F6BF6", label: "Medio" },
};

interface Pain { id: string; title: string; opportunity: string; severity: keyof typeof SEVERITY_STYLES }

const PAINS: Pain[] = [
  { id: "D1", title: "Carga manual rompe el hábito",         opportunity: "Automatizar la captura de datos. Quick add. Cero setup manual.",         severity: "critico" },
  { id: "D2", title: "No hay cierre emocional del gasto",     opportunity: "Feedback visual al registrar. Progreso y \"tachar\" digital.",           severity: "critico" },
  { id: "D3", title: "Educación financiera inaplicable",      opportunity: "Microeducación contextual, integrada al flujo de gasto.",                severity: "critico" },
  { id: "D4", title: "Desconfianza en automatismos",          opportunity: "Transparencia radical: de dónde vienen los datos, control visible.",     severity: "alto" },
  { id: "D5", title: "FOMO y saturación de oferta",           opportunity: "Propuesta de valor clara desde el onboarding, sin exceso de features.",  severity: "alto" },
  { id: "D6", title: "Fragmentación entre apps",              opportunity: "Integrarse al ecosistema actual — sin exigir setup complejo.",           severity: "medio" },
];

export function MilestonePersonaPainMap() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>

      {/* Persona */}
      <div className="rounded-2xl" style={{ background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 12px 32px -20px rgba(18,20,26,.12)", padding: 32, marginBottom: 22 }}>
        <div className="flex items-center gap-4" style={{ marginBottom: 18 }}>
          <div className="flex items-center justify-center rounded-full flex-none" style={{ width: 56, height: 56, background: "linear-gradient(135deg,#4F6BF6,#22B8A0)", color: "#fff", font: `700 20px ${FONT}` }}>SV</div>
          <div>
            <div style={{ font: `700 22px ${FONT}`, color: "#12141a" }}>Sol Vargas</div>
            <div style={{ font: `500 12px ${FONT}`, color: "#7b8494" }}>User Persona · Discovery</div>
          </div>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 17, lineHeight: 1.5, color: "#1c1f27", margin: "0 0 18px" }}>
          "Necesito tachar, necesito sentir que ese gasto ya está. Como no hay nada que me dé eso, vuelvo al papel."
        </p>
        <p style={{ font: `400 13.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 20px" }}>
          Combina apps bancarias, billeteras virtuales y un cuaderno o Excel. Registra gastos solo cuando la situación se ajusta. No le falta intención — le faltan herramientas que entren en su rutina real.
        </p>

        <div className="flex flex-wrap" style={{ gap: 22, marginBottom: 20 }}>
          {TRAITS.map((t) => (
            <div key={t.label} style={{ minWidth: 140 }}>
              <div style={{ font: `600 10px ${FONT}`, letterSpacing: ".03em", textTransform: "uppercase", color: "#a2a8b5", marginBottom: 4 }}>{t.label}</div>
              <div style={{ font: `700 13px ${FONT}`, color: "#12141a" }}>{t.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {MOTIVATIONS.map((m) => (
            <span key={m} className="rounded-full" style={{ font: `500 12px ${FONT}`, color: "#3652c9", background: "#EDF1FE", padding: "6px 12px" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Mapa de dolores */}
      <div>
        <h2 style={{ font: `700 20px ${FONT}`, color: "#12141a", margin: "0 0 4px" }}>Mapa de dolores principales</h2>
        <p style={{ font: `400 13px/1.5 ${FONT}`, color: "#7b8494", margin: "0 0 18px" }}>Severidad según frecuencia en 3 entrevistas.</p>

        <div className="flex flex-col" style={{ gap: 10 }}>
          {PAINS.map((p) => {
            const sev = SEVERITY_STYLES[p.severity];
            return (
              <div key={p.id} className="rounded-xl flex items-start" style={{ background: "#fff", padding: "16px 18px", boxShadow: "0 1px 2px rgba(18,20,26,.04)", gap: 14 }}>
                <span className="flex-none rounded-full" style={{ font: `600 10px ${FONT}`, letterSpacing: ".03em", textTransform: "uppercase", padding: "4px 10px", background: sev.bg, color: sev.color, marginTop: 2 }}>{sev.label}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ font: `700 14px ${FONT}`, color: "#12141a", marginBottom: 3 }}>{p.id} · {p.title}</div>
                  <div style={{ font: `400 12.5px/1.5 ${FONT}`, color: "#5b6373" }}>{p.opportunity}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
