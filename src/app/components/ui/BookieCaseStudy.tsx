import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, MapPin, BookOpen, Smartphone, Info, Route, Github,
} from "lucide-react";
import { SiFigma, SiNotion, SiJira } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMenuNav, type CaseStudyIndexSection } from "./CaseStudyMenuNav";
import bookiePort from "../../../imports/bookie port.jpg";
import bookieLibro from "../../../imports/bookie-libro.svg";
import bookieLocalizacion from "../../../imports/bookie-localizacion.svg";
import bookie1 from "../../../imports/Bookie1.svg";
import bookie2 from "../../../imports/Bookie2.svg";
import bookieCertificado  from "../../../imports/bookie-certificado.png";
import { ToolBadge as SharedToolBadge } from "./ToolGlyph";
import { scrollBehavior } from "../../utils/motion";
import { readableTextOn } from "../../utils/color";

/* ─── Constantes ─────────────────────────────────────────────────────────── */

interface Step {
  id: string; num: string; label: string;
  Icon: React.ElementType; color: string;
}
const STEPS: Step[] = [
  { id: "empatizar",  num: "01", label: "Empatizar",  Icon: Users,       color: "#025959" },
  { id: "definir",    num: "02", label: "Definir",    Icon: Search,      color: "#025959" },
  { id: "idear",      num: "03", label: "Idear",      Icon: Lightbulb,   color: "#FF8300" },
  { id: "prototipar", num: "04", label: "Prototipar", Icon: Layers,      color: "#025959" },
  { id: "prueba",     num: "05", label: "Prueba",     Icon: CheckCircle, color: "#FF8300" },
];

type ToolItem =
  | { type: "icon";  Icon: React.ElementType; label: string; brandColor: string }
  | { type: "adobe"; abbr: string;             label: string; brandColor: string };

const TOOLS: ToolItem[] = [
  { type: "icon",  Icon: SiFigma,  label: "Figma",         brandColor: "#F24E1E" },
  { type: "adobe", abbr: "Ai",     label: "Illustrator",   brandColor: "#FF9A00" },
  { type: "adobe", abbr: "Ps",     label: "Photoshop",     brandColor: "#31A8FF" },
  { type: "icon",  Icon: PenLine,  label: "Lápiz y Papel", brandColor: "#B45309" },
  { type: "icon",  Icon: SiNotion, label: "Notion",        brandColor: "#000000" },
  { type: "icon",  Icon: SiJira,   label: "Jira",          brandColor: "#0052CC" },
  { type: "adobe", abbr: "DE",     label: "DALL·E",        brandColor: "#10A37F" },
  { type: "adobe", abbr: "MJ",     label: "Midjourney",    brandColor: "#000000" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function FadeSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* HeroCanvas removed — replaced by <CaseStudyHero /> */

/* ─── Tool badge — estático, sin hover ─────────────────────────────────── */
function ToolBadge(tool: ToolItem) {
  return <SharedToolBadge label={tool.label} />;
}

/* ─── Índice — para el menú hamburguesa compartido (CaseStudyMenuNav) ──── */
const INDEX_SECTIONS: CaseStudyIndexSection[] = [
  { id: "inicio",      label: "Bookie",       Icon: Info },
  { id: "resumen",     label: "El proyecto",  Icon: Info },
  { id: "metodologia", label: "Metodología",  Icon: Route },
  ...STEPS.map((s) => ({ id: s.id, label: s.label, Icon: s.Icon })),
];

/* ─── Diagrama horizontal (stepper) ─────────────────────────────────────── */
function StepNode({ step, index }: { step: Step; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={() => scrollTo(step.id)}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center gap-3 flex-shrink-0 w-[72px] sm:w-24 group"
    >
      <motion.div
        animate={{ background: hov ? "rgba(255,131,0,0.14)" : "rgba(2,89,89,0.08)", borderColor: hov ? "#FF8300" : "rgba(2,89,89,0.18)" }}
        transition={{ duration: 0.22 }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm"
      >
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
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm font-medium ${
      accent
        ? "bg-[#FF8300]/12 dark:bg-[#FF8300]/10 text-gray-900 dark:text-[#FF8300]"
        : "bg-[#025959]/10 dark:bg-[#4ecfcf]/15 text-[#025959] dark:text-[#4ecfcf]"
    }`}>{text}</span>
  );
}

function ComingSoon({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:.95 }} whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }} transition={{ duration:.5 }}
      className="rounded-2xl border-2 border-dashed border-[#025959]/25 dark:border-[#025959]/40 bg-[#025959]/04 dark:bg-[#025959]/08 p-12 text-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-[#025959] dark:text-[#4ecfcf] font-semibold mb-1">Caso de estudio en construcción</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}

/* ─── Diagrama de Arquitectura de Información ───────────── */
function IADiagram() {
  const { isDark } = useTheme();
  const bg       = isDark ? "#1f2937"                : "#f9fafb";
  const lineClr  = isDark ? "rgba(78,207,207,0.25)"  : "rgba(2,89,89,0.18)";
  const l2Bg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const l2Border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const txtL2    = isDark ? "#d1d5db" : "#374151";
  const txtMute  = isDark ? "#6b7280" : "#9ca3af";

  const rootCX = 270;
  const l1Y = 62, l1W = 90, l1H = 26;
  const l2Y0 = 108, l2W = 82, l2H = 22, l2Gap = 30;

  const cols: Array<{ cx: number; label: string; color: string; items: Array<{ t: string; hl?: boolean }> }> = [
    { cx:  54, label: "Onboarding",  color: "#025959", items: [{ t: "Registro" }, { t: "Perfil usuario" }, { t: "Tour inicial" }] },
    { cx: 162, label: "Exploración", color: "#025959", items: [{ t: "Feed" }, { t: "Mapa GPS" }, { t: "Filtros" }] },
    { cx: 270, label: "Lectura",     color: "#025959", items: [{ t: "Capítulo" }, { t: "Desbloqueo GPS" }, { t: "Transición", hl: true }] },
    { cx: 378, label: "Creación",    color: "#FF8300", items: [{ t: "Nueva hist." }, { t: "Anclar lugar" }, { t: "Publicar" }] },
    { cx: 486, label: "Perfil",      color: "#4B5563", items: [{ t: "Historial" }, { t: "Logros" }, { t: "Config." }] },
  ];

  return (
    <svg viewBox="0 0 540 218" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="540" height="218" rx="12" fill={bg} />
      {/* Root */}
      <rect x={rootCX - 52} y={14} width={104} height={28} rx={14} fill="#025959" />
      <text x={rootCX} y={32} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">Bookie App</text>
      {/* Fan lines */}
      {cols.map(({ cx }) => (
        <line key={cx} x1={rootCX} y1={42} x2={cx} y2={l1Y} stroke={lineClr} strokeWidth="1.5" />
      ))}
      {/* L1 + spine + L2 */}
      {cols.map(({ cx, label, color, items }) => {
        const spineEnd = l2Y0 + (items.length - 1) * l2Gap + l2H / 2;
        return (
          <g key={label}>
            <rect x={cx - l1W / 2} y={l1Y} width={l1W} height={l1H} rx="7" fill={color} />
            <text x={cx} y={l1Y + 17} textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">{label}</text>
            <line x1={cx} y1={l1Y + l1H} x2={cx} y2={spineEnd} stroke={lineClr} strokeWidth="1.5" />
            {items.map(({ t, hl }, i) => {
              const y = l2Y0 + i * l2Gap;
              return (
                <g key={t}>
                  <rect x={cx - l2W / 2} y={y} width={l2W} height={l2H} rx="5"
                    fill={hl ? "#FF8300" : l2Bg} stroke={hl ? "none" : l2Border} strokeWidth="1" />
                  <text x={cx} y={y + 14} textAnchor="middle"
                    fill={hl ? "white" : txtL2} fontSize="7.5" fontWeight={hl ? "700" : "500"}>{t}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      {/* Footer */}
      <text x={270} y={212} textAnchor="middle" fill={txtMute} fontSize="6.5" fontWeight="600" letterSpacing="1">
        ARQUITECTURA DE INFORMACIÓN · 5 ÁREAS · 15 PANTALLAS
      </text>
    </svg>
  );
}

/* ─── Diagrama de Flujo del Prototipo ───────────────────── */
function FlowDiagram() {
  const { isDark } = useTheme();
  const bg       = isDark ? "#1f2937"                : "#f9fafb";
  const lineClr  = isDark ? "rgba(78,207,207,0.30)"  : "rgba(2,89,89,0.22)";
  const l2Bg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const l2Border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const txtL2    = isDark ? "#d1d5db" : "#374151";
  const txtMute  = isDark ? "#6b7280" : "#9ca3af";
  const teal     = isDark ? "#4ecfcf" : "#025959";

  return (
    <svg viewBox="0 0 280 430" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="430" rx="12" fill={bg} />
      <text x="140" y="14" textAnchor="middle" fill={txtMute} fontSize="7.5" fontWeight="700" letterSpacing="1.5">DIAGRAMA DE FLUJO</text>
      {/* Inicio */}
      <rect x="90" y="22" width="100" height="26" rx="13" fill="#025959" />
      <text x="140" y="39" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Inicio · Splash</text>
      <line x1="140" y1="48" x2="140" y2="62" stroke={teal} strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="136,62 140,68 144,62" fill={teal} />
      {/* F1 */}
      <rect x="55" y="68" width="170" height="26" rx="8" fill="#025959" />
      <text x="76" y="84" fill="#FF8300" fontSize="7" fontWeight="700">F1</text>
      <text x="140" y="84" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Registro · Onboarding</text>
      <line x1="140" y1="94" x2="140" y2="108" stroke={teal} strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="136,108 140,114 144,108" fill={teal} />
      {/* Home Hub */}
      <rect x="60" y="114" width="160" height="26" rx="8" fill="#FF8300" />
      <text x="140" y="131" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">Home · Feed</text>
      {/* Fork */}
      <line x1="100" y1="140" x2="67" y2="158" stroke="#025959" strokeWidth="1.5" />
      <line x1="180" y1="140" x2="213" y2="158" stroke="#FF8300" strokeWidth="1.5" />
      {/* Left: F2 */}
      <rect x="6" y="158" width="122" height="26" rx="8" fill="#025959" opacity="0.92" />
      <text x="20" y="174" fill="#FF8300" fontSize="7" fontWeight="700">F2</text>
      <text x="67" y="174" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">Feed · Mapa interactivo</text>
      <line x1="67" y1="184" x2="67" y2="198" stroke="#025959" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="63,198 67,204 71,198" fill="#025959" />
      {/* Left: F3 */}
      <rect x="6" y="204" width="122" height="26" rx="8" fill="#025959" opacity="0.75" />
      <text x="20" y="220" fill="#FF8300" fontSize="7" fontWeight="700">F3</text>
      <text x="67" y="220" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">Desbloqueo · GPS</text>
      <line x1="67" y1="230" x2="67" y2="244" stroke="#025959" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="63,244 67,250 71,244" fill="#025959" />
      {/* Left: Lectura */}
      <rect x="6" y="250" width="122" height="26" rx="8" fill={l2Bg} stroke={l2Border} strokeWidth="1" />
      <text x="67" y="267" textAnchor="middle" fill={txtL2} fontSize="8" fontWeight="500">Lectura · Capítulo</text>
      {/* Right: F4 */}
      <rect x="152" y="158" width="122" height="26" rx="8" fill="#FF8300" opacity="0.92" />
      <text x="165" y="174" fill="white" fontSize="7" fontWeight="700">F4</text>
      <text x="213" y="174" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">Crear historia</text>
      <line x1="213" y1="184" x2="213" y2="198" stroke="#FF8300" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="209,198 213,204 217,198" fill="#FF8300" />
      {/* Right: Anclar */}
      <rect x="152" y="204" width="122" height="26" rx="8" fill="#FF8300" opacity="0.75" />
      <text x="213" y="220" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">Anclar ubicación</text>
      <line x1="213" y1="230" x2="213" y2="244" stroke="#FF8300" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="209,244 213,250 217,244" fill="#FF8300" />
      {/* Right: Publicar */}
      <rect x="152" y="250" width="122" height="26" rx="8" fill={l2Bg} stroke={l2Border} strokeWidth="1" />
      <text x="213" y="267" textAnchor="middle" fill={txtL2} fontSize="8" fontWeight="500">Publicar historia</text>
      {/* Convergence */}
      <line x1="67" y1="276" x2="67" y2="300" stroke="#FF8300" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="213" y1="276" x2="213" y2="300" stroke="#FF8300" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="67" y1="300" x2="213" y2="300" stroke="#FF8300" strokeWidth="1.5" />
      <line x1="140" y1="300" x2="140" y2="314" stroke="#FF8300" strokeWidth="1.5" />
      <polygon points="136,314 140,320 144,314" fill="#FF8300" />
      {/* Transición */}
      <rect x="48" y="320" width="184" height="34" rx="10" fill="#FF8300" />
      <text x="140" y="334" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">Pantalla de Transición</text>
      <text x="140" y="348" textAnchor="middle" fill="white" fontSize="7.5" opacity="0.85">mapa + distancia + preview cap.</text>
      {/* Loop arrow */}
      <path d="M 232 337 Q 262 337 262 222 Q 262 114 232 120" stroke="#FF8300" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.4" />
      <polygon points="229,117 233,123 237,117" fill="#FF8300" opacity="0.4" />
      {/* Legend */}
      <rect x="8" y="374" width="264" height="48" rx="8" fill={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
      <text x="140" y="389" textAnchor="middle" fill={txtMute} fontSize="6.5" fontWeight="700" letterSpacing="1">LEYENDA</text>
      <rect x="16" y="396" width="9" height="9" rx="2" fill="#025959" />
      <text x="30" y="405" fill={txtMute} fontSize="7">Flujos 1 · 2 · 3</text>
      <rect x="96" y="396" width="9" height="9" rx="2" fill="#FF8300" />
      <text x="110" y="405" fill={txtMute} fontSize="7">Flujo 4 · Escritor</text>
      <rect x="178" y="396" width="9" height="9" rx="2" fill="#FF8300" />
      <text x="192" y="405" fill={txtMute} fontSize="7">Pantalla clave</text>
      <line x1="16" y1="418" x2="30" y2="418" stroke={teal} strokeWidth="1" strokeDasharray="3 2" />
      <text x="35" y="421" fill={txtMute} fontSize="7">Navegación</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function BookieCaseStudy() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyMenuNav title="Bookie" sections={INDEX_SECTIONS} primaryColor="#025959" secondaryColor="#FF8300" />
      <main id="main" tabIndex={-1} className="outline-none">

      {/* HERO */}
      <div id="inicio">
        <CaseStudyHero
          badgeLabel="Caso de Estudio · Bookie"
          titlePrefix="Bookie –"
          titleAccent="Lectura Geolocalizada"
          description="Una app que transforma la lectura digital en una aventura: descubrí historias en los lugares donde cobran vida y convertí cada paseo en un capítulo nuevo."
          tags={["UX/UI Designer", "Mobile App", "2024"]}
          image={bookiePort}
          imageAlt="Pantalla de la app Bookie"
          imageMobile1={bookie1}
          imageMobile2={bookie2}
          brandColor="#7A5C22"
          brandColorDark="#d4a85a"
          variant="phones"
        />
      </div>

      {/* DESCRIPCIÓN + FICHA */}
      <section id="resumen" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Narrativa + herramientas */}
              <div className="space-y-6">
                <SectionLabel text="Descripción del Proyecto" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">No Country</strong> es un programa de simulación
                  laboral que forma equipos multidisciplinarios con metodología Agile/Scrum para trabajar proyectos de
                  producto digital con clientes reales. El hackathon Bookie fue una competencia entre equipos.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El cliente de Bookie tenía clara la historia de usuario que quería contar —una app que desbloquea
                  capítulos al llegar físicamente a ubicaciones específicas— pero no cómo debía suceder dentro de la app.
                  Mi trabajo como UX/UI fue traducir esa visión en un flujo concreto, una marca y un prototipo navegable.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nuestro equipo llegó a la instancia de{" "}
                  <strong className="text-[#025959] dark:text-[#FF8300]">finalistas</strong>. El prototipo fue construido completamente en
                  Figma y a falta de usuarios reales, las iteraciones se basaron en heurísticas de Nielsen y referentes
                  validados del diseño.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                    Herramientas utilizadas
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {TOOLS.map((t) => <ToolBadge key={t.label} {...t} />)}
                  </div>
                </div>
              </div>

              {/* Ficha del proyecto */}
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Rol",       value: "UX/UI Designer" },
                    { label: "Sector",    value: "Entretenimiento Digital · Geolocalización · Mobile App" },
                    { label: "Duración",  value: "5 semanas" },
                    { label: "Equipo",    value: "Multidisciplinario — Design · Dev · QA · PM" },
                    { label: "Resultado", value: "Equipo Finalista · Certificado No Country", full: true },
                  ].map(({ label, value, full }, idx) => (
                    <motion.div key={label}
                      initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ duration:.55, delay:idx*.08 }}
                      whileHover={{ y:-3, boxShadow:"0 8px 24px rgba(2,89,89,.12)" }}
                      className={`bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow ${full ? "col-span-2" : ""}`}
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1.5">{label}</p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm font-semibold leading-snug">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </FadeSection>
        </div>
      </section>

      {/* STAR */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">
              ★ Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-8">
              "Diseñamos los flujos de una mecánica de juego completamente nueva, convirtiendo una idea abstracta en una{" "}
              <span className="text-[#FF8300]">experiencia intuitiva</span> que el cliente y los usuarios entendieron de inmediato."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación", desc: "Hackathon No Country" },
                { label: "Tarea",     desc: "App de lectura con mecánica geolocalizada" },
                { label: "Acción",    desc: "4+ flujos principales diseñados" },
                { label: "Resultado", desc: "Top 2 Finalistas" },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left">
                  <span className="text-white text-xs font-bold uppercase tracking-widest"><span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF8300] mr-1.5 align-middle" />{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug font-semibold">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* PROCESO */}
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

      {/* ══════════════════════════════════════════
          01. EMPATIZAR
      ══════════════════════════════════════════ */}
      <section id="empatizar" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <FadeSection className="mb-12">
            <SectionLabel text="01 · Empatizar" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Benchmark, público objetivo y user persona
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-8">
              Análisis competitivo · Definición del usuario objetivo · User persona
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              La lectura digital enfrenta tres desafíos concretos: <strong className="text-gray-800 dark:text-gray-100">desconexión entre la literatura y el entorno físico</strong>, monotonía en las plataformas actuales que no logran motivar a los usuarios, y limitada interacción entre autores y lectores para crear experiencias inmersivas. Estas barreras convierten la lectura en una actividad pasiva y descontextualizada.
            </p>
          </FadeSection>

          {/* Público objetivo */}
          <FadeSection className="mb-14" delay={0.1}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Público objetivo</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Las personas que más leen en la era digital son jóvenes de 16 a 34 años, en plataformas como Wattpad o Kindle. Prefieren formatos accesibles —ebooks y audiolibros— y están motivados por educación, desarrollo profesional y conexión digital constante.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  range: "16–24 años", label: "Jóvenes adultos",
                  color: "#025959",
                  items: [
                    "Grandes consumidores de Wattpad, Kindle y apps móviles",
                    "Prefieren ficción juvenil, romance y fantasía",
                    "Usan tablets y lectores electrónicos",
                  ],
                },
                {
                  range: "25–34 años", label: "Adultos jóvenes",
                  color: "#FF8300",
                  items: [
                    "Consumen literatura variada: novelas, autoayuda, aprendizaje",
                    "Acceso constante gracias a plataformas móviles",
                    "Fuerte relación con educación y desarrollo personal",
                  ],
                },
              ].map(({ range, label, color, items }, i) => (
                <motion.div
                  key={range}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm"
                >
                  <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: color, color: readableTextOn(color) }}>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest">{label}</p>
                      <p className="text-2xl font-black">{range}</p>
                    </div>
                  </div>
                  <ul className="px-6 py-4 space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Factores */}
            <div className="rounded-2xl bg-[#025959]/5 dark:bg-[#4ecfcf]/8 border border-[#025959]/10 dark:border-[#4ecfcf]/15 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-3">
                Factores que influyen en la lectura digital
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  "Acceso constante gracias a plataformas móviles",
                  "Relación con educación y desarrollo personal",
                  "Preferencia por formatos cómodos y accesibles",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#025959] dark:text-[#4ecfcf] flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* User Persona: Alejandra */}
          <FadeSection className="mb-14" delay={0.15}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">User Persona</h3>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm">

              {/* Header persona */}
              <div className="bg-gradient-to-r from-[#025959] to-[#037070] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80"
                  alt="Alejandra — User Persona"
                  className="w-20 h-20 rounded-full object-cover border-3 border-white/30 shadow-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-0.5">User Persona</p>
                  <h4 className="text-2xl font-black text-white">Alejandra</h4>
                  <p className="text-white/90 text-sm">Lectora y escritora</p>
                  <p className="text-white text-sm font-medium italic mt-1">"Quiero leer y escribir historias"</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Género",      value: "Femenino" },
                    { label: "Estado",      value: "Soltera"  },
                    { label: "Edad",        value: "24 años"  },
                    { label: "Ciudad",      value: "Bogotá"   },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-white/90 text-xs uppercase tracking-widest">{label}</p>
                      <p className="text-white text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote + Bio */}
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                <blockquote className="border-l-4 border-[#FF8300] pl-4 mb-4">
                  <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
                    "Me gusta la lectura y escribir pero siempre encuentro apps con la misma estrategia de lecturas y la misma dinámica. Me gustaría conectar con otras alternativas para poder disfrutar la lectura de otra manera."
                  </p>
                  <footer className="mt-1 text-xs text-gray-500 dark:text-gray-300">— Alejandra</footer>
                </blockquote>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Alejandra es psicóloga, trabaja de manera remota y aprovecha sus tiempos libres para lectura y escritura —su hobby desde pequeña. Es una persona solitaria que busca apps que la saquen de su zona de confort y le permitan experimentar nuevas cosas relacionadas con sus hobbies favoritos.
                </p>
              </div>

              {/* Goals / Frustrations / Motivations */}
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                {[
                  {
                    title: "Objetivos y metas", color: "#025959", darkColor: "#4ecfcf",
                    items: [
                      "Hábito de escritura y lectura en apps para su desarrollo personal",
                      "Conocer y vivir la experiencia de nuevos lugares y culturas",
                      "Potenciar sus escritos con experiencias memorables",
                    ],
                  },
                  {
                    title: "Frustraciones", color: "#DC2626", darkColor: "#f87171",
                    items: [
                      "Se aburre rápido; busca salir de la rutina constantemente",
                      "No conoce servicios que faciliten salir de su zona de confort mediante la lectura",
                      "Quiere ser gran escritora pero le cuesta potenciar esa habilidad",
                    ],
                  },
                  {
                    title: "Motivaciones y habilidades", color: "#FF8300", darkColor: "#FF8300",
                    items: [
                      "Conocer nuevas experiencias, ciudades y culturas",
                      "Conectar hobbies con desarrollo personal y profesional",
                      "Ser reconocida por su primer libro · Comunicación escrita como fortaleza · Alta adaptabilidad tecnológica",
                    ],
                  },
                ].map(({ title, color, darkColor, items }) => (
                  <div key={title} className="px-5 py-5">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[var(--c)] dark:text-[var(--cd)]"
                      style={{ "--c": color === "#FF8300" ? "#025959" : color, "--cd": darkColor } as React.CSSProperties}>
                      {title}
                    </p>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 leading-snug">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </FadeSection>

          {/* Benchmark */}
          <FadeSection className="mb-14" delay={0.2}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Benchmark · Aplicaciones similares
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Analicé las tres plataformas de lectura digital más usadas: <strong className="text-gray-800 dark:text-gray-100">Wattpad</strong> (97M usuarios), <strong className="text-gray-800 dark:text-gray-100">Galatea</strong> y <strong className="text-gray-800 dark:text-gray-100">Sueñavela</strong>. El análisis se estructuró en tres ejes: utilidad/onboarding, vocabulario/copy y diseño/ocupación del espacio.
            </p>

            {/* Tabla */}
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm mb-8">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabla de benchmark (desplazable)">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#025959] text-white">
                      <th className="px-5 py-3.5 text-left font-semibold rounded-tl-3xl w-28">App</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Utilidad / Onboarding</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Vocabulario</th>
                      <th className="px-5 py-3.5 text-left font-semibold rounded-tr-3xl">Diseño y espacio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        app: "Wattpad", badge: "97M usuarios",
                        onboarding: "4 pasos desde registro / 3 desde email",
                        vocab: "Copy explicativo, coherente y cercano. Call to action estratégicos y atractivos",
                        design: "Gran contraste entre tamaños y colores para impactar y generar CTA",
                      },
                      {
                        app: "Galatea", badge: null,
                        onboarding: "2 pasos para ingresar, con recompensas por cada paso",
                        vocab: "Textos cortados que ocultan información clave. El usuario se pierde del diferencial",
                        design: "Mucho contenido que abruma visualmente. Sin espacios para facilitar legibilidad",
                      },
                      {
                        app: "Sueñavela", badge: null,
                        onboarding: "1 paso para ingresar, con recompensas por paso",
                        vocab: "Onboarding claro y llamativo. Sin restricciones. Copys en el home cercanos al usuario",
                        design: "Gran cantidad de espacio en blanco. Algunos contenidos muy pequeños dificultan la accesibilidad",
                      },
                    ].map(({ app, badge, onboarding, vocab, design }, i) => (
                      <motion.tr key={app}
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                        className={`border-t border-gray-100 dark:border-gray-700 ${
                          i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/80 dark:bg-gray-700/40"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-800 dark:text-gray-100">{app}</p>
                          {badge && <span className="text-xs font-semibold bg-[#025959]/10 dark:bg-[#4ecfcf]/15 text-[#025959] dark:text-[#4ecfcf] px-2 py-0.5 rounded-full">{badge}</span>}
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{onboarding}</td>
                        <td className="px-5 py-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{vocab}</td>
                        <td className="px-5 py-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{design}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fortalezas y Debilidades */}
            <div className="grid md:grid-cols-3 gap-5 mb-3">
              {[
                {
                  app: "Wattpad",
                  fortalezas: ["Comunicación directa y atractiva","Variedad de contenido","Buen posicionamiento de marca","Buena usabilidad","Música al leer","Ajuste de color y tamaño al leer"],
                  debilidades: ["Sin accesibilidad para discapacidad","Sin guía clara para seguir capítulos"],
                },
                {
                  app: "Galatea",
                  fortalezas: ["Colores con buen contraste diferencial","Audiolibros — inclusión para todos","Ajuste de color y tamaño para el lector"],
                  debilidades: ["Contenido abrumador visualmente","App muy lenta","Elementos sin funcionalidad aún"],
                },
                {
                  app: "Sueñavela",
                  fortalezas: ["Onboarding atractivo y relevante","Interacción del libro al leer","Herramientas de legibilidad","Espacios en blanco para descanso visual"],
                  debilidades: ["Sin accesibilidad para discapacidad","Elementos muy pequeños en el home","Falta de herramientas para el diferencial"],
                },
              ].map(({ app, fortalezas, debilidades }, i) => (
                <motion.div key={app}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm"
                >
                  <div className="px-4 py-3 bg-[#025959]/8 dark:bg-[#4ecfcf]/8 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-bold text-gray-800 dark:text-gray-100">{app}</p>
                  </div>
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2">Fortalezas</p>
                    <ul className="space-y-1.5 mb-3">
                      {fortalezas.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400 mb-2">Debilidades</p>
                    <ul className="space-y-1.5 pb-3">
                      {debilidades.map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Diferencial de Bookie */}
          <FadeSection delay={0.25}>
            <div className="rounded-3xl bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a] p-8">
              <p className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-3">
                Diferencial de Bookie — conclusión del benchmark
              </p>
              <p className="text-white/90 leading-relaxed mb-8 max-w-3xl">
                El hallazgo central fue que las tres plataformas comparten la misma dinámica: la lectura como experiencia pasiva, desconectada del entorno físico. Ninguna conecta la narrativa con el espacio real. Bookie tenía un diferencial genuino — el desafío era comunicarlo desde el primer pantallazo sin necesidad de explicación.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { Icon: MapPin,    title: "Innovación",           desc: "Integración de lectura con geolocalización — una experiencia única que ninguna plataforma actual ofrece." },
                  { Icon: Lightbulb, title: "Gamificación",          desc: "Desbloqueo de capítulos y navegación física como parte de la narrativa. La exploración es parte del relato." },
                  { Icon: BookOpen,  title: "Exploración cultural",  desc: "Permite descubrir ciudades y culturas a través de historias ancladas a lugares físicos reales." },
                  { Icon: PenLine,   title: "Flexibilidad creativa", desc: "Empodera a los escritores para crear narrativas inmersivas ancladas al mundo físico." },
                ].map(({ Icon, title, desc }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/10 border border-white/15 p-5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FF8300]/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#FF8300]" />
                    </div>
                    <p className="text-white font-bold mb-1.5">{title}</p>
                    <p className="text-white/90 text-xs leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          02. DEFINIR
      ══════════════════════════════════════════ */}
      <section id="definir" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <FadeSection className="mb-10">
            <SectionLabel text="02 · Definir" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Arquitectura de información y flujos de usuario
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-8">
              Arquitectura de la información · Tipos de usuario · Flujos críticos del MVP
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                El principal desafío arquitectónico fue traducir la visión del cliente —que existía como historia de usuario, no como pantallas— en flujos concretos y navegables. Identifiqué tres tipos de usuario con lógicas distintas de uso: el{" "}
                <strong className="text-gray-800 dark:text-gray-100">Lector</strong>, el{" "}
                <strong className="text-gray-800 dark:text-gray-100">Escritor</strong> y el{" "}
                <strong className="text-gray-800 dark:text-gray-100">Viajero</strong>.
              </p>
              <p>
                Mapeé cuatro flujos críticos para el MVP: registro y onboarding, exploración de historias cercanas, lectura geolocalizada y creación/publicación de historias. Cada flujo responde a una necesidad distinta y no puede colapsar con otro sin generar confusión.
              </p>
            </div>
          </FadeSection>

          {/* Architecture decision */}
          <FadeSection className="mb-10" delay={0.1}>
            <div className="rounded-3xl border-l-4 border-[#025959] dark:border-[#4ecfcf] bg-[#025959]/5 dark:bg-[#4ecfcf]/8 p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-3">
                Decisión de arquitectura
              </p>
              <p className="text-gray-800 dark:text-gray-100 font-semibold leading-relaxed mb-2">
                Separar el "modo lectura" del "modo exploración" en dos estados visuales claramente diferenciados dentro de la misma app.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                Mezclarlos en una sola vista generaría fricción: el usuario que termina un capítulo necesita entender inmediatamente hacia dónde ir físicamente para continuar.
              </p>
            </div>
          </FadeSection>

          {/* User types */}
          <FadeSection className="mb-12" delay={0.15}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tipos de usuario</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  Icon: BookOpen, color: "#025959",
                  title: "Lector",
                  quote: "Sale de su rutina combinando lectura y exploración.",
                  desc: "Desbloquea capítulos al llegar a ubicaciones específicas. La app convierte su recorrido físico en progreso narrativo.",
                },
                {
                  Icon: PenLine, color: "#025959",
                  title: "Escritor",
                  quote: "Crea historias ancladas a lugares reales.",
                  desc: "Hace el recorrido físico de los escenarios que propone. Su creatividad define la experiencia geográfica del lector.",
                },
                {
                  Icon: MapPin, color: "#FF8300",
                  title: "Viajero",
                  quote: "Descubre historias en ciudades que visita.",
                  desc: "Deja su huella con escritos georeferenciados. Cada ciudad nueva es una biblioteca de narrativas por explorar.",
                },
              ].map(({ Icon, color, title, quote, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm"
                >
                  <div className="p-6 flex flex-col">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${color}18` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <p className="font-black text-lg text-gray-800 dark:text-gray-100 mb-1">{title}</p>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3 leading-snug">"{quote}"</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
                  </div>
                  <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* IA Diagram */}
          <FadeSection delay={0.2}>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-1">
                Arquitectura de información
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                5 áreas principales · 15 pantallas · Transición como nodo crítico
              </p>
              <IADiagram />
            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          03. IDEAR
      ══════════════════════════════════════════ */}
      <section id="idear" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header + narrativa */}
          <FadeSection className="mb-12">
            <SectionLabel text="03 · Idear — Identidad visual" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Identidad de marca: cuando el logo cuenta el producto
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Diseñé la identidad visual de Bookie desde cero, buscando que el logo comunicara el diferencial
                del producto sin necesidad de texto explicativo. La síntesis visual debía ser inmediatamente
                legible: <strong className="text-gray-800 dark:text-gray-100">una app de lectura que te lleva a lugares</strong>.
              </p>
              <p>
                El logo combina tres elementos con lógica semántica: un ícono de localización (el viaje físico),
                una brújula (la dirección, la guía) y un libro abierto (la narrativa). La evolución del logo fue
                documentada ante el equipo para justificar cada decisión de diseño.
              </p>
            </div>
          </FadeSection>

          {/* Paleta + Tipografía */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">

            {/* Paleta de color */}
            <FadeSection delay={0.1}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Paleta de color
                </p>
                <div className="flex gap-3 mb-5">
                  {[
                    { hex: "#006078", name: "Azul",   role: "Primario",   desc: "Calma, creatividad y confianza. Espacio seguro para la lectura." },
                    { hex: "#906E2A", name: "Marrón", role: "Secundario", desc: "Tierra, entorno físico. Conexión con el mundo real y el descubrimiento." },
                  ].map(({ hex, name, role, desc }) => (
                    <motion.div key={hex}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col gap-2"
                    >
                      <div className="w-full h-20 rounded-2xl shadow-md" style={{ backgroundColor: hex }} />
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{name}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{hex}</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[
                    { hex: "#FFFFFF", name: "White"   },
                    { hex: "#FAFAFA", name: "Surface"  },
                    { hex: "#DADADA", name: "Border"   },
                    { hex: "#797979", name: "Muted"    },
                    { hex: "#000000", name: "Black"    },
                  ].map(({ hex, name }) => (
                    <motion.div key={hex}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.35 }}
                      className="flex-1 flex flex-col gap-1"
                    >
                      <div className="w-full h-8 rounded-xl border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: hex }} />
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">{name}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 h-10 rounded-2xl shadow-inner"
                  style={{ background: "linear-gradient(135deg, #006078 0%, #906E2A 100%)" }} />
                <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400 italic">
                  Gradiente de marca — Azul → Marrón dorado
                </p>
              </div>
            </FadeSection>

            {/* Tipografía */}
            <FadeSection delay={0.2}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Tipografía
                </p>
                <div className="space-y-5">
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45 }}
                    className="border-l-4 border-[#906E2A] pl-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1">Display — H1</p>
                    <p className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-50 leading-none"
                      style={{ fontFamily: '"Roboto", sans-serif' }}>Bookie</p>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-300 mt-1.5">Roboto · 700 · 48px · −0.02em</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
                    className="border-l-4 border-[#006078] pl-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1">Heading — H2</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100"
                      style={{ fontFamily: '"Roboto", sans-serif' }}>Tu historia te espera</p>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-300 mt-1">Roboto · 600 · 28px · −0.01em</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
                    className="border-l-4 border-gray-200 dark:border-gray-600 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1">Body — Cuerpo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: '"Recursive", monospace' }}>
                      Descubre capítulos al llegar a nuevos lugares del mundo real.
                    </p>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-300 mt-1">Recursive · 400 · 16px · 1.6 lh</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.24 }}
                    className="border-l-4 border-gray-100 dark:border-gray-700 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1">Caption / Label</p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-300"
                      style={{ fontFamily: '"Roboto", sans-serif' }}>CAPÍTULO DESBLOQUEADO</p>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-300 mt-1">Roboto · 600 · 11px · 0.08em</p>
                  </motion.div>
                </div>
              </div>
            </FadeSection>
          </div>

          {/* Síntesis del logo */}
          <FadeSection delay={0.3}>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-1">
                Síntesis del logo
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Tres elementos semánticos unidos en un solo símbolo visual
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    src: bookieLocalizacion, alt: "Localización + Brújula",
                    title: "Localización + Brújula",
                    desc: "El viaje físico. La dirección y la guía hacia el destino narrativo.",
                    colors: [{ hex: "#006078" }, { hex: "#906E2A" }],
                  },
                  {
                    src: bookieLibro, alt: "Libro abierto — narrativa",
                    title: "Libro abierto — narrativa",
                    desc: "La narrativa. El relato que se despliega con cada nuevo lugar descubierto.",
                    colors: [{ hex: "#906E2A" }, { hex: "#000000" }],
                  },
                ].map(({ src, alt, title, desc, colors }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.12 }}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 flex flex-col items-center gap-4"
                  >
                    <div className="w-full flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm min-h-[160px]">
                      <img src={src} alt={alt} className="max-h-36 w-auto object-contain" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {colors.map(({ hex }) => (
                        <span key={hex} className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: hex }} />
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-300">{hex}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, #006078 0%, #906E2A 100%)" }}>
                <p className="text-center text-white font-bold text-lg tracking-wide">
                  Localización · Guía · Narrativa
                </p>
                <p className="text-center text-white text-sm mt-1">
                  Los tres pilares del logo fusionados en el símbolo de Bookie
                </p>
              </div>
            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          04. PROTOTIPAR
      ══════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header + narrativa */}
          <FadeSection className="mb-10">
            <SectionLabel text="04 · Prototipar" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              UI Kit completo y flujos de alta fidelidad
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Con la identidad y los flujos definidos, construí el{" "}
                <strong className="text-gray-800 dark:text-gray-100">UI Kit completo en Figma</strong>: tipografías
                sistematizadas (Roboto + Recursive), paleta tokenizada, iconografía propia e ilustraciones, y
                componentes reutilizables para el equipo de desarrollo.
              </p>
              <p>
                Las pantallas de alta fidelidad cubrieron los cuatro flujos del MVP: registro/onboarding, feed de
                historias cercanas con mapa interactivo, lectura geolocalizada con desbloqueo por GPS, y creación y
                publicación de historias.
              </p>
            </div>
          </FadeSection>

          {/* 4 flujos críticos + diagrama */}
          <FadeSection className="mb-10" delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">

              {/* Left — lista de flujos */}
              <div className="rounded-3xl bg-gradient-to-br from-[#025959]/8 to-[#FF8300]/8 dark:from-[#025959]/15 dark:to-[#FF8300]/10 border border-[#025959]/15 dark:border-[#4ecfcf]/15 p-7 flex flex-col justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-6">
                  4 flujos críticos · Un MVP listo para Dev
                </p>
                <div className="space-y-5 flex-1">
                  {[
                    { num: "01", color: "#025959", label: "Registro · Onboarding",
                      desc: "Primer contacto con la app, configuración del perfil lector y tour de la mecánica." },
                    { num: "02", color: "#025959", label: "Feed + Mapa interactivo",
                      desc: "Exploración de historias geolocalizadas cercanas al usuario en tiempo real." },
                    { num: "03", color: "#025959", label: "Lectura geolocalizada · GPS",
                      desc: "Desbloqueo de capítulos al llegar físicamente a la ubicación anclada." },
                    { num: "04", color: "#FF8300", label: "Creación · Publicación de historias",
                      desc: "Flujo del escritor para crear y anclar su narrativa a lugares físicos reales." },
                  ].map(({ num, color, label, desc }, i) => (
                    <motion.div key={num}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm mt-0.5"
                        style={{ backgroundColor: color, color: readableTextOn(color) }}>{num}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — diagrama */}
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-3 px-1">
                  Diagrama de flujo · MVP Bookie
                </p>
                <FlowDiagram />
              </div>

            </div>
          </FadeSection>

          {/* Decisión de diseño clave */}
          <FadeSection className="mb-10" delay={0.15}>
            <div className="rounded-3xl border-l-4 border-[#FF8300] bg-[#FF8300]/5 dark:bg-[#FF8300]/8 p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-3">
                Decisión de diseño clave — La pantalla de transición
              </p>
              <p className="text-gray-800 dark:text-gray-100 font-semibold leading-relaxed mb-3">
                La pantalla de transición entre capítulos fue el punto más crítico del flujo: el usuario acaba de
                leer, y necesita entender inmediatamente hacia dónde ir físicamente para continuar.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                Decidí separar claramente el "modo lectura" del "modo exploración" con una pantalla de transición
                dedicada que mostrara la próxima ubicación en el mapa, la distancia estimada y un adelanto del
                próximo capítulo —sin mezclar ambas experiencias en una sola vista. Esta decisión responde a la
                heurística de Nielsen de{" "}
                <strong className="text-[#025959] dark:text-[#FF8300]">"visibilidad del estado del sistema"</strong>{" "}
                y al principio de reducción de carga cognitiva.
              </p>
            </div>
          </FadeSection>

          {/* Figma embed — ancho completo */}
          <FadeSection delay={0.2}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-4">
              Prototipo interactivo · Figma
            </p>
            {/* Desktop: iframe centrado, ancho completo de la grid */}
            <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
              style={{ height: "620px" }}>
              <iframe
                src="https://embed.figma.com/proto/hps5pgUhOIUXp7aydqOWMq/Bookie?node-id=145-3121&p=f&viewport=434%2C39%2C0.03&scaling=scale-down&content-scaling=responsive&starting-point-node-id=145%3A3121&page-id=0%3A1&show-proto-sidebar=1&embed-host=share"
                allowFullScreen className="w-full h-full border-0"
                title="Bookie — Prototipo interactivo Figma"
              />
            </div>
            {/* Mobile: botón CTA */}
            <div className="md:hidden flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-8">
              <motion.a
                href="https://www.figma.com/proto/hps5pgUhOIUXp7aydqOWMq/Bookie?node-id=145-3121"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(2,89,89,.3)" }}
                whileTap={{ scale: .97 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#025959] text-white rounded-xl font-medium shadow-lg"
              >
                Ver prototipo en Figma →
              <span className="sr-only"> (se abre en una pestaña nueva)</span></motion.a>
            </div>
            <div className="flex justify-center mb-8">
              <a href="https://github.com/Sofi-Alvarez/Bookie" target="_blank" rel="noopener noreferrer"
                data-ga-action="github_click" data-ga-category="CTA" data-ga-label="Repo Bookie"
                className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-[#025959] dark:text-[#4ecfcf] hover:underline">
                <Github className="w-4 h-4" />
                Ver el repositorio en GitHub
              <span className="sr-only"> (se abre en una pestaña nueva)</span></a>
            </div>

            {/* Funcionalidades + Demo Day — debajo del embed */}
            <div className="grid md:grid-cols-2 gap-8 items-start">

              {/* Funcionalidades */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-4">
                  Funcionalidades finales
                </p>
                <div className="space-y-2.5">
                  {[
                    { icon: "🗺️", label: "Mapa interactivo",       desc: "Visualización de historias geolocalizadas cercanas al usuario en tiempo real." },
                    { icon: "🔓", label: "Desbloqueo por GPS",      desc: "Capítulos que se desbloquean automáticamente al llegar a la ubicación física." },
                    { icon: "📱", label: "Pantalla de transición",  desc: "Separación entre modo lectura y modo exploración con mapa + distancia estimada." },
                    { icon: "📖", label: "Lector inmersivo",        desc: "Interfaz de lectura limpia con tipografía ajustable y modo noche." },
                    { icon: "✍️", label: "Creación de historias",  desc: "Herramienta para anclar narrativas a lugares físicos reales del mundo." },
                    { icon: "🏆", label: "Sistema de logros",       desc: "Progreso del lector, capítulos desbloqueados y exploración acumulada." },
                    { icon: "👤", label: "Perfil público",          desc: "Historial de historias leídas y publicadas con reputación de escritor." },
                  ].map(({ icon, label, desc }, i) => (
                    <motion.div key={label}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.38, delay: i * 0.06 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                      <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Demo Day */}
              <div className="rounded-3xl p-6 text-center bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-widest">
                  Demo Day · No Country
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Finalistas del Hackathon</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  El prototipo fue presentado ante el cliente y el equipo de No Country. Nuestro equipo{" "}
                  <strong className="text-white">H3-14</strong> llegó a instancia de finalistas, validando los flujos
                  diseñados como una propuesta funcional y navegable.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { val: "4",   label: "flujos completos" },
                    { val: "Top2", label: "equipos finalistas" },
                    { val: "5",   label: "semanas de sprint" },
                    { val: "4+",  label: "roles en el equipo" },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-2xl bg-white/10 border border-white/15 py-3 px-2">
                      <p className="text-xl font-black text-white">{val}</p>
                      <p className="text-white/90 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          05. PRUEBA
      ══════════════════════════════════════════ */}
      <section id="prueba" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <FadeSection className="mb-10">
            <SectionLabel text="05 · Prueba" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Iteración basada en heurísticas y sprint reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                El prototipo no fue testeado con usuarios reales —las iteraciones se basaron en las{" "}
                <strong className="text-gray-800 dark:text-gray-100">10 heurísticas de usabilidad de Jakob Nielsen</strong>,
                principios de carga cognitiva y feedback del Product Owner de No Country en las reviews semanales de sprint.
              </p>
              <p>
                Las iteraciones más significativas fueron sobre la pantalla de transición entre capítulos y el flujo de
                creación de historias —los dos puntos donde la lógica de la app era más compleja para el usuario y donde
                la información debía estar más clara.
              </p>
            </div>
          </FadeSection>

          {/* Heurísticas + Criterios */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            <FadeSection delay={0.05}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Heurísticas aplicadas
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Visibilidad del estado del sistema",
                      desc: "La pantalla de transición muestra progreso, siguiente ubicación y distancia estimada." },
                    { label: "Control y libertad del usuario",
                      desc: "El usuario puede volver al mapa desde cualquier punto del flujo de lectura." },
                    { label: "Consistencia y estándares",
                      desc: "UI Kit sistematizado aplicado de forma coherente en los cuatro flujos del MVP." },
                    { label: "Reconocimiento sobre recuerdo",
                      desc: "El mapa siempre visible como referencia espacial; sin necesidad de memorizar ubicaciones." },
                  ].map(({ label, desc }, i) => (
                    <motion.div key={label}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#025959]/5 dark:bg-[#4ecfcf]/8 border border-[#025959]/8 dark:border-[#4ecfcf]/12"
                    >
                      <CheckCircle className="w-4 h-4 text-[#025959] dark:text-[#4ecfcf] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-snug">{label}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={0.1}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-5">
                  Criterios del cliente
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Funcionalidades desarrolladas",
                      desc: "4 flujos completos entregados al equipo dev como prototipo navegable." },
                    { label: "Interpretación del requerimiento",
                      desc: "Mecánica de desbloqueo GPS traducida en flujo navegable desde el primer sprint." },
                    { label: "Usabilidad e innovación",
                      desc: "Pantalla de transición como solución original al flujo más complejo del MVP." },
                    { label: "Creatividad del diseño",
                      desc: "Identidad visual completa —logo, paleta, tipografía— alineada al diferencial del producto." },
                  ].map(({ label, desc }, i) => (
                    <motion.div key={label}
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#FF8300]/5 dark:bg-[#FF8300]/8 border border-[#FF8300]/10"
                    >
                      <CheckCircle className="w-4 h-4 text-[#FF8300] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-snug">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeSection>

          </div>

          {/* Sin testeo callout */}
          <FadeSection className="mb-10" delay={0.15}>
            <div className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-lg">⚠️</div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Sin testeo con usuarios reales</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Este proyecto fue construido íntegramente en prototipo sin acceso a usuarios reales para testear.
                    Las iteraciones se basaron en heurísticas de Nielsen y principios validados de diseño centrado en
                    el usuario. Una siguiente etapa natural del proyecto incluiría pruebas de usabilidad con lectores
                    reales de apps como Wattpad para validar los flujos diseñados.
                  </p>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Tabla heurística */}
          <FadeSection className="mb-10" delay={0.2}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">
              Cuadro de validación heurística
            </h3>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabla de evaluación heurística (desplazable)">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#025959] text-white">
                      <th className="px-5 py-3.5 text-left font-semibold rounded-tl-3xl w-44">Heurística · Criterio</th>
                      <th className="px-5 py-3.5 text-left font-semibold">Aplicación en Bookie</th>
                      <th className="px-5 py-3.5 text-left font-semibold rounded-tr-3xl w-28">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: "Visibilidad del estado del sistema",
                        apply: "Pantalla de transición: progreso de lectura, siguiente ubicación y distancia estimada siempre visibles.",
                        status: "✅ Aplicada", alt: false },
                      { item: "Control y libertad del usuario",
                        apply: "Botón de regreso al mapa disponible desde cualquier punto del flujo de lectura sin perder el progreso.",
                        status: "✅ Aplicada", alt: true },
                      { item: "Consistencia y estándares",
                        apply: "UI Kit con componentes sistematizados aplicados de forma coherente en los cuatro flujos del MVP.",
                        status: "✅ Aplicada", alt: false },
                      { item: "Reconocimiento sobre recuerdo",
                        apply: "El mapa siempre visible como referencia espacial. No se requiere memorizar ubicaciones ni capítulos.",
                        status: "✅ Aplicada", alt: true },
                      { item: "Funcionalidades desarrolladas",
                        apply: "4 flujos completos —registro, feed/mapa, lectura GPS, creación— entregados al equipo dev como prototipo.",
                        status: "✅ Entregado", alt: false },
                      { item: "Interpretación del requerimiento",
                        apply: "La mecánica de desbloqueo GPS fue traducida en un flujo navegable validado desde el primer sprint.",
                        status: "✅ Validado", alt: true },
                      { item: "Usabilidad e innovación",
                        apply: "La pantalla de transición entre capítulos es la solución original más destacada por el Product Owner.",
                        status: "⭐ Destacada", alt: false },
                      { item: "Creatividad del diseño",
                        apply: "Identidad visual completa —logo con síntesis semántica, paleta tokenizada, tipografías— coherente con el diferencial.",
                        status: "✅ Validado", alt: true },
                    ].map(({ item, apply, status, alt }, i) => (
                      <motion.tr key={item}
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.38 }}
                        className={`border-t border-gray-100 dark:border-gray-700 ${
                          alt ? "bg-gray-50/80 dark:bg-gray-700/40" : "bg-white dark:bg-gray-800"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-xs text-gray-800 dark:text-gray-100 leading-snug">{item}</p>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{apply}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold ${status.includes("⭐") ? "text-[#025959] dark:text-[#FF8300]" : "text-emerald-700 dark:text-emerald-400"}`}>
                            {status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeSection>

          {/* Impact banner */}
          <FadeSection delay={0.25}>
            <div className="rounded-3xl bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a] p-8 text-center mb-8">
              <p className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-4">Resultado del proyecto</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                4 flujos diseñados · 5 semanas de sprint · 1 prototipo{" "}
                <span className="text-[#FF8300]">finalista</span>{" "}
                entre todos los equipos del hackathon
              </p>
              <p className="text-white/90 text-sm mt-3">Hackathon Bookie · No Country · Diciembre 2024</p>
            </div>

            {/* Quote */}
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-7">
              <blockquote className="border-l-4 border-[#FF8300] pl-5">
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-4">
                  "Traducir la visión de un cliente en un flujo concreto es tanto trabajo de UX como de narrativa.
                  El usuario tiene que sentir que la historia lo lleva, no que la app lo interrumpe. Construir el
                  UI Kit desde ese flujo —y no al revés— hizo todo más coherente. Aprendimos que cuando un cliente
                  sabe qué quiere pero no cómo estructurarlo, el primer entregable de valor no es la pantalla: es
                  el flujo que la justifica."
                </p>
                <footer className="text-sm font-semibold text-[#025959] dark:text-[#4ecfcf]">
                  — Reflexión del equipo de diseñadores Bookie
                </footer>
              </blockquote>
            </div>
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
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: scrollBehavior() }), 500); }}
              data-ga-action="cta_click"
              data-ga-category="CTA"
              data-ga-label="Contactar - Bookie"
              className="inline-flex items-center px-10 py-4 rounded-2xl bg-[#FF8300] text-gray-900 font-semibold text-lg shadow-2xl transition-all"
            >
              Coordinar reunión
            </motion.button>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECONOCIMIENTO
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center">
            <SectionLabel text="Reconocimiento" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Certificado de Equipo Finalista
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              No Country · Hackathon Bookie · Diciembre 2024
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <img
                src={bookieCertificado}
                alt="Certificado de Equipo Finalista — Hackathon Bookie · No Country"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NAVEGACIÓN
      ══════════════════════════════════════════ */}
      <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeSection>
            <div className="flex items-center justify-start">
              {/* Hipervínculo — sin fondo ni borde */}
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#FF8300] dark:hover:text-[#FF8300] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver al portfolio
              </button>
              {/* Bookie es el último — sin botón derecho */}
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
