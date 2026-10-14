import { ElementType, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, Code2, Palette, LayoutDashboard, Smartphone,
  Eye, BookOpen, Briefcase, Info, Route, Github, ExternalLink,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMenuNav, type CaseStudyIndexSection } from "./CaseStudyMenuNav";
import { portfolioPort } from "../../../imports/portfolioPortImage";
import vibeDesign1 from "../../../imports/Portfolio vibe-design1.webp";
import vibeDesign2 from "../../../imports/Portfolio vibe-design2.webp";
import { ToolBadge as SharedToolBadge } from "./ToolGlyph";
import { scrollBehavior } from "../../utils/motion";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type LocalTool =
  | { type: "icon";  Icon: ElementType; label: string; color: string }
  | { type: "text";  abbr: string;      label: string; bg: string };

/* ─── Steps ──────────────────────────────────────────────────────────────── */
interface Step { id: string; num: string; label: string; Icon: ElementType; }
const STEPS: Step[] = [
  { id: "empatizar",  num: "01", label: "Empatizar",  Icon: Users },
  { id: "definir",    num: "02", label: "Definir",    Icon: Search },
  { id: "idear",      num: "03", label: "Idear",      Icon: Lightbulb },
  { id: "prototipar", num: "04", label: "Prototipar", Icon: Layers },
  { id: "prueba",     num: "05", label: "Prueba",     Icon: CheckCircle },
];

const LOCAL_TOOLS: LocalTool[] = [
  { type: "text", abbr: "FM",  label: "Figma Make",    bg: "#F24E1E" },
  { type: "icon", Icon: PenLine, label: "Lápiz y Papel", color: "#B45309" },
  { type: "text", abbr: "CC",  label: "Claude Code",   bg: "#CC785C" },
  { type: "text", abbr: "Lv",  label: "Lovable",       bg: "#A855F7" },
  { type: "text", abbr: "GPT", label: "ChatGPT",       bg: "#10A37F" },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
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

/* HeroCanvas removed — replaced by <CaseStudyHero /> */

/* ─── LocalToolBadge — estático, sin hover ──────────────────────────────── */
function LocalToolBadge({ tool }: { tool: LocalTool }) {
  return <SharedToolBadge label={tool.label} />;
}

/* ─── Índice — para el menú hamburguesa compartido (CaseStudyMenuNav) ──── */
const INDEX_SECTIONS: CaseStudyIndexSection[] = [
  { id: "inicio",      label: "Portfolio Web", Icon: Info },
  { id: "resumen",     label: "El proyecto",   Icon: Info },
  { id: "metodologia", label: "Metodología",   Icon: Route },
  ...STEPS.map((s) => ({ id: s.id, label: s.label, Icon: s.Icon })),
];

function StepNode({ step, index }: { step: Step; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button onClick={() => scrollTo(step.id)} onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center gap-3 flex-shrink-0 w-[72px] sm:w-24 group">
      <motion.div animate={{ background: hov ? "rgba(255,131,0,0.14)" : "rgba(2,89,89,0.08)", borderColor: hov ? "#FF8300" : "rgba(2,89,89,0.18)" }}
        transition={{ duration: 0.22 }} className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm">
        <step.Icon className="w-6 h-6 transition-colors duration-200" style={{ color: hov ? "#FF8300" : "#025959" }} />
      </motion.div>
      <span className="text-xs sm:text-sm font-medium text-center leading-tight text-[#025959] dark:text-[#4ecfcf]">
        {step.label}
      </span>
    </motion.button>
  );
}

function StepConnector({ index }: { index: number }) {
  const isOrange = index % 2 === 0;
  return (
    <div className="flex-1 flex items-start pt-7 min-w-[24px]">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.15, ease: "easeOut" }}
        className="w-full origin-left"
        style={{ height: 2, borderRadius: 1, background: isOrange ? "linear-gradient(90deg,rgba(255,131,0,.55),rgba(255,131,0,.25))" : "rgba(209,213,219,0.9)" }} />
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
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm ${
      accent ? "bg-[#FF8300]/10 text-gray-900 dark:text-[#FF8300]" : "bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf]"
    }`}>{text}</span>
  );
}

/* ─── Portfolio IA Diagram ───────────────────────────────────────────────── */
function PortfolioIADiagram() {
  const { isDark } = useTheme();
  const bg       = isDark ? "#1f2937" : "#f9fafb";
  const lineClr  = isDark ? "rgba(78,207,207,0.25)" : "rgba(2,89,89,0.18)";
  const l2Bg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const l2Border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const txtL2    = isDark ? "#d1d5db" : "#374151";
  const rootCX   = 280;
  const l1Y = 62, l1W = 90, l1H = 26;
  const l2Y0 = 108, l2W = 82, l2H = 22, l2Gap = 28;

  const cols: Array<{ cx: number; label: string; color: string; items: Array<{ t: string; hl?: boolean }> }> = [
    { cx:  70, label: "Principal",  color: "#025959", items: [{ t: "Inicio" }, { t: "Sobre mi" }, { t: "Skills" }, { t: "Contacto" }] },
    { cx: 210, label: "Proyectos",  color: "#025959", items: [{ t: "IUPI" }, { t: "Bookie" }, { t: "Mas+Bank" }, { t: "Portfolio", hl: true }] },
    { cx: 350, label: "Proceso",    color: "#025959", items: [{ t: "Empatizar" }, { t: "Definir" }, { t: "Idear" }, { t: "Prototipo" }, { t: "Prueba" }] },
    { cx: 490, label: "Diseno",     color: "#4B5563", items: [{ t: "Colores" }, { t: "Tipografia" }, { t: "Motion" }, { t: "Dark Mode" }] },
  ];

  return (
    <svg viewBox="0 0 560 264" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="264" rx="12" fill={bg} />
      {cols.map((col) => (
        <line key={col.label + "-fan"} x1={rootCX} y1={34} x2={col.cx} y2={l1Y} stroke={lineClr} strokeWidth="1.5" />
      ))}
      {/* Root */}
      <rect x={rootCX - 52} y={14} width={104} height={24} rx={12} fill="#025959" />
      <text x={rootCX} y={30} textAnchor="middle" fontSize="9" fontWeight="700" fill="white">Portfolio Web</text>

      {cols.map((col) => (
        <g key={col.label}>
          <rect x={col.cx - l1W / 2} y={l1Y} width={l1W} height={l1H} rx={8} fill={col.color} />
          <text x={col.cx} y={l1Y + 15} textAnchor="middle" fontSize="8" fontWeight="700" fill="white" letterSpacing="0.3">{col.label}</text>
          {col.items.map((item, i) => {
            const y = l2Y0 + i * l2Gap;
            return (
              <g key={item.t}>
                <line x1={col.cx} y1={l1Y + l1H} x2={col.cx} y2={y} stroke={lineClr} strokeWidth="1" />
                <rect x={col.cx - l2W / 2} y={y} width={l2W} height={l2H} rx={6}
                  fill={item.hl ? "#FF8300" : l2Bg}
                  stroke={item.hl ? "#FF8300" : l2Border}
                  strokeWidth={item.hl ? 0 : 1} />
                <text x={col.cx} y={y + 14} textAnchor="middle" fontSize="7.5"
                  fontWeight={item.hl ? "700" : "500"}
                  fill={item.hl ? "white" : txtL2}>{item.t}</text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="280" y="256" textAnchor="middle" fontSize="7" fill={isDark ? "#4b5563" : "#9ca3af"} letterSpacing="1.5">
        ARQUITECTURA DE INFORMACION · 4 AREAS · 17 PANTALLAS
      </text>
    </svg>
  );
}

/* ─── Portfolio Flow Diagram ─────────────────────────────────────────────── */
function PortfolioFlowDiagram() {
  const { isDark } = useTheme();
  const bg      = isDark ? "#1f2937" : "#f9fafb";
  const nodeBg  = isDark ? "rgba(2,89,89,0.14)" : "rgba(2,89,89,0.07)";
  const border  = isDark ? "rgba(78,207,207,0.35)" : "rgba(2,89,89,0.25)";
  const txt     = isDark ? "#e5e7eb" : "#1f2937";
  const muted   = isDark ? "#6b7280" : "#9ca3af";
  const lineClr = isDark ? "rgba(78,207,207,0.35)" : "rgba(2,89,89,0.22)";
  const teal    = "#025959";
  const orange  = "#FF8300";

  const N = (x: number, y: number, w: number, h: number, label: string, sub: string, hi?: "teal" | "orange" | "gray") => {
    const fill   = hi === "teal" ? teal : hi === "orange" ? orange : hi === "gray" ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : nodeBg;
    const stroke = hi ? "none" : border;
    const tFill  = hi === "teal" || hi === "orange" ? "white" : txt;
    const sFill  = hi === "teal" || hi === "orange" ? "rgba(255,255,255,0.75)" : muted;
    return (
      <g key={label}>
        <rect x={x - w / 2} y={y} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth="1" />
        <text x={x} y={y + h / 2 - 3} textAnchor="middle" fontSize="8" fontWeight="700" fill={tFill}>{label}</text>
        {sub && <text x={x} y={y + h / 2 + 9} textAnchor="middle" fontSize="6.5" fill={sFill}>{sub}</text>}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 260 420" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="420" rx="12" fill={bg} />

      {/* Start */}
      {N(130, 14, 90, 26, "Visitante", "", "teal")}

      {/* F1 */}
      <line x1="130" y1="40" x2="130" y2="56" stroke={lineClr} strokeWidth="1.5" />
      {N(130, 56, 110, 30, "F1 Home", "Hero · Presentacion", "teal")}

      {/* F2 */}
      <line x1="130" y1="86" x2="130" y2="100" stroke={lineClr} strokeWidth="1.5" />
      {N(130, 100, 110, 30, "F2 Proyectos", "Cards interactivas", "teal")}

      {/* Click */}
      <line x1="130" y1="130" x2="130" y2="144" stroke={lineClr} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="130" y="141" textAnchor="middle" fontSize="6.5" fill={muted}>click en card</text>

      {/* F3 */}
      <line x1="130" y1="146" x2="130" y2="160" stroke={lineClr} strokeWidth="1.5" />
      {N(130, 160, 120, 34, "F3 Case Study", "Proceso detallado", "orange")}

      {/* Fork to other sections */}
      <line x1="70"  y1="177" x2="130" y2="177" stroke={lineClr} strokeWidth="1" />
      <line x1="70"  y1="177" x2="70"  y2="194" stroke={lineClr} strokeWidth="1" />
      {N(70, 194, 90, 26, "Otras secciones", "", "gray")}

      {/* F4 Contact */}
      <line x1="130" y1="194" x2="130" y2="210" stroke={lineClr} strokeWidth="1.5" />
      {N(130, 210, 110, 30, "F4 Contacto", "Objetivo final", "teal")}

      {/* Loop arrow from case study back to projects */}
      <path d="M 188 177 Q 218 177 218 210 Q 218 240 188 240 L 188 236" stroke={lineClr} strokeWidth="1" fill="none" strokeDasharray="4 3" />

      {/* Legend */}
      <rect x="10" y="258" width="240" height="150" rx="8"
        fill={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}
        stroke={border} strokeWidth="1" />
      <text x="20" y="274" fontSize="6.5" fontWeight="700" fill={muted} letterSpacing="1.2">FLUJOS DE USUARIO</text>
      {[
        ["F1", "Home — primera impresion"],
        ["F2", "Proyectos — showcase de trabajo"],
        ["F3", "Case Study — proceso y criterio"],
        ["F4", "Contacto — objetivo de conversion"],
      ].map(([num, label], i) => (
        <g key={num}>
          <rect x="18" y={282 + i * 28} width={14} height={8} rx="3"
            fill={num === "F3" ? orange : teal} />
          <text x="24" y={289 + i * 28} textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white">{num}</text>
          <text x="38" y={289 + i * 28} fontSize="7" fill={txt}>{label}</text>
          <rect x="38" y={294 + i * 28} width={Number(label.length) * 3.5} height={4} rx="2"
            fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} />
        </g>
      ))}
    </svg>
  );
}

/* ─── Diagrama de desarrollo asistido por IA ────────────────────────────────────────────────── */
function AIBuildDiagram() {
  const { isDark } = useTheme();
  const bg     = isDark ? "#1f2937" : "#f9fafb";
  const txt    = isDark ? "#e5e7eb" : "#1f2937";
  const muted  = isDark ? "#6b7280" : "#9ca3af";
  const lineClr = isDark ? "rgba(78,207,207,0.3)" : "rgba(2,89,89,0.2)";

  const steps = [
    { x:  54, label: "Concepto",  sub: "Sketch\nmanual",      color: "#B45309" },
    { x: 162, label: "Spec",      sub: "Especificacion\n+ prompt", color: "#CC785C" },
    { x: 270, label: "Claude Code", sub: "React + TS\nimplementado", color: "#025959" },
    { x: 378, label: "Review",    sub: "Revision de\ndiseno",  color: "#025959" },
    { x: 486, label: "Iteracion", sub: "Rama +\npull request", color: "#FF8300" },
  ];

  return (
    <svg viewBox="0 0 540 140" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="540" height="140" rx="12" fill={bg} />

      {/* Connectors */}
      {steps.slice(0, -1).map((s, i) => (
        <line key={i} x1={s.x + 26} y1={46} x2={steps[i + 1].x - 26} y2={46}
          stroke={lineClr} strokeWidth="2" />
      ))}

      {/* Step nodes */}
      {steps.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={46} r={26} fill={`${s.color}22`} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x} y={42} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={s.color}>{s.label}</text>
          {s.sub.split("\n").map((line, i) => (
            <text key={i} x={s.x} y={53 + i * 9} textAnchor="middle" fontSize="6" fill={muted}>{line}</text>
          ))}
        </g>
      ))}

      {/* Loop back arrow */}
      <path d="M 486 72 Q 486 108 270 108 Q 54 108 54 72" stroke={lineClr} strokeWidth="1" fill="none" strokeDasharray="5 4" />
      <text x="270" y="120" textAnchor="middle" fontSize="6.5" fill={muted}>iteracion continua</text>

      {/* Label */}
      <text x="270" y="134" textAnchor="middle" fontSize="6.5" fill={isDark ? "#374151" : "#d1d5db"} letterSpacing="1.2">
        DISEÑO POR MÍ, IMPLEMENTACIÓN CON CLAUDE CODE
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function PortfolioCaseStudy() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  /* El scroll al tope al entrar lo resuelve PageTransition (App.tsx) */

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyMenuNav title="Portfolio Web" sections={INDEX_SECTIONS} primaryColor="#025959" secondaryColor="#FF8300" />
      <main id="main" tabIndex={-1} className="outline-none">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div id="inicio">
        <CaseStudyHero
          badgeLabel="Caso de estudio · Portfolio Web"
          titlePrefix="Portfolio Web:"
          titleAccent="diseñado y programado"
          description="De brief en blanco a producto publicado: un portfolio diseñado por mí e implementado con Claude Code, con desarrollo asistido por IA."
          tags={["Proyecto personal", "Diseño + desarrollo con IA", "2025"]}
          image={portfolioPort}
          imageAlt="Portfolio Web: vista general"
          imageDesktop={vibeDesign1}
          imageMobileSmall={vibeDesign2}
          brandColor="#025959"
          brandColorDark="#4ecfcf"
          variant="desktop-phone"
        />
      </div>

      {/* ── DESCRIPCIÓN + FICHA ─────────────────────────────────── */}
      <section id="resumen" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <SectionLabel text="Descripción general" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                {/* Éxito logrado — primer párrafo */}
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Este portfolio existe porque el trabajo de una diseñadora no puede vivir en carpetas locales. El resultado, el propio sitio que estás viendo, es también el punto de partida de la historia:{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">design system propio, cinco casos de estudio completos, modo claro y oscuro, diseño responsive y transiciones de página</strong>, hecho en 2 semanas.
                </p>
                {/* Método — segundo párrafo */}
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  La metodología fue tan importante como el resultado:{" "}
                  <strong className="text-gray-800 dark:text-gray-100">desarrollo asistido por IA con Claude Code</strong>. El sitio arrancó como un export de Figma Make y evolucionó en código, con diseño y desarrollo en paralelo y cada cambio por ramas y pull requests. Las decisiones de diseño son mías; la IA implementa. Cada decisión visual se validó con heurísticas, feedback de otros diseñadores y principios de referentes del diseño.
                </p>
                <p>
                  <a href="https://github.com/Sofi-Alvarez/Portafolio-web" target="_blank" rel="noopener noreferrer"
                    data-ga-action="github_click" data-ga-category="CTA" data-ga-label="Código Portfolio"
                    className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-[#025959] dark:text-[#4ecfcf] hover:underline">
                    <Github className="w-4 h-4" />
                    Ver el código en GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  <span className="sr-only"> (se abre en una pestaña nueva)</span></a>
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
                    { label: "Sector",       value: "Portfolio personal" },
                    { label: "Duración",     value: "2 semanas" },
                    { label: "Herramientas", value: "Figma Make · Claude Code · Lovable" },
                    { label: "Stack",        value: "React · TypeScript · Tailwind · Vercel" },
                    { label: "Resultado",    value: "5 casos de estudio · Responsive · Modo oscuro" },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: .55, delay: idx * .08 }}
                      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(2,89,89,.12)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow">
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1.5">{label}</p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm font-semibold">{value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Validation note */}
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 mt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-2">Método de validación</p>
                  <div className="space-y-1.5">
                    {[
                      "Heurísticas de Nielsen (10 principios)",
                      "Feedback de otros diseñadores",
                      "Principios de referentes del diseño (Norman, Rams)",
                    ].map((v) => (
                      <p key={v} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#025959] dark:text-[#4ecfcf] mt-0.5 flex-shrink-0">✓</span>{v}
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">
              ★ Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
              "Diseñé un portfolio profesional completo y dirigí su implementación con Claude Code en{" "}
              <span className="text-[#FF8300]">2 semanas</span>, validando cada decisión con heurísticas y feedback de diseñadores."
            </blockquote>
            {/* STAR diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación", desc: "Sin portfolio online que mostrara proceso y criterio de diseño" },
                { label: "Tarea",     desc: "Rediseñar y desarrollar el portfolio completo desde cero" },
                { label: "Acción",    desc: "Desarrollo asistido por IA con Claude Code + iteraciones heurísticas continuas" },
                { label: "Resultado", desc: "5 casos de estudio · Modo oscuro · Responsive · 2 semanas" },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left">
                  <span className="text-white text-xs font-bold uppercase tracking-widest"><span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF8300] mr-1.5 align-middle" />{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── PROCESO ─────────────────────────────────────────────── */}
      <section id="metodologia" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Metodología" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mi proceso de diseño</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">5 etapas iterativas · Clic en cada nodo para ir a esa sección.</p>
          </FadeSection>
          <FadeSection delay={.1}><ProcessStepper /></FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          01 · EMPATIZAR
      ══════════════════════════════════════════════════════════ */}
      <section id="empatizar" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="01 · Empatizar" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Conocer al usuario</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El usuario más importante de este portfolio era yo misma, pero representando a todos los que llegarían después. Sin entrevistas formales ni encuestas, la investigación fue analítica: ¿qué necesita ver un reclutador de UX/UI en menos de 30 segundos? ¿Qué comunica un portfolio antes de que se lea una sola línea?
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              Se analizaron portfolios de referencia del sector para identificar patrones, errores comunes y oportunidades de diferenciación, sin copiar ni inventar datos.
            </p>
          </FadeSection>

          {/* User types */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">¿Para quién se diseña?</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: Briefcase,      label: "Reclutadores",       color: "#025959", desc: "Evalúan en segundos si el candidato demuestra proceso y criterio. Necesitan claridad y jerarquía visual." },
                { Icon: Users,          label: "Clientes potenciales",color: "#FF8300", desc: "Buscan evidencia de que el diseñador resuelve problemas reales. Les importa el resultado y el razonamiento." },
                { Icon: Eye,            label: "Otros diseñadores",   color: "#4B5563", desc: "Valoran las decisiones técnicas, el design system y la coherencia entre secciones." },
              ].map(({ Icon, label, color, desc }, idx) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: idx * .08 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}20` }}
                  className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{label}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Benchmark note */}
          <FadeSection delay={.08}>
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Benchmark de referencia</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                Se analizaron portfolios de UX/UI designers del sector para identificar patrones de éxito y errores frecuentes. <strong className="text-gray-800 dark:text-gray-100">No se inventó información:</strong> el análisis se basó en observación directa de portfolios disponibles públicamente al momento del diseño.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Patrón detectado",    desc: "La mayoría muestra resultados finales sin explicar el proceso de toma de decisiones." },
                  { title: "Oportunidad",         desc: "Mostrar el proceso completo, incluyendo los desafíos y errores, genera mayor confianza." },
                  { title: "Error frecuente",     desc: "Portfolios sin case studies detallados no demuestran criterio de diseño ante evaluadores." },
                  { title: "Diferenciador clave", desc: "Integrar narrativa STAR + diagramas + decisiones explícitas en cada proyecto." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <span className="w-1.5 h-full min-h-[40px] rounded-full flex-shrink-0 bg-[#025959]/20 dark:bg-[#4ecfcf]/20" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#025959] dark:text-[#4ecfcf] mb-0.5">{title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Hallazgo */}
          <FadeSection delay={.1}>
            <div className="rounded-2xl p-6 text-center bg-[#025959]/5 dark:bg-[#025959]/10 border border-[#025959]/15">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-2">Hallazgo central</p>
              <p className="text-gray-700 dark:text-gray-200 text-lg font-semibold leading-relaxed max-w-2xl mx-auto">
                "Un portfolio que solo muestra resultados finales no demuestra criterio. Quienes evalúan talento necesitan ver proceso, decisiones y cómo se maneja la incertidumbre."
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          02 · DEFINIR
      ══════════════════════════════════════════════════════════ */}
      <section id="definir" className="py-16 md:py-20 scroll-mt-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="02 · Definir" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Arquitectura y estructura</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Con el hallazgo central claro, se definió la estructura del portfolio en base a una premisa: cada proyecto debe contar una historia, no solo mostrar pantallas. La arquitectura de información responde a tres preguntas que se hace cualquier visitante al llegar.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              ¿Quién sos? → Sección de presentación. ¿Qué hacés? → Proyectos con contexto. ¿Cómo pensás? → Case studies con proceso completo.
            </p>
          </FadeSection>

          {/* 3 key areas */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">3 áreas de enfoque</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Identidad y presentación",         desc: "Quién soy, qué busco y por qué me dedico al diseño. Primera impresión en menos de 5 segundos." },
                { num: "02", title: "Showcase de proyectos",            desc: "Cards con contexto: rol, herramientas y descripción. Click para ir al proceso completo." },
                { num: "03", title: "Case studies con proceso real",    desc: "Narrativa STAR + 5 etapas de Design Thinking + diagramas. Proceso completo documentado." },
              ].map(({ num, title, desc }, idx) => (
                <motion.div key={num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: idx * .08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <span aria-hidden="true" className="text-3xl font-black mb-3 block text-[#025959]/65 dark:text-[#4ecfcf]/60">{num}</span>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm">{title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Callout */}
          <FadeSection delay={.07}>
            <div className="border-l-4 border-[#025959] rounded-r-xl p-5 bg-[#025959]/5 dark:bg-[#025959]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-1">Por qué esto importa</p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                El portfolio no es una galería: es un argumento. Cada sección responde a una objeción no expresada del evaluador.
              </p>
            </div>
          </FadeSection>

          {/* IA Diagram */}
          <FadeSection delay={.1}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Arquitectura de información</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <PortfolioIADiagram />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              La sección "Portfolio" dentro de Proyectos (destacada en naranja) es el meta-proyecto que estás viendo ahora.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          03 · IDEAR
      ══════════════════════════════════════════════════════════ */}
      <section id="idear" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="03 · Idear" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Design system y método</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Antes de escribir una línea de código, se definieron los fundamentos visuales: un sistema de color basado en dos colores primarios complementarios, una tipografía única con alta legibilidad y un conjunto de microinteracciones coherentes. El resultado es el mismo Design System que aplico a mis proyectos de clientes.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              La decisión más importante de esta etapa fue el método: <strong className="text-gray-800 dark:text-gray-100">desarrollo asistido por IA</strong>. El diseño y el desarrollo se hicieron en paralelo, con Claude Code como herramienta de implementación y el criterio de diseño de mi lado. Esto comprimió el ciclo de días a horas.
            </p>
          </FadeSection>

          {/* Design System visual */}
          <FadeSection delay={.06}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Colors + Typography */}
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-5">Paleta y tipografía</p>
                <div className="space-y-3 mb-6">
                  {[
                    { color: "#025959", name: "Teal principal",  hex: "#025959", use: "Accents, labels, CTAs" },
                    { color: "#FF8300", name: "Naranja acento",  hex: "#FF8300", use: "Highlights, roles, alerts" },
                    { color: "#4ecfcf", name: "Teal claro",      hex: "#4ecfcf", use: "Dark mode variant" },
                    { color: "#1f2937", name: "Gray oscuro",     hex: "#1f2937", use: "Texto principal dark" },
                  ].map(({ color, name, hex, use }) => (
                    <div key={hex} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex-shrink-0 shadow-sm" style={{ background: color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300 font-mono">{hex} | {use}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-3">Tipografía</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">Inter</p>
                  <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mt-0.5">Single family · Variable weight · Google Fonts</p>
                </div>
              </div>

              {/* Principles */}
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-5">Principios aplicados</p>
                <div className="space-y-4">
                  {[
                    { Icon: Palette,         title: "Consistencia visual",     desc: "Mismo design system en los 5 casos de estudio y el home." },
                    { Icon: Smartphone,      title: "Mobile first",            desc: "Responsive design con breakpoints en sm / md / lg." },
                    { Icon: LayoutDashboard, title: "Dark mode nativo",        desc: "ThemeContext con persistencia; sin flash al cargar." },
                    { Icon: Code2,           title: "Microinteracciones",      desc: "Framer Motion para entradas, hovers y transiciones de página." },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#025959]/10 dark:bg-[#025959]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#025959] dark:text-[#4ecfcf]" />
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
          </FadeSection>

          {/* Callout: desarrollo asistido por IA */}
          <FadeSection delay={.08}>
            <div className="border-l-4 border-[#FF8300] rounded-r-xl p-5 bg-[#FF8300]/5 dark:bg-[#FF8300]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-1">Decisión de diseño clave</p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                Desarrollo asistido por IA no es "que la IA diseñe por mí": es usar IA como herramienta de implementación mientras el criterio, la arquitectura y las decisiones de diseño son mías. El resultado es el mismo; el ciclo es mucho más corto.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          04 · PROTOTIPAR
      ══════════════════════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-20 scroll-mt-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="04 · Prototipar" accent />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Construcción directa en código</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El portfolio arrancó como un export de Figma Make y evolucionó directamente en React + TypeScript, sin un prototipo de alta fidelidad aparte. Diseño y desarrollo avanzaron en paralelo: boceto, especificación y prompt, Claude Code, resultado en el navegador, revisión de diseño y siguiente iteración, cada cambio en su rama y su pull request.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              <strong className="text-gray-800 dark:text-gray-100">El prototipo ES el producto final.</strong> No hay un Figma embed en esta sección porque el portfolio que estás navegando ahora mismo es el entregable.
            </p>
          </FadeSection>

          {/* Diagrama del proceso */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Proceso de desarrollo asistido por IA</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <AIBuildDiagram />
            </div>
          </FadeSection>

          {/* Stack técnico */}
          <FadeSection delay={.07}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Stack técnico</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { cat: "Framework",   items: ["React 18", "TypeScript", "Vite 6"] },
                { cat: "Estilos",     items: ["Tailwind CSS v4", "Inline styles (custom colors)"] },
                { cat: "Animaciones", items: ["Motion (motion/react v12)", "Radix UI"] },
                { cat: "Routing",     items: ["React Router · HashRouter"] },
                { cat: "Deploy",      items: ["Vercel", "Vercel Web Analytics"] },
                { cat: "AI Tools",    items: ["Claude Code", "Figma Make", "Lovable", "ChatGPT"] },
              ].map(({ cat, items }) => (
                <motion.div key={cat} whileHover={{ y: -3 }}
                  className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-2">{cat}</p>
                  {items.map((item) => (
                    <p key={item} className="text-sm text-gray-600 dark:text-gray-300">{item}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* 3 Metrics */}
          <FadeSection delay={.09}>
            <div className="grid grid-cols-3 gap-5 text-center">
              {[
                { val: "5",      unit: "casos de estudio", sub: "completos y documentados" },
                { val: "2",      unit: "semanas",          sub: "de concepto a producto publicado" },
                { val: "225 KB", unit: "carga inicial",    sub: "antes era un HTML único de 33 MB" },
              ].map(({ val, unit, sub }) => (
                <motion.div key={unit} whileHover={{ scale: 1.04 }}
                  className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <p className="text-4xl font-black text-[#025959] dark:text-[#4ecfcf] mb-1">{val}</p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm">{unit}</p>
                  <p className="text-gray-500 dark:text-gray-300 text-xs mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Flow diagram */}
          <FadeSection delay={.1}>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-4">5 componentes arquitectónicos</p>
                <ol className="space-y-3">
                  {[
                    { name: "Hero animado con Canvas",          desc: "Ondas generativas con requestAnimationFrame" },
                    { name: "ProjectCard con ToolBadge",        desc: "Hover tooltips + navegación a case study" },
                    { name: "CaseStudyNav con scroll tracking",  desc: "Pills que aparecen al pasar el proceso" },
                    { name: "ThemeContext con dark mode",        desc: "Toggle global persistente sin flash" },
                    { name: "Inline SVG con useTheme()",         desc: "Diagramas adaptativos al modo oscuro" },
                  ].map(({ name, desc }, i) => (
                    <li key={name} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 bg-[#025959]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-gray-700 dark:text-gray-200 text-sm font-medium">{name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                <PortfolioFlowDiagram />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          05 · PRUEBA
      ══════════════════════════════════════════════════════════ */}
      <section id="prueba" className="py-16 md:py-20 scroll-mt-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <FadeSection>
            <SectionLabel text="05 · Prueba" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Validación sin usuarios</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-100">No hay datos de testeo con usuarios reales.</strong> Este es un producto nuevo y aún no se realizaron pruebas formales con personas externas. La transparencia en este punto es una decisión de diseño: no inventar métricas que no existen.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              La validación se realizó a través de tres métodos alternativos que no requieren usuarios, pero sí criterio y referentes confiables.
            </p>
          </FadeSection>

          {/* Sin datos callout */}
          <FadeSection delay={.04}>
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800 text-center">
              <p className="text-3xl mb-3">🔬</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Testeo con usuarios: no disponible</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto">
                Al momento de documentar este case study, no se dispone de datos de testeo formal con usuarios reales. Las iteraciones se realizaron con los tres métodos detallados a continuación.
              </p>
            </div>
          </FadeSection>

          {/* 3 Validation methods */}
          <FadeSection delay={.06}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Métodos de validación utilizados</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  num: "01", title: "Heurísticas de Nielsen",
                  desc: "Se aplicaron los 10 principios heurísticos al portfolio. Los 4 con mayor impacto en la experiencia se documentan en la tabla de validación.",
                  color: "#025959",
                },
                {
                  num: "02", title: "Feedback de diseñadores",
                  desc: "Se compartió el portfolio en etapas con otros diseñadores UX/UI para recoger observaciones sobre jerarquía visual, legibilidad y flujo narrativo.",
                  color: "#FF8300",
                },
                {
                  num: "03", title: "Referentes del diseño",
                  desc: "Decisiones validadas contra principios de Don Norman (Design of Everyday Things), Dieter Rams (10 principios) y Jakob Nielsen (usabilidad).",
                  color: "#4B5563",
                },
              ].map(({ num, title, desc, color }, idx) => (
                <motion.div key={num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: idx * .07 }}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border p-5 bg-white dark:bg-gray-800"
                  style={{ borderColor: `${color}25` }}>
                  <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-[var(--c)] dark:text-[var(--cd)]" style={{ "--c": color === "#FF8300" ? "#025959" : color, "--cd": color === "#025959" ? "#4ecfcf" : color === "#4B5563" ? "#9CA3AF" : color } as React.CSSProperties}>{num}</span>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm">{title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Heurísticas table */}
          <FadeSection delay={.08}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Tabla de validación heurística</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Heurística</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Implementación</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: "H01", h: "Visibilidad del estado del sistema",  impl: "Nav pill indica sección activa; transiciones de página explícitas", s: "Cumple" },
                    { n: "H02", h: "Consistencia y estándares",           impl: "Design System unificado en todas las páginas y componentes", s: "Cumple" },
                    { n: "H03", h: "Prevención de errores",               impl: "Rutas claras, sin callejones sin salida; botón de retorno siempre visible", s: "Cumple" },
                    { n: "H04", h: "Reconocimiento antes que recuerdo",   impl: "Labels visibles, navegación accesible en todo momento", s: "Cumple" },
                  ].map(({ n, h, impl, s }, i) => (
                    <tr key={n} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/60"}>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#025959] dark:text-[#4ecfcf]">{n}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{h}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{impl}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">✓ {s}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeSection>

          {/* Aprendizaje callout */}
          <FadeSection delay={.09}>
            <div className="border-l-4 border-[#025959] rounded-r-xl p-5 bg-[#025959]/5 dark:bg-[#025959]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-1">Aprendizaje</p>
              <p className="text-gray-700 dark:text-gray-200">
                Diseñar con desarrollo asistido por IA no elimina la necesidad de criterio: lo amplifica. Cada iteración que Claude Code genera necesita de quien sabe por qué una cosa funciona y otra no.
                <strong> La IA implementa. El diseñador decide.</strong>
              </p>
            </div>
          </FadeSection>

          {/* Próximos pasos */}
          <FadeSection delay={.09}>
            <div className="border-l-4 border-[#FF8300] rounded-r-xl p-5 bg-[#FF8300]/5 dark:bg-[#FF8300]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-1">Próximos pasos</p>
              <p className="text-gray-700 dark:text-gray-200">
                Testeo con usuarios reales · Métricas de engagement con Vercel Web Analytics · Pasar los colores de marca a tokens en theme.css · Sección de blog o reflexiones de diseño
              </p>
            </div>
          </FadeSection>

          {/* Impact banner */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl p-8 text-center text-white bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
              <p className="text-xl sm:text-2xl font-bold leading-relaxed">
                5 casos de estudio · Modo oscuro · Responsive · 2 semanas · Diseñado por mí, implementado con Claude Code
              </p>
              <p className="text-white/90 mt-3 max-w-xl mx-auto">
                Un portfolio vivo, hecho con las mismas herramientas que diseño para otros.
              </p>
            </div>
          </FadeSection>

          {/* Quote */}
          <FadeSection delay={.13}>
            <blockquote className="border-l-4 border-[#FF8300] pl-6 py-2">
              <p className="text-lg italic text-gray-700 dark:text-gray-200 leading-relaxed">
                "El mejor portfolio no es el más bonito: es el que demuestra cómo pensás cuando diseñás."
              </p>
            </blockquote>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#012e2e] to-[#025959]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-1 w-12 rounded-full bg-[#FF8300]" />
              </div>
              <p className="text-white/90 text-xs font-semibold uppercase tracking-widest">¿Siguiente paso?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
                ¿Querés trabajar conmigo?{" "}
                <span className="text-[#FF8300]">Escribime.</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ backgroundColor: "#e87500", boxShadow: "0 16px 50px rgba(255,131,0,.55)", y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => navigate("/", { state: { section: "contact" } })}
              data-ga-action="cta_click"
              data-ga-category="CTA"
              data-ga-label="Contactar - Portfolio"
              className="inline-flex items-center px-10 py-4 rounded-2xl bg-[#FF8300] text-gray-900 font-semibold text-lg shadow-2xl transition-all"
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
              {/* Hipervínculo — sin fondo ni borde */}
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#FF8300] dark:hover:text-[#FF8300] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver al portfolio
              </button>
              {/* Botón secundario — outlined, hover ámbar */}
              <motion.button
                whileHover={{ backgroundColor: "#FF8300", borderColor: "#FF8300", color: "#ffffff", boxShadow: "0 8px 24px rgba(255,131,0,.30)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                onClick={() => navigate("/case-study/+bank")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#025959] text-[#025959] dark:border-[#4ecfcf] dark:text-[#4ecfcf] font-medium text-sm transition-colors"
              >
                Ver Mas+ Bank
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
