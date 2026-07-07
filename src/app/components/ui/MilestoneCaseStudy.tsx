import { ElementType, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight, ExternalLink, Moon, Sun, ChevronDown,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, Sparkles, ShieldAlert, HeartHandshake, Wallet,
} from "lucide-react";
import { MilestoneBenchmarkingUX } from "./MilestoneBenchmarkingUX";
import { MilestoneInterviewNotes } from "./MilestoneInterviewNotes";
import { MilestonePersonaPainMap } from "./MilestonePersonaPainMap";
import { MilestonePainCycle } from "./MilestonePainCycle";
import { MilestoneHMW } from "./MilestoneHMW";
import { MilestoneUserJourney } from "./MilestoneUserJourney";
import { MilestoneMVPScope } from "./MilestoneMVPScope";
import { MilestoneSitemap } from "./MilestoneSitemap";
import { MilestoneUserFlow } from "./MilestoneUserFlow";
import { SiFlutter, SiFirebase, SiFigma } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import logo2     from "../../../imports/logo2.svg";
import logo2dark from "../../../imports/logo2dark.svg";
import wireframeInicio       from "../../../imports/Inicio (B&N Lo-Fi).png";
import wireframeRegistrar    from "../../../imports/Registrar (B&N Lo-Fi).png";
import wireframeActividad    from "../../../imports/Actividad (B&N Lo-Fi).png";
import wireframeDetalle      from "../../../imports/Detalle (B&N Lo-Fi).png";
import wireframeEstadisticas from "../../../imports/Estadísticas (B&N Lo-Fi).png";
import wireframeMetas        from "../../../imports/Metas (B&N Lo-Fi).png";
import wireframePresupuesto  from "../../../imports/Presupuesto (B&N Lo-Fi).png";
import wireframePerfil       from "../../../imports/Perfil (B&N Lo-Fi).png";
import metasSection      from "../../../imports/Section - Ahorro.png";
import metasActivas      from "../../../imports/Metas activas.png";
import metasLogradas     from "../../../imports/Metas logradas.png";
import metaDetalle       from "../../../imports/Vista detalle meta activa.png";
import metaCrear         from "../../../imports/Crear meta.png";
import metaEditar        from "../../../imports/Editar meta.png";
import metaCreada        from "../../../imports/Meta creada.png";

/* ─── Brand tokens (reales, de lib/theme/app_theme.dart vía ui_inventory.html) ── */
const BRAND = {
  primary: "#4A4E78", primaryDark: "#C3C4E8",
  secondary: "#B08B5A", tertiary: "#7C9885",
  error: "#B3261E", warning: "#9A6B00",
};

const MILESTONE_APP_URL = "https://milestone-cc9af.web.app/";

/* ─── Steps (mismo Design Thinking de 5 etapas que el resto de los case studies) ── */
interface Step { id: string; num: string; label: string; Icon: ElementType; }
const STEPS: Step[] = [
  { id: "empatizar",  num: "01", label: "Discover",   Icon: Users },
  { id: "definir",    num: "02", label: "Define",     Icon: Search },
  { id: "idear",      num: "03", label: "Ideate",     Icon: Lightbulb },
  { id: "prototipar", num: "04", label: "Prototipar", Icon: Layers },
  { id: "prueba",     num: "05", label: "Testing",    Icon: CheckCircle },
];

type LocalTool =
  | { type: "icon"; Icon: ElementType; label: string; color: string }
  | { type: "text"; abbr: string;      label: string; bg: string };

const LOCAL_TOOLS: LocalTool[] = [
  { type: "text", abbr: "FM",  label: "Figma Make",    bg: "#F24E1E" },
  { type: "icon", Icon: SiFlutter,  label: "Flutter",  color: "#02569B" },
  { type: "icon", Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { type: "text", abbr: "CC",  label: "Claude Code",   bg: "#CC785C" },
  { type: "text", abbr: "Lv",  label: "Lovable",       bg: "#A855F7" },
  { type: "icon", Icon: PenLine, label: "Lápiz y Papel", color: BRAND.secondary },
];

/* ─── Helpers compartidos (duplicados a propósito, mismo patrón que los demás case studies) ── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}
      className={className}>{children}</motion.div>
  );
}

function LocalToolBadge({ tool }: { tool: LocalTool }) {
  const { isDark } = useTheme();
  const bc       = tool.type === "icon" ? tool.color : tool.bg;
  const tileBg   = isDark ? "rgba(55,65,81,0.9)" : "#ffffff";
  const labelCol = isDark ? "#d1d5db" : "#4b5563";
  return (
    <div className="flex flex-col items-center gap-2 cursor-default select-none">
      <div
        className="w-14 h-14 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center"
        style={{ background: tileBg }}
      >
        {tool.type === "icon" ? (
          <tool.Icon className="w-7 h-7" style={{ color: bc }} />
        ) : (
          <span className="font-bold text-sm leading-none" style={{ color: bc }}>{tool.abbr}</span>
        )}
      </div>
      <span className="text-xs font-medium text-center" style={{ color: labelCol }}>{tool.label}</span>
    </div>
  );
}

function NavPill({ step, active }: { step: Step; active: boolean }) {
  const [hov, setHov] = useState(false);
  const on = active || hov;
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => scrollTo(step.id)}
      aria-current={active ? "true" : undefined}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={{ background: on ? `${BRAND.primary}1a` : "transparent", color: on ? BRAND.primary : "#6b7280", fontWeight: active ? 700 : 500 }}>
      <step.Icon className="w-3.5 h-3.5" />{step.label}
      {active && (
        <motion.span layoutId="milestone-nav-active-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: BRAND.primary }} />
      )}
    </motion.button>
  );
}

function CaseStudyNav({ showPills, title }: { showPills: boolean; title: string }) {
  const navigate = useNavigate(), { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(STEPS[0].id);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const h = () => setMenuOpen(false);
    window.addEventListener("scroll", h, { passive: true, once: true });
    return () => window.removeEventListener("scroll", h);
  }, [menuOpen]);
  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 110;
      let current = STEPS[0].id;
      for (const s of STEPS) {
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
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")} className="flex items-center gap-2" aria-label="Ir al inicio">
            <img src={isDark ? logo2dark : logo2} alt="Sofia Alvarez" className="w-9 h-9 object-contain" />
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              <AnimatePresence mode="wait">
                {showPills ? (
                  <motion.div key="pills" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: .25 }} className="flex gap-1">
                    {STEPS.map((s) => <NavPill key={s.id} step={s} active={activeId === s.id} />)}
                  </motion.div>
                ) : (
                  <motion.span key="label" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: .2 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Caso de Estudio · {title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {showPills && (
                <motion.button key="mb-trig" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.2 }}
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                    menuOpen
                      ? "border-[#4A4E78]/50 bg-[#4A4E78]/8 text-[#4A4E78] dark:border-[#C3C4E8]/40 dark:text-[#C3C4E8]"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400"
                  }`}
                  aria-label="Menu de secciones" aria-expanded={menuOpen}>
                  <span>Proceso</span>
                  <motion.span animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex items-center">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[#4A4E78]/10 dark:hover:bg-[#4A4E78]/30 transition-colors" aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              {isDark
                ? <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: .2 }}><Sun className="w-5 h-5" style={{ color: BRAND.secondary }} /></motion.div>
                : <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: .2 }}><Moon className="w-5 h-5" style={{ color: BRAND.primary }} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && showPills && (
            <motion.div key="mb-drop" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: "easeOut" }}
              className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/97 dark:bg-gray-900/97 backdrop-blur-md">
              <div className="px-3 py-2">
                <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                  Caso de Estudio · {title}
                </p>
                {STEPS.map((s, i) => {
                  const active = activeId === s.id;
                  return (
                    <motion.button key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: i * 0.04 }}
                      onClick={() => { scrollTo(s.id); setMenuOpen(false); }}
                      aria-current={active ? "true" : undefined}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                        active ? "" : "text-gray-600 dark:text-gray-300 hover:bg-[#4A4E78]/6 hover:text-[#4A4E78] dark:hover:text-[#C3C4E8]"
                      }`}
                      style={active ? { color: BRAND.primary, background: `${BRAND.primary}0d` } : undefined}>
                      <span className={`text-[10px] font-mono w-5 flex-shrink-0 ${active ? "" : "text-gray-300 dark:text-gray-600"}`}
                        style={active ? { color: BRAND.primary } : undefined}>{s.num}</span>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${active ? "" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-[#4A4E78]/10"}`}
                        style={active ? { background: `${BRAND.primary}1a` } : undefined}>
                        <s.Icon className="w-3.5 h-3.5" style={{ color: BRAND.primary }} />
                      </span>
                      <span className={active ? "font-bold" : "font-medium"}>{s.label}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BRAND.primary }} />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
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
      <motion.span animate={{ color: hov ? BRAND.secondary : BRAND.primary }} transition={{ duration: 0.2 }}
        className="text-xs sm:text-sm font-medium text-center leading-tight dark:text-[#C3C4E8]">
        {step.label}
      </motion.span>
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
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm`}
      style={accent
        ? { background: `${BRAND.secondary}1a`, color: BRAND.secondary }
        : { background: `${BRAND.primary}1a`, color: BRAND.primary }}>{text}</span>
  );
}

/* ─── Diagrama: proceso vibe-coding aplicado a Milestone ─────────────────── */
function VibeCodingMilestoneDiagram() {
  const { isDark } = useTheme();
  const bg     = isDark ? "#1f2937" : "#f9fafb";
  const txt    = isDark ? "#e5e7eb" : "#1f2937";
  const muted  = isDark ? "#6b7280" : "#9ca3af";
  const lineClr = isDark ? "rgba(195,196,232,0.32)" : "rgba(74,78,120,0.22)";

  const steps = [
    { x:  54, label: "Diseño UI",    sub: "Metas en\nmedia-fi",     color: BRAND.secondary },
    { x: 162, label: "Prompt Eng.",  sub: "Pantalla → \nprompt exacto", color: "#CC785C" },
    { x: 270, label: "Claude Code",  sub: "Flutter +\nFirebase",     color: BRAND.primary },
    { x: 378, label: "UAT propio",   sub: "flutter analyze\n+ build web", color: BRAND.primary },
    { x: 486, label: "Testing real", sub: "Maze +\n5 sesiones",      color: BRAND.tertiary },
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

/* ─── Figma prototype embed (Testing / Maze) — desktop iframe, mobile CTA ── */
const FIGMA_PROTOTYPE_EMBED_URL = "https://embed.figma.com/proto/tyqQYxiMCd4pXPxLjvSynJ/Milestone---Testing-Maze?page-id=0%3A1&node-id=26-74&viewport=249%2C-40%2C0.29&scaling=scale-down&content-scaling=fixed&starting-point-node-id=26%3A74&embed-host=share";
const FIGMA_PROTOTYPE_URL = "https://www.figma.com/proto/tyqQYxiMCd4pXPxLjvSynJ/Milestone---Testing-Maze?page-id=0%3A1&node-id=26-74";

function FigmaPrototypeEmbed() {
  return (
    <>
      {/* Desktop: iframe embed */}
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
      {/* Mobile: CTA button */}
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

/* ─── Wireframe carousel — mismo patrón que IUPICaseStudy, scroll-snap + flechas ── */
interface WireframeItem { src: string; caption: string }

function WireframeCarousel({ items }: { items: WireframeItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIdx(Math.max(0, Math.min(idx, items.length - 1)));
  };

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(i, items.length - 1));
    scrollRef.current?.scrollTo({ left: clamped * (scrollRef.current.clientWidth), behavior: "smooth" });
    setActiveIdx(clamped);
  };

  const prev = () => scrollToIndex(activeIdx - 1);
  const next = () => scrollToIndex(activeIdx + 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2";
  const arrowEnabled = isDark
    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
    : "bg-white hover:bg-gray-50 text-gray-600";
  const arrowDisabled = "opacity-30 pointer-events-none";

  return (
    <div
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Carrusel de wireframes"
      role="region"
      style={{ "--tw-ring-color": BRAND.primary } as React.CSSProperties}
    >
      {/* Previous arrow */}
      <button
        onClick={prev}
        aria-label="Wireframe anterior"
        className={`${arrowBase} left-1 ${activeIdx === 0 ? arrowDisabled : arrowEnabled}`}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Wireframe siguiente"
        className={`${arrowBase} right-1 ${activeIdx === items.length - 1 ? arrowDisabled : arrowEnabled}`}
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide mx-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map(({ src, caption }, i) => (
          <div
            key={caption}
            className="snap-center flex-shrink-0 w-full px-1"
            role="group"
            aria-label={`Wireframe ${i + 1} de ${items.length}: ${caption}`}
          >
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

      {/* Dot indicators + counter */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Navegación de wireframes">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeIdx === i}
              aria-label={`Ir a wireframe ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="rounded-full transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                width: activeIdx === i ? 24 : 8, height: 8,
                background: activeIdx === i ? BRAND.primary : (isDark ? "#4b5563" : "#d1d5db"),
              }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500" aria-live="polite">
          {activeIdx + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}

/* ─── Wireframes lo-fi (blanco y negro) — 8 pantallas del flujo completo ── */
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

/* ─── Metas — flujo construido con el UI Kit de Material Design 3 ────────── */
const METAS_M3: Array<{ label: string; src: string }> = [
  { label: "Ahorro (sección)",       src: metasSection },
  { label: "Metas activas",          src: metasActivas },
  { label: "Detalle de meta activa", src: metaDetalle },
  { label: "Crear meta",             src: metaCrear },
  { label: "Editar meta",            src: metaEditar },
  { label: "Meta creada",            src: metaCreada },
  { label: "Metas logradas",         src: metasLogradas },
];

/* ─── Findings → fix → deploy (9 iteraciones reales de producción) ───────── */
const FINDINGS: Array<{ sev: "Crítico" | "Alto" | "Medio"; issue: string; fix: string }> = [
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

/* ─── Hero — mismo lenguaje visual (gradiente + blobs) que los demás case
   studies, pero centrado y sin mockup de dispositivo (aún no hay capturas). ── */
const HERO_TAGS = ["Solo designer", "Design Thinking + Vibe-coding", "Mobile app"];

const HERO_STYLES = `
  @keyframes milestoneHeroBlob {
    0%,100% { transform: translateY(0px)   translateX(0px);  }
    33%     { transform: translateY(-22px)  translateX(14px); }
    66%     { transform: translateY(12px)   translateX(-9px); }
  }
`;

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
    <section
      aria-label="Presentación del caso de estudio"
      className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-24"
      style={bgStyle}
    >
      <style>{HERO_STYLES}</style>

      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `${BRAND.primary}2e`, animation: "milestoneHeroBlob 10s ease-in-out infinite" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: `${BRAND.primary}1e`, animation: "milestoneHeroBlob 14s ease-in-out infinite reverse" }} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-8"
          style={{ borderColor: `${BRAND.primary}4d`, color }}
        >
          Caso de Estudio · Milestone
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-gray-900 dark:text-gray-100"
        >
          Milestone – <span style={{ color }}>App de registro financiero</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg sm:text-xl max-w-xl mx-auto text-gray-500 dark:text-gray-400 leading-relaxed"
        >
          Una app de finanzas personales pensada para dar tranquilidad, no para exigir control.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {HERO_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.24 + i * 0.06 }}
              className="rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{ borderColor: `${BRAND.primary}4d`, background: isDark ? `${BRAND.primary}26` : `${BRAND.primary}14`, color }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.a
            href={MILESTONE_APP_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -2, boxShadow: `0 12px 32px ${BRAND.primary}55` }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{ background: BRAND.primary }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg"
          >
            Ir a Milestone
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          <motion.button
            onClick={() => scrollTo("empatizar")}
            whileHover={{ y: -2, borderColor: color, color }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-sm"
          >
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
  const processSectionRef = useRef<HTMLDivElement>(null);
  const [showPills, setShowPills] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handle = () => {
      if (!processSectionRef.current) return;
      setShowPills(processSectionRef.current.getBoundingClientRect().top <= 64);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyNav showPills={showPills} title="Milestone" />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <MilestoneHero />

      {/* ── DESCRIPCIÓN + FICHA ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <SectionLabel text="Descripción General" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El research encontró un patrón que ninguna app de finanzas termina de resolver: la persona vuelve a registrar sus gastos cuando se siente perdida con su plata, sostiene el hábito mientras recupera el control, y en el momento en que se siente tranquila, lo abandona.{" "}
                  <strong className="text-[#4A4E78] dark:text-[#C3C4E8]">Todas las apps existentes asumen que esa disciplina va a durar para siempre</strong> — y cuando no dura, reciben a quien vuelve con saldos en rojo, rachas rotas o silencio.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Milestone se diseñó para ese momento exacto de la vuelta. El Home no abre con un número en rojo: abre con una invitación a ajustar la meta a la situación real, sin borrar el progreso ni hacer sentir a la persona en falta por el tiempo que estuvo sin registrar.{" "}
                  <strong className="text-gray-800 dark:text-gray-100">No maneja dinero real</strong> — registra lo que el usuario carga, sin conectar cuentas bancarias.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Herramientas utilizadas</p>
                  <div className="flex flex-wrap gap-3">
                    {LOCAL_TOOLS.map((t) => <LocalToolBadge key={t.label} tool={t} />)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Rol",          value: "UX/UI Designer + Vibe-Coding" },
                    { label: "Sector",       value: "Finanzas personales (sin dinero real)" },
                    { label: "Validación",   value: "5 sesiones moderadas + Maze" },
                    { label: "Equipo",       value: "Solo" },
                    { label: "Stack",        value: "Flutter · Firebase · Figma" },
                    { label: "Resultado",    value: "Bug crítico detectado y corregido antes de producción" },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: .55, delay: idx * .08 }}
                      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(74,78,120,.14)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
                      <p className="text-[#4A4E78] dark:text-[#C3C4E8] text-sm font-semibold">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 mt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Método de validación</p>
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
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
              ★ Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
              "Por primera vez en esta categoría de apps, quien se cae del hábito tiene una forma concreta de{" "}
              <span style={{ color: BRAND.secondary }}>retomarlo</span>, en lugar de un producto que asume que si no fue perfecto, no vale."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación", desc: "Las apps de finanzas asumen disciplina perfecta y castigan a quien deja de registrar" },
                { label: "Tarea",     desc: "Diseñar un producto que reciba de vuelta a quien abandonó el hábito, sin culpa" },
                { label: "Acción",    desc: "Home rediseñado + testing con 5 sesiones moderadas + Maze, en solitario" },
                { label: "Resultado", desc: "SEQ 6.55/7 en Metas · bug crítico de confianza detectado y corregido a tiempo" },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND.secondary }}>{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── PROCESO ─────────────────────────────────────────────── */}
      <section ref={processSectionRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-16">
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
              La hipótesis inicial era la típica: la gente no controla sus finanzas porque las apps que existen son muy complejas, muy frías, o no generan hábito. Después de hablar con tres personas reales —Rossana, Gabriel y María— quedó claro que esa hipótesis, aunque no estaba mal, se quedaba corta.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El problema no era de herramientas ni de información. Era emocional. Las tres personas ya usaban algo —una app del banco, una billetera digital, un Excel, un cuaderno— y las tres, en algún momento, habían dejado de anotar. No por vagas: porque el esfuerzo de sostener el registro les pesaba más que el beneficio de tenerlo.
            </p>
          </FadeSection>

          {/* Notas de entrevista — handoff Claude Design */}
          <FadeSection delay={.05}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneInterviewNotes />
            </div>
          </FadeSection>

          {/* Benchmarking UX — handoff Claude Design */}
          <FadeSection delay={.07}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneBenchmarkingUX />
            </div>
          </FadeSection>

          {/* Persona + Mapa de dolores — handoff Claude Design */}
          <FadeSection delay={.08}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestonePersonaPainMap />
            </div>
          </FadeSection>

          {/* Círculo de dolor — hallazgo central, handoff Claude Design */}
          <FadeSection delay={.1}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestonePainCycle />
            </div>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">How Might We, sin encerrarse en un solo ángulo</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Con los insights validados, la definición se hizo con How Might We, pero evitando el sesgo de pensar todo desde un solo ángulo: cada insight se trabajó en cuatro versiones —optimista, restrictiva, sistémica y disruptiva— apoyándose en IA justamente para no quedarse encerrada en una sola perspectiva al ser la única persona detrás del proyecto.
            </p>
            <div className="rounded-xl border p-4 mt-4 max-w-2xl" style={{ borderColor: `${BRAND.secondary}30`, background: `${BRAND.secondary}0d` }}>
              <p className="text-gray-700 dark:text-gray-200 text-sm italic">
                "¿Cómo considerar distintas opiniones siendo una sola persona?" — diario de proceso, entrada de HMW
              </p>
            </div>
          </FadeSection>

          {/* HMW — handoff Claude Design */}
          <FadeSection delay={.05}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneHMW />
            </div>
          </FadeSection>

          {/* User Journey — handoff Claude Design */}
          <FadeSection delay={.07}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneUserJourney />
            </div>
          </FadeSection>

          {/* Alcance del MVP — handoff Claude Design */}
          <FadeSection delay={.09}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneMVPScope />
            </div>
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
              La arquitectura de la información no se inventó en un sitemap de escritorio: se construyó con card sorting abierto en Useberry, con usuarios reales agrupando las funcionalidades a su manera. El análisis de esa matriz de similitud reveló clusters naturales, y sobre esos clusters se generó el sitemap con el MCP de Claude en Figma, bajo supervisión y prompts propios.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              Ese primer sitemap todavía tenía "Aprender" como sección propia. Fue al pasar a los wireframes lo-fi —a mano y con Stitch— cuando esa decisión se puso en tensión con el research: la gente había pedido aprender, pero ninguna había pedido una sección de estudio.{" "}
              <strong className="text-gray-800 dark:text-gray-100">La sección se disolvió en tips contextuales dentro de otros flujos.</strong>
            </p>
          </FadeSection>

          {/* Sitemap — handoff Claude Design */}
          <FadeSection delay={.06}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneSitemap />
            </div>
          </FadeSection>

          <FadeSection delay={.08}>
            <div className="rounded-xl border p-4 max-w-2xl" style={{ borderColor: `${BRAND.secondary}30`, background: `${BRAND.secondary}0d` }}>
              <p className="text-gray-700 dark:text-gray-200 text-sm italic">
                "Empecé a mano, pero tardaba mucho para los tiempos que estaba buscando. Necesitaba agilidad. Ahí me presentaron Stitch." — diario de proceso, Wireframe lo-fi + IA
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={.1}>
            <div className="border-l-4 rounded-r-xl p-5" style={{ borderColor: BRAND.primary, background: `${BRAND.primary}08` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BRAND.primary }}>Navegador final</p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                Home · Ahorro (Metas + Presupuestos) · Registrar · Historial (vista lista + vista gráfica) · Perfil/Configuración. El Home se rediseñó para que, en lugar de números en rojo, lo primero que viera la persona fuera una invitación a definir una meta.
              </p>
            </div>
          </FadeSection>

          {/* User Flow — handoff Claude Design */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <MilestoneUserFlow />
            </div>
          </FadeSection>

          {/* Wireframes lo-fi */}
          <FadeSection delay={.14}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Wireframes lo-fi</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
              Con el sitemap y el flujo definidos, las pantallas principales —Home, Registrar y Metas— se bocetaron primero en baja fidelidad, en blanco y negro: la estructura y la jerarquía se validan antes de invertir en color y branding. Las 8 pantallas del flujo completo se resolvieron con este mismo criterio.
            </p>
            <WireframeCarousel items={WIREFRAMES.map((w) => ({ src: w.src, caption: w.label }))} />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          04 · PROTOTIPAR (UI + Vibe-coding + UAT)
      ══════════════════════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-20 scroll-mt-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="04 · Prototipar — Diseño UI" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Branding a propósito no financiero</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El branding se definió liviano y a propósito no financiero: paleta, tipografía y tokens pensados para que la app se sienta menos como un banco y más como un acompañante. El UI Kit se construyó sobre Material Design 3 en Figma, con personalizaciones propias.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              A partir de los wireframes lo-fi, el foco pasó a crear componentes reutilizables basados en Material Design: en vez de subir las 30-40 pantallas de la app a alta fidelidad antes de saber si algo funcionaba, se priorizó construir con el UI Kit de M3 un solo flujo completo —Metas de ahorro, el que se sabía que se iba a testear— sentando ahí las bases del sistema de componentes real. El resto de las pantallas se resolvió con Stitch, más rápido pero sin ese mismo nivel de sistema.
            </p>
          </FadeSection>

          {/* Metas — flujo construido con el UI Kit M3 */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Metas, construido con el UI Kit de M3</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-2xl">
              El flujo completo de ahorro en alta fidelidad, componente por componente: de la sección Ahorro a una meta creada, editada y lograda.
            </p>
            <WireframeCarousel items={METAS_M3.map((m) => ({ src: m.src, caption: m.label }))} />
          </FadeSection>

          {/* Paleta + Tipografía + Sistema de componentes (M3, ui_inventory.html) */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* ── Paleta de color ── */}
            <FadeSection delay={.06}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>Paleta de color</p>

                <div className="flex gap-3 mb-4">
                  {[
                    { hex: BRAND.primary,   name: "Primary",   role: "CTAs, nav activa, foco" },
                    { hex: BRAND.secondary, name: "Secondary", role: "Gastos, acentos cálidos" },
                    { hex: BRAND.tertiary,  name: "Tertiary",  role: "Ingresos, metas, logros" },
                  ].map(({ hex, name, role }) => (
                    <motion.div key={hex} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: .4 }} className="flex-1 flex flex-col gap-2">
                      <div className="w-full h-16 rounded-2xl shadow-md" style={{ backgroundColor: hex }} />
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                      <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{hex}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{role}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-2 mt-2">
                  {[
                    { hex: BRAND.error,   name: "Error" },
                    { hex: BRAND.warning, name: "Warning" },
                    { hex: "#2E6B41",     name: "Success" },
                    { hex: "#FFFFFF",     name: "Surface" },
                  ].map(({ hex, name }) => (
                    <motion.div key={hex} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: .35 }} className="flex-1 flex flex-col gap-1">
                      <div className="w-full h-8 rounded-xl border border-gray-200 dark:border-gray-600" style={{ backgroundColor: hex }} />
                      <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">{name}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 h-12 rounded-2xl shadow-inner" style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.secondary} 55%, ${BRAND.tertiary} 100%)` }} />
                <p className="mt-2 text-[10px] text-center text-gray-400 dark:text-gray-500 italic">HitoColors — lib/theme/app_theme.dart</p>
              </div>
            </FadeSection>

            {/* ── Tipografía ── */}
            <FadeSection delay={.08}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>Tipografía — Manrope</p>

                <div className="space-y-5">
                  {[
                    { label: "Display — 36/700",  sample: "Milestone",              cls: "text-4xl font-black tracking-tight", border: BRAND.secondary, meta: "Manrope · 700 · 36px" },
                    { label: "Headline — 28/700",  sample: "Tu plata, en orden",     cls: "text-2xl font-bold",                 border: BRAND.primary,   meta: "Manrope · 700 · 28px" },
                    { label: "Body — 16/400",       sample: "Registrá un gasto en menos de 10 segundos.", cls: "text-sm leading-relaxed font-normal", border: "#9CA3AF", meta: "Manrope · 400 · 16px · 1.6 lh" },
                    { label: "Label — 14/500",      sample: "META SEMANAL",           cls: "text-xs font-semibold uppercase tracking-widest", border: "#D1D5DB", meta: "Manrope · 500 · 14px" },
                  ].map(({ label, sample, cls, border, meta }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: .45, delay: i * .08 }}
                      className="pl-4" style={{ borderLeft: `4px solid ${border}` }}>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                      <p className={`${cls} text-gray-900 dark:text-gray-50`} style={{ fontFamily: "Manrope, sans-serif" }}>{sample}</p>
                      <p className="text-[10px] font-mono text-gray-400 mt-1">{meta}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeSection>

            {/* ── Sistema de componentes (M3, de ui_inventory.html) ── */}
            <FadeSection delay={.1} className="md:col-span-2">
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: BRAND.primary }}>
                  Sistema de componentes · UI Inventory (Material Design 3)
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { level: "Buttons",          count: "10", color: BRAND.primary,   items: ["FilledButton", "OutlinedButton", "TextButton", "IconButton"] },
                    { level: "Inputs",           count: "9",  color: BRAND.secondary, items: ["HitoToggle", "Amount Field", "Category Picker", "Date Picker"] },
                    { level: "Cards",            count: "11", color: BRAND.tertiary,  items: ["GoalCardShell (3 estados)", "TotalSavedCard", "IconStatCard"] },
                    { level: "Modals / Sheets",  count: "6",  color: BRAND.primary,   items: ["CategoryPickerSheet", "TransactionDetailSheet", "ConfirmDialog"] },
                    { level: "Snackbars",        count: "2",  color: BRAND.secondary, items: ["AppToast (informativo)", "SnackBar (error)"] },
                    { level: "Navigation",       count: "2",  color: BRAND.tertiary,  items: ["HitoBottomNavBar", "AppBar (Registrar)"] },
                    { level: "Lists / Tiles",    count: "3",  color: BRAND.primary,   items: ["Goal / Budget item", "Scheduled payment item"] },
                    { level: "Custom Widgets",   count: "18", color: BRAND.secondary, items: ["ProgressRing", "SkeletonBox", "CardStrikeThrough"] },
                  ].map(({ level, count, color, items }, i) => (
                    <motion.div key={level} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: .4, delay: i * .07 }}
                      className="rounded-2xl overflow-hidden shadow-sm">
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
                    </motion.div>
                  ))}
                </div>

                <p className="mt-5 text-xs text-gray-400 dark:text-gray-500 italic text-center">
                  61 variantes documentadas en <code className="font-mono">ui_inventory.html</code>, reconstruidas con los tokens reales de <code className="font-mono">lib/theme/app_theme.dart</code>.
                </p>
              </div>
            </FadeSection>

          </div>

          {/* Principios aplicados */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
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
          </FadeSection>

          {/* Vibe-coding */}
          <FadeSection delay={.08}>
            <SectionLabel text="04 · Prototipar — Vibe-coding" accent />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">De pantalla diseñada a producto vivo</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Antes de escribir el primer prompt de desarrollo, hubo un ejercicio explícito de prompt engineering: traducir cada pantalla y flujo diseñado en Figma a una descripción que Claude Code pudiera ejecutar sin ambigüedad. El build se hizo con Claude Code, Flutter y Firebase —Flutter porque representaba mejor el lenguaje visual de Material Design de Google, Firebase por experiencia previa— con onboarding sin contraseña, por Magic Link.
            </p>
            <div className="rounded-xl border p-4 mt-4 max-w-2xl" style={{ borderColor: `${BRAND.primary}25`, background: `${BRAND.primary}08` }}>
              <p className="text-gray-700 dark:text-gray-200 text-sm italic">
                "Pude desarrollar la aplicación completa, todos los flujos, incluso pantallas que tal vez no había considerado aún, ya que al explicarle la IA podía reutilizar mis propios componentes y armar el flujo faltante — eso agilizó bastante." — diario de proceso, Claude + Lovable + Stitch
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={.1}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <VibeCodingMilestoneDiagram />
            </div>
          </FadeSection>

          {/* Interactive prototype */}
          <FadeSection delay={.11}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Probá el prototipo (testing en Maze)</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-2xl">
              Posteriormente se construyó un prototipo de alta fidelidad para la etapa de testing, del flujo de registro de gastos e ingresos. Estas pantallas nunca se diseñaron en Figma: Maze necesitaba un prototipo navegable ahí para poder testear, así que la alta fidelidad se construyó a partir del código del producto ya desarrollado y se trasladó a Figma con el MCP de Claude —el camino inverso al habitual, de código a diseño.
            </p>
            <FigmaPrototypeEmbed />
          </FadeSection>

          {/* UAT propio */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.primary }}>UAT propio — antes de exponer a usuarios reales</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                Antes de exponer nada a una persona real, hubo una etapa de verificación propia del producto: revisar que lo construido funcionara y se viera como se había diseñado. La incidencia más crítica fue el prototipo de Figma Make con los íconos rotos al subirlo a Maze —se veían como palabras sueltas, y el prototipo perdía toda credibilidad como "una app real".
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Migrar a Figma Design y reconstruir las interacciones a mano (con ayuda del MCP de Claude) no estaba en el plan original, pero era la única forma de llegar a un prototipo testeable. Detectarlo a tiempo evitó testear un prototipo "roto" que hubiera contaminado los resultados con fricción que no era real.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">📸 Captura lado a lado (ícono roto vs. corregido) — pendiente de reemplazo por la imagen real.</p>
            </div>
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
              El plan de testing se diseñó como dos estudios complementarios: un test no moderado en Maze, enfocado en registrar un gasto o ingreso —la tarea de uso diario— y un test moderado 1:1, de cinco sesiones, enfocado en Metas, por ser el flujo con más variedad de componentes y más jerarquía visual en el Home.
            </p>
          </FadeSection>

          {/* Stats */}
          <FadeSection delay={.05}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
              {[
                { val: "17/20",  label: "tarea-sesiones",  sub: "directas o con ayuda mínima (Metas)" },
                { val: "6.55/7", label: "facilidad SEQ",   sub: "promedio en las 5 sesiones moderadas" },
                { val: "88.9%",  label: "éxito en Maze",   sub: "registro diario, sin ayuda de nadie" },
                { val: "9",      label: "fixes a producción", sub: "verificados con flutter analyze/build" },
              ].map(({ val, label, sub }) => (
                <motion.div key={label} whileHover={{ scale: 1.04 }}
                  className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                  <p className="text-3xl font-black mb-1" style={{ color: BRAND.primary }}>{val}</p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold text-xs">{label}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Participants + moments */}
          <FadeSection delay={.07}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sesiones moderadas — Agustina, Carina, Imanol, Hernán y Rodolfo</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-2xl border-2 p-5" style={{ borderColor: `${BRAND.error}40`, background: `${BRAND.error}08` }}>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-5 h-5" style={{ color: BRAND.error }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND.error }}>Hallazgo crítico</p>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
                  "En realidad la meta la toma como que eran 20, cuando yo le puse 20.000. Y ahora al agregar 5.000 la toma como lograda la meta." — Hernán
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Una meta de $20.000 se marcó como "lograda" tras un aporte de solo $5.000 — el bug de mayor prioridad de todo el proyecto.</p>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: `${BRAND.warning}40`, background: `${BRAND.warning}0d` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.warning }}>Confusión de arquitectura</p>
                <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
                  "Meta es llegar a los 20.000 y presupuesto lo que puedo gastar por mes." — Carina
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Carina, sin experiencia previa armando una meta de ahorro, entró por "Presupuesto" en lugar de "Metas".</p>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: `${BRAND.tertiary}40`, background: `${BRAND.tertiary}0d` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.tertiary }}>Momento genuino</p>
                <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-2">
                  "Es un poco como esa sensación cuando es tu cumpleaños... es como ese festejo por algo propio." — Agustina
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Al llegar al 100% de su meta y ver la animación de logro, la reacción fue espontánea — justo el cierre emocional que el research había identificado como ausente.</p>
              </div>
            </div>
          </FadeSection>

          {/* Maze stats */}
          <FadeSection delay={.08}>
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Test no moderado — Maze, flujo de registro diario</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <p className="text-gray-600 dark:text-gray-300"><strong className="text-gray-800 dark:text-gray-100">88.9%</strong> de éxito · <strong className="text-gray-800 dark:text-gray-100">11.1%</strong> de abandono</p>
                <p className="text-gray-600 dark:text-gray-300">Duración promedio: <strong className="text-gray-800 dark:text-gray-100">89.6s</strong> (dentro del rango esperado)</p>
                <p className="text-gray-600 dark:text-gray-300">Facilidad percibida: <strong className="text-gray-800 dark:text-gray-100">2.0/7</strong> (1 = muy fácil) · nadie la calificó como difícil</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">El toggle Ingreso/Gasto se validó como claro; la fricción real se concentró en dos problemas técnicos del prototipo, resueltos en caliente durante la propia recolección.</p>
            </div>
          </FadeSection>

          {/* Findings timeline */}
          <FadeSection delay={.1}>
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
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              9 pantallas/componentes iterados con justificación, cada uno verificado con <code className="font-mono">flutter analyze</code> y <code className="font-mono">flutter build web</code> antes de publicarse.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LO QUE ESTE PROYECTO ME DEJA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <FadeSection>
            <SectionLabel text="Reflexión final" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Lo que este proyecto me deja</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              La pregunta no era cómo hacer una app de finanzas más completa, sino cómo hacer una que alguien realmente sostenga. El testing confirmó una parte de esa apuesta —el flujo más complejo se pudo usar sin instrucciones en la gran mayoría de los casos— pero, sobre todo, confirmó por qué vale la pena testear antes de lanzar: el bug que encontró es exactamente el tipo de falla que le hubiera dado la razón, por las razones equivocadas, a la desconfianza que todo el research había identificado como el verdadero enemigo del hábito financiero.
            </p>
          </FadeSection>

          <FadeSection delay={.06}>
            <div className="rounded-2xl border-l-4 p-5" style={{ borderColor: BRAND.secondary, background: `${BRAND.secondary}0d` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BRAND.secondary }}>Roadmap</p>
              <p className="text-gray-700 dark:text-gray-200">
                Feedback visual inmediato tras cada aporte a una meta · vista de historial de metas cumplidas · reforzar en el onboarding que Milestone registra plata, no la maneja · simulador de ahorro y gamificación (Fase 2, ya definidos desde Define).
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={.08}>
            <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: BRAND.primary }}>
              <p className="text-lg italic text-gray-700 dark:text-gray-200 leading-relaxed">
                "La parte más valiosa de este proceso no fue diseñar la pantalla que se ve bien, sino sostener el rigor —de investigación, de testing, de QA sobre el propio código— el tiempo suficiente para que apareciera el problema que en verdad importaba, y no quedarme solo con el que era más fácil de ver."
              </p>
            </blockquote>
          </FadeSection>

          <FadeSection delay={.1}>
            <div className="rounded-2xl p-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND.primary}, #2f3252)` }}>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
                El hábito no se rompe por un mal día: quien deja de registrar encuentra una invitación a volver, no un castigo.
              </p>
              <p className="text-white/80 mt-4 text-sm sm:text-base">
                SEQ 6.55/7 en Metas, el flujo más complejo del producto · 88.9% completó el registro diario sin ayuda de nadie.
              </p>
              <p className="text-white/50 mt-4 text-xs uppercase tracking-widest">
                Proyecto individual · UX/UI + Vibe-coding
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
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">¿Siguiente paso?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
                ¿Interesado en trabajar conmigo?{" "}
                <span style={{ color: BRAND.secondary }}>Ponte en contacto.</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ backgroundColor: "#9a7548", boxShadow: `0 16px 50px ${BRAND.secondary}55`, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 500); }}
              data-ga-action="cta_click"
              data-ga-category="CTA"
              data-ga-label="Contactar - Milestone"
              style={{ background: BRAND.secondary }}
              className="inline-flex items-center px-10 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl transition-all"
            >
              Coordinar reunión
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
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-[#B08B5A] dark:hover:text-[#B08B5A] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver al portfolio
              </button>
              <motion.button
                whileHover={{ backgroundColor: BRAND.secondary, borderColor: BRAND.secondary, color: "#ffffff", boxShadow: `0 8px 24px ${BRAND.secondary}4d` }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                onClick={() => navigate("/case-study/iupi")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-medium text-sm transition-colors"
                style={{ borderColor: BRAND.primary, color: BRAND.primary }}
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
      <footer className="py-6 bg-gray-900 dark:bg-gray-950 text-center">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          © 2026 Sofía Álvarez. Hecho con ♥ usando Claude Code
        </p>
      </footer>
    </div>
  );
}
