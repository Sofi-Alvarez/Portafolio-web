import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight,
  Users, Search, Lightbulb, Layers, CheckCircle,
  TrendingUp, Award, PenLine, Info, Route,
} from "lucide-react";
import { SiFigma, SiNotion, SiJira } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMenuNav, type CaseStudyIndexSection } from "./CaseStudyMenuNav";
import iupiPort from "../../../imports/iupi port.jpg";
import iupiExploracion from "../../../imports/iupi-exploracion.svg";
import iupiErrores from "../../../imports/iupi-errores.svg";
import iupiOnboarding from "../../../imports/iupi-onboarding.svg";
import iupiDashboard from "../../../imports/iupi-dashboard.svg";
import iupi1 from "../../../imports/IUPI1.svg";
import iupi2 from "../../../imports/IUPI2.svg";
import iupiCapital from "../../../imports/iupi-capital.svg";
import iupiMercado from "../../../imports/iupi-mercado.svg";
import iupiCripto from "../../../imports/iupi-cripto.svg";
import iupiComunidad from "../../../imports/iupi-comunidad.svg";
import iupiCertificado from "../../../imports/iupi-certificado.png";

/* ─── Pasos del proceso ─────────────────────────────────────────────────── */
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

/* ─── Datos del proyecto ────────────────────────────────────────────────── */
const FUNCS = [
  { Icon: TrendingUp,   text: "Dashboard unificado de inversiones y cripto" },
  { Icon: CheckCircle,  text: "Onboarding adaptativo con perfil de riesgo" },
  { Icon: Layers,       text: "Simulador de ahorro e inversión interactivo" },
  { Icon: Users,        text: "Educación financiera integrada en el flujo" },
  { Icon: Award,        text: "Sistema de metas y seguimiento de progreso" },
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
];

/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Fade-up on scroll ─────────────────────────────────────────────────── */
function FadeSection({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
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
  const { isDark } = useTheme();
  const bc       = tool.brandColor;
  const tileBg   = isDark ? "rgba(55,65,81,0.9)" : "#ffffff";
  const labelCol = isDark ? "#d1d5db" : "#4b5563";
  return (
    <div className="flex flex-col items-center gap-2 cursor-default select-none">
      <div
        className="w-14 h-14 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center"
        style={{ background: tileBg }}
      >
        {tool.type === "adobe" ? (
          <span className="font-bold text-sm leading-none" style={{ color: bc }}>{tool.abbr}</span>
        ) : (
          <tool.Icon className="w-7 h-7" style={{ color: bc }} />
        )}
      </div>
      <span className="text-xs font-medium text-center" style={{ color: labelCol }}>{tool.label}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ÍNDICE — para el menú hamburguesa compartido (CaseStudyMenuNav)
════════════════════════════════════════════════════════════ */
const INDEX_SECTIONS: CaseStudyIndexSection[] = [
  { id: "inicio",      label: "IUPI",         Icon: Info },
  { id: "resumen",     label: "El proyecto",  Icon: Info },
  { id: "metodologia", label: "Metodología",  Icon: Route },
  ...STEPS.map((s) => ({ id: s.id, label: s.label, Icon: s.Icon })),
  { id: "impacto",     label: "Impacto",      Icon: TrendingUp },
];

/* ════════════════════════════════════════════════════════════
   DIAGRAMA HORIZONTAL (stepper)
════════════════════════════════════════════════════════════ */
function StepNode({ step, index }: { step: Step; index: number }) {
  const [hov, setHov] = useState(false);
  const { isDark } = useTheme();
  const bgRest   = isDark ? "rgba(78,207,207,0.10)" : "rgba(2,89,89,0.08)";
  const bdRest   = isDark ? "rgba(78,207,207,0.30)" : "rgba(2,89,89,0.18)";
  const icRest   = isDark ? "#4ecfcf"               : "#025959";
  const txtRest  = isDark ? "#4ecfcf"               : "#025959";
  return (
    <motion.button
      onClick={() => scrollTo(step.id)}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center gap-3 flex-shrink-0 w-[72px] sm:w-24 group"
    >
      <motion.div
        animate={{
          background:  hov ? "rgba(255,131,0,0.16)" : bgRest,
          borderColor: hov ? "#FF8300"              : bdRest,
        }}
        transition={{ duration: 0.22 }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm"
      >
        <step.Icon
          className="w-6 h-6 transition-colors duration-200"
          style={{ color: hov ? "#FF8300" : icRest }}
        />
      </motion.div>
      <span
        className="text-xs sm:text-sm font-medium text-center leading-tight transition-colors duration-200"
        style={{ color: hov ? "#FF8300" : txtRest }}
      >
        {step.label}
      </span>
    </motion.button>
  );
}

/* Línea conectora entre pasos */
function StepConnector({ index }: { index: number }) {
  const isOrange = index % 2 === 0;
  const { isDark } = useTheme();
  const grayLine = isDark ? "rgba(75,85,99,0.8)" : "rgba(209,213,219,0.9)";
  return (
    <div className="flex-1 flex items-start pt-7 min-w-[24px]">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.15, ease: "easeOut" }}
        className="w-full origin-left"
        style={{
          height: 2,
          borderRadius: 1,
          background: isOrange
            ? "linear-gradient(90deg,rgba(255,131,0,.65),rgba(255,131,0,.25))"
            : grayLine,
        }}
      />
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

/* ─── Section label pill ────────────────────────────────────────────────── */
function SectionLabel({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm font-medium ${
      accent
        ? "bg-[#FF8300]/12 dark:bg-[#FF8300]/20 text-[#FF8300]"
        : "bg-[#025959]/10 dark:bg-[#4ecfcf]/15 text-[#025959] dark:text-[#4ecfcf]"
    }`}>
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   WIREFRAME CAROUSEL — todos los breakpoints
═══════════════════════════════════════════════════════════ */
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
    "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#025959]";
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
    >
      {/* Previous arrow */}
      <button
        onClick={prev}
        aria-label="Wireframe anterior"
        className={`${arrowBase} left-1 ${activeIdx === 0 ? arrowDisabled : arrowEnabled}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Wireframe siguiente"
        className={`${arrowBase} right-1 ${activeIdx === items.length - 1 ? arrowDisabled : arrowEnabled}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
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
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#025959] ${
                activeIdx === i
                  ? "w-6 h-2 bg-[#025959] dark:bg-[#4ecfcf]"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
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

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function IUPICaseStudy() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CaseStudyMenuNav title="IUPI" sections={INDEX_SECTIONS} primaryColor="#025959" secondaryColor="#FF8300" />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <div id="inicio">
        <CaseStudyHero
          badgeLabel="Caso de Estudio · IUPI"
          titlePrefix="IUPI –"
          titleAccent="Ahorro e Inversiones"
          description="Una experiencia fintech pensada para incluir financieramente a la población argentina: simple, segura y amigable, incluso en un contexto económico complejo."
          tags={["UX/UI Designer", "Fintech", "2024"]}
          image={iupiPort}
          imageAlt="Pantalla de la app IUPI"
          imageMobile1={iupi1}
          imageMobile2={iupi2}
          brandColor="#004AAC"
          brandColorDark="#60a5fa"
          variant="phones"
        />
      </div>

      {/* ══════════════════════════════════════════
          2. DESCRIPCIÓN GENERAL + FICHA
      ══════════════════════════════════════════ */}
      <section id="resumen" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: descripción + herramientas */}
              <div className="space-y-6">
                <SectionLabel text="Descripción del Proyecto" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">No Country</strong> es un programa
                  de simulación laboral que replica equipos de producto reales. En esta edición, el desafío
                  fue desarrollar un MVP completo para IUPI: una billetera digital para el mercado argentino
                  que permitiera a usuarios de distintos niveles de experiencia financiera ahorrar e invertir
                  en un entorno económico complejo.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El equipo era multidisciplinario — front-end, back-end, QA, PM y diseño — trabajando con
                  metodología <strong className="text-[#025959] dark:text-[#4ecfcf]">Agile/Scrum</strong>{" "}
                  durante 5 semanas, con Demo Day final ante el cliente.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mi rol cubrió desde la investigación de competencia hasta el handoff del prototipo
                  navegable en Figma: la capa completa de diseño UX/UI del producto.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                    Herramientas utilizadas
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {TOOLS.map((t) => (
                      <ToolBadge key={t.label} {...t} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: ficha del proyecto */}
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Rol",         value: "UX/UI Designer" },
                    { label: "Sector",      value: "Fintech · Ahorro e inversiones · Web app" },
                    { label: "Duración",    value: "5 semanas" },
                    { label: "Equipo",      value: "Multidisciplinario — 10 equipos en competencia" },
                    { label: "Validación",  value: "Heurísticas + principios de diseño validados por referentes oficiales" },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label}
                      initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ duration:.55, delay:idx*.08 }}
                      whileHover={{ y:-3, boxShadow:"0 8px 24px rgba(2,89,89,.12)" }}
                      className={`bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow ${label === "Validación" ? "col-span-2" : ""}`}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm font-semibold leading-snug">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. LOGRO STAR
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
              ★ Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-8">
              "En solo 5 semanas transformamos una idea en un{" "}
              <span className="text-[#FF8300]">MVP fintech completo</span>, para que quienes pagan y
              ahorran con su billetera puedan invertir en mercado de capitales y cripto desde la misma app."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación",  desc: "Hackathon No Country" },
                { label: "Tarea",      desc: "MVP fintech de cero"  },
                { label: "Acción",     desc: "4+ flujos críticos diseñados" },
                { label: "Resultado",  desc: "2 ecosistemas integrados" },
              ].map(({ label, desc }) => (
                <div key={label}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left"
                >
                  <span className="text-[#FF8300] text-xs font-bold uppercase tracking-widest">{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug font-semibold">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. DIAGRAMA DE PROCESO
      ══════════════════════════════════════════ */}
      <section id="metodologia" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Metodología" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mi proceso de diseño</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">
              5 etapas iterativas para construir una solución centrada en el usuario.
              Clic en cada nodo para ir a esa sección.
            </p>
          </FadeSection>

          <FadeSection delay={.1}><ProcessStepper /></FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. EMPATIZAR
      ══════════════════════════════════════════ */}
      <section id="empatizar" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Narrativa */}
          <FadeSection className="mb-14">
            <SectionLabel text="01 · Empatizar" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Entendiendo el contexto y el usuario
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 italic">
              Análisis competitivo · Definición del usuario objetivo · Detección del diferencial
            </p>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
              <div className="space-y-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  El brief del cliente era ambicioso: incluir financieramente a la población argentina en un
                  contexto económico complejo, permitiendo a personas con distintos niveles de experiencia
                  <strong className="text-[#025959] dark:text-[#4ecfcf]"> ahorrar e invertir desde una sola plataforma</strong>.
                </p>
                <p>
                  Analicé la competencia directa —{" "}
                  <strong className="text-[#FF8300]">IOL Invertir</strong> y{" "}
                  <strong className="text-[#FF8300]">Cocos Capital</strong> — y la indirecta:{" "}
                  Uala, Naranja X, Mercado Pago. El hallazgo fue que plataformas como Cocos ya combinaban
                  ambos mercados, pero con un enfoque orientado al mundo inversor.
                </p>
                <p>
                  Las billeteras virtuales de uso cotidiano — las que la gente usa para pagar, cobrar y
                  llevar registro — no ofrecían esa integración. El diferencial real de{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">IUPI</strong> era trasladar esa
                  capacidad al perfil de usuario de billetera: alguien que no se define como inversor, pero
                  que podría serlo si la experiencia fuera accesible.
                </p>
                <p>
                  El usuario objetivo tenía entre <strong>18 y 50 años</strong>, ingresos regulares, y
                  quería superar las opciones tradicionales — plazo fijo, dólar — sin tener conocimiento
                  financiero avanzado.
                </p>
              </div>

              {/* Benchmark */}
              <FadeSection delay={0.15}>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-widest text-xs">
                  Benchmark competitivo
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#025959] text-white">
                        <th className="px-4 py-3 text-left font-semibold rounded-tl-2xl">Plataforma</th>
                        <th className="px-4 py-3 text-center font-semibold">Tipo</th>
                        <th className="px-4 py-3 text-center font-semibold">Capitales</th>
                        <th className="px-4 py-3 text-center font-semibold rounded-tr-2xl">Cripto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "IOL Invertir",  tipo: "Directa",   cap: true,  cry: false, highlight: false },
                        { name: "Cocos Capital", tipo: "Directa",   cap: true,  cry: true,  highlight: false },
                        { name: "Mercado Pago",  tipo: "Indirecta", cap: false, cry: true,  highlight: false },
                        { name: "Uala",          tipo: "Indirecta", cap: false, cry: false, highlight: false },
                        { name: "Naranja X",     tipo: "Indirecta", cap: false, cry: false, highlight: false },
                        { name: "IUPI ★",        tipo: "Propuesta", cap: true,  cry: true,  highlight: true  },
                      ].map((row, i) => (
                        <motion.tr key={row.name}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07, duration: 0.4 }}
                          className={`border-t border-gray-100 dark:border-gray-700 ${
                            row.highlight
                              ? "bg-[#FF8300]/10 dark:bg-[#FF8300]/15 font-semibold"
                              : i % 2 === 0
                                ? "bg-white dark:bg-gray-800"
                                : "bg-gray-50 dark:bg-gray-700/50"
                          }`}
                        >
                          <td className={`px-4 py-3 font-medium ${row.highlight ? "text-[#FF8300]" : "text-gray-700 dark:text-gray-100"}`}>
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              row.tipo === "Directa"
                                ? "bg-[#025959]/10 text-[#025959] dark:bg-[#4ecfcf]/15 dark:text-[#4ecfcf]"
                                : row.tipo === "Propuesta"
                                ? "bg-[#FF8300]/15 text-[#FF8300] dark:bg-[#FF8300]/20 dark:text-[#FF8300]"
                                : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                            }`}>
                              {row.tipo}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-lg">
                            {row.cap
                              ? <span className="text-[#025959] dark:text-[#4ecfcf] font-bold">✓</span>
                              : <span className="text-gray-300 dark:text-gray-600">–</span>}
                          </td>
                          <td className="px-4 py-3 text-center text-lg">
                            {row.cry
                              ? <span className="text-[#025959] dark:text-[#4ecfcf] font-bold">✓</span>
                              : <span className="text-gray-300 dark:text-gray-600">–</span>}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic">
                  Ninguna billetera de uso cotidiano integraba ambos ecosistemas — ese era el espacio de IUPI.
                </p>
              </FadeSection>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. DEFINIR
      ══════════════════════════════════════════ */}
      <section id="definir" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Texto */}
          <FadeSection className="mb-14">
            <SectionLabel text="02 · Definir" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Dos ecosistemas, una sola app — sin confundir al usuario
            </h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14 mt-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                El principal desafío arquitectónico fue integrar dos mundos con lógicas radicalmente
                distintas. El{" "}
                <strong className="text-[#025959] dark:text-[#4ecfcf]">mercado de capitales</strong> y el{" "}
                <strong className="text-[#FF8300]">mercado cripto</strong> tienen horarios de operación
                diferentes, instrumentos distintos y perfiles de riesgo propios.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Mapeé los flujos críticos del MVP: registro, onboarding tipo wizard con perfil de riesgo,
                dashboard personalizado con objetivos, gestión de inversiones y comunidad/noticias
                financieras. Cada pantalla debía responder a cómo piensa y actúa un usuario sin
                experiencia financiera avanzada.
              </p>
            </div>
          </FadeSection>

          {/* Diagrama IA */}
          <FadeSection delay={0.1}>
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8 text-center">
              Arquitectura de la información · MVP IUPI
            </p>

            {/* Raíz */}
            <div className="flex justify-center mb-0">
              <motion.div
                initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="bg-[#025959] text-white px-8 py-3 rounded-2xl shadow-lg font-bold text-lg tracking-wide"
              >
                App IUPI
              </motion.div>
            </div>

            {/* Línea vertical desde raíz */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#025959]/40 dark:bg-[#4ecfcf]/30" />
            </div>

            {/* Línea horizontal */}
            <div className="relative flex justify-center mb-0">
              <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-[#025959]/25 dark:bg-[#4ecfcf]/20" />
            </div>

            {/* Nodos principales */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-8">
              {[
                {
                  num: "01", label: "Registro", icon: Users, accent: false,
                  children: ["Email / Teléfono", "Verificación OTP", "KYC básico"],
                },
                {
                  num: "02", label: "Onboarding", icon: Layers, accent: false,
                  children: ["Wizard paso a paso", "Perfil de riesgo", "Tutorial interactivo"],
                },
                {
                  num: "03", label: "Dashboard", icon: TrendingUp, accent: false,
                  children: ["Resumen portafolio", "Objetivos de ahorro", "Actividad reciente"],
                },
                {
                  num: "04", label: "Inversiones", icon: Award, accent: true,
                  children: ["Mercado de capitales", "Mercado cripto", "Simulador"],
                },
                {
                  num: "05", label: "Comunidad", icon: Search, accent: false,
                  children: ["Noticias financieras", "Educación integrada", "Tips"],
                },
              ].map(({ num, label, icon: Icon, accent, children }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  className="flex flex-col"
                >
                  {/* Línea desde horizontal hacia nodo */}
                  <div className="flex justify-center mb-1">
                    <div className="w-0.5 h-5 bg-[#025959]/30 dark:bg-[#4ecfcf]/20" />
                  </div>

                  {/* Cabecera del nodo */}
                  <div className={`rounded-t-2xl px-4 py-3 flex items-center gap-2 ${
                    accent
                      ? "bg-[#FF8300] text-white"
                      : "bg-[#025959] text-white"
                  }`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold text-sm leading-tight">{label}</span>
                  </div>

                  {/* Sub-ítems */}
                  <div className="flex-1 bg-white dark:bg-gray-700 rounded-b-2xl border border-t-0 border-gray-100 dark:border-gray-600 shadow-sm overflow-hidden">
                    {children.map((child, ci) => (
                      <div key={child}
                        className={`px-4 py-2.5 text-xs text-gray-600 dark:text-gray-300 leading-snug flex items-center gap-2 ${
                          ci < children.length - 1 ? "border-b border-gray-100 dark:border-gray-600/50" : ""
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          accent ? "bg-[#FF8300]/60" : "bg-[#025959]/40 dark:bg-[#4ecfcf]/40"
                        }`} />
                        {child}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 italic text-center">
              El nodo Inversiones (naranja) concentra la propuesta diferencial: capitales + cripto en un solo lugar.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. IDEAR
      ══════════════════════════════════════════ */}
      <section id="idear" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <FadeSection className="mb-12">
            <SectionLabel text="03 · Idear — Ideación" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Identidad que transmite confianza sin frialdad bancaria
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Con la arquitectura definida, diseñé la identidad visual de IUPI desde cero — paleta,
                tipografía, logo e íconos. El desafío era transmitir solidez y confianza sin caer en
                la estética fría y distante de la banca tradicional. La paleta azul marino + acento
                ámbar/dorado comunica estabilidad financiera con energía.
              </p>
              <p>
                El sistema de componentes en Figma se construyó con lógica atómica — componentes
                reutilizables que funcionaran tanto para la sección <strong className="text-gray-800 dark:text-gray-100">Capital</strong> (tono más formal)
                como para la sección <strong className="text-gray-800 dark:text-gray-100">Cripto</strong> (tono más dinámico), manteniendo coherencia
                de marca en ambos mundos.
              </p>
            </div>
          </FadeSection>

          {/* Brand Identity Visualization */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* ── Paleta de color ── */}
            <FadeSection delay={0.1}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Paleta de color
                </p>

                {/* Primary swatches */}
                <div className="flex gap-3 mb-4">
                  {[
                    { hex: "#0D1F3C", name: "Navy", role: "Primario" },
                    { hex: "#F5A623", name: "Ámbar", role: "Acento" },
                    { hex: "#1A3560", name: "Navy Mid", role: "Secundario" },
                  ].map(({ hex, name, role }) => (
                    <motion.div
                      key={hex}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col gap-2"
                    >
                      <div
                        className="w-full h-16 rounded-2xl shadow-md"
                        style={{ backgroundColor: hex }}
                      />
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                      <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{hex}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{role}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Neutral swatches */}
                <div className="flex gap-2 mt-2">
                  {[
                    { hex: "#F7F8FA", name: "Surface" },
                    { hex: "#E2E8F0", name: "Border" },
                    { hex: "#64748B", name: "Muted" },
                    { hex: "#FFFFFF", name: "White" },
                  ].map(({ hex, name }) => (
                    <motion.div
                      key={hex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="flex-1 flex flex-col gap-1"
                    >
                      <div
                        className="w-full h-8 rounded-xl border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: hex }}
                      />
                      <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">{name}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Gradient preview */}
                <div
                  className="mt-5 h-12 rounded-2xl shadow-inner"
                  style={{ background: "linear-gradient(135deg, #0D1F3C 0%, #1A3560 55%, #F5A623 100%)" }}
                />
                <p className="mt-2 text-[10px] text-center text-gray-400 dark:text-gray-500 italic">
                  Gradiente de marca — Navy → Ámbar
                </p>
              </div>
            </FadeSection>

            {/* ── Tipografía ── */}
            <FadeSection delay={0.2}>
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Tipografía
                </p>

                <div className="space-y-5">
                  {/* Display */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="border-l-4 border-[#F5A623] pl-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Display — H1</p>
                    <p className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-50 leading-none">IUPI</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">Inter · 700 · 48px · −0.02em</p>
                  </motion.div>

                  {/* Heading */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="border-l-4 border-[#0D1F3C] dark:border-[#4ecfcf]/60 pl-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Heading — H2</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tu dinero, tu futuro</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">Inter · 600 · 28px · −0.01em</p>
                  </motion.div>

                  {/* Body */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.16 }}
                    className="border-l-4 border-gray-200 dark:border-gray-600 pl-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Body</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      Inversiones en pesos, dólares y cripto desde un solo lugar.
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">Inter · 400 · 16px · 1.6 lh</p>
                  </motion.div>

                  {/* Caption */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.24 }}
                    className="border-l-4 border-gray-100 dark:border-gray-700 pl-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Caption / Label</p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">RENDIMIENTO ANUAL ESTIMADO</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">Inter · 600 · 11px · 0.08em</p>
                  </motion.div>
                </div>
              </div>
            </FadeSection>

            {/* ── Atomic Design System card ── */}
            <FadeSection delay={0.3} className="md:col-span-2">
              <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Sistema de componentes · Figma Atomic Design
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    {
                      level: "Átomos",
                      color: "#0D1F3C",
                      items: ["Botones", "Inputs", "Iconos", "Badges"],
                    },
                    {
                      level: "Moléculas",
                      color: "#1A3560",
                      items: ["Cards inversión", "Form groups", "Nav items", "Alerts"],
                    },
                    {
                      level: "Organismos",
                      color: "#F5A623",
                      textDark: true,
                      items: ["Dashboard widget", "Onboarding step", "Portfolio list", "Bottom tab"],
                    },
                    {
                      level: "Templates",
                      color: "#025959",
                      items: ["Pantalla Capital", "Pantalla Cripto", "Perfil usuario", "Notificaciones"],
                    },
                  ].map(({ level, color, items, textDark }, i) => (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-sm"
                    >
                      <div
                        className="px-4 py-3"
                        style={{ backgroundColor: color }}
                      >
                        <p className={`text-xs font-bold uppercase tracking-wide ${textDark ? "text-gray-900" : "text-white"}`}>
                          {level}
                        </p>
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
                  Los componentes atómicos garantizan coherencia visual entre la sección Capital (azul marino) y Cripto (ámbar/dorado).
                </p>
              </div>
            </FadeSection>

          </div>

          {/* ── Pantallas en baja ── */}
          <FadeSection className="mt-16">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-3">
                De la idea al producto — Pantallas en baja
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                De la idea al producto
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                Antes de pasar al alta fidelidad, las decisiones de flujo y arquitectura se pensaron
                en papel y en wireframes en baja — sin color ni detalle visual, para enfocarse en
                la estructura y la lógica de navegación.
              </p>
            </div>

            {(() => {
              const wireframes: WireframeItem[] = [
                { src: iupiExploracion,  caption: "Exploración inicial — flujos generales" },
                { src: iupiErrores,      caption: "Estados de error y confirmaciones"      },
                { src: iupiOnboarding,   caption: "Pantallas de onboarding"                },
                { src: iupiDashboard,    caption: "Dashboard principal"                    },
                { src: iupiCapital,      caption: "Flujo de inversión en Capital"          },
                { src: iupiMercado,      caption: "Detalle de instrumentos"                },
                { src: iupiCripto,       caption: "Sección Cripto — flujos y navegación"   },
                { src: iupiComunidad,    caption: "Pantalla de comunidad de inversores"    },
              ];
              return (
                /* Carrusel horizontal — todos los breakpoints */
                <WireframeCarousel items={wireframes} />
              );
            })()}
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. PROTOTIPAR
      ══════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* ── Bloque principal: texto + diagrama de flujo ── */}
          <FadeSection className="mb-16">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Texto */}
              <div>
                <SectionLabel text="04 · Prototipar — Resultados" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  4 flujos críticos. Un MVP listo para Dev.
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Construí el prototipo navegable en Figma cubriendo los flujos críticos acordados
                    con el equipo de producto y el Product Owner de No Country: registro, onboarding,
                    dashboard general, sección de mercado de capitales y sección de mercado cripto —
                    cada una con su propia lógica de navegación y visualización de datos.
                  </p>
                  <p>
                    Todas las pantallas se entregaron con el tag{" "}
                    <span className="font-semibold text-[#025959] dark:text-[#4ecfcf]">"Ready for dev"</span>{" "}
                    en Figma, junto a las especificaciones de handoff para el equipo de front-end.
                    El sistema de componentes atómicos facilitó la consistencia y redujo el tiempo
                    de implementación.
                  </p>
                </div>
              </div>

              {/* Diagrama de flujo del prototipo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf] mb-5">
                  Flujo del prototipo navegable
                </p>

                {/* Nodo raíz */}
                <div className="flex justify-center mb-2">
                  <div className="bg-[#0D1F3C] text-white text-xs font-bold px-5 py-2.5 rounded-2xl shadow-md tracking-wide">
                    App IUPI
                  </div>
                </div>
                <div className="flex justify-center mb-0">
                  <div className="w-0.5 h-5 bg-gray-300 dark:bg-gray-600" />
                </div>

                {/* Flujos principales */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      num: "01", label: "Registro", color: "#025959",
                      steps: ["Email / Teléfono", "Verificación OTP", "KYC básico"],
                      tag: null,
                    },
                    {
                      num: "02", label: "Onboarding", color: "#025959",
                      steps: ["Perfil de riesgo", "Tutorial interactivo", "Meta inicial"],
                      tag: null,
                    },
                    {
                      num: "03", label: "Dashboard", color: "#025959",
                      steps: ["Resumen portafolio", "Mis metas", "Actividad reciente"],
                      tag: null,
                    },
                    {
                      num: "04", label: "Mercados", color: "#F5A623",
                      steps: ["Capital · Cripto", "Detalle instrumento", "Simulador"],
                      tag: "MVP crítico",
                    },
                  ].map(({ num, label, color, steps, tag }, i) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                      {/* Cabecera */}
                      <div className="px-3 py-2.5 flex items-center justify-between" style={{ backgroundColor: color }}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white/60 text-[10px] font-mono">{num}</span>
                          <span className="text-white text-xs font-bold">{label}</span>
                        </div>
                        {tag && (
                          <span className="text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        )}
                      </div>
                      {/* Pasos */}
                      <div className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                        {steps.map((step) => (
                          <div key={step} className="flex items-center gap-2 px-3 py-2">
                            <CheckCircle className="w-3 h-3 text-[#025959] dark:text-[#4ecfcf] flex-shrink-0" />
                            <span className="text-[11px] text-gray-600 dark:text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tag Ready for dev */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#025959]/10 dark:bg-[#4ecfcf]/10 border border-[#025959]/20 dark:border-[#4ecfcf]/20">
                    <CheckCircle className="w-3.5 h-3.5 text-[#025959] dark:text-[#4ecfcf]" />
                    <span className="text-xs font-semibold text-[#025959] dark:text-[#4ecfcf]">Ready for dev · 4 flujos entregados</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </FadeSection>

          {/* ── Prototipo embebido ── */}
          <FadeSection className="mb-16" delay={0.1}>
            {/* Desktop: iframe embed */}
            <div className="hidden md:block rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <SiFigma className="w-4 h-4 text-[#F24E1E]" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Prototipo navegable — IUPI · H4-03 Fintech
                </p>
                <span className="ml-auto text-xs font-semibold bg-[#025959]/10 dark:bg-[#4ecfcf]/10 text-[#025959] dark:text-[#4ecfcf] px-2.5 py-1 rounded-full">
                  Figma Embed
                </span>
              </div>
              <div className="w-full aspect-video">
                <iframe
                  style={{ border: "none" }}
                  className="w-full h-full"
                  src="https://embed.figma.com/proto/l5F2V6tPaMkSCUYLInM8rQ/H4-03-Fintech?node-id=18-72&p=f&viewport=1365%2C4004%2C0.19&scaling=scale-down&content-scaling=responsive&starting-point-node-id=94%3A341&show-proto-sidebar=1&page-id=0%3A1&embed-host=share"
                  allowFullScreen
                  title="Prototipo IUPI en Figma"
                />
              </div>
            </div>
            {/* Mobile: CTA button */}
            <div className="md:hidden flex flex-col items-center justify-center gap-4 p-10 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <SiFigma className="w-8 h-8 text-[#F24E1E]" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
                Prototipo navegable — IUPI · H4-03 Fintech
              </p>
              <motion.a
                href="https://www.figma.com/proto/l5F2V6tPaMkSCUYLInM8rQ/H4-03-Fintech?node-id=18-72"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(2,89,89,.3)" }}
                whileTap={{ scale: .97 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#025959] text-white rounded-xl font-medium shadow-lg"
              >
                Ver prototipo en Figma →
              </motion.a>
            </div>
          </FadeSection>

          {/* ── Funcionalidades + Demo Day ── */}
          <FadeSection delay={0.15}>
            <div className="grid md:grid-cols-2 gap-8 items-start">

              {/* Funcionalidades finales */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  Funcionalidades finales
                </h3>
                <ul className="space-y-3">
                  {FUNCS.map(({ Icon, text }, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#FF8300]/10 dark:bg-[#FF8300]/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#FF8300]" />
                      </div>
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Demo Day card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#025959]/10 to-[#FF8300]/10 dark:from-[#025959]/20 dark:to-[#FF8300]/15 border border-[#025959]/15 dark:border-[#025959]/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF8300]/15 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#FF8300]" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Demo Day · No Country</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  IUPI fue presentado exitosamente ante un panel de evaluadores de la industria fintech,
                  recibiendo feedback positivo por la claridad del flujo y la propuesta de valor.
                </p>
              </motion.div>

            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. PRUEBA
      ══════════════════════════════════════════ */}
      <section id="prueba" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header + narrativa */}
          <FadeSection className="mb-12">
            <SectionLabel text="05 · Prueba — Validación" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Validación heurística y presentación al cliente
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Sin usuarios reales disponibles en el marco del hackathon, la validación se realizó
                mediante las <strong className="text-gray-800 dark:text-gray-100">heurísticas de Nielsen</strong> — visibilidad del estado del sistema,
                control del usuario, consistencia, prevención de errores y diseño minimalista —
                aplicadas sobre cada pantalla del prototipo.
              </p>
              <p>
                El equipo realizó revisiones cruzadas de los flujos y se iteró sobre los puntos de
                fricción detectados: principalmente en el <strong className="text-gray-800 dark:text-gray-100">onboarding</strong> (reducir la cantidad de
                pasos sin perder el perfil de riesgo) y en la transición entre la sección Capital
                y la sección Cripto. El MVP fue presentado en el Demo Day ante el cliente.
              </p>
            </div>
          </FadeSection>

          {/* Tabla heurística */}
          <FadeSection className="mb-16" delay={0.1}>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-[#025959] dark:text-[#4ecfcf]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#025959] dark:text-[#4ecfcf]">
                  Cuadro de validación — 10 heurísticas de Nielsen aplicadas a IUPI
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-6">#</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Heurística</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Aplicación en IUPI</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Hallazgo / Iteración</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        num: "01",
                        h: "Visibilidad del estado del sistema",
                        app: "Indicadores de progreso en onboarding y estados de carga en transacciones",
                        find: "Se añadió skeleton loader y barra de progreso en el wizard de registro",
                        ok: true,
                      },
                      {
                        num: "02",
                        h: "Coincidencia sistema / mundo real",
                        app: "Terminología financiera adaptada al usuario sin experiencia (\"invertir\" vs \"operar\")",
                        find: "Se simplificaron las etiquetas de la sección Capital para mayor claridad",
                        ok: true,
                      },
                      {
                        num: "03",
                        h: "Control y libertad del usuario",
                        app: "Botón de retroceso claro en cada paso del onboarding y flujos de inversión",
                        find: "Sin iteración necesaria — presente desde el wireframe inicial",
                        ok: true,
                      },
                      {
                        num: "04",
                        h: "Consistencia y estándares",
                        app: "Sistema de componentes atómico garantiza consistencia entre Capital y Cripto",
                        find: "Se unificaron estilos de cards entre las dos secciones de mercado",
                        ok: true,
                      },
                      {
                        num: "05",
                        h: "Prevención de errores",
                        app: "Confirmaciones antes de ejecutar operaciones y validación en tiempo real",
                        find: "Se añadió pantalla de confirmación previa con resumen de la operación",
                        ok: true,
                      },
                      {
                        num: "06",
                        h: "Reconocer antes que recordar",
                        app: "Accesos directos en el dashboard a los flujos más usados",
                        find: "Se incorporó acceso rápido a \"Mis inversiones\" desde el home",
                        ok: true,
                      },
                      {
                        num: "07",
                        h: "Flexibilidad y eficiencia",
                        app: "Onboarding abreviable para usuarios con experiencia previa",
                        find: "Priorizado para V2 — el hackathon priorizó el perfil de riesgo completo",
                        ok: false,
                      },
                      {
                        num: "08",
                        h: "Diseño estético y minimalista",
                        app: "Interfaz limpia, sin elementos decorativos que compitan con los datos",
                        find: "Sin iteración — aplicado desde la identidad visual inicial",
                        ok: true,
                      },
                      {
                        num: "09",
                        h: "Ayuda a reconocer y recuperarse de errores",
                        app: "Mensajes de error claros con acción sugerida en formularios y transacciones",
                        find: "Se redactaron los estados de error con lenguaje accionable",
                        ok: true,
                      },
                      {
                        num: "10",
                        h: "Ayuda y documentación",
                        app: "Tooltips y sección educativa integrada en el flujo de inversión",
                        find: "Se incorporó educación contextual dentro del flujo de mercado de capitales",
                        ok: true,
                      },
                    ].map(({ num, h, app, find, ok }, i) => (
                      <motion.tr
                        key={num}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${
                          i % 2 === 0 ? "bg-white dark:bg-gray-800/60" : "bg-gray-50/80 dark:bg-gray-700/40"
                        }`}
                      >
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{num}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{h}</span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 max-w-xs">{app}</td>
                        <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 max-w-xs">{find}</td>
                        <td className="px-4 py-3.5 text-center">
                          {ok ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
                              <CheckCircle className="w-3 h-3" /> Resuelto
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] font-semibold">
                              ⟳ V2
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. IMPACTO (card sobre fondo neutro)
      ══════════════════════════════════════════ */}
      <section id="impacto" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeSection>
            <div className="rounded-3xl px-8 py-12 md:px-14 md:py-14 text-center bg-[#025959]">
              <TrendingUp className="w-12 h-12 text-[#FF8300] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-5">El impacto del proyecto</h2>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                IUPI demostró que es posible diseñar una experiencia financiera inclusiva sin sacrificar
                potencia funcional. En 5 semanas logramos un MVP completo con flujos validados por heurísticas.
              </p>
              <blockquote className="border-l-4 border-[#FF8300] pl-6 text-left max-w-xl mx-auto">
                <p className="text-white/90 italic leading-relaxed text-lg">
                  "El diseño no solo hace las cosas bonitas — las hace accesibles para quienes antes no tenían acceso."
                </p>
                <footer className="mt-3 text-white/50 text-sm">— Reflexión del equipo IUPI</footer>
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
              {/* Línea separadora ámbar */}
              <div className="flex justify-center">
                <div className="h-1 w-12 rounded-full bg-[#FF8300]" />
              </div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">¿Siguiente paso?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
                ¿Querés trabajar conmigo?{" "}
                <span className="text-[#FF8300]">Escribime.</span>
              </h2>
            </div>
            {/* Botón primario — color-secondary #FF8300, hover ámbar oscuro */}
            <motion.button
              whileHover={{ backgroundColor: "#e87500", boxShadow: "0 16px 50px rgba(255,131,0,.55)", y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 500); }}
              data-ga-action="cta_click"
              data-ga-category="CTA"
              data-ga-label="Contactar - IUPI"
              className="inline-flex items-center px-10 py-4 rounded-2xl bg-[#FF8300] text-white font-semibold text-lg shadow-2xl transition-all"
            >
              Coordinar reunión
            </motion.button>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          11. CERTIFICADO
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection className="mb-10">
            <SectionLabel text="Reconocimiento" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Certificado de participación</h2>
          </FadeSection>
          <FadeSection delay={.15}>
            <motion.div
              whileHover={{ scale:1.03, boxShadow:"0 24px 60px rgba(2,89,89,.18)" }}
              transition={{ duration:.4, ease:[.22,1,.36,1] }}
              className="rounded-3xl overflow-hidden shadow-2xl mb-8 cursor-zoom-in mx-auto max-w-xl"
            >
              <img src={iupiCertificado} alt="Certificado No Country — IUPI" className="w-full h-auto object-contain" />
            </motion.div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className="w-5 h-5 text-[#FF8300]" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">No Country · Hackathon 2025</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
              Reconocimiento por participación como{" "}
              <strong className="text-[#025959] dark:text-[#4ecfcf]">UX/UI Designer</strong> en el proyecto
              IUPI — ahorro e inversiones para el mercado argentino. Enero 2025.
            </p>
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
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-[#FF8300] dark:hover:text-[#FF8300] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver al portfolio
              </button>
              {/* Botón secundario — outlined, hover ámbar */}
              <motion.button
                whileHover={{ backgroundColor: "#FF8300", borderColor: "#FF8300", color: "#ffffff", boxShadow: "0 8px 24px rgba(255,131,0,.30)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                onClick={() => navigate("/case-study/portfolio")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#025959] text-[#025959] dark:border-[#4ecfcf] dark:text-[#4ecfcf] font-medium text-sm transition-colors"
              >
                Ver Portfolio Web
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
          © 2026 Sofía Álvarez. Diseñado por mí, implementado con Claude Code
        </p>
      </footer>
    </div>
  );
}

