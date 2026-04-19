import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Moon, Sun,
  Users, Search, Lightbulb, Layers, CheckCircle,
  PenLine, MapPin, BookOpen, Smartphone,
} from "lucide-react";
import { SiFigma } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import bookiePort from "../../../imports/bookie port.jpg";
import logo2 from "../../../imports/logo2.svg";
import logo2dark from "../../../imports/logo2dark.svg";

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

const TOOLS = [
  { Icon: SiFigma, label: "Figma",         brandColor: "#F24E1E" },
  { Icon: PenLine, label: "Lápiz y Papel", brandColor: "#B45309" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

function HeroCanvas({ isDark }: { isDark: boolean }) {
  const ref  = useRef<HTMLCanvasElement>(null);
  const raf  = useRef<number>(0);
  const dRef = useRef(isDark);
  useEffect(() => { dRef.current = isDark; }, [isDark]);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!; let t = 0;
    const resize = () => { const r = canvas.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.005;
      const { width: w, height: h } = canvas; const dark = dRef.current;
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
        const bY = h*y, aY = h*amp, phase = t*spd+ph;
        ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
        ctx.moveTo(dn ? 0 : w, dn ? h : 0);
        ctx.lineTo(0, bY + aY * Math.sin(phase));
        for (let i = 0; i < 8; i++) {
          const x0=(i/8)*w, x1=((i+1)/8)*w, sw=w/8;
          ctx.bezierCurveTo(
            x0+sw*.33, bY+aY*Math.sin(freq*Math.PI*2*(x0+sw*.2)/w+phase),
            x0+sw*.67, bY+aY*Math.sin(freq*Math.PI*2*(x0+sw*.8)/w+phase),
            x1,        bY+aY*Math.sin(freq*Math.PI*2*x1/w+phase),
          );
        }
        ctx.lineTo(w, dn ? h : 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

function ToolBadge({ Icon, label, brandColor }: { Icon: React.ElementType; label: string; brandColor: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.06 }} transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border bg-white dark:bg-gray-800 shadow-sm cursor-default select-none"
      style={{ borderColor: hov ? `${brandColor}55` : "rgba(229,231,235,1)", boxShadow: hov ? `0 8px 28px ${brandColor}25` : undefined }}
    >
      <Icon className="w-7 h-7 transition-colors duration-300" style={{ color: hov ? brandColor : "#025959" }} />
      <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300" style={{ color: hov ? brandColor : undefined }}>
        {label}
      </span>
    </motion.div>
  );
}

function NavPill({ step }: { step: Step }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => scrollTo(step.id)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={{ background: hov ? "rgba(2,89,89,0.10)" : "transparent", color: hov ? "#025959" : "#6b7280" }}
    >
      <step.Icon className="w-3.5 h-3.5" />{step.label}
    </motion.button>
  );
}

function CaseStudyNav({ showPills, title }: { showPills: boolean; title: string }) {
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
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
        <motion.button
          whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          aria-label="Ir al inicio"
        >
          <img src={isDark ? logo2dark : logo2} alt="Sofía Álvarez" className="w-9 h-9 object-contain" />
        </motion.button>
        <div className="hidden md:flex items-center gap-1">
          <AnimatePresence mode="wait">
            {showPills ? (
              <motion.div key="pills" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:.25 }} className="flex gap-1">
                {STEPS.map((s) => <NavPill key={s.id} step={s} />)}
              </motion.div>
            ) : (
              <motion.span key="label" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }} transition={{ duration:.2 }}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Caso de Estudio · {title}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[#025959]/10 dark:hover:bg-[#025959]/30 transition-colors" aria-label="Toggle theme">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="sun" initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:90 }} transition={{ duration:.2 }}>
                <Sun className="w-5 h-5 text-[#FF8300]" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ opacity:0, rotate:90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:-90 }} transition={{ duration:.2 }}>
                <Moon className="w-5 h-5 text-[#025959]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {showPills && (
          <motion.div key="mobile-pills" initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:.3 }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
              {STEPS.map((s) => <NavPill key={s.id} step={s} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

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
      <motion.span animate={{ color: hov ? "#FF8300" : "#025959" }} transition={{ duration: 0.2 }}
        className="text-xs sm:text-sm font-medium text-center leading-tight dark:text-[#4ecfcf]" style={{ color: hov ? "#FF8300" : undefined }}>
        {step.label}
      </motion.span>
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

function SectionLabel({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className={`inline-block mb-3 px-3 py-1 rounded-full text-sm ${
      accent ? "bg-[#FF8300]/10 text-[#FF8300]" : "bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf]"
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

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export function BookieCaseStudy() {
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
      <CaseStudyNav showPills={showPills} title="Bookie" />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-16 pb-12">
        <HeroCanvas isDark={isDark} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: isDark ? "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(2,89,89,.15) 0%,transparent 75%)" : "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,255,255,.6) 0%,transparent 75%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, delay:.1, ease:[.22,1,.36,1] }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-gray-800 dark:text-gray-100 leading-tight">
              Bookie – Lectura<br />Geolocalizada
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
              Una app que desbloquea capítulos de historias al llegar físicamente a ubicaciones específicas en el mundo real.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Hackathon No Country", "2025", "UX/UI Designer"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] border border-[#025959]/20">{tag}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.25, duration:.9, ease:[.22,1,.36,1] }} className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={bookiePort} alt="Bookie – portada" className="w-full h-72 lg:h-[440px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* DESCRIPCIÓN + FICHA */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <SectionLabel text="Descripción General" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  La lectura digital enfrenta un problema de monotonía y desconexión del entorno físico. En este hackathon de{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">No Country</strong>, el equipo propuso Bookie: una app que
                  fusiona narrativa con exploración geolocalizada del mundo real.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  El cliente tenía clara la historia de usuario que quería contar, pero no cómo debía suceder dentro de la app.
                  El desafío era diseñar flujos claros e intuitivos para una mecánica de juego completamente nueva.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Herramientas utilizadas</p>
                  <div className="flex flex-wrap gap-3">
                    {TOOLS.map((t) => <ToolBadge key={t.label} Icon={t.Icon} label={t.label} brandColor={t.brandColor} />)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <SectionLabel text="Ficha del proyecto" accent />
                <div className="grid grid-cols-3 gap-4">
                  {[{ label:"Rol", value:"UX/UI Designer" }, { label:"Sector", value:"EdTech · Mobile" }, { label:"Duración", value:"5 semanas" }].map(({ label, value }, idx) => (
                    <motion.div key={label} initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.55, delay:idx*.1 }}
                      whileHover={{ y:-3, boxShadow:"0 8px 24px rgba(2,89,89,.12)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow">
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

      {/* STAR */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-6 px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">Logro del proyecto</span>
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
              "Diseñamos los flujos de una mecánica de juego completamente nueva en{" "}
              <span className="text-[#FF8300]">5 semanas</span>, convirtiendo una idea abstracta en una
              experiencia intuitiva que el cliente y los usuarios entendieron de inmediato."
            </blockquote>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label:"Situación", desc:"App de lectura con mecánica geolocalizada nueva" },
                { label:"Tarea", desc:"Diseñar flujos sin referentes previos" },
                { label:"Acción", desc:"Research + prototipado rápido iterativo" },
                { label:"Resultado", desc:"Flujos validados y aprobados por el cliente" },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-left">
                  <span className="text-[#FF8300] text-xs font-bold uppercase tracking-widest">{label}</span>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* PROCESO */}
      <section ref={processSectionRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <SectionLabel text="Design Thinking" accent />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mi proceso de diseño</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">5 etapas iterativas · Clic en cada nodo para ir a esa sección.</p>
          </FadeSection>
          <FadeSection delay={.1}><ProcessStepper /></FadeSection>
        </div>
      </section>

      {/* SECCIONES DE DISEÑO */}
      {[
        { id:"empatizar", num:"01", title:"Empatizar",  Icon:Users,        desc:"Entendiendo las necesidades del lector digital y los amantes de la exploración urbana." },
        { id:"definir",   num:"02", title:"Definir",    Icon:Search,       desc:"Definición de los pain points principales y el flujo de desbloqueo de capítulos." },
        { id:"idear",     num:"03", title:"Idear",      Icon:Lightbulb,    desc:"Exploración de conceptos de interfaz y arquitectura de la mecánica geolocalizada." },
        { id:"prototipar",num:"04", title:"Prototipar", Icon:Layers,       desc:"Prototipos de baja y alta fidelidad de los flujos principales de la aplicación." },
        { id:"prueba",    num:"05", title:"Prueba",     Icon:CheckCircle,  desc:"Validación con usuarios y presentación al cliente de los flujos finales." },
      ].map(({ id, num, title, Icon, desc }, idx) => (
        <section key={id} id={id} className={`py-16 md:py-20 scroll-mt-20 ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <FadeSection>
              <SectionLabel text={`${num} · ${title}`} accent={idx % 2 !== 0} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">{desc}</p>
              <ComingSoon icon={["👥","🔍","💡","📐","✅"][idx]} label={`Documentando la etapa de ${title.toLowerCase()} de Bookie...`} />
            </FadeSection>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeSection>
            <p className="text-gray-500 dark:text-gray-400 mb-6">¿Te interesa ver más proyectos?</p>
            <motion.button whileHover={{ scale:1.05, boxShadow:"0 8px 30px rgba(2,89,89,.3)" }} whileTap={{ scale:.97 }}
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#025959] text-white rounded-xl font-medium shadow-lg hover:bg-[#037070] transition-colors">
              <ArrowLeft className="w-4 h-4" />Volver al portafolio
            </motion.button>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
