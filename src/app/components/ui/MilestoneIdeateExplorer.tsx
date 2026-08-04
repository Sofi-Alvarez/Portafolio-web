/**
 * MilestoneIdeateExplorer — PREVIEW component (no toca el original).
 * Misma estructura que Discover/Define: stepper horizontal que filtra
 * entre 3 vistas del Ideate: Sitemap, User Flow, Wireframe Lo-Fi.
 */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import wireframeInicio       from "../../../imports/Inicio (B&N Lo-Fi).png";
import wireframeRegistrar    from "../../../imports/Registrar (B&N Lo-Fi).png";
import wireframeActividad    from "../../../imports/Actividad (B&N Lo-Fi).png";
import wireframeDetalle      from "../../../imports/Detalle (B&N Lo-Fi).png";
import wireframeEstadisticas from "../../../imports/Estadísticas (B&N Lo-Fi).png";
import wireframeMetas        from "../../../imports/Metas (B&N Lo-Fi).png";
import wireframePresupuesto  from "../../../imports/Presupuesto (B&N Lo-Fi).png";
import wireframePerfil       from "../../../imports/Perfil (B&N Lo-Fi).png";

const BRAND = { primary: "#4A4E78", secondary: "#B08B5A", tertiary: "#7C9885" };

/* ══════════════════════════════════════════════════════════════════════
   PANEL: SITEMAP
══════════════════════════════════════════════════════════════════════ */
interface SitemapSection { name: string; color: string; children?: string[]; note?: string }
const SITEMAP_SECTIONS: SitemapSection[] = [
  { name: "Inicio",        color: "#4F6BF6", note: "Dashboard con resumen general por categoría — sin subpantallas propias." },
  { name: "Registros",     color: "#C23B3B", children: ["Registrar gasto o ingreso", "Sugerencias al anotar gasto", "Mis registros anotados"] },
  { name: "Ahorro",        color: "#22B8A0", children: ["Mi meta de ahorro semanal", "Progreso de mi meta", "Simulador de ahorro"] },
  { name: "Aprender",      color: "#B5732A", children: ["Tips y mini-lecciones financieras", "Bienvenida y primeros pasos"] },
  { name: "Perfil",        color: "#8A5FD6", children: ["Mi perfil", "Mis categorías", "Logros e insignias"] },
  { name: "Configuración", color: "#5b6373", children: ["Ajustes de la app", "Modo claro u oscuro", "Avisos y recordatorios", "Ayuda y preguntas frecuentes"] },
];

function SitemapPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">La arquitectura, según el modelo mental del usuario</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Derivado de un card sorting abierto: 5 clusters naturales de agrupación se tradujeron en 6 secciones con navegación clara.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SITEMAP_SECTIONS.map((s) => (
          <div key={s.name} className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-5"
            style={{ borderTop: `3px solid ${s.color}` }}>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">{s.name}</p>
            {s.children && (
              <div className="space-y-1.5">
                {s.children.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: s.color }} />
                    <p className="text-xs text-gray-600 dark:text-gray-300">{c}</p>
                  </div>
                ))}
              </div>
            )}
            {s.note && (
              <p className="text-xs italic text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.note}</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-5 max-w-2xl">
        "Tachar un gasto fijo", "editar/eliminar registro" y "filtro de historial" son acciones dentro de una pantalla, no secciones propias — el card sorting agrupa conceptos, no necesariamente navegación.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: USER FLOW
══════════════════════════════════════════════════════════════════════ */
const FIGMA_USER_FLOW_URL = "https://www.figma.com/board/D4hs6h2DtHBRLpBLJx9HC2/Flujo-de-Usuario-v6-UX?node-id=0-1&t=PYCuSSAWbyIxTuzu-1";

function UserFlowPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Flujo de usuario completo</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Mapeado paso a paso en Figma: desde el primer registro hasta el hábito sostenido.
      </p>

      <a href={FIGMA_USER_FLOW_URL} target="_blank" rel="noopener noreferrer"
        className="block rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 max-w-xl mb-6">
        <div className="flex items-center justify-center h-40" style={{ background: "repeating-linear-gradient(135deg, #EDF1FE, #EDF1FE 10px, #F7F8FB 10px, #F7F8FB 20px)" }}>
          <div className="text-center">
            <div className="flex items-center justify-center rounded-2xl mx-auto mb-2" style={{ width: 48, height: 48, background: "#4F6BF6" }}>
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <p className="text-[11px] font-mono text-gray-400">figma board · user flow</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Flujo de Usuario v6 — UX</p>
            <p className="text-xs text-gray-400 mt-0.5">Abrir board en Figma ↗</p>
          </div>
          <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EDF1FE", color: "#4F6BF6" }}>→</span>
        </div>
      </a>

      <div className="rounded-2xl px-6 py-5 bg-gray-900 dark:bg-black/40">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#8fa0ff" }}>Navegador final</p>
        <p className="text-white text-base sm:text-lg italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Home · Ahorro (Metas + Presupuestos) · Registrar · Historial (vista lista + vista gráfica) · Perfil/Configuración. El Home se rediseñó para que, en lugar de números en rojo, lo primero que viera la persona fuera una invitación a definir una meta.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PANEL: WIREFRAME LO-FI (carrusel)
══════════════════════════════════════════════════════════════════════ */
const WIREFRAMES: Array<{ label: string; src: string }> = [
  { label: "Inicio",        src: wireframeInicio },
  { label: "Registrar",     src: wireframeRegistrar },
  { label: "Actividad",     src: wireframeActividad },
  { label: "Detalle",       src: wireframeDetalle },
  { label: "Estadísticas",  src: wireframeEstadisticas },
  { label: "Metas",         src: wireframeMetas },
  { label: "Presupuesto",   src: wireframePresupuesto },
  { label: "Perfil",        src: wireframePerfil },
];

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

function WireframesPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Wireframes lo-fi</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
        Con el sitemap y el flujo definidos, las pantallas principales —Home, Registrar y Metas— se bocetaron primero en baja fidelidad, en blanco y negro: la estructura y la jerarquía se validan antes de invertir en color y branding. Las 8 pantallas del flujo completo se resolvieron con este mismo criterio.
      </p>
      <ImageCarousel items={WIREFRAMES.map((w) => ({ src: w.src, caption: w.label }))} />
    </div>
  );
}

/* ── Filtro / stepper horizontal — mismo estilo pill que Discover/Define ── */
type IdeateFilterKey = "sitemap" | "userflow" | "wireframes";
const IDEATE_FILTERS: { key: IdeateFilterKey; label: string; hint: string }[] = [
  { key: "sitemap",    label: "Sitemap",         hint: "6 secciones" },
  { key: "userflow",   label: "User Flow",       hint: "Figma board" },
  { key: "wireframes", label: "Wireframe Lo-Fi", hint: "8 pantallas" },
];

function IdeateFilterStepper({ active, onChange }: { active: IdeateFilterKey; onChange: (k: IdeateFilterKey) => void }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto">
        {IDEATE_FILTERS.map((f) => {
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
export function MilestoneIdeateExplorer() {
  const [filter, setFilter] = useState<IdeateFilterKey>("sitemap");
  return (
    <div>
      <IdeateFilterStepper active={filter} onChange={setFilter} />
      <div className="pt-6">
        <AnimatePresence initial={false}>
          <motion.div key={filter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            {filter === "sitemap"    && <SitemapPanel />}
            {filter === "userflow"   && <UserFlowPanel />}
            {filter === "wireframes" && <WireframesPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
