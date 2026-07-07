/**
 * MilestoneMVPScope — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";

const IN = "#22B8A0", F2 = "#B5732A", OUT = "#c3c8d4";

interface Differentiator { title: string; desc: string }
const DIFFERENTIATORS: Differentiator[] = [
  { title: "Cierre emocional (\"tachar\")", desc: "Feedback visual al registrar un gasto — lo que ninguna app competidora ofrece." },
  { title: "Educación en el momento",       desc: "Micro-tips contextuales al usar la app, no un blog aparte." },
  { title: "Guidance, no solo dashboards",  desc: "Sugerencias accionables en vez de gráficos fríos para interpretar solo." },
];

interface Feature { name: string; color: string }
interface Block { name: string; count: string; features: Feature[] }

const BLOCKS: Block[] = [
  { name: "Bloque 1 — Core MVP", count: "11 features · hábito y registro", features: [
    { name: "Registro rápido", color: IN }, { name: "Quick add + categoría sugerida", color: IN },
    { name: "Dashboard por categorías", color: IN }, { name: "Cierre emocional (\"tachar\")", color: IN },
    { name: "Meta de ahorro semanal", color: IN }, { name: "Barra de progreso", color: IN },
    { name: "Guidance contextual", color: IN }, { name: "Transparencia de registros", color: IN },
    { name: "Onboarding progresivo", color: IN }, { name: "Estados vacíos amigables", color: IN },
    { name: "Historial con filtros", color: IN },
  ]},
  { name: "Bloque 2 — Enriquecimiento (diferencial)", count: "3 features · educación, simulador, gamificación", features: [
    { name: "Educación financiera contextual", color: IN },
    { name: "Simulador de ahorro", color: F2 },
    { name: "Gamificación / badges", color: F2 },
  ]},
  { name: "Bloque 3 — Configuración y perfil", count: "5 features", features: [
    { name: "Ajustes generales", color: IN }, { name: "Perfil (nombre + moneda)", color: IN },
    { name: "Gestión de categorías", color: IN }, { name: "Tema claro / oscuro", color: IN },
    { name: "Exportar / eliminar datos", color: F2 },
  ]},
  { name: "Bloque 4 — Complementarias", count: "2 features · quedan para después", features: [
    { name: "Gastos recurrentes", color: OUT }, { name: "Recordatorios opcionales", color: OUT },
  ]},
  { name: "Bloque 5 — Fuera de alcance", count: "4 features · excluidas del proyecto", features: [
    { name: "Conexión bancaria real", color: OUT }, { name: "Reportes históricos extensos", color: OUT },
    { name: "Multi-usuario / familiar", color: OUT }, { name: "Login social / 2FA", color: OUT },
  ]},
];

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="rounded-full" style={{ width: 9, height: 9, background: color }} />
      <span style={{ font: `600 11.5px ${FONT}`, color: "#5b6373" }}>{label}</span>
    </div>
  );
}

export function MilestoneMVPScope() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>▤</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Define · Alcance del MVP</span>
      </div>
      <h1 style={{ font: `700 28px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>Una app de registro, no una billetera</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 22px", maxWidth: 660 }}>
        No maneja dinero real ni accede a cuentas bancarias. Todo dato lo ingresa el usuario — la app lo ayuda a registrar, entender y sostener el hábito.
      </p>

      <div className="flex flex-wrap" style={{ gap: 16, marginBottom: 28 }}>
        <LegendDot color={IN}  label="IN — en el MVP" />
        <LegendDot color={F2}  label="FASE 2 — post-MVP" />
        <LegendDot color={OUT} label="OUT — fuera de alcance" />
      </div>

      {/* Differentiator callout */}
      <div className="rounded-2xl" style={{ background: "#12141a", padding: "26px 28px", marginBottom: 26 }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#8fa0ff", marginBottom: 10 }}>
          El diferencial frente a Wallet y Spendee
        </div>
        <div className="flex flex-wrap" style={{ gap: 22 }}>
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} style={{ flex: 1, minWidth: 200 }}>
              <div style={{ font: `700 14px ${FONT}`, color: "#fff", marginBottom: 4 }}>{d.title}</div>
              <div style={{ font: `400 12px/1.5 ${FONT}`, color: "#c3c8d4" }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex flex-col" style={{ gap: 14 }}>
        {BLOCKS.map((b) => (
          <div key={b.name} className="rounded-2xl" style={{ background: "#fff", padding: "20px 22px", boxShadow: "0 1px 2px rgba(18,20,26,.04)" }}>
            <div className="flex items-baseline justify-between flex-wrap" style={{ marginBottom: 12, gap: 6 }}>
              <div style={{ font: `700 14px ${FONT}`, color: "#12141a" }}>{b.name}</div>
              <div style={{ font: `500 11.5px ${FONT}`, color: "#7b8494" }}>{b.count}</div>
            </div>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {b.features.map((f) => (
                <span key={f.name} className="inline-flex items-center rounded-full" style={{ gap: 6, font: `500 12px ${FONT}`, color: "#2c3140", background: "#F7F8FB", padding: "6px 12px" }}>
                  <span className="rounded-full flex-none" style={{ width: 7, height: 7, background: f.color }} />{f.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
