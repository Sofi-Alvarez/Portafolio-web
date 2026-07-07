/**
 * MilestoneHMW — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

interface HMW {
  tag: string;
  color: string;
  tagBg: string;
  question: string;
  rationale: string;
}

const HMWS: HMW[] = [
  {
    tag: "D1 · Carga manual", color: "#4F6BF6", tagBg: "#EDF1FE",
    question: "¿Cómo podríamos eliminar por completo la necesidad de cargar gastos manualmente?",
    rationale: "Resuelve el dolor más crítico y transversal del research: la carga manual es la causa n.º 1 de abandono en 3/3 entrevistas.",
  },
  {
    tag: "D3 · Educación financiera", color: "#22B8A0", tagBg: "#E3F6F2",
    question: "¿Cómo podríamos enseñar educación financiera exactamente en el momento en que el usuario toma una decisión importante?",
    rationale: "Conecta aprendizaje con acción y reduce fricción + desconfianza, en lugar de tips genéricos que nadie aplica.",
  },
];

export function MilestoneHMW() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>?</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Define · How Might We</span>
      </div>
      <h1 style={{ font: `700 28px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>Las dos preguntas que guían el MVP</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 30px", maxWidth: 600 }}>
        Traducimos los dolores más críticos del research en preguntas de diseño accionables.
      </p>

      <div className="flex flex-col" style={{ gap: 16 }}>
        {HMWS.map((h) => (
          <div key={h.tag} className="rounded-2xl" style={{ background: "#fff", padding: "28px 30px", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 12px 32px -20px rgba(18,20,26,.14)", borderLeft: `4px solid ${h.color}` }}>
            <span className="rounded-full" style={{ font: `600 10px ${FONT}`, letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 10px", background: h.tagBg, color: h.color }}>{h.tag}</span>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 21, lineHeight: 1.45, color: "#12141a", margin: "14px 0 10px" }}>{h.question}</p>
            <p style={{ font: `400 13.5px/1.6 ${FONT}`, color: "#5b6373", margin: 0 }}>{h.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
