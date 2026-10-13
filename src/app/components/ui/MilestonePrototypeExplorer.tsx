/**
 * MilestonePrototypeExplorer — PREVIEW component (no toca el original).
 * Misma estructura que Discover/Define/Ideate: stepper horizontal que
 * filtra entre 4 vistas del Prototipar: Branding, Wireframe Mid-Fi,
 * Construcción, Prototipo.
 */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, HeartHandshake, Wallet, Layers, Sparkles } from "lucide-react";
import { SiFigma } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import metasSection  from "../../../imports/Section - Ahorro.png";
import metasActivas  from "../../../imports/Metas activas.png";
import metasLogradas from "../../../imports/Metas logradas.png";
import metaDetalle   from "../../../imports/Vista detalle meta activa.png";
import metaCrear     from "../../../imports/Crear meta.png";
import metaEditar    from "../../../imports/Editar meta.png";
import metaCreada    from "../../../imports/Meta creada.png";

const BRAND = {
  primary: "#4A4E78", secondary: "#B08B5A", tertiary: "#7C9885",
  error: "#B3261E", warning: "#9A6B00",
};

/* ══════════════════════════════════════════════════════════════════════
   PANEL: BRANDING
══════════════════════════════════════════════════════════════════════ */
function BrandingPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Branding a propósito no financiero</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-2xl">
        Paleta, tipografía y tokens pensados para que la app se sienta menos como un banco y más como un acompañante. El UI Kit se construyó sobre Material Design 3 en Figma, con personalizaciones propias.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>Paleta de color</p>
          <div className="flex gap-3 mb-4">
            {[
              { hex: BRAND.primary,   name: "Primary",   role: "CTAs, nav activa, foco" },
              { hex: BRAND.secondary, name: "Secondary", role: "Gastos, acentos cálidos" },
              { hex: BRAND.tertiary,  name: "Tertiary",  role: "Ingresos, metas, logros" },
            ].map(({ hex, name, role }) => (
              <div key={hex} className="flex-1 flex flex-col gap-2">
                <div className="w-full h-16 rounded-2xl shadow-md" style={{ backgroundColor: hex }} />
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{hex}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{role}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {[
              { hex: BRAND.error,   name: "Error" },
              { hex: BRAND.warning, name: "Warning" },
              { hex: "#2E6B41",     name: "Success" },
              { hex: "#FFFFFF",     name: "Surface" },
            ].map(({ hex, name }) => (
              <div key={hex} className="flex-1 flex flex-col gap-1">
                <div className="w-full h-8 rounded-xl border border-gray-200 dark:border-gray-600" style={{ backgroundColor: hex }} />
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">{name}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 h-12 rounded-2xl shadow-inner" style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.secondary} 55%, ${BRAND.tertiary} 100%)` }} />
          <p className="mt-2 text-[10px] text-center text-gray-400 dark:text-gray-500 italic">HitoColors — lib/theme/app_theme.dart</p>
        </div>

        <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>Tipografía — Manrope</p>
          <div className="space-y-5">
            {[
              { label: "Display — 36/700", sample: "Milestone",               cls: "text-4xl font-black tracking-tight", border: BRAND.secondary, meta: "Manrope · 700 · 36px" },
              { label: "Headline — 28/700", sample: "Tu plata, en orden",      cls: "text-2xl font-bold",                 border: BRAND.primary,   meta: "Manrope · 700 · 28px" },
              { label: "Body — 16/400",     sample: "Registrá un gasto en menos de 10 segundos.", cls: "text-sm leading-relaxed font-normal", border: "#9CA3AF", meta: "Manrope · 400 · 16px · 1.6 lh" },
              { label: "Label — 14/500",    sample: "META SEMANAL",           cls: "text-xs font-semibold uppercase tracking-widest", border: "#D1D5DB", meta: "Manrope · 500 · 14px" },
            ].map(({ label, sample, cls, border, meta }) => (
              <div key={label} className="pl-4" style={{ borderLeft: `4px solid ${border}` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className={`${cls} text-gray-900 dark:text-gray-50`} style={{ fontFamily: "Manrope, sans-serif" }}>{sample}</p>
                <p className="text-[10px] font-mono text-gray-400 mt-1">{meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>
            Sistema de componentes · UI Inventory (Material Design 3)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { level: "Buttons",         count: "10", color: BRAND.primary,   items: ["FilledButton", "OutlinedButton", "TextButton", "IconButton"] },
              { level: "Inputs",          count: "9",  color: BRAND.secondary, items: ["HitoToggle", "Amount Field", "Category Picker", "Date Picker"] },
              { level: "Cards",           count: "11", color: BRAND.tertiary,  items: ["GoalCardShell (3 estados)", "TotalSavedCard", "IconStatCard"] },
              { level: "Modals / Sheets", count: "6",  color: BRAND.primary,   items: ["CategoryPickerSheet", "TransactionDetailSheet", "ConfirmDialog"] },
              { level: "Snackbars",       count: "2",  color: BRAND.secondary, items: ["AppToast (informativo)", "SnackBar (error)"] },
              { level: "Navigation",      count: "2",  color: BRAND.tertiary,  items: ["HitoBottomNavBar", "AppBar (Registrar)"] },
              { level: "Lists / Tiles",   count: "3",  color: BRAND.primary,   items: ["Goal / Budget item", "Scheduled payment item"] },
              { level: "Custom Widgets",  count: "18", color: BRAND.secondary, items: ["ProgressRing", "SkeletonBox", "CardStrikeThrough"] },
            ].map(({ level, count, color, items }) => (
              <div key={level} className="rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: color }}>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">{level}</p>
                  <span className="text-[10px] font-bold bg-white/25 text-white px-1.5 py-0.5 rounded-full">{count}</span>
                </div>
                <div className="bg-white dark:bg-gray-700 px-4 py-3 space-y-1.5">
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-500 flex-shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-400 dark:text-gray-500 italic text-center">
            61 variantes documentadas en <code className="font-mono">ui_inventory.html</code>, reconstruidas con los tokens reales de <code className="font-mono">lib/theme/app_theme.dart</code>.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Principios aplicados</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { Icon: HeartHandshake, title: "Acompañante, no institución", desc: "Paleta y tono alejados a propósito de la estética bancaria tradicional." },
              { Icon: Wallet,         title: "Registra, no maneja",         desc: "Sin conexión bancaria real: el usuario carga lo que quiere registrar." },
              { Icon: Layers,         title: "Material Design 3",           desc: "Tokens de color, spacing y radios documentados y consistentes." },
              { Icon: Sparkles,       title: "Componentes, no pantallas sueltas", desc: "El flujo de Metas se construyó con el UI Kit de M3 para sentar un sistema real." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND.primary}18` }}>
                  <Icon className="w-4 h-4" style={{ color: BRAND.primary }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Carrusel genérico de imágenes (reutilizado en Wireframe Mid-Fi)
══════════════════════════════════════════════════════════════════════ */
interface CarouselItem { src: string; caption: string }

function ImageCarousel({ items }: { items: CarouselItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveIdx(Math.max(0, Math.min(Math.round(el.scrollLeft / el.clientWidth), items.length - 1)));
  };
  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(i, items.length - 1));
    scrollRef.current?.scrollTo({ left: clamped * (scrollRef.current.clientWidth), behavior: "smooth" });
    setActiveIdx(clamped);
  };

  const arrowBase = "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-200";
  const arrowEnabled = isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-white hover:bg-gray-50 text-gray-600";
  const arrowDisabled = "opacity-30 pointer-events-none";

  return (
    <div className="relative">
      <button onClick={() => scrollToIndex(activeIdx - 1)} aria-label="Anterior"
        className={`${arrowBase} left-1 ${activeIdx === 0 ? arrowDisabled : arrowEnabled}`}>
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button onClick={() => scrollToIndex(activeIdx + 1)} aria-label="Siguiente"
        className={`${arrowBase} right-1 ${activeIdx === items.length - 1 ? arrowDisabled : arrowEnabled}`}>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div ref={scrollRef} onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide mx-10"
        style={{ scrollBehavior: "smooth" }}>
        {items.map(({ src, caption }, i) => (
          <div key={caption} className="snap-center flex-shrink-0 w-full px-1" role="group"
            aria-label={`Imagen ${i + 1} de ${items.length}: ${caption}`}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <div className="w-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-6">
                <img src={src} alt={caption} className="w-full h-auto object-contain max-h-80 md:max-h-96" />
              </div>
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} aria-label={`Ir a imagen ${i + 1}`} onClick={() => scrollToIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: activeIdx === i ? 24 : 8, height: 8, background: activeIdx === i ? BRAND.primary : (isDark ? "#4b5563" : "#d1d5db") }} />
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500" aria-live="polite">{activeIdx + 1} / {items.length}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: WIREFRAME MID-FI (Metas, UI Kit M3)
══════════════════════════════════════════════════════════════════════ */
const METAS_M3: Array<{ label: string; src: string }> = [
  { label: "Ahorro (sección)",       src: metasSection },
  { label: "Metas activas",          src: metasActivas },
  { label: "Detalle de meta activa", src: metaDetalle },
  { label: "Crear meta",             src: metaCrear },
  { label: "Editar meta",            src: metaEditar },
  { label: "Meta creada",            src: metaCreada },
  { label: "Metas logradas",         src: metasLogradas },
];

function WireframeMidFiPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Metas, construido con el UI Kit de M3</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        El flujo completo de ahorro en alta fidelidad, componente por componente: de la sección Ahorro a una meta creada, editada y lograda.
      </p>
      <ImageCarousel items={METAS_M3.map((m) => ({ src: m.src, caption: m.label }))} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: CONSTRUCCIÓN
══════════════════════════════════════════════════════════════════════ */
function BuildMilestoneDiagram() {
  const { isDark } = useTheme();
  const bg      = isDark ? "#1f2937" : "#f9fafb";
  const muted   = isDark ? "#6b7280" : "#9ca3af";
  const lineClr = isDark ? "rgba(195,196,232,0.32)" : "rgba(74,78,120,0.22)";

  const steps = [
    { x:  54, label: "Diseño UI",   sub: "Metas en\nmedia-fi",          color: BRAND.secondary },
    { x: 162, label: "Spec",        sub: "Pantalla → \nespecificación", color: "#CC785C" },
    { x: 270, label: "Claude Code", sub: "Flutter +\nFirebase",         color: BRAND.primary },
    { x: 378, label: "UAT propio",  sub: "flutter analyze\n+ build web", color: BRAND.primary },
    { x: 486, label: "Testing real", sub: "Maze +\n5 sesiones",         color: BRAND.tertiary },
  ];

  return (
    <svg viewBox="0 0 540 140" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="540" height="140" rx="12" fill={bg} />
      {steps.slice(0, -1).map((s, i) => (
        <line key={i} x1={s.x + 26} y1={46} x2={steps[i + 1].x - 26} y2={46} stroke={lineClr} strokeWidth="2" />
      ))}
      {steps.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={46} r={26} fill={`${s.color}22`} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x} y={42} textAnchor="middle" fontSize="7.2" fontWeight="700" fill={s.color}>{s.label}</text>
          {s.sub.split("\n").map((line, i) => (
            <text key={i} x={s.x} y={53 + i * 9} textAnchor="middle" fontSize="6" fill={muted}>{line}</text>
          ))}
        </g>
      ))}
      <path d="M 486 72 Q 486 108 270 108 Q 54 108 54 72" stroke={lineClr} strokeWidth="1" fill="none" strokeDasharray="5 4" />
      <text x="270" y="120" textAnchor="middle" fontSize="6.5" fill={muted}>9 iteraciones desplegadas a producción</text>
      <text x="270" y="134" textAnchor="middle" fontSize="6.5" fill={isDark ? "#374151" : "#d1d5db"} letterSpacing="1.2">
        DE PANTALLA DISEÑADA A PRODUCTO VIVO
      </text>
    </svg>
  );
}

function BuildPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">De pantalla diseñada a producto vivo</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-2xl">
        La construcción fue guiada por especificación (spec-driven): antes del primer prompt, cada pantalla y flujo diseñado en Figma se tradujo a una especificación que Claude Code pudiera ejecutar sin ambigüedad. Dirigí el desarrollo con Claude Code en Flutter y Firebase (Flutter por su cercanía a Material Design 3, Firebase por experiencia previa), con login sin contraseña por magic link.
      </p>
      <div className="rounded-xl border p-4 mb-6 max-w-2xl" style={{ borderColor: `${BRAND.primary}25`, background: `${BRAND.primary}08` }}>
        <p className="text-gray-700 dark:text-gray-200 text-sm italic">
          "Pude desarrollar la aplicación completa, todos los flujos, incluso pantallas que tal vez no había considerado aún, ya que al explicarle la IA podía reutilizar mis propios componentes y armar el flujo faltante, eso agilizó bastante." | Diario de proceso, Claude + Lovable + Stitch
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
        <BuildMilestoneDiagram />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: PROTOTIPO (Figma / Maze embed + UAT propio)
══════════════════════════════════════════════════════════════════════ */
const FIGMA_PROTOTYPE_EMBED_URL = "https://embed.figma.com/proto/tyqQYxiMCd4pXPxLjvSynJ/Milestone---Testing-Maze?page-id=0%3A1&node-id=26-74&viewport=249%2C-40%2C0.29&scaling=scale-down&content-scaling=fixed&starting-point-node-id=26%3A74&embed-host=share";
const FIGMA_PROTOTYPE_URL = "https://www.figma.com/proto/tyqQYxiMCd4pXPxLjvSynJ/Milestone---Testing-Maze?page-id=0%3A1&node-id=26-74";

function FigmaPrototypeEmbed() {
  return (
    <>
      <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm bg-black/5 dark:bg-black/20">
        <div className="relative w-full" style={{ aspectRatio: "800 / 450" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            style={{ border: "1px solid rgba(0,0,0,0.1)" }}
            src={FIGMA_PROTOTYPE_EMBED_URL}
            allowFullScreen
          />
        </div>
      </div>
      <div className="md:hidden flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <SiFigma className="w-8 h-8" style={{ color: "#F24E1E" }} />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
          Prototipo navegable — Milestone · Testing Maze
        </p>
        <motion.a
          href={FIGMA_PROTOTYPE_URL}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: `0 8px 30px ${BRAND.primary}4d` }}
          whileTap={{ scale: .97 }}
          className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-xl font-medium shadow-lg"
          style={{ background: BRAND.primary }}
        >
          Ver prototipo en Figma →
        </motion.a>
      </div>
    </>
  );
}

function PrototipoPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Probá el prototipo (testing en Maze)</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-2xl">
        Posteriormente se construyó un prototipo de alta fidelidad para la etapa de testing, del flujo de registro de gastos e ingresos. Estas pantallas nunca se diseñaron en Figma: Maze necesitaba un prototipo navegable ahí para poder testear, así que la alta fidelidad se construyó a partir del código del producto ya desarrollado y se trasladó a Figma con el MCP de Claude: el camino inverso al habitual, de código a diseño.
      </p>
      <FigmaPrototypeEmbed />

      <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 mt-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.primary }}>UAT propio, antes de exponer a usuarios reales</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          Antes de exponer nada a una persona real, hubo una etapa de verificación propia del producto: revisar que lo construido funcionara y se viera como se había diseñado. La incidencia más crítica fue el prototipo de Figma Make con los íconos rotos al subirlo a Maze: se veían como palabras sueltas, y el prototipo perdía toda credibilidad como "una app real".
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Migrar a Figma Design y reconstruir las interacciones a mano (con ayuda del MCP de Claude) no estaba en el plan original, pero era la única forma de llegar a un prototipo testeable. Detectarlo a tiempo evitó testear un prototipo "roto" que hubiera contaminado los resultados con fricción que no era real.
        </p>
      </div>
    </div>
  );
}

/* ── Filtro / stepper horizontal — mismo estilo pill que las demás secciones ── */
type PrototypeFilterKey = "branding" | "wireframe" | "build" | "prototipo";
const PROTOTYPE_FILTERS: { key: PrototypeFilterKey; label: string; hint: string }[] = [
  { key: "branding",   label: "Branding",         hint: "Color + tipografía" },
  { key: "wireframe",  label: "Wireframe Mid-Fi", hint: "Metas · M3" },
  { key: "build",      label: "Construcción",     hint: "Spec + Claude Code" },
  { key: "prototipo",  label: "Prototipo",        hint: "Testing Maze" },
];

function PrototypeFilterStepper({ active, onChange }: { active: PrototypeFilterKey; onChange: (k: PrototypeFilterKey) => void }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto">
        {PROTOTYPE_FILTERS.map((f) => {
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
export function MilestonePrototypeExplorer() {
  const [filter, setFilter] = useState<PrototypeFilterKey>("branding");
  return (
    <div>
      <PrototypeFilterStepper active={filter} onChange={setFilter} />
      <div className="pt-6">
        <AnimatePresence initial={false}>
          <motion.div key={filter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            {filter === "branding"   && <BrandingPanel />}
            {filter === "wireframe"  && <WireframeMidFiPanel />}
            {filter === "build"      && <BuildPanel />}
            {filter === "prototipo"  && <PrototipoPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
