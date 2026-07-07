/**
 * MilestonePainCycle — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 * The 650×650 radial stage is authored at fixed pixels (per the design spec)
 * and uniformly scaled to fit its container so it stays pixel-perfect at any width.
 */
import { useEffect, useRef, useState } from "react";

const FONT = "'Manrope', sans-serif";
const STAGE = 650;

function ScaledStage({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: STAGE * scale }}>
      <div style={{ width: STAGE, height: STAGE, transform: `scale(${scale})`, transformOrigin: "top left", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

function StageCard({
  style, badgeBg, badgeChar, title, titleColor, sub,
}: {
  style: React.CSSProperties; badgeBg: string; badgeChar: string; title: string; titleColor: string; sub: string;
}) {
  return (
    <div style={{ position: "absolute", textAlign: "center", borderRadius: 16, padding: "14px 18px", ...style }}>
      <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: badgeBg, color: "#fff", font: `700 13px ${FONT}`, margin: "0 auto 8px" }}>{badgeChar}</div>
      <div style={{ font: `700 14.5px ${FONT}`, color: titleColor }}>{title}</div>
      <div style={{ font: `500 11.5px ${FONT}`, color: "#8b93a3", marginTop: 3 }}>{sub}</div>
    </div>
  );
}

export function MilestonePainCycle() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>◎</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Círculo de dolor · hallazgo principal</span>
      </div>
      <h1 style={{ font: `700 28px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>El círculo que ninguna app rompe</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 30px", maxWidth: 600 }}>
        Sol no falla por falta de intención. Cae en el mismo ciclo una y otra vez porque nada interviene en el momento del abandono.
      </p>

      <div className="rounded-2xl flex flex-col items-center" style={{ position: "relative", background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 20px 48px -24px rgba(18,20,26,.18)", padding: 44, overflow: "hidden" }}>

        <div style={{ position: "absolute", left: "50%", top: "38%", transform: "translate(-50%,-50%)", width: 720, height: 720, background: "radial-gradient(circle, rgba(79,107,246,.07) 0%, rgba(34,184,160,.05) 45%, rgba(255,255,255,0) 72%)", pointerEvents: "none" }} />

        <ScaledStage>
          {/* dashed guide circle */}
          <div style={{ position: "absolute", left: 18, top: 18, right: 18, bottom: 18, borderRadius: "50%", border: "1px dashed rgba(18,20,26,.08)" }} />

          <svg width={STAGE} height={STAGE} viewBox={`0 0 ${STAGE} ${STAGE}`} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <marker id="mpc-arrowGray1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#8891a8" />
              </marker>
              <marker id="mpc-arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#C48A3A" />
              </marker>
              <linearGradient id="mpc-gradTR" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C23B3B" />
                <stop offset="100%" stopColor="#4F6BF6" />
              </linearGradient>
              <linearGradient id="mpc-gradRB" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F6BF6" />
                <stop offset="100%" stopColor="#1a8f79" />
              </linearGradient>
              <linearGradient id="mpc-gradBL" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1a8f79" />
                <stop offset="100%" stopColor="#B5732A" />
              </linearGradient>
            </defs>
            <path d="M 325 100 A 225 225 0 0 1 550 325" fill="none" stroke="url(#mpc-gradTR)" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#mpc-arrowGray1)" opacity="0.85" />
            <path d="M 550 325 A 225 225 0 0 1 325 550" fill="none" stroke="url(#mpc-gradRB)" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#mpc-arrowGray1)" opacity="0.85" />
            <path d="M 325 550 A 225 225 0 0 1 100 325" fill="none" stroke="url(#mpc-gradBL)" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#mpc-arrowGray1)" opacity="0.85" />
            <path d="M 100 325 A 225 225 0 0 1 325 100" fill="none" stroke="#C48A3A" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" markerEnd="url(#mpc-arrowAmber)" />
          </svg>

          {/* center medallion */}
          <div className="flex flex-col items-center justify-center" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 186, height: 186, borderRadius: "50%", background: "#fff", boxShadow: "0 12px 28px -10px rgba(18,20,26,.22), 0 0 0 8px #F7F8FB", textAlign: "center", padding: 14 }}>
            <div className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, background: "linear-gradient(135deg,#4F6BF6,#22B8A0)", color: "#fff", font: `700 15px ${FONT}`, marginBottom: 8 }}>◎</div>
            <div style={{ font: `700 15px/1.3 ${FONT}`, color: "#12141a" }}>Hallazgo del dolor central</div>
            <div style={{ font: `500 10.5px/1.4 ${FONT}`, color: "#8b93a3", marginTop: 5 }}>se repite sin freno</div>
          </div>

          <StageCard
            style={{ left: "50%", top: 8, transform: "translateX(-50%)", width: 224, background: "linear-gradient(180deg,#FEF4F4,#ffffff)", border: "1px solid #F3C6C6", boxShadow: "0 10px 26px -14px rgba(194,59,59,.35)" }}
            badgeBg="#C23B3B" badgeChar="?" title="Se siente perdida" titleColor="#C23B3B" sub="no sabe cuánto gastó realmente"
          />
          <StageCard
            style={{ left: 415, top: 280, width: 206, background: "linear-gradient(180deg,#F1F3FE,#ffffff)", border: "1px solid #C7D0F8", boxShadow: "0 10px 26px -14px rgba(79,107,246,.35)" }}
            badgeBg="#4F6BF6" badgeChar="✎" title="Registra" titleColor="#3652c9" sub="sostiene el hábito, por ahora"
          />
          <StageCard
            style={{ left: "50%", bottom: 8, transform: "translateX(-50%)", width: 214, background: "linear-gradient(180deg,#EEF9F6,#ffffff)", border: "1px solid #A9E1D3", boxShadow: "0 10px 26px -14px rgba(26,143,121,.3)" }}
            badgeBg="#1a8f79" badgeChar="✓" title="Recupera el control" titleColor="#1a8f79" sub="breve alivio, sin cierre real"
          />
          <StageCard
            style={{ left: 4, top: 280, width: 206, background: "linear-gradient(180deg,#FCF5E9,#ffffff)", border: "1px solid #EFD6A6", boxShadow: "0 10px 26px -14px rgba(181,115,42,.3)" }}
            badgeBg="#B5732A" badgeChar="↓" title="Deja de registrar" titleColor="#B5732A" sub="la carga manual pesa"
          />
        </ScaledStage>

        <div className="inline-flex items-center rounded-full" style={{ position: "relative", marginTop: 22, gap: 8, background: "#FCF5E9", border: "1px solid #EFD6A6", padding: "9px 18px" }}>
          <span style={{ font: `700 13px ${FONT}`, color: "#C48A3A" }}>←</span>
          <span style={{ font: `600 12.5px ${FONT}`, color: "#8a5b1f" }}>Oportunidad: intervenir justo en el abandono, invitando a ajustar la meta — no a castigar</span>
        </div>
      </div>
    </div>
  );
}
