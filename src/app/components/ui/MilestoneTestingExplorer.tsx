/**
 * MilestoneTestingExplorer — PREVIEW component (no toca el original).
 * Misma estructura que Discover/Define/Ideate/Prototipar: stepper
 * horizontal que filtra entre 3 vistas del Testing: Sesiones, Maze,
 * Hallazgos y fixes.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert } from "lucide-react";

const BRAND = {
  primary: "#4A4E78", secondary: "#B08B5A", tertiary: "#7C9885",
  error: "#B3261E", warning: "#9A6B00",
};

function StatBadge({ val, label, sub }: { val: string; label: string; sub: string }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }}
      className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
      <p className="text-3xl font-black mb-1 text-[#4A4E78] dark:text-[#C3C4E8]">{val}</p>
      <p className="text-gray-800 dark:text-gray-100 font-semibold text-xs">{label}</p>
      <p className="text-gray-500 dark:text-gray-300 text-xs mt-0.5">{sub}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: SESIONES (moderadas 1:1)
══════════════════════════════════════════════════════════════════════ */
function SesionesPanel() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
        <StatBadge val="17/20"  label="tarea-sesiones" sub="directas o con ayuda mínima (Metas)" />
        <StatBadge val="6.55/7" label="facilidad SEQ"  sub="promedio en las 5 sesiones moderadas" />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sesiones moderadas — Agustina, Carina, Imanol, Hernán y Rodolfo</h3>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="rounded-2xl border-2 p-5" style={{ borderColor: `${BRAND.error}40`, background: `${BRAND.error}08` }}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-[#B3261E] dark:text-[#F28B82]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#B3261E] dark:text-[#F28B82]">Hallazgo crítico</p>
          </div>
          <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
            "En realidad la meta la toma como que eran 20, cuando yo le puse 20.000. Y ahora al agregar 5.000 la toma como lograda la meta." — Hernán
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Una meta de $20.000 se marcó como "lograda" tras un aporte de solo $5.000 — el bug de mayor prioridad de todo el proyecto.</p>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: `${BRAND.warning}40`, background: `${BRAND.warning}0d` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#855C00] dark:text-[#E0B04A]">Confusión de arquitectura</p>
          <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
            "Meta es llegar a los 20.000 y presupuesto lo que puedo gastar por mes." — Carina
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Carina, sin experiencia previa armando una meta de ahorro, entró por "Presupuesto" en lugar de "Metas".</p>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: `${BRAND.tertiary}40`, background: `${BRAND.tertiary}0d` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#4F6B58] dark:text-[#A9C4B1]">Momento genuino</p>
          <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
            "Es un poco como esa sensación cuando es tu cumpleaños... es como ese festejo por algo propio." — Agustina
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Al llegar al 100% de su meta y ver la animación de logro, la reacción fue espontánea — justo el cierre emocional que el research había identificado como ausente.</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: MAZE (no moderado)
══════════════════════════════════════════════════════════════════════ */
function MazePanel() {
  return (
    <div>
      <div className="mb-8 max-w-[220px]">
        <StatBadge val="88.9%" label="éxito en Maze" sub="registro diario, sin ayuda de nadie" />
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Test no moderado — Maze, flujo de registro diario</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <p className="text-gray-600 dark:text-gray-300"><strong className="text-gray-800 dark:text-gray-100">88.9%</strong> de éxito · <strong className="text-gray-800 dark:text-gray-100">11.1%</strong> de abandono</p>
          <p className="text-gray-600 dark:text-gray-300">Duración promedio: <strong className="text-gray-800 dark:text-gray-100">89.6s</strong> (dentro del rango esperado)</p>
          <p className="text-gray-600 dark:text-gray-300">Facilidad percibida: <strong className="text-gray-800 dark:text-gray-100">2.0/7</strong> (1 = muy fácil) · nadie la calificó como difícil</p>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">El toggle Ingreso/Gasto se validó como claro; la fricción real se concentró en dos problemas técnicos del prototipo, resueltos en caliente durante la propia recolección.</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: HALLAZGOS Y FIXES
══════════════════════════════════════════════════════════════════════ */
const FINDINGS: Array<{ sev: "Crítico" | "Alto" | "Medio" | "Bajo"; issue: string; fix: string }> = [
  { sev: "Crítico", issue: "Meta de $20.000 se marcaba \"lograda\" con un aporte de $5.000", fix: "Corrección del cálculo de progreso de metas — integridad de datos" },
  { sev: "Crítico", issue: "Faltaba la etiqueta meta viewport en la versión web", fix: "Sin ella, cualquier celular real mostraba el mockup decorativo de teléfono" },
  { sev: "Alto",    issue: "Botón \"+\" de la barra de navegación solo respondía en la mitad de su círculo", fix: "Ampliación del área táctil del FAB" },
  { sev: "Alto",    issue: "Los formularios no mostraban errores de validación", fix: "Feedback visual de error agregado a los campos" },
  { sev: "Alto",    issue: "Campos \"tocar para editar\" solo reaccionaban sobre el ícono", fix: "Área de toque extendida a toda la fila" },
  { sev: "Medio",   issue: "Teclado numérico no registraba el tecleo del monto en Maze", fix: "Resuelto pagando Figma Pro sobre la marcha, durante el propio testing" },
  { sev: "Medio",   issue: "Interacción rota en la última pantalla del prototipo", fix: "Corregida en caliente durante la recolección de datos" },
  { sev: "Medio",   issue: "Animación de logro no aparecía en una de las sesiones", fix: "Bug confirmado y corregido" },
  { sev: "Bajo",    issue: "Varios ajustes de consistencia visual entre pantallas", fix: "Alineación de espaciados y radios al UI Kit documentado" },
];
const SEV_COLOR: Record<string, string> = { "Crítico": BRAND.error, "Alto": BRAND.warning, "Medio": BRAND.secondary, "Bajo": "#9CA3AF" };

function HallazgosPanel() {
  return (
    <div>
      <div className="mb-8 max-w-[220px]">
        <StatBadge val="9" label="fixes a producción" sub="verificados con flutter analyze/build" />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Hallazgo → severidad → fix → deploy</h3>
      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Severidad</th>
              <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Hallazgo</th>
              <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Fix desplegado</th>
            </tr>
          </thead>
          <tbody>
            {FINDINGS.map(({ sev, issue, fix }, i) => (
              <tr key={issue} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/60"}>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: SEV_COLOR[sev] }}>{sev}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-xs">{issue}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        9 pantallas/componentes iterados con justificación, cada uno verificado con <code className="font-mono">flutter analyze</code> y <code className="font-mono">flutter build web</code> antes de publicarse.
      </p>
    </div>
  );
}

/* ── Filtro / stepper horizontal — mismo estilo pill que las demás secciones ── */
type TestingFilterKey = "sesiones" | "maze" | "hallazgos";
const TESTING_FILTERS: { key: TestingFilterKey; label: string; hint: string }[] = [
  { key: "sesiones",  label: "Sesiones",          hint: "5 moderadas" },
  { key: "maze",      label: "Maze",              hint: "No moderado" },
  { key: "hallazgos", label: "Hallazgos y fixes", hint: "9 iteraciones" },
];

function TestingFilterStepper({ active, onChange }: { active: TestingFilterKey; onChange: (k: TestingFilterKey) => void }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto">
        {TESTING_FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <motion.button
              key={f.key}
              onClick={() => onChange(f.key)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              aria-pressed={isActive}
              aria-label={`${f.label} — ${f.hint}`}
              className={`min-h-11 px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
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
export function MilestoneTestingExplorer() {
  const [filter, setFilter] = useState<TestingFilterKey>("sesiones");
  return (
    <div>
      <TestingFilterStepper active={filter} onChange={setFilter} />
      <div className="pt-6">
        <AnimatePresence initial={false}>
          <motion.div key={filter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            {filter === "sesiones"  && <SesionesPanel />}
            {filter === "maze"      && <MazePanel />}
            {filter === "hallazgos" && <HallazgosPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
