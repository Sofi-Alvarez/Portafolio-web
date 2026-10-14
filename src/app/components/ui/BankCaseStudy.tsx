import { ElementType, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, Smartphone, Shield, CreditCard,
  User, Building2, Lock, TrendingUp, Info, Route,
} from "lucide-react";
import { SiFigma } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMenuNav, type CaseStudyIndexSection } from "./CaseStudyMenuNav";
import bankPort from "../../../imports/+bank port.jpg";
import masbank1 from "../../../imports/Masbank1.svg";
import masbank2 from "../../../imports/Masbank2.svg";
import { ToolBadge as SharedToolBadge } from "./ToolGlyph";
import { scrollBehavior } from "../../utils/motion";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ToolItem =
  | { type: "icon";  Icon: ElementType; label: string; brandColor: string }
  | { type: "adobe"; abbr: string;      label: string; brandColor: string };

/* ─── Steps ─────────────────────────────────────────────────────────────── */
interface Step { id:string; num:string; label:string; Icon:ElementType; color:string; }
const STEPS: Step[] = [
  { id:"empatizar",  num:"01", label:"Empatizar",  Icon:Users,       color:"#025959" },
  { id:"definir",    num:"02", label:"Definir",    Icon:Search,      color:"#025959" },
  { id:"idear",      num:"03", label:"Idear",      Icon:Lightbulb,   color:"#FF8300" },
  { id:"prototipar", num:"04", label:"Prototipar", Icon:Layers,      color:"#025959" },
  { id:"prueba",     num:"05", label:"Prueba",     Icon:CheckCircle, color:"#FF8300" },
];

const TOOLS: ToolItem[] = [
  { type: "icon",  Icon: SiFigma, label: "Figma",         brandColor: "#F24E1E" },
  { type: "adobe", abbr: "Ai",    label: "Illustrator",   brandColor: "#FF9A00" },
  { type: "adobe", abbr: "Ps",    label: "Photoshop",     brandColor: "#31A8FF" },
  { type: "icon",  Icon: PenLine, label: "Lápiz y Papel", brandColor: "#B45309" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block:"start" }); }

function FadeSection({ children, className="", delay=0 }: { children:React.ReactNode; className?:string; delay?:number; }) {
  return (
    <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }}
      transition={{ duration:.65, delay, ease:[.22,1,.36,1] }} className={className}>{children}</motion.div>
  );
}

/* HeroCanvas removed — replaced by <CaseStudyHero /> */

/* ─── Tool badge — estático, sin hover ─────────────────────────────────── */
function ToolBadge({ tool }: { tool: ToolItem }) {
  return <SharedToolBadge label={tool.label} />;
}

/* ─── Índice — para el menú hamburguesa compartido (CaseStudyMenuNav) ──── */
const INDEX_SECTIONS: CaseStudyIndexSection[] = [
  { id: "inicio",      label: "Mas+ Bank",    Icon: Info },
  { id: "resumen",     label: "El proyecto",  Icon: Info },
  { id: "metodologia", label: "Metodología",  Icon: Route },
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
      <motion.div
        animate={{ background: hov ? "rgba(255,131,0,0.14)" : "rgba(2,89,89,0.08)", borderColor: hov ? "#FF8300" : "rgba(2,89,89,0.18)" }}
        transition={{ duration: 0.22 }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm">
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

function SectionLabel({text,accent=false}:{text:string;accent?:boolean}){
  return(<span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm ${accent?"bg-[#FF8300]/10 text-gray-900 dark:text-[#FF8300]":"bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf]"}`}>{text}</span>);
}

/* ─── Bank IA Diagram ────────────────────────────────────────────────────── */
function BankIADiagram() {
  const { isDark } = useTheme();
  const bg       = isDark ? "#1f2937" : "#f9fafb";
  const lineClr  = isDark ? "rgba(2,89,89,0.40)" : "rgba(2,89,89,0.25)";
  const l2Bg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const l2Border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const txtL2    = isDark ? "#d1d5db" : "#374151";
  const l1Y = 62, l1W = 90, l1H = 26;
  const l2Y0 = 108, l2W = 82, l2H = 22, l2Gap = 30;
  const rootCX = 270;

  const cols: Array<{ cx: number; label: string; color: string; items: Array<{ t: string; hl?: boolean }> }> = [
    { cx:  54, label: "Acceso",   color: "#025959", items: [{ t: "Login" }, { t: "Biometria" }, { t: "PIN" }] },
    { cx: 162, label: "Cuentas",  color: "#025959", items: [{ t: "Individual" }, { t: "Empresa" }, { t: "Saldo" }] },
    { cx: 270, label: "Transfer", color: "#025959", items: [{ t: "Simple" }, { t: "Programada", hl: true }, { t: "Historial" }] },
    { cx: 378, label: "Seguridad",color: "#025959", items: [{ t: "Alertas" }, { t: "Control" }, { t: "Panel" }] },
    { cx: 486, label: "Perfil",   color: "#4B5563", items: [{ t: "Datos" }, { t: "Config." }, { t: "Soporte" }] },
  ];

  return (
    <svg viewBox="0 0 540 218" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="540" height="218" rx="12" fill={bg} />
      {cols.map((col) => (
        <line key={col.label + "-fan"} x1={rootCX} y1={34} x2={col.cx} y2={l1Y} stroke={lineClr} strokeWidth="1.5" />
      ))}
      <rect x={rootCX - 48} y={14} width={96} height={24} rx={12} fill="#025959" />
      <text x={rootCX} y={30} textAnchor="middle" fontSize="9" fontWeight="700" fill="white">Mas+ Bank</text>
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
      <text x="270" y="210" textAnchor="middle" fontSize="7" fill={isDark ? "#4b5563" : "#9ca3af"} letterSpacing="1.5">
        ARQUITECTURA DE INFORMACION · 5 AREAS · 15 PANTALLAS
      </text>
    </svg>
  );
}

/* ─── Bank Flow Diagram ──────────────────────────────────────────────────── */
function BankFlowDiagram() {
  const { isDark } = useTheme();
  const bg      = isDark ? "#1f2937" : "#f9fafb";
  const nodeBg  = isDark ? "rgba(2,89,89,0.14)" : "rgba(2,89,89,0.08)";
  const border  = isDark ? "rgba(2,89,89,0.45)" : "rgba(2,89,89,0.28)";
  const txt     = isDark ? "#e5e7eb" : "#1f2937";
  const muted   = isDark ? "#6b7280" : "#9ca3af";
  const lineClr = isDark ? "rgba(2,89,89,0.45)" : "rgba(2,89,89,0.30)";
  const purple  = "#025959";
  const orange  = "#FF8300";

  /* node helper */
  const N = (x: number, y: number, w: number, h: number, label: string, sub: string, highlight?: "purple" | "orange") => {
    const fill   = highlight === "purple" ? purple : highlight === "orange" ? orange : nodeBg;
    const stroke = highlight ? "none" : border;
    const tFill  = highlight ? "white" : txt;
    const sFill  = highlight ? "rgba(255,255,255,0.75)" : muted;
    return (
      <g key={label}>
        <rect x={x - w/2} y={y} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth="1" />
        <text x={x} y={y + h/2 - 3} textAnchor="middle" fontSize="8" fontWeight="700" fill={tFill}>{label}</text>
        {sub && <text x={x} y={y + h/2 + 9} textAnchor="middle" fontSize="6.5" fill={sFill}>{sub}</text>}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 280 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="400" rx="12" fill={bg} />

      {/* Inicio */}
      {N(140, 14, 90, 28, "Inicio", "", "purple")}

      {/* F1: Autenticacion */}
      <line x1="140" y1="42" x2="140" y2="56" stroke={lineClr} strokeWidth="1.5" markerEnd="url(#arr)" />
      {N(140, 56, 110, 30, "F1 Autenticacion", "Biometria / PIN", "purple")}

      {/* Dashboard */}
      <line x1="140" y1="86" x2="140" y2="100" stroke={lineClr} strokeWidth="1.5" />
      {N(140, 100, 90, 26, "Dashboard", "Home principal")}

      {/* Branch lines from dashboard */}
      <line x1="62"  y1="113" x2="140" y2="113" stroke={lineClr} strokeWidth="1" />
      <line x1="218" y1="113" x2="140" y2="113" stroke={lineClr} strokeWidth="1" />
      <line x1="62"  y1="113" x2="62"  y2="134" stroke={lineClr} strokeWidth="1" />
      <line x1="218" y1="113" x2="218" y2="134" stroke={lineClr} strokeWidth="1" />
      <line x1="140" y1="126" x2="140" y2="134" stroke={lineClr} strokeWidth="1" />

      {/* F2: Perfiles */}
      {N(62, 134, 94, 30, "F2 Perfiles", "Individual / Empresa")}
      {/* F3: Transferencias */}
      {N(140, 134, 94, 30, "F3 Transfer.", "Simples")}
      {/* F5: Panel */}
      {N(218, 134, 94, 30, "F5 Seguridad", "Panel control")}

      {/* F4: Programadas (below F3) */}
      <line x1="140" y1="164" x2="140" y2="178" stroke={lineClr} strokeWidth="1.5" />
      {N(140, 178, 104, 30, "F4 Programadas", "Envios automaticos", "orange")}

      {/* Loop arrow */}
      <path d="M 218 208 Q 250 230 250 270 Q 250 290 218 290 L 218 286" stroke={lineClr} strokeWidth="1" fill="none" strokeDasharray="4 3" />
      <line x1="218" y1="285" x2="218" y2="290" stroke={lineClr} strokeWidth="1" />

      {/* Legend */}
      <rect x="10" y="308" width="260" height="80" rx="8" fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"} stroke={border} strokeWidth="1" />
      <text x="20" y="323" fontSize="6.5" fontWeight="700" fill={muted} letterSpacing="1.2">FLUJOS CRITICOS</text>
      {[
        ["F1","Acceso seguro y biometrico"],
        ["F2","Gestion de perfiles multiples"],
        ["F3","Transferencias simples"],
        ["F4","Envios programados"],
        ["F5","Panel de seguridad y control"],
      ].map(([num, label], i) => (
        <g key={num}>
          <rect x="18" y={330 + i * 11} width={14} height={8} rx="3"
            fill={num === "F4" ? orange : purple} />
          <text x="24" y={337 + i * 11} textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white">{num}</text>
          <text x="38" y={337 + i * 11} fontSize="7" fill={txt}>{label}</text>
        </g>
      ))}

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill={purple} />
        </marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function BankCaseStudy() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyMenuNav title="Mas+ Bank" sections={INDEX_SECTIONS} primaryColor="#025959" secondaryColor="#FF8300" />
      <main id="main" tabIndex={-1} className="outline-none">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div id="inicio">
        <CaseStudyHero
          badgeLabel="Caso de estudio · Mas+ Bank"
          titlePrefix="Mas+ Bank –"
          titleAccent="App Bancaria Responsive"
          description="Diseño integral de una banca digital multi-dispositivo: seguridad biométrica, perfiles personalizados y una interfaz coherente entre web y mobile."
          tags={["Proyecto Académico", "UX/UI Designer", "2025"]}
          image={bankPort}
          imageAlt="Pantalla de la app Mas+ Bank"
          imageDesktop={masbank1}
          imageMobileSmall={masbank2}
          brandColor="#7C3AED"
          brandColorDark="#a78bfa"
          variant="desktop-phone"
        />
      </div>

      {/* ── DESCRIPCIÓN + FICHA ─────────────────────────────────── */}
      <section id="resumen" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <SectionLabel text="Descripción General" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Proyecto académico donde el punto de partida fue una hoja en blanco: sin brief de cliente, sin documentación de referencia y sin usuarios asignados.
                  El objetivo fue diseñar una{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">app bancaria digital completa y responsive</strong>{" "}
                  que simplificara la gestión financiera cotidiana tanto para usuarios individuales como para empresas.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El desafío: construir desde cero la arquitectura de información, los flujos críticos —transferencias, seguridad biométrica, gestión de perfiles múltiples— y un Design System completo sin referencias previas. El rigor en el proceso fue el brief.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Herramientas utilizadas</p>
                  <div className="flex flex-wrap gap-3">
                    {TOOLS.map((t) => <ToolBadge key={t.label} tool={t} />)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Rol",          value: "UX/UI Designer" },
                    { label: "Sector",       value: "Fintech · Mobile & Desktop" },
                    { label: "Duración",     value: "4 semanas" },
                    { label: "Equipo",       value: "Solo" },
                    { label: "Herramientas", value: "Figma · Ai · Ps" },
                    { label: "Resultado",    value: "5 flujos · 2 plataformas · Design System" },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label} initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                      transition={{ duration:.55, delay: idx * .08 }}
                      whileHover={{ y:-3, boxShadow:"0 8px 24px rgba(2,89,89,.12)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow">
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-1.5">{label}</p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm font-semibold">{value}</p>
                    </motion.div>
                  ))}
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
              "Diseñamos un{" "}<span className="text-[#FF8300]">sistema bancario completo desde cero</span>{" "}en 4 semanas:
              arquitectura de información, 20+ flujos críticos y un Design System reutilizable."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación", desc: "Proyecto académico sin brief ni referencias" },
                { label: "Tarea",     desc: "App bancaria completa y responsive" },
                { label: "Acción",    desc: "Benchmark → Identidad → Flujos → Prototipo" },
                { label: "Resultado", desc: "5 flujos · 100% desde cero" },
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Investigación y contexto</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El proyecto arrancó sin cliente ni brief. La investigación comenzó con un análisis de hábitos de uso financiero en Argentina para identificar qué fallaba en la banca digital local. A partir del benchmarking de apps locales e internacionales se definieron los perfiles de usuario, los flujos críticos y las necesidades que el producto debía resolver.
            </p>
          </FadeSection>

          {/* User Stories */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">User Stories</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { role: "Usuario individual", story: "Quiero transferir dinero en pocos pasos para evitar errores y fricciones innecesarias." },
                { role: "Empresa",            story: "Necesito gestionar múltiples cuentas desde un mismo panel sin cambiar de aplicación." },
                { role: "Usuario recurrente", story: "Quiero programar envíos automáticos para no olvidar pagos fijos mensuales." },
              ].map(({ role, story }) => (
                <motion.div key={role} whileHover={{ y: -3 }}
                  className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-2">Como {role}…</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">"{story}"</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Features */}
          <FadeSection delay={.08}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Funcionalidades clave identificadas</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Lock,       label: "Autenticación biométrica" },
                { Icon: Users,      label: "Perfiles múltiples" },
                { Icon: CreditCard, label: "Transferencias simples" },
                { Icon: Smartphone, label: "Envíos programados" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
                  <Icon className="w-4 h-4 text-[#025959] dark:text-[#4ecfcf]" />
                  {label}
                </div>
              ))}
            </div>
          </FadeSection>

          {/* User Types */}
          <FadeSection delay={.1}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Tipos de usuario</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: User,      label: "Individual",  color: "#025959", desc: "Usuario de banca personal. Prioriza velocidad, seguridad y claridad en sus operaciones cotidianas." },
                { Icon: Building2, label: "Empresa",     color: "#FF8300", desc: "Gestiona múltiples cuentas y requiere visibilidad centralizada de movimientos y perfiles." },
                { Icon: Shield,    label: "Administrador",color:"#025959", desc: "Supervisa el sistema, controla accesos y revisa el historial completo de operaciones." },
              ].map(({ Icon, label, color, desc }, idx) => (
                <motion.div key={label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ duration:.5, delay: idx * .08 }} whileHover={{ y:-4, boxShadow:`0 12px 32px ${color}20` }}
                  className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{label}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Benchmark */}
          <FadeSection delay={.1}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Benchmark competitivo</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left" style={{ background: "#025959" }}>
                    <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wider">App</th>
                    <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wider">Tipo</th>
                    <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wider">Destacado</th>
                    <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wider">Oportunidad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { app: "Brubank",  tipo: "Local",         dest: "Onboarding fluido, seguridad con feedback visual",            op: "Mejorar visualización de historial" },
                    { app: "Wilobank", tipo: "Local",         dest: "Cuentas simplificadas, transferencias más cargadas",          op: "Simplificar transferencias programadas" },
                    { app: "Revolut",  tipo: "Internacional", dest: "Claridad visual, multi-dispositivo, referente design system", op: "Adaptación al contexto local" },
                    { app: "N26",      tipo: "Internacional", dest: "Mínima carga cognitiva, flujos cortos eficientes",            op: "Soporte para perfiles múltiples" },
                  ].map(({ app, tipo, dest, op }, i) => (
                    <tr key={app} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">{app}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${tipo === "Local"
                          ? "bg-[#025959]/10 text-[#025959] dark:bg-[#4ecfcf]/10 dark:text-[#4ecfcf]"
                          : "bg-[#FF8300]/10 text-gray-900 dark:text-[#FF8300]"}`}>{tipo}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{dest}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{op}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeSection>

          {/* Hallazgo central */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl p-6 text-center"
              style={{ background: "linear-gradient(135deg,rgba(2,89,89,0.08),rgba(255,131,0,0.06))", border: "1px solid rgba(2,89,89,0.20)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#025959] dark:text-[#4ecfcf]">Hallazgo central</p>
              <p className="text-gray-700 dark:text-gray-200 text-lg font-semibold leading-relaxed max-w-2xl mx-auto">
                "Las apps bancarias locales priorizan funcionalidad sobre claridad: el usuario abandona antes de completar una transferencia."
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Arquitectura y alcance</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Con el research consolidado, se definió la arquitectura de información de la app y se mapearon los flujos críticos. El foco estuvo en reducir la carga cognitiva en operaciones de alta responsabilidad —especialmente transferencias y gestión de accesos—, garantizando que cada usuario encontrara lo que necesita sin memorizar la estructura.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              La IA organiza la app en 5 áreas principales, con rutas claras y sin callejones sin salida. Cada área responde a una necesidad identificada en la investigación.
            </p>
          </FadeSection>

          {/* 3 Key Areas */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">3 áreas de enfoque</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Gestión de perfiles múltiples",       desc: "Individual y Empresa con acceso segmentado desde el mismo dispositivo." },
                { num: "02", title: "Transferencias simples y programadas", desc: "Flujos cortos, confirmación progresiva y sin fricción innecesaria." },
                { num: "03", title: "Seguridad percibida sin frialdad",     desc: "Biometría y feedback visual que genera confianza sin intimidar al usuario." },
              ].map(({ num, title, desc }, idx) => (
                <motion.div key={num} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ duration:.5, delay: idx * .08 }} whileHover={{ y:-4 }}
                  className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <span aria-hidden="true" className="text-3xl font-black mb-3 block" style={{ color: "rgba(2,89,89,0.18)" }}>{num}</span>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm">{title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Por qué importa callout */}
          <FadeSection delay={.08}>
            <div className="border-l-4 rounded-r-xl p-5 bg-white dark:bg-gray-900"
              style={{ borderColor: "#025959", background: isDark ? "rgba(2,89,89,0.08)" : "rgba(2,89,89,0.05)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#025959] dark:text-[#4ecfcf]">Por qué esto importa</p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                En fintech, la confianza no se declara: se diseña. Cada decisión de arquitectura es una decisión de seguridad percibida.
              </p>
            </div>
          </FadeSection>

          {/* IA Diagram */}
          <FadeSection delay={.1}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Arquitectura de información</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <BankIADiagram />
            </div>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Identidad de marca</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El naming nació del insight central: las apps bancarias locales hacen sentir al usuario que hay que hacer mucho para lograr poco.{" "}
              <strong className="text-gray-800 dark:text-gray-100">Mas+ Bank</strong> invierte esa ecuación —con MAS, hacés más con menos pasos. El símbolo "+" refuerza la idea de suma, crecimiento y perfiles múltiples en un mismo lugar.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              La identidad visual se construyó sobre un sistema de color monocromático en violeta que transmite autoridad y modernidad sin la frialdad del azul corporativo tradicional. La tipografía combina Poppins para display (assertivo, geométrico) con Inter para body (legible, neutro).
            </p>
          </FadeSection>

          {/* Brand identity */}
          <FadeSection delay={.06}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Naming + tagline */}
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-4">Nombre y concepto</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-[#7C3AED] dark:text-[#A78BFA]">Mas+</span>
                    <span className="text-2xl font-light text-gray-500 dark:text-gray-300">Bank</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-6">"Con MAS, hacés más"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-3">Tipografía</p>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-3xl font-bold text-[#7C3AED] dark:text-[#A78BFA]" style={{ fontFamily: "Poppins, sans-serif" }}>Poppins</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mt-0.5">Display · Titulares</p>
                    </div>
                    <div>
                      <p className="text-xl font-normal text-gray-600 dark:text-gray-300">Inter</p>
                      <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-300 mt-0.5">Body · Interfaz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color palette */}
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 mb-5">Paleta de color</p>
                <div className="space-y-3">
                  {[
                    { color: "#7C3AED", name: "Violeta principal", hex: "#7C3AED" },
                    { color: "#9F5DE2", name: "Violeta medio",     hex: "#9F5DE2" },
                    { color: "#DDD6FE", name: "Violeta claro",     hex: "#DDD6FE" },
                    { color: "#1F2937", name: "Neutro oscuro",     hex: "#1F2937" },
                  ].map(({ color, name, hex }) => (
                    <div key={hex} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex-shrink-0 shadow-sm border border-white/20"
                        style={{ background: color }} />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-300">{hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Design decision callout */}
          <FadeSection delay={.08}>
            <div className="border-l-4 border-[#FF8300] rounded-r-xl p-5 bg-[#FF8300]/5 dark:bg-[#FF8300]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-1">Decisión de diseño</p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                Usar violeta como color primario —en lugar del azul bancario convencional— diferencia la marca y conecta con un perfil de usuario más joven y digital, sin perder credibilidad ni seriedad.
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Alta fidelidad</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              El prototipo de alta fidelidad cubre los 5 flujos críticos definidos en la etapa anterior. Cada flujo fue diseñado con el principio de{" "}
              <strong className="text-gray-800 dark:text-gray-100">confirmación progresiva</strong>: el usuario siempre sabe qué pasó, qué está pasando y qué sigue. Sin sorpresas.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              Se construyó un Design System modular en Figma con componentes reutilizables para asegurar consistencia visual en los dos layouts principales —mobile y desktop— con el mismo lenguaje visual.
            </p>
          </FadeSection>

          {/* 5 Flows + Flow Diagram */}
          <FadeSection delay={.05}>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest mb-4 text-[#025959] dark:text-[#4ecfcf]">5 flujos críticos</p>
                <ol className="space-y-3">
                  {[
                    "Acceso seguro y biométrico",
                    "Gestión de perfiles múltiples",
                    "Transferencias simples",
                    "Envíos programados",
                    "Panel de seguridad y control",
                  ].map((flow, i) => (
                    <li key={flow} className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 3 ? "bg-[#FF8300] text-gray-900" : "bg-[#025959] text-white"}`}>
                        {i + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-200 text-sm">{flow}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                <BankFlowDiagram />
              </div>
            </div>
          </FadeSection>

          {/* Design decisions */}
          <FadeSection delay={.07}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Decisiones de diseño</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Biometría como puerta principal",   desc: "Elimina el formulario tradicional y posiciona la seguridad como feature, no como obstáculo." },
                { title: "Perfiles con tabs claros",          desc: "El cambio entre Individual y Empresa ocurre en un tap, con contexto visual diferenciado." },
                { title: "Confirmación en 2 pasos",           desc: "Transferencias con doble confirmación reduce errores sin aumentar la fricción percibida." },
                { title: "Estados de carga visibles",         desc: "Cada acción tiene un estado intermedio que confirma al usuario que el sistema está trabajando." },
              ].map(({ title, desc }) => (
                <motion.div key={title} whileHover={{ y: -3 }}
                  className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">{title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* 3 Metrics */}
          <FadeSection delay={.08}>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { val: "5",    unit: "flujos críticos", sub: "cubiertos en el prototipo" },
                { val: "2",    unit: "plataformas",     sub: "Mobile y Desktop" },
                { val: "20+",  unit: "pantallas",       sub: "diseñadas en Figma" },
              ].map(({ val, unit, sub }) => (
                <motion.div key={unit} whileHover={{ scale: 1.04 }}
                  className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                  <p className="text-4xl font-black mb-1 text-[#025959] dark:text-[#4ecfcf]">{val}</p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm">{unit}</p>
                  <p className="text-gray-500 dark:text-gray-300 text-xs mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Figma embed — ancho completo */}
          <FadeSection delay={.1}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-4">
              Prototipo interactivo · Figma
            </p>
            {/* Desktop: iframe centrado, ancho completo de la grid */}
            <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-900 mb-8"
              style={{ height: "620px" }}>
              <iframe loading="lazy"
                src="https://embed.figma.com/proto/yW44WZR6kdyE271Cpys0Dp/MVP-Mas-Bank?node-id=1-12371&p=f&viewport=231%2C349%2C0.02&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A12371&show-proto-sidebar=1&page-id=0%3A1&embed-host=share"
                className="w-full h-full border-0"
                allowFullScreen
                title="Prototipo Mas+ Bank en Figma"
              />
            </div>
            {/* Mobile: botón CTA */}
            <div className="md:hidden flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-8">
              <motion.a
                href="https://www.figma.com/proto/yW44WZR6kdyE271Cpys0Dp/MVP-Mas-Bank?node-id=1-12371"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(2,89,89,.3)" }}
                whileTap={{ scale: .97 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#025959] text-white rounded-xl font-medium shadow-lg"
              >
                Ver prototipo en Figma →
              <span className="sr-only"> (se abre en una pestaña nueva)</span></motion.a>
            </div>

            {/* Funcionalidades — debajo del embed */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Funcionalidades del prototipo</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Autenticación biométrica (Face ID / huella)",
                "Perfil Individual y Empresa en un mismo dispositivo",
                "Transferencias inmediatas con confirmación progresiva",
                "Envíos programados y recurrentes",
                "Panel de seguridad con control total de accesos",
                "Historial de operaciones filtrable",
                "Dark mode nativo",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(2,89,89,0.12)" }}>
                    <TrendingUp className="w-3 h-3 text-[#025959] dark:text-[#4ecfcf]" />
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{feat}</span>
                </li>
              ))}
            </ul>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Validación heurística</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Sin acceso a usuarios reales, la validación se realizó mediante evaluación heurística de Nielsen. Los 4 principios seleccionados son los de mayor impacto en entornos financieros, donde la confianza y la prevención de errores son críticos para la adopción del producto.
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-3">
              El prototipo superó los 4 criterios sin errores críticos. Las oportunidades de mejora identificadas quedaron documentadas como próximas iteraciones del proyecto.
            </p>
          </FadeSection>

          {/* 4 Heuristics */}
          <FadeSection delay={.05}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Heurísticas aplicadas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { num: "01", title: "Visibilidad del estado del sistema", desc: "Loaders, confirmaciones y estados vacíos presentes en cada flujo." },
                { num: "02", title: "Consistencia y estándares",          desc: "Design System aplicado uniformemente en todas las pantallas." },
                { num: "03", title: "Prevención de errores",              desc: "Confirmación doble en transferencias y en acciones irreversibles." },
                { num: "04", title: "Reconocimiento antes que recuerdo",  desc: "Labels visibles en todo momento; el usuario no depende de su memoria." },
              ].map(({ num, title, desc }, idx) => (
                <motion.div key={num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ duration:.5, delay: idx * .07 }} whileHover={{ y:-3 }}
                  className="rounded-2xl border p-5 bg-white dark:bg-gray-800"
                  style={{ borderColor: "rgba(2,89,89,0.20)", background: isDark ? "rgba(2,89,89,0.06)" : "rgba(2,89,89,0.04)" }}>
                  <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-[#025959] dark:text-[#4ecfcf]">H{num}</span>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-sm">{title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>

          {/* Projected Metrics */}
          <FadeSection delay={.07}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Métricas proyectadas</h3>
            <div className="grid grid-cols-3 gap-5 text-center">
              {[
                { val: "4/4",  label: "heurísticas cumplidas" },
                { val: "0",    label: "errores críticos en validación" },
                { val: "≤3",   label: "pasos promedio por flujo" },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5">
                  <p className="text-3xl font-black mb-1 text-[#025959] dark:text-[#4ecfcf]">{val}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* Aprendizaje callout */}
          <FadeSection delay={.08}>
            <div className="border-l-4 rounded-r-xl p-5"
              style={{ borderColor: "#025959", background: isDark ? "rgba(2,89,89,0.08)" : "rgba(2,89,89,0.05)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#025959] dark:text-[#4ecfcf]">Aprendizaje</p>
              <p className="text-gray-700 dark:text-gray-200">
                La mayor restricción fue no contar con usuarios reales para testear. La validación heurística reveló que la{" "}
                <strong>consistencia visual</strong> es el factor clave de confianza percibida en productos fintech.
              </p>
            </div>
          </FadeSection>

          {/* Próximos pasos callout */}
          <FadeSection delay={.08}>
            <div className="border-l-4 border-[#FF8300] rounded-r-xl p-5 bg-[#FF8300]/5 dark:bg-[#FF8300]/8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#025959] dark:text-[#FF8300] mb-1">Próximos pasos</p>
              <p className="text-gray-700 dark:text-gray-200">
                Testeo con usuarios reales · Integración de notificaciones push · Flujo de inversiones y tarjetas
              </p>
            </div>
          </FadeSection>

          {/* Validation Table */}
          <FadeSection delay={.1}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Tabla de validación</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Heurística</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Flujo clave</th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: "H01", h: "Visibilidad del estado del sistema", f: "Transferencias",         s: "Cumple" },
                    { n: "H02", h: "Consistencia y estándares",          f: "Todos los flujos",       s: "Cumple" },
                    { n: "H03", h: "Prevención de errores",              f: "Transferencias programadas", s: "Cumple" },
                    { n: "H04", h: "Reconocimiento antes que recuerdo",  f: "Acceso biométrico",      s: "Cumple" },
                  ].map(({ n, h, f, s }, i) => (
                    <tr key={n} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/60"}>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#025959] dark:text-[#4ecfcf]">{n}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{h}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{f}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">✓ {s}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeSection>

          {/* Impact Banner */}
          <FadeSection delay={.12}>
            <div className="rounded-2xl p-8 text-center text-white"
              style={{ background: "linear-gradient(135deg,#012e2e,#025959)" }}>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed">
                5 flujos críticos · 2 plataformas · 100% desde cero
              </p>
              <p className="text-white/90 mt-3 max-w-xl mx-auto">
                Mas+ Bank demostró que el rigor en el proceso es el brief cuando el cliente no existe.
              </p>
            </div>
          </FadeSection>

          {/* Quote */}
          <FadeSection delay={.13}>
            <blockquote className="border-l-4 border-[#FF8300] pl-6 py-2">
              <p className="text-lg italic text-gray-700 dark:text-gray-200 leading-relaxed">
                "Se diseñó un sistema fintech completo que transforma procesos financieros complejos en experiencias claras, consistentes y centradas en el usuario."
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
              data-ga-label="Contactar - MasBank"
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
                onClick={() => navigate("/case-study/bookie")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#025959] text-[#025959] dark:border-[#4ecfcf] dark:text-[#4ecfcf] font-medium text-sm transition-colors"
              >
                Ver Bookie
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
