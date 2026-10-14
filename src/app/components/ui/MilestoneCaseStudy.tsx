/**
 * MilestoneCaseStudy — case study de Milestone.
 * Header sticky con menú (índice del caso de estudio + navegación general)
 * y barra de progreso de lectura. Cada etapa del proceso (Discover, Define,
 * Ideate, Prototipar, Testing) usa un explorador con stepper horizontal
 * que filtra entre sus distintas vistas.
 */
import { ElementType, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight, ArrowUp, ExternalLink, Moon, Sun, X, Menu,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, Info, Compass, Route,
} from "lucide-react";
import { MilestoneDiscoverExplorer } from "./MilestoneDiscoverExplorer";
import { MilestoneDefineExplorer } from "./MilestoneDefineExplorer";
import { MilestoneIdeateExplorer } from "./MilestoneIdeateExplorer";
import { MilestonePrototypeExplorer } from "./MilestonePrototypeExplorer";
import { MilestoneTestingExplorer } from "./MilestoneTestingExplorer";
import { SiFigma, SiFlutter, SiFirebase } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import logo2     from "../../../imports/logo2.svg";
import logo2dark from "../../../imports/logo2dark.svg";
import { ToolBadge as SharedToolBadge } from "./ToolGlyph";
import { scrollBehavior } from "../../utils/motion";
import { useDialogFocus } from "../../utils/useDialogFocus";

/* ─── Brand tokens (reales, de lib/theme/app_theme.dart vía ui_inventory.html) ── */
const BRAND = {
  primary: "#4A4E78", primaryDark: "#C3C4E8",
  secondary: "#B08B5A", tertiary: "#7C9885",
  error: "#B3261E", warning: "#9A6B00",
};

const MILESTONE_APP_URL = "https://milestone-cc9af.web.app/";

/* ─── Steps (nav de proceso, 5 etapas) ── */
interface Step { id: string; num: string; label: string; Icon: ElementType; }
const STEPS: Step[] = [
  { id: "empatizar",  num: "01", label: "Discover",   Icon: Users },
  { id: "definir",    num: "02", label: "Define",     Icon: Search },
  { id: "idear",      num: "03", label: "Ideate",     Icon: Lightbulb },
  { id: "prototipar", num: "04", label: "Prototipar", Icon: Layers },
  { id: "prueba",     num: "05", label: "Testing",    Icon: CheckCircle },
];

/* ─── Índice completo — secciones para el sheet ── */
interface IndexSection { id: string; label: string; Icon: ElementType; }
const INDEX_SECTIONS: IndexSection[] = [
  { id: "inicio",      label: "Portada",        Icon: Info },
  { id: "resumen",     label: "El proyecto",    Icon: Info },
  { id: "resultados",  label: "Resultados",     Icon: CheckCircle },
  { id: "metodologia", label: "Metodología",    Icon: Route },
  { id: "empatizar",   label: "Discover",       Icon: Users },
  { id: "definir",     label: "Define",         Icon: Search },
  { id: "idear",       label: "Ideate",         Icon: Lightbulb },
  { id: "prototipar",  label: "Prototipar",     Icon: Layers },
  { id: "prueba",      label: "Testing",        Icon: CheckCircle },
  { id: "reflexion",   label: "Reflexión final",Icon: Compass },
];

type LocalTool =
  | { type: "icon"; Icon: ElementType; label: string; color: string }
  | { type: "text"; abbr: string;      label: string; bg: string };

const LOCAL_TOOLS: LocalTool[] = [
  { type: "icon", Icon: SiFigma,    label: "Figma",    color: "#F24E1E" },
  { type: "icon", Icon: SiFlutter,  label: "Flutter",  color: "#02569B" },
  { type: "icon", Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { type: "text", abbr: "CC",  label: "Claude Code",   bg: "#CC785C" },
  { type: "text", abbr: "St",  label: "Stitch",        bg: "#4285F4" },
  { type: "text", abbr: "FM",  label: "Figma Make",    bg: "#8B5CF6" },
  { type: "text", abbr: "Lv",  label: "Lovable",       bg: "#A855F7" },
  { type: "text", abbr: "Mz",  label: "Maze",          bg: BRAND.primary },
  { type: "icon", Icon: PenLine, label: "Lápiz y Papel", color: BRAND.secondary },
];

/* ─── Helpers compartidos ── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}
      className={className}>{children}</motion.div>
  );
}

function LocalToolBadge({ tool }: { tool: LocalTool }) {
  return <SharedToolBadge label={tool.label} />;
}

/* ─── Barra de progreso de lectura ── */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => { window.removeEventListener("scroll", h); window.removeEventListener("resize", h); };
  }, []);
  return (
    <div className="absolute left-0 right-0 bottom-0 h-[2.5px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`, width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }} />
    </div>
  );
}

/* ─── Menú hamburguesa: sheet con 2 niveles de jerarquía —
   1) Navegación general del sitio (volver al inicio, cambiar tema) — mayor jerarquía
   2) Índice del caso de estudio actual — encabezado con el nombre del caso
      (lleva a la portada) + sus secciones internas ── */
function IndexSheet({ open, onClose, activeId, isDark, toggleTheme, title }: {
  open: boolean; onClose: () => void; activeId: string; isDark: boolean; toggleTheme: () => void; title: string;
}) {
  const navigate = useNavigate();
  const sheetRef = useDialogFocus<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="index-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div key="index-sheet" ref={sheetRef} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            id="case-study-menu" role="dialog" aria-modal="true" aria-label="Menú del caso de estudio">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Menú</p>
              <button onClick={onClose} aria-label="Cerrar menú"
                className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* ── Nivel 1: navegación general del sitio ── */}
            <div className="p-3">
              <button onClick={() => { onClose(); navigate("/"); }}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  <ArrowLeft className="w-4 h-4 text-[#4A4E78] dark:text-[#C3C4E8]" />
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Volver al inicio</p>
              </button>
              <button onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  {isDark
                    ? <Sun className="w-4 h-4 text-[#7A5E36] dark:text-[#D9BE93]" />
                    : <Moon className="w-4 h-4 text-[#4A4E78] dark:text-[#C3C4E8]" />}
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {isDark ? "Modo claro" : "Modo oscuro"}
                </p>
              </button>
            </div>

            {/* ── Nivel 2: índice del caso de estudio actual ── */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              {/* Nombre del caso de estudio — encabezado del grupo + link a la portada */}
              <button onClick={() => { scrollTo(INDEX_SECTIONS[0].id); onClose(); }}
                aria-current={activeId === INDEX_SECTIONS[0].id ? "true" : undefined}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div>
                  <p className="text-base font-bold text-gray-800 dark:text-gray-100">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">Ir a la portada</p>
                </div>
                <ArrowUp aria-hidden="true" className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              </button>

              {/* Secciones internas del caso de estudio — anidadas bajo el nombre */}
              <div className="mt-1">
                {INDEX_SECTIONS.slice(1).map((s, i) => {
                  const active = activeId === s.id;
                  return (
                    <motion.button key={s.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.03 }}
                      onClick={() => { scrollTo(s.id); onClose(); }}
                      aria-current={active ? "true" : undefined}
                      className={`flex items-center gap-3 w-full pl-7 pr-4 py-3 rounded-xl text-left transition-colors group ${
                        active ? "" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      style={active ? { background: `${BRAND.primary}0f` } : undefined}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "" : "bg-gray-100 dark:bg-gray-800"}`}
                        style={active ? { background: `${BRAND.primary}1a` } : undefined}>
                        <s.Icon className="w-3.5 h-3.5 text-[#4A4E78] dark:text-[#C3C4E8]" />
                      </span>
                      <div className="flex-1">
                        <p className={`text-sm ${active ? "font-bold" : "font-medium"} text-gray-800 dark:text-gray-100`}>{s.label}</p>
                      </div>
                      {active && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BRAND.primary }} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CaseStudyNav({ title }: { title: string }) {
  const navigate = useNavigate(), { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [activeId, setActiveId] = useState(INDEX_SECTIONS[0].id);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 110;
      let current = INDEX_SECTIONS[0].id;
      for (const s of INDEX_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActiveId(current);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.nav aria-label="Caso de estudio" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")} className="flex items-center justify-center w-11 h-11" aria-label="Ir al inicio">
            <img src={isDark ? logo2dark : logo2} alt="" className="w-9 h-9 object-contain" />
          </motion.button>

          {/* Botón hamburguesa — a la derecha del todo; reemplaza al Proceso, no se oculta ni cambia al scrollear */}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIndexOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={indexOpen}
            aria-controls="case-study-menu"
            aria-haspopup="dialog"
            className="flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 hover:border-[#4A4E78]/40 hover:text-[#4A4E78] dark:hover:text-[#C3C4E8] transition-colors">
            <Menu className="w-4 h-4" />
          </motion.button>
        </div>

        <ReadingProgressBar />
      </motion.nav>

      <IndexSheet open={indexOpen} onClose={() => setIndexOpen(false)} activeId={activeId} isDark={isDark} toggleTheme={toggleTheme} title={title} />
    </>
  );
}

function StepNode({ step, index }: { step: Step; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button onClick={() => scrollTo(step.id)} onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center gap-3 flex-shrink-0 w-[72px] sm:w-24 group">
      <motion.div animate={{ background: hov ? `${BRAND.secondary}22` : `${BRAND.primary}14`, borderColor: hov ? BRAND.secondary : `${BRAND.primary}2e` }}
        transition={{ duration: 0.22 }} className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm">
        <step.Icon className="w-6 h-6 transition-colors duration-200" style={{ color: hov ? BRAND.secondary : BRAND.primary }} />
      </motion.div>
      <span className="text-xs sm:text-sm font-medium text-center leading-tight text-[#4A4E78] dark:text-[#C3C4E8]">
        {step.label}
      </span>
    </motion.button>
  );
}

function StepConnector({ index }: { index: number }) {
  const highlight = index % 2 === 0;
  return (
    <div className="flex-1 flex items-start pt-7 min-w-[24px]">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.15, ease: "easeOut" }}
        className="w-full origin-left"
        style={{ height: 2, borderRadius: 1, background: highlight ? `linear-gradient(90deg, ${BRAND.secondary}8c, ${BRAND.secondary}40)` : "rgba(209,213,219,0.9)" }} />
    </div>
  );
}

function ProcessStepper() {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-6">
      <div className="flex items-start justify-between min-w-[480px] sm:min-w-0 px-2 sm:px-8 lg:px-16">
        {STEPS.map((s, i) => (
          <div key={s.id} className="contents">
            <StepNode step={s} index={i} />
            {i < STEPS.length - 1 && <StepConnector index={i} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm ${accent
      ? "bg-[#B08B5A]/10 text-[#7A5E36] dark:bg-[#B08B5A]/20 dark:text-[#D9BE93]"
      : "bg-[#4A4E78]/10 text-[#4A4E78] dark:bg-[#4A4E78]/40 dark:text-[#C3C4E8]"}`}>{text}</span>
  );
}

/* ─── Hero ── */
const HERO_TAGS = ["Proyecto individual", "Spec-driven development", "App en producción"];

function MilestoneHero() {
  const { isDark } = useTheme();
  const color = isDark ? BRAND.primaryDark : BRAND.primary;

  const bgStyle: React.CSSProperties = {
    background: isDark
      ? [
          `radial-gradient(55% 45% at 10%  8%, ${BRAND.primary}26, transparent 55%)`,
          `radial-gradient(45% 40% at 90%  0%, ${BRAND.primary}18, transparent 55%)`,
          "#0a0a12",
        ].join(", ")
      : [
          `radial-gradient(55% 45% at 10%  8%, ${BRAND.primary}22, transparent 55%)`,
          `radial-gradient(45% 40% at 90%  0%, ${BRAND.primary}14, transparent 55%)`,
          "#f9f9fc",
        ].join(", "),
  };

  return (
    <section id="inicio" aria-label="Presentación del caso de estudio"
      className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-24 scroll-mt-20" style={bgStyle}>

      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `${BRAND.primary}2e`}} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: `${BRAND.primary}1e`}} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-8"
          style={{ borderColor: `${BRAND.primary}4d`, color }}>
          Caso de estudio · Milestone
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-gray-900 dark:text-gray-100">
          Milestone – <span style={{ color }}>App de registro financiero</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg sm:text-xl max-w-xl mx-auto text-gray-500 dark:text-gray-400 leading-relaxed">
          Una app de finanzas personales pensada para dar tranquilidad, no para exigir control.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {HERO_TAGS.map((tag, i) => (
            <motion.span key={tag} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.24 + i * 0.06 }}
              className="rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{ borderColor: `${BRAND.primary}4d`, background: isDark ? `${BRAND.primary}26` : `${BRAND.primary}14`, color }}>
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a href={MILESTONE_APP_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -2, boxShadow: `0 12px 32px ${BRAND.primary}55` }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }} style={{ background: BRAND.primary }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg">
            Ir a Milestone
            <ExternalLink className="w-4 h-4" />
          <span className="sr-only"> (se abre en una pestaña nueva)</span></motion.a>
          <motion.button onClick={() => scrollTo("empatizar")}
            whileHover={{ y: -2, borderColor: color, color }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-sm">
            Conocer proceso
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function MilestoneCaseStudy() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyNav title="Milestone" />
      <main id="main" tabIndex={-1} className="outline-none">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <MilestoneHero />

      {/* ── DESCRIPCIÓN + FICHA ─────────────────────────────────── */}
      <section id="resumen" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <SectionLabel text="Descripción General" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El research encontró un patrón que ninguna app de finanzas termina de resolver: la persona vuelve a registrar sus gastos cuando se siente perdida con su plata, sostiene el hábito mientras recupera el control, y en el momento en que se siente tranquila, lo abandona.{" "}
                  <strong className="text-[#4A4E78] dark:text-[#C3C4E8]">Todas las apps existentes asumen que esa disciplina va a durar para siempre</strong>, y cuando no dura, reciben a quien vuelve con saldos en rojo, rachas rotas o silencio.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Milestone se diseñó para ese momento exacto de la vuelta. El Home no abre con un número en rojo: abre con una invitación a ajustar la meta a la situación real, sin borrar el progreso ni hacer sentir a la persona en falta por el tiempo que estuvo sin registrar.{" "}
                  <strong className="text-gray-800 dark:text-gray-100">No maneja dinero real</strong>: registra lo que el usuario carga, sin conectar cuentas bancarias.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Herramientas utilizadas</p>
                  <div className="flex flex-wrap gap-3">
                    {LOCAL_TOOLS.map((t) => <LocalToolBadge key={t.label} tool={t} />)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Rol",          value: "Product Designer & Design Engineer" },
                    { label: "Sector",       value: "Finanzas personales (sin dinero real)" },
                    { label: "Validación",   value: "5 sesiones moderadas + Maze" },
                    { label: "Formato",      value: "Proyecto individual · 10 días" },
                    { label: "Stack",        value: "Flutter · Firebase · Claude Code · Figma" },
                    { label: "Resultado",    value: "Bug crítico detectado y corregido antes de producción" },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: .55, delay: idx * .08 }}
                      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(74,78,120,.14)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow">
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1.5">{label}</p>
                      <p className="text-[#4A4E78] dark:text-[#C3C4E8] text-sm font-semibold">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 mt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-2">Método de validación</p>
                  <div className="space-y-1.5">
                    {[
                      "5 sesiones moderadas 1:1 sobre el flujo de Metas",
                      "Test no moderado en Maze sobre el registro diario",
                      "UAT propio antes de exponer el producto a usuarios reales",
                    ].map((v) => (
                      <p key={v} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#4A4E78] dark:text-[#C3C4E8] mt-0.5 flex-shrink-0">✓</span>{v}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── STAR / LOGRO ────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: `linear-gradient(135deg, ${BRAND.primary}, #2f3252)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">
              ★ Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
              "Por primera vez en esta categoría de apps, quien se cae del hábito tiene una forma concreta de{" "}
              <span className="text-[#D9BE93]">retomarlo</span>, en lugar de un producto que asume que si no fue perfecto, no vale."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación", desc: "Las apps de finanzas asumen disciplina perfecta y castigan a quien deja de registrar" },
                { label: "Tarea",     desc: "Diseñar un producto que reciba de vuelta a quien abandonó el hábito, sin culpa" },
                { label: "Acción",    desc: "Home rediseñado, construcción spec-driven con Claude Code y testing con 5 sesiones moderadas + Maze" },
                { label: "Resultado", desc: "SEQ 6.55/7 en Metas · bug crítico de confianza detectado y corregido a tiempo" },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-white"><span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: BRAND.secondary }} />{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── RESULTADOS ──────────────────────────────────────────── */}
      <section id="resultados" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Resultados" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Lo que midió el testing</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Dos estudios complementarios sobre el producto funcionando: un test no moderado en Maze y 5 sesiones moderadas 1:1.
            </p>
          </FadeSection>
          <FadeSection delay={.05}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { val: "6.55/7", unit: "SEQ en Metas",          sub: "Facilidad percibida en el flujo más complejo, en 5 sesiones moderadas" },
                { val: "88.9%",  unit: "registro sin ayuda",    sub: "Completó el registro diario en el test no moderado de Maze" },
                { val: "17/20",  unit: "tareas resueltas",      sub: "De forma directa o con ayuda mínima" },
                { val: "9",      unit: "fixes a producción",    sub: "Cada uno verificado con flutter analyze y flutter build web" },
              ].map(({ val, unit, sub }) => (
                <motion.div key={unit} whileHover={{ y: -3 }}
                  className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <p className="text-3xl sm:text-4xl font-black mb-1 text-[#4A4E78] dark:text-[#C3C4E8]">{val}</p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm">{unit}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-snug">{sub}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>
          <FadeSection delay={.08}>
            <div className="mt-6 rounded-xl border-l-4 p-5" style={{ borderColor: BRAND.error, background: `${BRAND.error}0d` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#B3261E] dark:text-[#F28B82]">1 bug crítico detectado antes de publicar</p>
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                Una meta se marcaba como lograda con un aporte parcial chico. Era un problema de integridad de datos que habría roto la confianza del usuario, justo lo que el research había identificado como el enemigo del hábito.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── PROCESO ─────────────────────────────────────────────── */}
      <section id="metodologia" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Metodología" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proceso, contado en decisiones</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Más que una checklist de entregables: el research corrigiendo a la arquitectura, la arquitectura corrigiendo al wireframe, el testing corrigiendo al prototipo.
            </p>
          </FadeSection>
          <FadeSection delay={.1}><ProcessStepper /></FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          01 · DISCOVER
      ══════════════════════════════════════════════════════════ */}
      <section id="empatizar" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="01 · Discover" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">La hipótesis que se quedaba corta</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              La hipótesis inicial era la típica: la gente no controla sus finanzas porque las apps que existen son muy complejas, muy frías, o no generan hábito. Después de hablar con tres personas reales (Rossana, Gabriel y María) quedó claro que esa hipótesis, aunque no estaba mal, se quedaba corta.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El problema no era de herramientas ni de información. Era emocional. Las tres personas ya usaban algo (una app del banco, una billetera digital, un Excel, un cuaderno) y las tres, en algún momento, habían dejado de anotar. No por vagas: porque el esfuerzo de sostener el registro les pesaba más que el beneficio de tenerlo.
            </p>
          </FadeSection>

          {/* Explorador filtrable — Entrevistas / Benchmark / Personas / Dolores */}
          <FadeSection delay={.05}>
            <MilestoneDiscoverExplorer />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          02 · DEFINE
      ══════════════════════════════════════════════════════════ */}
      <section id="definir" className="py-16 md:py-20 scroll-mt-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="02 · Define" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Tres piezas, un MVP con foco</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Con los dolores mapeados, definir no fue armar una lista de features: fue decidir qué versión de Milestone merecía construirse primero, con evidencia y no por intuición. How Might We tradujo los tres dolores más críticos en preguntas de diseño accionables, evitando la trampa de resolver todo desde un solo ángulo al ser una sola persona detrás del proyecto.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El journey map de Sol, de la frustración inicial al hábito sostenido, mostró en qué momento exacto el producto tenía que intervenir. Cruzando esas dos piezas quedó un alcance claro: una app de registro, no una billetera, con el cierre emocional como diferencial frente a Wallet y Spendee.
            </p>
          </FadeSection>

          <FadeSection delay={.05}>
            <MilestoneDefineExplorer />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          03 · IDEATE
      ══════════════════════════════════════════════════════════ */}
      <section id="idear" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="03 · Ideate" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">La decisión que se revisó al chocar con evidencia</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              La arquitectura de información no salió de un sitemap armado a criterio propio: nació de un card sorting abierto en Useberry, con personas reales agrupando funcionalidades a su manera. Ese primer sitemap todavía tenía "Aprender" como sección propia, pero al bajarlo a wireframes lo-fi esa decisión chocó con el research: nadie había pedido estudiar, habían pedido entender en el momento. La sección se disolvió en tips contextuales dentro de otros flujos.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              Con la arquitectura ya puesta a prueba, el flujo completo se mapeó paso a paso en Figma, desde el primer registro hasta el hábito sostenido, y quedó un navegador final de cinco piezas: Home, Ahorro, Registrar, Historial y Perfil, con el Home rediseñado para invitar a definir una meta en lugar de mostrar números en rojo. Las 8 pantallas del flujo se bocetaron en baja fidelidad, a mano y con Stitch para ganar velocidad, validando estructura antes de invertir en color.
            </p>
          </FadeSection>

          <FadeSection delay={.05}>
            <MilestoneIdeateExplorer />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          04 · PROTOTIPAR (UI + construcción con IA + UAT)
      ══════════════════════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-20 scroll-mt-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="04 · Prototipar" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">De pantalla diseñada a producto vivo</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El branding se pensó a propósito no financiero: paleta y tipografía que alejaran a Milestone de la estética bancaria tradicional, construidas sobre los roles de color de Material Design 3, en modo claro y oscuro, con contraste verificado contra WCAG AA. En vez de subir las 30-40 pantallas de la app a alta fidelidad antes de saber si algo funcionaba, se priorizó un solo flujo completo (Metas de ahorro, el que ya se sabía que se iba a testear) para sentar ahí un sistema de componentes real; el resto se resolvió más rápido con Stitch.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El salto de pantalla diseñada a producto vivo fue una construcción guiada por especificación (spec-driven): antes del primer prompt, cada pantalla de Figma se tradujo a una especificación sin ambigüedad, y con eso dirigí el desarrollo con Claude Code en Flutter y Firebase. Las decisiones de diseño fueron mías; la IA implementó. El prototipo de testing se armó al revés de lo habitual, del código ya desarrollado a Figma con el MCP de Claude, y antes de exponerlo a nadie hubo una etapa de UAT propio que detectó a tiempo un ícono roto que hubiera arruinado la credibilidad del prototipo en Maze.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El design system también vive en el código: los tokens están en <code className="text-sm">lib/theme/app_theme.dart</code> y un inventario (<code className="text-sm">ui_inventory.html</code>) cataloga 46 variantes reales de UI, entre botones, inputs, cards, modales y navegación, reconstruidas con esos tokens y enlazadas a su archivo y línea.
            </p>
          </FadeSection>

          <FadeSection delay={.05}>
            <MilestonePrototypeExplorer />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          05 · TESTING
      ══════════════════════════════════════════════════════════ */}
      <section id="prueba" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="05 · Testing" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Dos estudios complementarios</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El plan de testing se armó como dos estudios complementarios: un test no moderado en Maze sobre el registro diario de gastos e ingresos, y cinco sesiones moderadas 1:1 sobre Metas, el flujo con más componentes y jerarquía visual del producto. Los resultados validaron la apuesta (6.55/7 de facilidad percibida en Metas, 88.9% de éxito en el registro diario sin ayuda y 17 de 20 tareas resueltas de forma directa o con ayuda mínima), pero lo más valioso no fueron los números, sino lo que las sesiones moderadas destaparon.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              Ahí apareció el hallazgo crítico del proyecto: una meta de $20.000 se marcaba como "lograda" tras un aporte de solo $5.000, un bug de integridad de datos que hubiera validado exactamente la desconfianza que todo el research había identificado como el enemigo del hábito. Cada hallazgo pasó por severidad, fix y deploy: 9 fixes a producción, cada uno verificado con flutter analyze y flutter build web antes de publicarse. Entre ellos, faltaba la meta viewport y los celulares reales mostraban el mockup de escritorio, el botón "+" de la barra solo respondía en la mitad de su círculo y los formularios no mostraban errores de validación.
            </p>
          </FadeSection>

          <FadeSection delay={.05}>
            <MilestoneTestingExplorer />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LO QUE ESTE PROYECTO ME DEJA
      ══════════════════════════════════════════════════════════ */}
      <section id="reflexion" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <FadeSection>
            <SectionLabel text="Reflexión final" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Lo que este proyecto me deja</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              La pregunta no era cómo hacer una app de finanzas más completa, sino cómo hacer una que alguien realmente sostenga. El testing confirmó una parte de esa apuesta (el flujo más complejo se pudo usar sin instrucciones en la gran mayoría de los casos), pero, sobre todo, confirmó por qué vale la pena testear antes de lanzar: el bug que encontró es exactamente el tipo de falla que le hubiera dado la razón, por las razones equivocadas, a la desconfianza que todo el research había identificado como el verdadero enemigo del hábito financiero.
            </p>
          </FadeSection>

          <FadeSection delay={.06}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#7A5E36] dark:text-[#D9BE93]">Roadmap</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Feedback visual inmediato tras cada aporte a una meta",
                "Vista de historial de metas cumplidas",
                "Reforzar en el onboarding que Milestone registra plata, no la maneja",
                "Simulador de ahorro y gamificación (Fase 2, ya definidos desde Define)",
              ].map((item) => (
                <span key={item} className="px-3.5 py-2 rounded-full text-sm font-medium border text-[#7A5E36] dark:text-[#D9BE93]"
                  style={{ borderColor: `${BRAND.secondary}40`, background: `${BRAND.secondary}0d` }}>
                  {item}
                </span>
              ))}
            </div>
          </FadeSection>

          <FadeSection delay={.08}>
            <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: BRAND.primary }}>
              <p className="text-lg italic text-gray-700 dark:text-gray-200 leading-relaxed">
                "La parte más valiosa de este proceso no fue diseñar la pantalla que se ve bien, sino sostener el rigor de research, testing y QA sobre el propio código el tiempo suficiente para que apareciera el problema que en verdad importaba, y no quedarme solo con el que era más fácil de ver."
              </p>
            </blockquote>
          </FadeSection>

          <FadeSection delay={.1}>
            <div className="rounded-2xl p-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND.primary}, #2f3252)` }}>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
                El hábito no se rompe por un mal día: quien deja de registrar encuentra una invitación a volver, no un castigo.
              </p>
              <p className="text-white/90 mt-4 text-sm sm:text-base">
                SEQ 6.55/7 en Metas, el flujo más complejo del producto · 88.9% completó el registro diario sin ayuda de nadie.
              </p>
              <p className="text-white/90 mt-4 text-xs uppercase tracking-widest">
                Proyecto individual · Diseño + desarrollo asistido por IA
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: `linear-gradient(135deg, #2a2d4d, ${BRAND.primary})` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-1 w-12 rounded-full" style={{ background: BRAND.secondary }} />
              </div>
              <p className="text-white/90 text-xs font-semibold uppercase tracking-widest">¿Siguiente paso?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
                ¿Querés trabajar conmigo?{" "}
                <span className="text-[#D9BE93]">Escribime.</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ backgroundColor: "#C4A276", boxShadow: `0 16px 50px ${BRAND.secondary}55`, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => navigate("/", { state: { section: "contact" } })}
              data-ga-action="cta_click"
              data-ga-category="CTA"
              data-ga-label="Contactar - Milestone"
              style={{ background: BRAND.secondary }}
              className="inline-flex items-center px-10 py-4 rounded-2xl text-gray-900 font-semibold text-lg shadow-2xl transition-all"
            >
              Ir a contacto
            </motion.button>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NAVEGACIÓN
      ══════════════════════════════════════════ */}
      <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeSection>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#B08B5A] dark:hover:text-[#B08B5A] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver al portfolio
              </button>
              <motion.button
                whileHover={{ backgroundColor: BRAND.secondary, borderColor: BRAND.secondary, color: "#111827", boxShadow: `0 8px 24px ${BRAND.secondary}4d` }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                onClick={() => navigate("/case-study/iupi")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-medium text-sm transition-colors"
                style={{ borderColor: isDark ? BRAND.primaryDark : BRAND.primary, color: isDark ? BRAND.primaryDark : BRAND.primary }}
              >
                Ver IUPI
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      </main>
      <footer className="py-6 bg-gray-900 dark:bg-gray-950 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 Sofía Álvarez. Diseñado por mí, implementado con Claude Code
        </p>
      </footer>
    </div>
  );
}
