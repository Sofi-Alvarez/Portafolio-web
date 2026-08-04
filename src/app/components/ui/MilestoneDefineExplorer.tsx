/**
 * MilestoneDefineExplorer — PREVIEW component (no toca el original).
 * Misma estructura que MilestoneDiscoverExplorer: stepper horizontal que
 * filtra entre 3 vistas del Define: How Might We, Journey Map, Alcance del MVP.
 * Los 3 paneles se reconstruyen acá con la tipografía nativa del sitio
 * (sin el eyebrow ícono+label ni el contenedor "fintech clean" propio de
 * MilestoneHMW / MilestoneUserJourney / MilestoneMVPScope) para no tener
 * que tocar esos archivos originales.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const BRAND = {
  primary: "#4A4E78", secondary: "#B08B5A", tertiary: "#7C9885",
};

/* ══════════════════════════════════════════════════════════════════════
   HOW MIGHT WE
══════════════════════════════════════════════════════════════════════ */
interface HMWItem { tag: string; color: string; tagBg: string; question: string; rationale: string }
const HMWS: HMWItem[] = [
  { tag: "D1 · Carga manual", color: "#4F6BF6", tagBg: "#EDF1FE",
    question: "¿Cómo podríamos eliminar por completo la necesidad de cargar gastos manualmente?",
    rationale: "Resuelve el dolor más crítico y transversal del research: la carga manual es la causa n.º 1 de abandono en 3/3 entrevistas." },
  { tag: "D3 · Educación financiera", color: "#22B8A0", tagBg: "#E3F6F2",
    question: "¿Cómo podríamos enseñar educación financiera exactamente en el momento en que el usuario toma una decisión importante?",
    rationale: "Conecta aprendizaje con acción y reduce fricción + desconfianza, en lugar de tips genéricos que nadie aplica." },
];

function HMWPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Las dos preguntas que guían el MVP</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Traducimos los dolores más críticos del research en preguntas de diseño accionables.
      </p>
      <div className="space-y-4">
        {HMWS.map((h) => (
          <div key={h.tag} className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-6"
            style={{ borderLeft: `4px solid ${h.color}` }}>
            <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ background: h.tagBg, color: h.color }}>
              {h.tag}
            </span>
            <p className="text-lg italic text-gray-800 dark:text-gray-100 mt-3 mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {h.question}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{h.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   JOURNEY MAP
══════════════════════════════════════════════════════════════════════ */
interface Phase { n: number; name: string; emoji: string; emotion: string; color: string; action: string; quote: string; opportunity: string }
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

function JourneyPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">El recorrido ideal de Sol</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Cómo el MVP resuelve cada pain point, de la frustración inicial al hábito sostenido.
      </p>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-5 flex flex-wrap items-center gap-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg,#4F6BF6,#22B8A0)" }} />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Sol Vargas</p>
            <p className="text-xs text-gray-400">Finanzas personales · CABA, ARG</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
          Frustrada con apps complejas, una persona de confianza le recomienda el MVP. Objetivo: controlar gastos con mínimo esfuerzo y entender en qué se le va la plata.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {PHASES.map((p) => (
          <div key={p.n} className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-4"
            style={{ borderTop: `3px solid ${p.color}` }}>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Fase {p.n}</p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-0.5">{p.name}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-sm">{p.emoji}</span>
              <span className="text-[10.5px] font-bold" style={{ color: p.color }}>{p.emotion}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{p.action}</p>
            <p className="text-xs italic text-gray-700 dark:text-gray-300 mt-2 pl-2"
              style={{ borderLeft: `2px solid ${p.color}`, fontFamily: "'Instrument Serif', serif" }}>
              "{p.quote}"
            </p>
            <div className="mt-3 pt-2 border-t border-dashed border-gray-100 dark:border-gray-700">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">Oportunidad MVP</p>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{p.opportunity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ALCANCE DEL MVP
══════════════════════════════════════════════════════════════════════ */
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

function MVPPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Una app de registro, no una billetera</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        No maneja dinero real ni accede a cuentas bancarias. Todo dato lo ingresa el usuario — la app lo ayuda a registrar, entender y sostener el hábito.
      </p>

      <div className="rounded-2xl bg-gray-900 dark:bg-black/40 px-6 py-6 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#8fa0ff" }}>
          El diferencial frente a Wallet y Spendee
        </p>
        <div className="flex flex-wrap gap-5">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="flex-1 min-w-[180px]">
              <p className="text-sm font-bold text-white mb-1">{d.title}</p>
              <p className="text-xs text-gray-300">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {STATUS_GROUPS.map((g, i) => <MVPStatusAccordion key={g.key} group={g} defaultOpen={i === 0} />)}
      </div>
    </div>
  );
}

/* Agrupa las features de todos los Bloques por estado (IN / Fase 2 / Out),
   conservando a qué Bloque pertenece cada una para mostrarlo como sub-label. */
interface StatusBlock { blockName: string; features: Feature[] }
interface StatusGroup { key: string; label: string; hint: string; color: string; blocks: StatusBlock[]; total: number }
const STATUS_DEFS = [
  { key: "in",  label: "In — en el MVP",            color: IN },
  { key: "f2",  label: "Fase 2 — después del lanzamiento", color: F2 },
  { key: "out", label: "Fuera de alcance",           color: OUT },
];
const STATUS_GROUPS: StatusGroup[] = STATUS_DEFS.map((s) => {
  const blocks: StatusBlock[] = BLOCKS
    .map((b) => ({ blockName: b.name, features: b.features.filter((f) => f.color === s.color) }))
    .filter((b) => b.features.length > 0);
  const total = blocks.reduce((sum, b) => sum + b.features.length, 0);
  return { key: s.key, label: s.label, color: s.color, blocks, total, hint: `${total} features` };
});

function MVPStatusAccordion({ group, defaultOpen }: { group: StatusGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-3 px-5 py-4 text-left">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: group.color }} />
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{group.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{group.hint}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
              {group.blocks.map((b) => (
                <div key={b.blockName}>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{b.blockName}</p>
                  <div className="flex flex-wrap gap-2">
                    {b.features.map((f) => (
                      <span key={f.name} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Filtro / stepper horizontal — mismo estilo pill que Discover ─────── */
type DefineFilterKey = "hmw" | "journey" | "mvp";
const DEFINE_FILTERS: { key: DefineFilterKey; label: string; hint: string }[] = [
  { key: "hmw",     label: "How Might We",    hint: "2 preguntas" },
  { key: "journey", label: "Journey Map",     hint: "6 fases" },
  { key: "mvp",     label: "Alcance del MVP", hint: "In / Fase 2 / Out" },
];

function DefineFilterStepper({ active, onChange }: { active: DefineFilterKey; onChange: (k: DefineFilterKey) => void }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto">
        {DEFINE_FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <motion.button
              key={f.key}
              onClick={() => onChange(f.key)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              aria-pressed={isActive}
              aria-label={`${f.label} — ${f.hint}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                isActive
                  ? "border-transparent text-white"
                  : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#4A4E78]/40 hover:text-[#4A4E78] dark:hover:text-[#C3C4E8]"
              }`}
              style={{ background: isActive ? BRAND.primary : "transparent" }}
            >
              {f.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Export principal ─────────────────────────────────────────────────── */
export function MilestoneDefineExplorer() {
  const [filter, setFilter] = useState<DefineFilterKey>("hmw");
  return (
    <div>
      <DefineFilterStepper active={filter} onChange={setFilter} />
      <div className="pt-6">
        <AnimatePresence initial={false}>
          <motion.div key={filter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            {filter === "hmw"     && <HMWPanel />}
            {filter === "journey" && <JourneyPanel />}
            {filter === "mvp"     && <MVPPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
