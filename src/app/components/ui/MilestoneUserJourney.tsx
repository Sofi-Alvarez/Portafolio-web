/**
 * MilestoneUserJourney — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

interface Phase {
  n: number; name: string; emoji: string; emotion: string; color: string;
  action: string; quote: string; opportunity: string;
}

const PHASES: Phase[] = [
  { n: 1, name: "Detectar la necesidad", emoji: "😟", emotion: "Frustración", color: "#C23B3B",
    action: "Ve movimientos sin contexto en la app del banco; intenta Excel y lo posterga.",
    quote: "Realmente no estoy teniendo conciencia de lo que estoy gastando.",
    opportunity: "Disparador post-cobro: invita a registrar sin abrir la app." },
  { n: 2, name: "Buscar alternativas", emoji: "😩", emotion: "Saturación", color: "#C48A3A",
    action: "Compara apps, consulta colegas, se satura y vuelve al papel.",
    quote: "Buscaría algo simple, que no me grite por todos lados.",
    opportunity: "Posicionamiento \"menos esfuerzo, no más features\"." },
  { n: 3, name: "Encontrar el MVP", emoji: "🤔", emotion: "Curiosidad cautelosa", color: "#B5732A",
    action: "Recibe recomendación de confianza; lee que no pide banco ni datos sensibles.",
    quote: "¿Esto va a hacer lo que dice o me va a pedir el banco?",
    opportunity: "Hero: \"Registrá tu primer gasto en 5 s. Sin conectar tu banco.\"" },
  { n: 4, name: "Usarlo (onboarding)", emoji: "😊", emotion: "Alivio inicial", color: "#4F6BF6",
    action: "Onboarding de 1 pantalla; registra su primer gasto en menos de 60 s.",
    quote: "Yo necesito tachar, necesito sentir que ese gasto ya está.",
    opportunity: "Quick-add + animación de \"tachado\" al confirmar." },
  { n: 5, name: "Resolver el problema", emoji: "💪", emotion: "Control y aprendizaje", color: "#22B8A0",
    action: "Registra offline, recibe alertas contextuales y tips financieros inline.",
    quote: "Capaz te olvidás un día y ya se te arruina el traqueo.",
    opportunity: "Rachas tolerantes: perdona 1-2 días sin castigar." },
  { n: 6, name: "Reflexionar y compartir", emoji: "🌟", emotion: "Variable según hábito", color: "#1a8f79",
    action: "Recibe recap mensual y comparte una tarjeta visual sin datos sensibles.",
    quote: "Por primera vez sé en qué se me va la plata sin sufrirlo.",
    opportunity: "Recap narrativo + NPS in-app contextual." },
];

const XS = [50, 150, 250, 350, 450, 550];
const YS = [74, 58, 36, 17, 7, 7];

export function MilestoneUserJourney() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>→</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Define · User Journey</span>
      </div>
      <h1 style={{ font: `700 28px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 6px" }}>El recorrido ideal de Sol</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 24px", maxWidth: 680 }}>
        Cómo el MVP resuelve cada pain point, de la frustración inicial al hábito sostenido.
      </p>

      <div className="rounded-2xl flex flex-wrap items-center" style={{ background: "#fff", padding: "16px 20px", boxShadow: "0 1px 2px rgba(18,20,26,.04)", marginBottom: 26, gap: 22 }}>
        <div className="flex items-center gap-2.5">
          <div className="rounded-full flex-none" style={{ width: 36, height: 36, background: "linear-gradient(135deg,#4F6BF6,#22B8A0)" }} />
          <div>
            <div style={{ font: `700 14px ${FONT}`, color: "#12141a" }}>Sol Vargas</div>
            <div style={{ font: `500 11px ${FONT}`, color: "#7b8494" }}>Finanzas personales · CABA, ARG</div>
          </div>
        </div>
        <div style={{ font: `400 12.5px/1.5 ${FONT}`, color: "#5b6373", maxWidth: 520 }}>
          Frustrada con apps complejas, una persona de confianza le recomienda el MVP. Objetivo: controlar gastos con mínimo esfuerzo y entender en qué se le va la plata.
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 12px 32px -20px rgba(18,20,26,.14)" }}>
        <div style={{ padding: "20px 0 0" }}>
          <svg width="100%" height="86" viewBox="0 0 600 86" preserveAspectRatio="none" style={{ display: "block" }}>
            <polyline points="50,74 150,58 250,36 350,17 450,7 550,7" fill="none" stroke="#c7cde3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {PHASES.map((p, i) => (
              <circle key={p.n} cx={XS[i]} cy={YS[i]} r="6" fill={p.color} stroke="#fff" strokeWidth="2" />
            ))}
          </svg>
        </div>

        <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: "repeat(6, minmax(150px, 1fr))" }}>
          {PHASES.map((p) => (
            <div key={p.n} className="flex flex-col" style={{ padding: "14px 18px 22px", borderRight: "1px solid #f0f1f5", borderTop: `3px solid ${p.color}`, gap: 10 }}>
              <div>
                <div style={{ font: `600 9.5px ${FONT}`, letterSpacing: ".04em", textTransform: "uppercase", color: "#a2a8b5" }}>Fase {p.n}</div>
                <div style={{ font: `700 13.5px ${FONT}`, color: "#12141a", marginTop: 2 }}>{p.name}</div>
              </div>

              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 15 }}>{p.emoji}</span>
                <span style={{ font: `700 10.5px ${FONT}`, color: p.color }}>{p.emotion}</span>
              </div>

              <div style={{ font: `400 11.5px/1.5 ${FONT}`, color: "#5b6373" }}>{p.action}</div>

              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 12, lineHeight: 1.4, color: "#3a3f4c", margin: 0, borderLeft: `2px solid ${p.color}`, paddingLeft: 8 }}>"{p.quote}"</p>

              <div style={{ marginTop: "auto", paddingTop: 8, borderTop: "1px dashed #eef0f3" }}>
                <div style={{ font: `600 9px ${FONT}`, letterSpacing: ".03em", textTransform: "uppercase", color: "#a2a8b5", marginBottom: 3 }}>Oportunidad MVP</div>
                <div style={{ font: `500 11px/1.4 ${FONT}`, color: "#12141a" }}>{p.opportunity}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
