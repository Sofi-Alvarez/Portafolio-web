/**
 * MilestoneUserFlow — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";

const FIGMA_URL = "https://www.figma.com/board/D4hs6h2DtHBRLpBLJx9HC2/Flujo-de-Usuario-v6-UX?node-id=0-1&t=PYCuSSAWbyIxTuzu-1";

export function MilestoneUserFlow() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>⇄</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Ideate · User Flow</span>
      </div>
      <h1 style={{ font: `700 26px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>Flujo de usuario completo</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 26px", maxWidth: 560 }}>
        Mapeado paso a paso en Figma: desde el primer registro hasta el hábito sostenido.
      </p>

      <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden" style={{ textDecoration: "none", background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 12px 32px -20px rgba(18,20,26,.16)" }}>
        <div className="flex items-center justify-center" style={{ height: 220, background: "repeating-linear-gradient(135deg, #EDF1FE, #EDF1FE 10px, #F7F8FB 10px, #F7F8FB 20px)" }}>
          <div className="text-center">
            <div className="flex items-center justify-center rounded-2xl mx-auto" style={{ width: 56, height: 56, background: "#4F6BF6", marginBottom: 10, boxShadow: "0 10px 26px -12px rgba(79,107,246,.5)" }}>
              <span style={{ color: "#fff", font: `700 24px ${FONT}` }}>F</span>
            </div>
            <div style={{ font: `600 11px ui-monospace, Menlo, monospace`, color: "#7b8494" }}>figma board · user flow</div>
          </div>
        </div>
        <div className="flex items-center justify-between" style={{ padding: "20px 24px", gap: 12 }}>
          <div>
            <div style={{ font: `700 15px ${FONT}`, color: "#12141a" }}>Flujo de Usuario v6 — UX</div>
            <div style={{ font: `400 12px ${FONT}`, color: "#7b8494", marginTop: 2 }}>Abrir board en Figma ↗</div>
          </div>
          <span className="inline-flex items-center justify-center rounded-full flex-none" style={{ width: 34, height: 34, background: "#EDF1FE", color: "#4F6BF6", font: `700 16px ${FONT}` }}>→</span>
        </div>
      </a>
    </div>
  );
}
