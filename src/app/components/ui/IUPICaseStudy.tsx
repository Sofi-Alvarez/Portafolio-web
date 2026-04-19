import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Moon, Sun,
  Users, Search, Lightbulb, Layers, CheckCircle,
  TrendingUp, Award, PenLine,
} from "lucide-react";
import { SiFigma } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import iupiPort from "../../../imports/iupi port.jpg";
import logo2 from "../../../imports/logo2.svg";
import logo2dark from "../../../imports/logo2dark.svg";

/* ─── Unsplash placeholders (reemplazar con assets reales) ──────────────── */
const RESEARCH_IMG = "https://images.unsplash.com/photo-1632260200401-8932c10be26c?w=900&q=80";
const WIREFRAME_IMG = "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&q=80";
const MOCKUP_IMG    = "https://images.unsplash.com/photo-1707836916010-3c4ad261936c?w=900&q=80";
const CERT_IMG      = "https://images.unsplash.com/photo-1766722906733-609eebf3b63a?w=900&q=80";

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
const INSIGHTS = [
  "El 68 % de los encuestados nunca había invertido en mercados de capitales.",
  "La barrera principal no es el dinero, sino la complejidad percibida.",
  "El 82 % usa su smartphone para gestionar finanzas personales.",
  "Los usuarios jóvenes (18–34) muestran mayor apertura a activos cripto.",
  "La falta de educación financiera es la causa #1 de exclusión.",
  "Los usuarios prefieren onboarding guiado con micro-pasos claros.",
];

const FUNCS = [
  { Icon: TrendingUp,   text: "Dashboard unificado de inversiones y cripto" },
  { Icon: CheckCircle,  text: "Onboarding adaptativo con perfil de riesgo" },
  { Icon: Layers,       text: "Simulador de ahorro e inversión interactivo" },
  { Icon: Users,        text: "Educación financiera integrada en el flujo" },
  { Icon: Award,        text: "Sistema de metas y seguimiento de progreso" },
];

const TOOLS = [
  { Icon: SiFigma, label: "Figma",         brandColor: "#F24E1E" },
  { Icon: PenLine, label: "Lápiz y Papel", brandColor: "#B45309" },
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

/* ─── Wave canvas background ────────────────────────────────────────────── */
function HeroCanvas({ isDark }: { isDark: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const raf   = useRef<number>(0);
  const dRef  = useRef(isDark);
  useEffect(() => { dRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width; canvas.height = r.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.005;
      const { width: w, height: h } = canvas;
      const dark = dRef.current;
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, w, h);
      dark
        ? (bg.addColorStop(0,"#010e0e"), bg.addColorStop(.5,"#011818"), bg.addColorStop(1,"#020c0c"))
        : (bg.addColorStop(0,"#edfafa"), bg.addColorStop(.5,"#f8fefe"), bg.addColorStop(1,"#fff8f3"));
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      const waves = [
        { y:.08, amp:.08, freq:.9,  spd:.40, ph:0.0, col:"#025959", a:.10, dn:false },
        { y:.16, amp:.09, freq:1.1, spd:.55, ph:1.5, col:"#037070", a:.07, dn:false },
        { y:.75, amp:.08, freq:1.0, spd:.45, ph:0.5, col:"#025959", a:.09, dn:true  },
        { y:.85, amp:.07, freq:1.4, spd:.60, ph:2.0, col:"#FF8300", a:.05, dn:true  },
        { y:.91, amp:.06, freq:1.8, spd:.80, ph:4.5, col:"#FF9A33", a:.04, dn:true  },
      ] as const;

      waves.forEach(({ y, amp, freq, spd, ph, col, a, dn }) => {
        const bY = h * y, aY = h * amp, phase = t * spd + ph;
        ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
        ctx.moveTo(dn ? 0 : w, dn ? h : 0);
        ctx.lineTo(0, bY + aY * Math.sin(phase));
        for (let i = 0; i < 8; i++) {
          const x0 = (i/8)*w, x1 = ((i+1)/8)*w, sw = w/8;
          ctx.bezierCurveTo(
            x0+sw*.33, bY+aY*Math.sin(freq*Math.PI*2*(x0+sw*.2)/w+phase),
            x0+sw*.67, bY+aY*Math.sin(freq*Math.PI*2*(x0+sw*.8)/w+phase),
            x1,        bY+aY*Math.sin(freq*Math.PI*2*x1/w+phase),
          );
        }
        ctx.lineTo(w, dn ? h : 0); ctx.closePath();
        ctx.fillStyle = col; ctx.fill(); ctx.restore();
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ─── Tool badge (home-style brand color hover) ─────────────────────────── */
function ToolBadge({ Icon, label, brandColor }: { Icon: React.ElementType; label: string; brandColor: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.06 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border bg-white dark:bg-gray-800 shadow-sm cursor-default select-none"
      style={{
        borderColor: hov ? `${brandColor}55` : "rgba(229,231,235,1)",
        boxShadow:   hov ? `0 8px 28px ${brandColor}25` : undefined,
      }}
    >
      <Icon
        className="w-7 h-7 transition-colors duration-300"
        style={{ color: hov ? brandColor : "#025959" }}
      />
      <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300"
        style={{ color: hov ? brandColor : undefined }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   STICKY NAV
════════════════════════════════════════════════════════════ */
function NavPill({ step }: { step: Step }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => scrollTo(step.id)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={{
        background: hov ? "rgba(2,89,89,0.10)" : "transparent",
        color:      hov ? "#025959" : "#6b7280",
      }}
    >
      <step.Icon className="w-3.5 h-3.5" />
      {step.label}
    </motion.button>
  );
}

function CaseStudyNav({ showPills }: { showPills: boolean }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      {/* main row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
        {/* logo → home */}
        <motion.button
          whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          aria-label="Ir al inicio"
        >
          <img src={isDark ? logo2dark : logo2} alt="Sofía Álvarez" className="w-9 h-9 object-contain" />
        </motion.button>

        {/* center: label ↔ process pills */}
        <div className="hidden md:flex items-center gap-1">
          <AnimatePresence mode="wait">
            {showPills ? (
              <motion.div key="pills"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                className="flex gap-1"
              >
                {STEPS.map((s) => <NavPill key={s.id} step={s} />)}
              </motion.div>
            ) : (
              <motion.span key="label"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                Caso de Estudio · IUPI
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[#025959]/10 dark:hover:bg-[#025959]/30 transition-colors"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="sun"
                initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-[#FF8300]" />
              </motion.div>
            ) : (
              <motion.div key="moon"
                initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-[#025959]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* mobile pills strip */}
      <AnimatePresence>
        {showPills && (
          <motion.div
            key="mobile-pills"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
              {STEPS.map((s) => <NavPill key={s.id} step={s} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ════════════════════════════════════════════════════════════
   DIAGRAMA HORIZONTAL (stepper)
════════════════════════════════════════════════════════════ */
function StepNode({ step, index }: { step: Step; index: number }) {
  const [hov, setHov] = useState(false);
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
          background: hov ? "rgba(255,131,0,0.14)" : "rgba(2,89,89,0.08)",
          borderColor: hov ? "#FF8300" : "rgba(2,89,89,0.18)",
        }}
        transition={{ duration: 0.22 }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm"
      >
        <step.Icon
          className="w-6 h-6 transition-colors duration-200"
          style={{ color: hov ? "#FF8300" : "#025959" }}
        />
      </motion.div>
      <motion.span
        animate={{ color: hov ? "#FF8300" : "#025959" }}
        transition={{ duration: 0.2 }}
        className="text-xs sm:text-sm font-medium text-center leading-tight dark:text-[#4ecfcf]"
        style={{ color: hov ? "#FF8300" : undefined }}
      >
        {step.label}
      </motion.span>
    </motion.button>
  );
}

/* Línea conectora entre pasos */
function StepConnector({ index }: { index: number }) {
  const isOrange = index % 2 === 0;
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
            ? "linear-gradient(90deg,rgba(255,131,0,.55),rgba(255,131,0,.25))"
            : "rgba(209,213,219,0.9)",
        }}
      />
    </div>
  );
}

function ProcessStepper() {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-4">
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
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm ${
      accent
        ? "bg-[#FF8300]/10 text-[#FF8300]"
        : "bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf]"
    }`}>
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function IUPICaseStudy() {
  const { isDark } = useTheme();
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
      <CaseStudyNav showPills={showPills} />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-16 pb-12">
        <HeroCanvas isDark={isDark} />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(2,89,89,.15) 0%,transparent 75%)"
              : "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,255,255,.6) 0%,transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          {/* Left: text */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.8, delay:.1, ease:[.22,1,.36,1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-gray-800 dark:text-gray-100 leading-tight">
              IUPI – Ahorro<br />e Inversiones
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
              Incluyendo financieramente a la población argentina en un contexto complejo.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Hackathon No Country", "Enero 2025", "UX/UI Designer"].map((tag) => (
                <span key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] border border-[#025959]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: image (sin badge flotante) */}
          <motion.div
            initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }}
            transition={{ delay:.25, duration:.9, ease:[.22,1,.36,1] }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={iupiPort}
              alt="IUPI – proyecto portada"
              className="w-full h-72 lg:h-[440px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. DESCRIPCIÓN GENERAL + FICHA
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: descripción + herramientas */}
              <div className="space-y-6">
                <SectionLabel text="Descripción General" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  IUPI nació en el hackathon{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">No Country</strong> de enero 2025,
                  con una duración de 5 semanas. El desafío fue diseñar una billetera virtual que pudiera
                  operar simultáneamente en el mercado de capitales y el mercado cripto dentro de una misma
                  app, con todos los requerimientos de un MVP completo.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                    Herramientas utilizadas
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {TOOLS.map((t) => (
                      <ToolBadge key={t.label} Icon={t.Icon} label={t.label} brandColor={t.brandColor} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: ficha del proyecto */}
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Rol",      value: "UX/UI Designer"    },
                    { label: "Sector",   value: "Fintech · Web App" },
                    { label: "Duración", value: "5 semanas"         },
                  ].map(({ label, value }, idx) => (
                    <motion.div key={label}
                      initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ duration:.55, delay:idx*.1 }}
                      whileHover={{ y:-3, boxShadow:"0 8px 24px rgba(2,89,89,.12)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm font-semibold">{value}</p>
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
              Logro del proyecto
            </span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-8">
              "En solo 5 semanas transformamos una idea en un{" "}
              <span className="text-[#FF8300]">MVP fintech completo</span>, validado con usuarios reales
              e impulsando inclusión financiera para la población argentina."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Situación",  desc: "Hackathon No Country" },
                { label: "Tarea",      desc: "MVP fintech de cero"  },
                { label: "Acción",     desc: "Design Thinking · 5 semanas" },
                { label: "Resultado",  desc: "Demo Day exitoso" },
              ].map(({ label, desc }) => (
                <div key={label}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left"
                >
                  <span className="text-[#FF8300] text-xs font-bold uppercase tracking-widest">{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. DIAGRAMA DE PROCESO
      ══════════════════════════════════════════ */}
      <section ref={processSectionRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Design Thinking" accent />
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
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <SectionLabel text="01 · Empatizar" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  La exclusión financiera en Argentina
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  En un contexto de alta inflación y volatilidad económica, millones de argentinos no tienen
                  acceso a herramientas que les permitan proteger y hacer crecer sus ahorros.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Las plataformas existentes son complejas, intimidantes y no están diseñadas para usuarios
                  sin experiencia financiera.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong className="text-[#FF8300]">IUPI</strong> propone romper esa barrera con diseño
                  centrado en el usuario, educación integrada y una experiencia que hace simple lo complejo.
                </p>
              </div>
              <motion.div whileHover={{ scale:1.02 }} transition={{ duration:.35 }}
                className="rounded-3xl overflow-hidden shadow-xl"
              >
                <img src={RESEARCH_IMG} alt="Exclusión financiera"
                  className="w-full h-80 object-cover" />
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. DEFINIR
      ══════════════════════════════════════════ */}
      <section id="definir" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: hallazgos */}
              <div>
                <SectionLabel text="02 · Definir — Investigación" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">Hallazgos clave</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Encuestas, entrevistas y benchmarking con 120+ participantes para entender los patrones
                  de comportamiento financiero en Argentina.
                </p>
                <ul className="space-y-3">
                  {INSIGHTS.map((insight, i) => (
                    <motion.li key={i}
                      initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ delay:i*.07, duration:.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#FF8300]/15 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#FF8300]" />
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{insight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: imagen + métricas */}
              <div>
                <div className="rounded-t-3xl overflow-hidden shadow-xl">
                  <img src={RESEARCH_IMG} alt="Research" className="w-full h-60 object-cover" />
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-b-3xl p-6 border border-t-0 border-gray-100 dark:border-gray-600 shadow-xl">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Muestra de investigación</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[{n:"120+",l:"Encuestados"},{n:"15",l:"Entrevistas"},{n:"8",l:"Benchmarks"}].map(({n,l}) => (
                      <div key={l}>
                        <p className="text-2xl font-bold text-[#025959] dark:text-[#4ecfcf]">{n}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. IDEAR
      ══════════════════════════════════════════ */}
      <section id="idear" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="03 · Idear — Ideación" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Del concepto al diseño</h2>
          </FadeSection>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {[WIREFRAME_IMG, MOCKUP_IMG].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-72 rounded-2xl overflow-hidden shadow-xl">
                  <img src={src} alt={i === 0 ? "Wireframes" : "Mockups"} className="w-full h-52 object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {[
              { src: WIREFRAME_IMG, caption: "Wireframes y bocetos iniciales" },
              { src: MOCKUP_IMG,    caption: "Mockups de alta fidelidad"      },
            ].map(({ src, caption }, i) => (
              <FadeSection key={i} delay={i * .15}>
                <motion.div whileHover={{ scale:1.02, boxShadow:"0 16px 40px rgba(2,89,89,.15)" }}
                  transition={{ duration:.35 }}
                  className="rounded-3xl overflow-hidden shadow-xl h-72 cursor-pointer"
                >
                  <img src={src} alt={caption} className="w-full h-full object-cover" />
                </motion.div>
                <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. PROTOTIPAR
      ══════════════════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:.65 }}
                whileHover={{ scale:1.02 }}
                className="rounded-3xl overflow-hidden shadow-xl order-last md:order-first"
              >
                <img src={MOCKUP_IMG} alt="IUPI mockups finales" className="w-full h-80 object-cover" />
              </motion.div>

              <div>
                <SectionLabel text="04 · Prototipar — Resultados" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">Funcionalidades finales</h2>
                <ul className="space-y-4 mb-8">
                  {FUNCS.map(({ Icon, text }, i) => (
                    <motion.li key={i}
                      initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ delay:i*.08, duration:.5 }}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <Icon className="w-5 h-5 text-[#FF8300] flex-shrink-0" />
                      {text}
                    </motion.li>
                  ))}
                </ul>

                {/* Demo Day card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#025959]/10 to-[#FF8300]/10 dark:from-[#025959]/20 dark:to-[#FF8300]/15 border border-[#025959]/15">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-[#FF8300]" />
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Demo Day · No Country</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    IUPI fue presentado exitosamente ante un panel de evaluadores de la industria fintech,
                    recibiendo feedback positivo por la claridad del flujo y la propuesta de valor.
                  </p>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. PRUEBA
      ══════════════════════════════════════════ */}
      <section id="prueba" className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010c0c] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection>
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
              05 · Prueba — Impacto
            </span>
            <TrendingUp className="w-12 h-12 text-[#FF8300] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-5">El impacto del proyecto</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              IUPI demostró que es posible diseñar una experiencia financiera inclusiva sin sacrificar
              potencia funcional. En 5 semanas logramos un MVP completo con flujos validados por usuarios reales.
            </p>
            <blockquote className="border-l-4 border-[#FF8300] pl-6 text-left max-w-xl mx-auto">
              <p className="text-white/90 italic leading-relaxed">
                "El diseño no solo hace las cosas bonitas — las hace accesibles para quienes antes no tenían acceso."
              </p>
              <footer className="mt-2 text-white/50 text-sm">— Reflexión del equipo IUPI</footer>
            </blockquote>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. CERTIFICADO
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection className="mb-10">
            <SectionLabel text="Reconocimiento" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Certificado de participación</h2>
          </FadeSection>
          <FadeSection delay={.15}>
            <motion.div
              whileHover={{ scale:1.04, boxShadow:"0 24px 60px rgba(2,89,89,.18)" }}
              transition={{ duration:.4, ease:[.22,1,.36,1] }}
              className="rounded-3xl overflow-hidden shadow-2xl mb-8 cursor-zoom-in mx-auto max-w-xl"
            >
              <img src={CERT_IMG} alt="Certificado No Country" className="w-full h-72 object-cover" />
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

          {/* CTA volver */}
          <FadeSection delay={.3} className="mt-12">
            <motion.button
              whileHover={{ scale:1.05, boxShadow:"0 8px 30px rgba(2,89,89,.3)" }}
              whileTap={{ scale:.97 }}
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#025959] text-white rounded-xl font-medium shadow-lg hover:bg-[#037070] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al portafolio
            </motion.button>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}

