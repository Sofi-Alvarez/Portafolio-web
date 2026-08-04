/**
 * MilestoneDiscoverExplorer — PREVIEW component (no toca el original).
 * Stepper horizontal sticky-lite que filtra entre 4 vistas del Discover:
 * Entrevistas (carrusel), Benchmark (tabla compacta + acordeón), Personas
 * (card con barras), Dolores (acordeón por severidad + círculo de dolor).
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronDown, Quote as QuoteIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import painCycleBg from "../../../imports/circulo-dolor-fondo.svg";

const BRAND = {
  primary: "#4A4E78", primaryDark: "#C3C4E8",
  secondary: "#B08B5A", tertiary: "#7C9885",
  error: "#B3261E", warning: "#9A6B00",
};

/* ── Data (misma fuente real que MilestoneInterviewNotes / Benchmarking / PersonaPainMap / PainCycle) ── */
interface Quote { text: string; speaker: string; initial: string; avatarBg: string; tag: string; tagBg: string; tagColor: string; }
const QUOTES: Quote[] = [
  { text: "Yo necesito tachar, necesito algo que yo pueda decir: esto ya está pagado.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Cierre emocional", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
  { text: "Como no hay, lo más fácil para mí es escribirlo.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Papel vs digital", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
  { text: "No quiero pasar a mano a otro producto los gastos, porque perdía tiempo.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "Carga manual", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Capaz te olvidás un día y ya se te arruina el traqueo.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "Retención", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Educación financiera cero.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Educación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "No me gustaría ya tanto una charla que te motive, sino algo más educativo que me enseñe.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Educación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "Me genera mucha desconfianza… veo esos gurúes y después no activo nada.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Confianza", tagBg: "#FDEAEA", tagColor: "#C23B3B" },
  { text: "Capaz me estoy perdiendo algo… y no sé si son todas iguales.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "FOMO", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Cuando estoy cómodo trato de no darle bola.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Motivación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "No sé cuánto gasto en desayuno, almuerzo, cena. Te mentiría.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Visibilidad", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
];

interface Metric { name: string; wallet: number; spendee: number; insight: string; }
const METRICS: Metric[] = [
  { name: "Facilidad de aprendizaje", wallet: 3.5, spendee: 4.2, insight: "Spendee comunica mejor la simplicidad inicial." },
  { name: "Eficiencia",               wallet: 4.5, spendee: 3.8, insight: "Wallet gana por su fuerte sync bancario." },
  { name: "Carga cognitiva",          wallet: 2.8, spendee: 3.7, insight: "Wallet se percibe más complejo de interpretar." },
  { name: "Retención del hábito",     wallet: 3.0, spendee: 3.2, insight: "Ninguna logra sostener el hábito en el tiempo." },
  { name: "Confianza",                wallet: 2.9, spendee: 2.7, insight: "Ambas fallan en generar confianza sostenida." },
];

const PERSONA_TRAITS: { label: string; value: string; pct: number }[] = [
  { label: "Digitalización",          value: "Alta", pct: 88 },
  { label: "Constancia de registro",  value: "Baja", pct: 24 },
  { label: "Educación financiera",    value: "Nula", pct: 6 },
  { label: "Confianza en apps nuevas",value: "Media", pct: 52 },
];
const PERSONA_NEEDS = ["Alivio y control emocional", "Ahorro real semanal", "Entender inversión sin miedo", "No sumar otra app"];

type Severity = "Crítico" | "Alto" | "Medio";
interface Pain { id: string; title: string; opportunity: string; severity: Severity; }
const PAINS: Pain[] = [
  { id: "D1", title: "Carga manual rompe el hábito",     opportunity: "Automatizar la captura de datos. Quick add. Cero setup manual.",        severity: "Crítico" },
  { id: "D2", title: "No hay cierre emocional del gasto", opportunity: "Feedback visual al registrar. Progreso y \"tachar\" digital.",          severity: "Crítico" },
  { id: "D3", title: "Educación financiera inaplicable",  opportunity: "Microeducación contextual, integrada al flujo de gasto.",               severity: "Crítico" },
  { id: "D4", title: "Desconfianza en automatismos",      opportunity: "Transparencia radical: de dónde vienen los datos, control visible.",    severity: "Alto" },
  { id: "D5", title: "FOMO y saturación de oferta",       opportunity: "Propuesta de valor clara desde el onboarding, sin exceso de features.", severity: "Alto" },
  { id: "D6", title: "Fragmentación entre apps",          opportunity: "Integrarse al ecosistema actual — sin exigir setup complejo.",          severity: "Medio" },
];
const SEV_STYLE: Record<Severity, { bg: string; color: string }> = {
  "Crítico": { bg: "#FDEAEA", color: "#C23B3B" },
  "Alto":    { bg: "#FFF1DE", color: "#B5732A" },
  "Medio":   { bg: "#EDF1FE", color: "#4F6BF6" },
};

/* Figma: https://www.figma.com/design/WJBYB9ACMQFqw4sBtLVdCQ/Portafolio---case-milestone?node-id=83-3 */
const PAIN_CYCLE_TOP    = { badge: "?", title: "Se siente perdida",   desc: "No sabe cuánto gastó realmente", color: "#c23b3b" };
const PAIN_CYCLE_LEFT   = { badge: "✎", title: "Registra",            desc: "Sostiene el hábito, por ahora",  color: "#3652c9" };
const PAIN_CYCLE_RIGHT  = { badge: "↓", title: "Deja de registrar",   desc: "La carga manual pesa",           color: "#b5732a" };
const PAIN_CYCLE_BOTTOM = { badge: "✓", title: "Recupera el control", desc: "Breve alivio, sin cierre real",  color: "#1a8f79" };

/* ── Filtro / stepper horizontal sticky-lite ─────────────────────────── */
type FilterKey = "entrevistas" | "benchmark" | "personas" | "dolores";
const FILTERS: { key: FilterKey; label: string; hint: string }[] = [
  { key: "entrevistas", label: "Entrevistas", hint: "10 citas" },
  { key: "benchmark",   label: "Benchmark",   hint: "Wallet vs Spendee" },
  { key: "personas",    label: "Personas",    hint: "Sol Vargas" },
  { key: "dolores",     label: "Dolores",     hint: "6 hallazgos" },
];

function FilterStepper({ active, onChange }: { active: FilterKey; onChange: (k: FilterKey) => void }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto">
        {FILTERS.map((f) => {
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

/* ── Panel: Entrevistas → carrusel horizontal. 2 citas por vista en
   desktop (lg+), 1 en mobile/tablet. Renderiza solo la página actual (sin
   overflow-x scroll-snap) para que la altura nunca quede recortada por el
   contenedor — cada tarjeta se dimensiona de forma natural. ──────────── */
function QuoteCard({ q }: { q: Quote }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8 flex flex-col justify-between h-full">
      <div className="flex items-start gap-3">
        <QuoteIcon className="w-6 h-6 flex-shrink-0" style={{ color: q.tagColor }} />
        <p className="text-lg sm:text-xl italic text-gray-800 dark:text-gray-100 leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
          "{q.text}"
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: q.avatarBg }}>{q.initial}</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">{q.speaker}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap ml-auto" style={{ background: q.tagBg, color: q.tagColor }}>{q.tag}</span>
      </div>
    </div>
  );
}

function InterviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const { isDark } = useTheme();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setItemsPerView(mq.matches ? 2 : 1);
      setIdx(0);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const totalPages = Math.ceil(QUOTES.length / itemsPerView);
  const pageQuotes = QUOTES.slice(idx * itemsPerView, idx * itemsPerView + itemsPerView);

  const goTo = (i: number) => setIdx(Math.max(0, Math.min(i, totalPages - 1)));

  const arrowBase = "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-200";
  const arrowEnabled = isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-white hover:bg-gray-50 text-gray-600";
  const arrowDisabled = "opacity-30 pointer-events-none";

  return (
    <div>
      {/* Título + texto original de MilestoneInterviewNotes — se mantienen */}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Voces de la entrevista</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Las 10 citas más poderosas de Rossana, Gabriel y María — seleccionadas por expresar el dolor de forma visceral y desarmar supuestos del equipo.
      </p>

      <div className="relative">
        <button onClick={() => goTo(idx - 1)} aria-label="Cita anterior"
          className={`${arrowBase} left-0 sm:-left-3 ${idx === 0 ? arrowDisabled : arrowEnabled}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={() => goTo(idx + 1)} aria-label="Cita siguiente"
          className={`${arrowBase} right-0 sm:-right-3 ${idx === totalPages - 1 ? arrowDisabled : arrowEnabled}`}>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mx-10 sm:mx-12 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={idx}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {pageQuotes.map((q, i) => (
                <div key={idx * itemsPerView + i} role="group" aria-label={`Cita ${idx * itemsPerView + i + 1} de ${QUOTES.length}`}>
                  <QuoteCard q={q} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4" aria-live="polite">{idx + 1} / {totalPages}</p>
      </div>

      {/* Card de síntesis — se mantiene del original */}
      <div className="rounded-2xl mt-6 px-6 py-5 bg-gray-900 dark:bg-black/40">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8fa0ff" }}>Síntesis del research</p>
        <p className="text-white text-base sm:text-lg italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          "El usuario no quiere controlar gastos. Quiere sentir tranquilidad."
        </p>
      </div>
    </div>
  );
}

/* ── Panel: Benchmark → tabla compacta de 5 filas, insight en acordeón ── */
function BenchmarkCompact() {
  const [openRow, setOpenRow] = useState<number | null>(0);
  return (
    <div>
      {/* Título + texto original de MilestoneBenchmarkingUX — se mantienen */}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Wallet by BudgetBakers <span className="text-gray-400 dark:text-gray-500 font-medium">vs</span> Spendee
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Los usuarios no abandonan estas apps por falta de intención — abandonan porque generan fricción, complejidad y poca continuidad de hábito. Cinco métricas UX, evaluadas 1–5.
      </p>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
      <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 dark:bg-gray-900/40">
        <span className="flex-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">Métrica</span>
        <span className="w-24 text-[10px] font-bold uppercase tracking-wide text-gray-400">Wallet</span>
        <span className="w-24 text-[10px] font-bold uppercase tracking-wide text-gray-400">Spendee</span>
        <span className="w-4 flex-shrink-0" />
      </div>
      {METRICS.map((m, i) => {
        const open = openRow === i;
        return (
          <div key={m.name}>
            <button onClick={() => setOpenRow(open ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
              <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100">{m.name}</span>
              <div className="w-24 flex items-center gap-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.wallet / 5) * 100}%`, background: "#4F6BF6" }} />
                </div>
                <span className="text-[11px] font-bold flex-shrink-0 w-6 text-right" style={{ color: "#4F6BF6" }}>{m.wallet}</span>
              </div>
              <div className="w-24 flex items-center gap-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.spendee / 5) * 100}%`, background: "#22B8A0" }} />
                </div>
                <span className="text-[11px] font-bold flex-shrink-0 w-6 text-right" style={{ color: "#22B8A0" }}>{m.spendee}</span>
              </div>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }} className="overflow-hidden">
                  <div className="px-5 pb-4">
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic">{m.insight}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      </div>

      {/* Card de oportunidad estratégica — se mantiene del original */}
      <div className="rounded-2xl mt-6 px-6 py-5 bg-gray-900 dark:bg-black/40">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8fa0ff" }}>Oportunidad estratégica</p>
        <p className="text-white text-base sm:text-lg italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          "El mercado no necesita otra app de tracking — necesita una que enseñe sin abrumar y genere continuidad real."
        </p>
      </div>
    </div>
  );
}

/* ── Panel: Personas → 1 card, 4 barras, needs en chips ──────────────── */
function PersonaCompact() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#4F6BF6,#22B8A0)" }}>SV</div>
        <div>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Sol Vargas</p>
          <p className="text-xs text-gray-400">User Persona · Discovery</p>
        </div>
      </div>
      <p className="italic text-gray-700 dark:text-gray-200 mb-5" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17 }}>
        "Necesito tachar, necesito sentir que ese gasto ya está. Como no hay nada que me dé eso, vuelvo al papel."
      </p>
      <div className="space-y-3 mb-6">
        {PERSONA_TRAITS.map((t) => (
          <div key={t.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t.label}</span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{t.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.pct}%` }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} className="h-full rounded-full" style={{ background: BRAND.primary }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Necesidades</p>
      <div className="flex flex-wrap gap-2">
        {PERSONA_NEEDS.map((n) => (
          <span key={n} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "#EDF1FE", color: "#3652c9" }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Panel: Dolores → acordeón por severidad + círculo de dolor compacto ── */
function PainAccordionGroup({ severity, pains, defaultOpen }: { severity: Severity; pains: Pain[]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const style = SEV_STYLE[severity];
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-3 px-5 py-3.5 text-left">
        <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: style.bg, color: style.color }}>{severity}</span>
        <span className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-200">{pains.length} {pains.length === 1 ? "hallazgo" : "hallazgos"}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-3">
              {pains.map((p) => (
                <div key={p.id}>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{p.id} · {p.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.opportunity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Card individual del diagrama — fiel al frame de Figma (badge circular + título + descripción) */
function PainCycleCard({ badge, title, desc, color }: { badge: string; title: string; desc: string; color: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center gap-1 p-2 w-[150px] shrink-0">
      <div className="rounded-full flex items-center justify-center p-1" style={{ background: color }}>
        <span className="flex items-center justify-center w-[19px] h-[19px] text-sm font-bold text-white leading-none">{badge}</span>
      </div>
      <p className="font-bold text-sm text-center leading-normal" style={{ color }}>{title}</p>
      <p className="font-normal text-sm text-center leading-normal text-[#8b93a3] dark:text-gray-400">{desc}</p>
    </div>
  );
}

/* Solo el diagrama — sin card propia, sin eyebrow, sin texto de oportunidad (eso vive en la card de cierre) */
function PainCycleDiagram() {
  return (
    <div className="relative isolate flex flex-col items-center justify-center gap-4 py-4 w-[327px] max-w-full mx-auto lg:mx-0 shrink-0">
      {/* Círculo punteado — detrás de las cards (z negativo), tamaño y centrado fieles al frame de Figma (327×356) */}
      <img src={painCycleBg} alt="" aria-hidden="true"
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none select-none opacity-70 dark:opacity-40" />
      <PainCycleCard {...PAIN_CYCLE_TOP} />
      <div className="flex items-start gap-[27px]">
        <PainCycleCard {...PAIN_CYCLE_LEFT} />
        <PainCycleCard {...PAIN_CYCLE_RIGHT} />
      </div>
      <PainCycleCard {...PAIN_CYCLE_BOTTOM} />
    </div>
  );
}

function DoloresPanel() {
  const critico = PAINS.filter((p) => p.severity === "Crítico");
  const alto    = PAINS.filter((p) => p.severity === "Alto");
  const medio   = PAINS.filter((p) => p.severity === "Medio");
  return (
    <div>
      {/* Título + texto original de MilestonePersonaPainMap — se mantienen */}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Mapa de dolores principales</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">Severidad según frecuencia en 3 entrevistas.</p>

      <div className="space-y-3">
        <PainAccordionGroup severity="Crítico" pains={critico} defaultOpen />
        <PainAccordionGroup severity="Alto"    pains={alto}    defaultOpen={false} />
        <PainAccordionGroup severity="Medio"   pains={medio}   defaultOpen={false} />
      </div>

      {/* Título + texto original de MilestonePainCycle — se mantienen.
          Mobile: apilado (título, texto, diagrama, card) en orden natural del DOM.
          Desktop (lg): el diagrama se saca del flujo (absolute) para que NO estire las
          filas de título/texto/card — esos conservan su espaciado habitual (mb-1 / mb-5)
          y, si el diagrama es más alto, el espacio de más queda vacío debajo de la card. */}
      <div className="mt-8 lg:relative lg:pr-[360px] lg:min-h-[412px]">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
          El círculo que ninguna app rompe
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
          Sol no falla por falta de intención. Cae en el mismo ciclo una y otra vez porque nada interviene en el momento del abandono.
        </p>

        <div className="flex items-center justify-center mb-6 lg:mb-0 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2">
          <PainCycleDiagram />
        </div>

        {/* Card de oportunidad — mismo lenguaje visual que Síntesis del research / Oportunidad estratégica */}
        <div className="rounded-2xl px-6 py-5 bg-gray-900 dark:bg-black/40">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8fa0ff" }}>Oportunidad</p>
          <p className="text-white text-base sm:text-lg italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            "Intervenir justo en el abandono, invitando a ajustar la meta — no a castigar."
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Export principal ─────────────────────────────────────────────────── */
export function MilestoneDiscoverExplorer() {
  const [filter, setFilter] = useState<FilterKey>("entrevistas");
  return (
    <div>
      <FilterStepper active={filter} onChange={setFilter} />
      <div className="pt-6">
        <AnimatePresence initial={false}>
          <motion.div key={filter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            {filter === "entrevistas" && <InterviewsCarousel />}
            {filter === "benchmark"   && <BenchmarkCompact />}
            {filter === "personas"    && <PersonaCompact />}
            {filter === "dolores"     && <DoloresPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
