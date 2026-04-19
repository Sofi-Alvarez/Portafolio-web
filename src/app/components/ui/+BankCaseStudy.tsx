import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import {
  ArrowLeft,
  Figma,
  Github,
  MessageSquare,
  FileText,
  Users,
  Search,
  Lightbulb,
  Layers,
  CheckCircle,
  TrendingUp,
  Award,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

/* ─── Images ─── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1720135885002-a19131beb73c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwbW9iaWxlJTIwYXBwJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NjQ2OTkwNHww&ixlib=rb-4.1.0&q=80&w=1080";
const FINANCE_IMG =
  "https://images.unsplash.com/photo-1768055104895-e6185762f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzYXZpbmdzJTIwaW52ZXN0bWVudCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3NjQ2OTkwNXww&ixlib=rb-4.1.0&q=80&w=1080";
const WIREFRAME_IMG =
  "https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVWCUyMGRlc2lnbiUyMHdpcmVmcmFtZSUyMHByb3RvdHlwZSUyMHNrZXRjaHxlbnwxfHx8fDE3NzY0Njk5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const RESEARCH_IMG =
  "https://images.unsplash.com/photo-1632260200401-8932c10be26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBzdXJ2ZXklMjBpbnNpZ2h0cyUyMGFuYWx5c2lzfGVufDF8fHx8MTc3NjQ2OTkwOHww&ixlib=rb-4.1.0&q=80&w=1080";
const MOCKUP_IMG =
  "https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXAlMjBzbWFydHBob25lJTIwc2NyZWVuJTIwZGVzaWdufGVufDF8fHx8MTc3NjQ2OTkwOHww&ixlib=rb-4.1.0&q=80&w=1080";
const CERT_IMG =
  "https://images.unsplash.com/photo-1766722906733-609eebf3b63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcnRpZmljYXRlJTIwcmVjb2duaXRpb24lMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NzY0Njk5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080";

/* ─── Circular diagram config ─── */
const VSIZE = 520;          // virtual SVG canvas size
const CX = 260;             // center X
const CY = 260;             // center Y
const ORBIT_R = 138;        // radius for node positions
const NODE_R = 46;          // node circle radius (SVG units)
const LABEL_DIST = 208;     // label orbit radius from center

/* ─── Process steps with anchors ─── */
interface ProcessStep {
  icon: React.ReactNode;
  label: string;
  anchor: string;
  num: string;
}

const processSteps: ProcessStep[] = [
  { icon: <Users className="w-5 h-5" />, label: "Empatizar", anchor: "empatizar", num: "01" },
  { icon: <Search className="w-5 h-5" />, label: "Definir", anchor: "definir", num: "02" },
  { icon: <Lightbulb className="w-5 h-5" />, label: "Idear", anchor: "idear", num: "03" },
  { icon: <Layers className="w-5 h-5" />, label: "Prototipar", anchor: "prototipar", num: "04" },
  { icon: <CheckCircle className="w-5 h-5" />, label: "Probar", anchor: "probar", num: "05" },
];

/* Compute node cartesian positions */
function getNodeCoords(i: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return {
    nx: CX + ORBIT_R * Math.cos(angle),
    ny: CY + ORBIT_R * Math.sin(angle),
    lx: CX + LABEL_DIST * Math.cos(angle),
    ly: CY + LABEL_DIST * Math.sin(angle),
    angle,
  };
}

/* ─── Insights & functionalities ─── */
const insights = [
  "El 68% de los encuestados nunca había invertido en mercados de capitales.",
  "La barrera principal no es el dinero, sino la complejidad percibida.",
  "El 82% usa su smartphone para gestionar finanzas personales.",
  "Los usuarios jóvenes (18–34) muestran mayor apertura a activos cripto.",
  "La falta de educación financiera es la causa #1 de exclusión.",
  "Los usuarios prefieren onboarding guiado con micro-pasos claros.",
];

const functionalities = [
  { icon: <TrendingUp className="w-5 h-5" />, text: "Dashboard unificado de inversiones y cripto" },
  { icon: <CheckCircle className="w-5 h-5" />, text: "Onboarding adaptativo con perfil de riesgo" },
  { icon: <Layers className="w-5 h-5" />, text: "Simulador de ahorro e inversión interactivo" },
  { icon: <Users className="w-5 h-5" />, text: "Educación financiera integrada en el flujo" },
  { icon: <Award className="w-5 h-5" />, text: "Sistema de metas y seguimiento de progreso" },
];

const toolBrandColors: Record<string, string> = {
  Figma: "#F24E1E",
  Notion: "#000000",
  GitHub: "#333333",
  Slack: "#4A154B",
};

/* ══════════════════════════════════════════════
   SHARED: scroll to anchor
══════════════════════════════════════════════ */
function scrollToAnchor(anchor: string) {
  document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ══════════════════════════════════════════════
   FADE SECTION
══════════════════════════════════════════════ */
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   HERO CANVAS (dark-mode aware)
══════════════════════════════════════════════ */
function HeroCanvas({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.005;
      const { width: w, height: h } = canvas;
      const dark = isDarkRef.current;
      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, w, h);
      if (dark) {
        bg.addColorStop(0, "#010e0e"); bg.addColorStop(0.5, "#011818"); bg.addColorStop(1, "#020c0c");
      } else {
        bg.addColorStop(0, "#edfafa"); bg.addColorStop(0.5, "#f8fefe"); bg.addColorStop(1, "#fff8f3");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const waves = [
        { y: 0.08, amp: 0.08, freq: 0.9, spd: 0.4,  ph: 0.0, col: "#025959", a: 0.10, dn: false },
        { y: 0.16, amp: 0.09, freq: 1.1, spd: 0.55, ph: 1.5, col: "#037070", a: 0.07, dn: false },
        { y: 0.75, amp: 0.08, freq: 1.0, spd: 0.45, ph: 0.5, col: "#025959", a: 0.09, dn: true  },
        { y: 0.85, amp: 0.07, freq: 1.4, spd: 0.60, ph: 2.0, col: "#FF8300", a: 0.05, dn: true  },
        { y: 0.91, amp: 0.06, freq: 1.8, spd: 0.80, ph: 4.5, col: "#FF9A33", a: 0.04, dn: true  },
      ];

      waves.forEach(({ y, amp, freq, spd, ph, col, a, dn }) => {
        const baseY = h * y;
        const ampl = h * amp;
        const phase = t * spd + ph;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.moveTo(dn ? 0 : w, dn ? h : 0);
        ctx.lineTo(0, baseY + ampl * Math.sin(phase));
        const segs = 8;
        for (let i = 0; i < segs; i++) {
          const x0 = (i / segs) * w;
          const x1 = ((i + 1) / segs) * w;
          const sw = w / segs;
          ctx.bezierCurveTo(
            x0 + sw * 0.33, baseY + ampl * Math.sin(freq * Math.PI * 2 * (x0 + sw * 0.2) / w + phase),
            x0 + sw * 0.67, baseY + ampl * Math.sin(freq * Math.PI * 2 * (x0 + sw * 0.8) / w + phase),
            x1, baseY + ampl * Math.sin(freq * Math.PI * 2 * x1 / w + phase)
          );
        }
        ctx.lineTo(w, dn ? h : 0);
        ctx.closePath();
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />;
}

/* ══════════════════════════════════════════════
   PROCESS PILL BUTTON (nav + mobile strip)
══════════════════════════════════════════════ */
function ProcessPill({ step, compact = false }: { step: ProcessStep; compact?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => scrollToAnchor(step.anchor)}
      className="flex items-center gap-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200"
      style={{
        padding: compact ? "6px 14px" : "8px 18px",
        fontSize: compact ? "0.8125rem" : "0.875rem",
        background: hovered ? "rgba(2,89,89,0.10)" : "transparent",
        color: hovered ? "#025959" : undefined,
        boxShadow: hovered ? "0 2px 10px rgba(2,89,89,0.14)" : "none",
      }}
    >
      <span
        className="flex-shrink-0 transition-colors duration-200"
        style={{
          width: compact ? "14px" : "16px",
          height: compact ? "14px" : "16px",
          color: hovered ? "#025959" : "#9ca3af",
        }}
      >
        {step.icon}
      </span>
      <span className="text-gray-700 dark:text-gray-200" style={{ color: hovered ? "#025959" : undefined }}>
        {step.label}
      </span>
    </motion.button>
  );
}

/* ══════════════════════════════════════════════
   CASE STUDY NAV (with integrated sticky process pills)
══════════════════════════════════════════════ */
function CaseStudyNav({ isProcessSticky }: { isProcessSticky: boolean }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isProcessSticky
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      {/* ── Main row ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Back */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 group-hover:text-[#025959] dark:group-hover:text-[#4ecfcf] transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver</span>
            </div>
          </motion.button>

          {/* Center: label or process pills on desktop */}
          <div className="hidden md:flex items-center gap-1">
            <AnimatePresence mode="wait">
              {isProcessSticky ? (
                <motion.div
                  key="pills"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-1"
                >
                  
                  {processSteps.map((step) => (
                    <ProcessPill key={step.label} step={step} compact />
                  ))}
                </motion.div>
              ) : (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                >
                  Caso de Estudio · IUPI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg dark:bg-gray-800 hover:bg-[#025959]/10 dark:hover:bg-[#025959]/30 transition-colors duration-200 bg-[#00000000]"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-5 h-5 text-[#FF8300]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-5 h-5 text-[#025959]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Sticky process row on mobile (slides in below main row) ── */}
      <AnimatePresence>
        {isProcessSticky && (
          <motion.div
            key="mobile-pills"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
              {processSteps.map((step) => (
                <ProcessPill key={step.label} step={step} compact />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════
   PROCESS CIRCLE DIAGRAM
   SVG arrows + HTML nodes with icons
══════════════════════════════════════════════ */
function ProcessNodeButton({ step, index }: { step: ProcessStep; index: number }) {
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const { nx, ny, lx, ly } = getNodeCoords(index);

  // Determine label text-anchor based on angle
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  const labelAngleDeg = (angle * 180) / Math.PI;

  // Label alignment: top node → above, right nodes → right, bottom → below, left → left
  let labelAlign = "center";
  if (labelAngleDeg > -100 && labelAngleDeg < -80) labelAlign = "center-above";
  else if (labelAngleDeg > -80 && labelAngleDeg < 80) labelAlign = "right";
  else if (labelAngleDeg > 80 && labelAngleDeg < 160) labelAlign = "center-below";
  else labelAlign = "left";

  const nodeLeftPct = (nx / VSIZE) * 100;
  const nodeTopPct = (ny / VSIZE) * 100;
  const labelLeftPct = (lx / VSIZE) * 100;
  const labelTopPct = (ly / VSIZE) * 100;

  return (
    <>
      {/* Node button */}
      <div
        style={{
          position: "absolute",
          left: `${nodeLeftPct}%`,
          top: `${nodeTopPct}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => scrollToAnchor(step.anchor)}
          title={step.label}
          style={{
            width: `${(NODE_R * 2 / VSIZE) * 100}%`,
            aspectRatio: "1/1",
            minWidth: "52px",
            minHeight: "52px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            background: hovered
              ? "linear-gradient(135deg, #FF8300, #ff9a33)"
              : isDark
              ? "linear-gradient(135deg, #025959, #037070)"
              : "linear-gradient(135deg, #025959, #049a9a)",
            boxShadow: hovered
              ? "0 0 0 4px rgba(255,131,0,0.25), 0 8px 24px rgba(255,131,0,0.30)"
              : isDark
              ? "0 4px 16px rgba(2,89,89,0.40)"
              : "0 4px 20px rgba(2,89,89,0.28)",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Animated ring on hover */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1.15 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: "2px solid rgba(255,131,0,0.5)",
              pointerEvents: "none",
            }}
          />
          <span className="text-white flex items-center justify-center" style={{ width: 20, height: 20 }}>
            {step.icon}
          </span>
          {/* Step number badge */}
          <div
            style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: hovered ? "#025959" : "#FF8300",
              color: "#fff",
              fontSize: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              transition: "background 0.3s",
              border: "1.5px solid white",
            }}
          >
            {index + 1}
          </div>
        </motion.button>
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          left: `${labelLeftPct}%`,
          top: `${labelTopPct}%`,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <motion.span
          animate={{
            color: hovered ? "#FF8300" : isDark ? "#e5e7eb" : "#374151",
            fontWeight: hovered ? 600 : 500,
          }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "0.8rem", letterSpacing: "0.01em" }}
        >
          {step.label}
        </motion.span>
      </div>
    </>
  );
}

function ProcessCircleDiagram() {
  const { isDark } = useTheme();

  // Compute arrow paths between consecutive nodes
  const arrowPaths = processSteps.map((_, i) => {
    const curr = getNodeCoords(i);
    const next = getNodeCoords((i + 1) % 5);

    const dx = next.nx - curr.nx;
    const dy = next.ny - curr.ny;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;

    const gap = NODE_R + 10;
    const sx = curr.nx + gap * ux;
    const sy = curr.ny + gap * uy;
    const ex = next.nx - (gap + 10) * ux;
    const ey = next.ny - (gap + 10) * uy;

    // Control point: midpoint + outward from center
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    const cmx = mx - CX;
    const cmy = my - CY;
    const cmLen = Math.sqrt(cmx * cmx + cmy * cmy) || 1;
    const cpx = mx + 22 * (cmx / cmLen);
    const cpy = my + 22 * (cmy / cmLen);

    return { sx, sy, ex, ey, cpx, cpy };
  });

  const arrowColor = isDark ? "#4ecfcf" : "#025959";
  const ringColor = isDark ? "rgba(78,207,207,0.10)" : "rgba(2,89,89,0.06)";

  return (
    <div
      className="relative w-full max-w-md lg:max-w-lg mx-auto"
      style={{ paddingBottom: "100%" }}
    >
      {/* SVG: dashed orbit + arrows */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VSIZE} ${VSIZE}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          <marker
            id="cs-arrow"
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 9 3.5, 0 7"
              fill={arrowColor}
              opacity="0.55"
            />
          </marker>
          <radialGradient id="cs-ring-grad" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor={arrowColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={arrowColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radial glow background */}
        <circle cx={CX} cy={CY} r={ORBIT_R + 80} fill="url(#cs-ring-grad)" />

        {/* Dashed orbit ring */}
        <circle
          cx={CX}
          cy={CY}
          r={ORBIT_R}
          fill={ringColor}
          stroke={arrowColor}
          strokeWidth="1.2"
          strokeDasharray="6 12"
          opacity="0.35"
        />

        {/* Center label */}
        <text
          x={CX}
          y={CY - 10}
          textAnchor="middle"
          fill={arrowColor}
          fontSize="13"
          opacity="0.5"
          fontWeight="500"
        >
          Design
        </text>
        <text
          x={CX}
          y={CY + 8}
          textAnchor="middle"
          fill={arrowColor}
          fontSize="13"
          opacity="0.5"
          fontWeight="500"
        >
          Thinking
        </text>

        {/* Curved arrows */}
        {arrowPaths.map((p, i) => (
          <path
            key={i}
            d={`M ${p.sx} ${p.sy} Q ${p.cpx} ${p.cpy} ${p.ex} ${p.ey}`}
            stroke={arrowColor}
            strokeWidth="1.8"
            fill="none"
            markerEnd="url(#cs-arrow)"
            opacity="0.45"
          />
        ))}
      </svg>

      {/* HTML nodes (icon circles + labels) */}
      {processSteps.map((step, i) => (
        <ProcessNodeButton key={step.label} step={step} index={i} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TABLET PROCESS GRID (2-row pill grid)
══════════════════════════════════════════════ */
function TabletPillItem({ step, index }: { step: ProcessStep; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => scrollToAnchor(step.anchor)}
      className="flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-200 border"
      style={{
        background: hovered ? "rgba(2,89,89,0.08)" : "white",
        borderColor: hovered ? "#025959" : "rgba(2,89,89,0.15)",
        color: hovered ? "#025959" : "#374151",
        boxShadow: hovered ? "0 4px 16px rgba(2,89,89,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
        style={{
          background: hovered ? "#025959" : "rgba(2,89,89,0.12)",
          color: hovered ? "#fff" : "#025959",
        }}
      >
        {step.icon}
      </span>
      <span className="text-sm font-medium">{step.label}</span>
      <span
        className="text-xs rounded-full px-1.5 py-0.5 flex-shrink-0"
        style={{
          background: hovered ? "#FF8300" : "rgba(255,131,0,0.12)",
          color: hovered ? "#fff" : "#FF8300",
        }}
      >
        {step.num}
      </span>
    </motion.button>
  );
}

function ProcessTabletGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
      {processSteps.map((step, i) => (
        <TabletPillItem key={step.label} step={step} index={i} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MOBILE PROCESS HORIZONTAL SCROLL
══════════════════════════════════════════════ */
function MobileStripItem({ step, index }: { step: ProcessStep; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => scrollToAnchor(step.anchor)}
      className="flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: hovered ? "#FF8300" : "#025959",
          boxShadow: hovered ? "0 4px 14px rgba(255,131,0,0.35)" : "0 4px 12px rgba(2,89,89,0.25)",
        }}
      >
        <span className="text-white w-5 h-5">{step.icon}</span>
      </div>
      <span
        className="text-xs font-medium whitespace-nowrap transition-colors duration-200"
        style={{ color: hovered ? "#FF8300" : "#374151" }}
      >
        {step.label}
      </span>
    </motion.button>
  );
}

function ProcessMobileStrip() {
  return (
    <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3 px-1">
      {processSteps.map((step, i) => (
        <MobileStripItem key={step.label} step={step} index={i} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   IMAGE CAROUSEL (for mobile results)
══════════════════════════════════════════════ */
function MobileCarousel({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="px-1">
            <div className="rounded-2xl overflow-hidden shadow-xl h-64">
              <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL BADGE
══════════════════════════════════════════════ */
function ToolBadge({ icon, label, brandColor }: { icon: React.ReactNode; label: string; brandColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center gap-2 px-5 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 cursor-default transition-all duration-200"
      style={{
        borderColor: hovered ? `${brandColor}55` : undefined,
        boxShadow: hovered ? `0 8px 24px ${brandColor}22` : undefined,
      }}
    >
      <span className="w-7 h-7 transition-colors duration-200" style={{ color: hovered ? brandColor : "#025959" }}>
        {icon}
      </span>
      <span className="text-sm transition-colors duration-200" style={{ color: hovered ? brandColor : undefined }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export function IUPICaseStudy() {
  const { isDark } = useTheme();

  const processSectionRef = useRef<HTMLDivElement>(null);
  const [isProcessSticky, setIsProcessSticky] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const NAV_H = 64;
    const handle = () => {
      if (!processSectionRef.current) return;
      const rect = processSectionRef.current.getBoundingClientRect();
      setIsProcessSticky(rect.top <= NAV_H);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      <CaseStudyNav isProcessSticky={isProcessSticky} />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 pb-12">
        <HeroCanvas isDark={isDark} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(2,89,89,0.15) 0%, transparent 75%)"
              : "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.65) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 bg-[#FF8300] text-white rounded-full text-sm">
              Caso de Estudio · Fintech
            </span>
            <h1 className="mb-4 text-gray-800 dark:text-gray-100">
              IUPI – Ahorro e Inversiones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Incluyendo financieramente a la población argentina en un contexto complejo.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Hackathon No Country", "Enero 2025", "UX/UI Designer"].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full text-sm bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] border border-[#025959]/20 dark:border-[#025959]/40"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={HERO_IMG} alt="IUPI App Dashboard" className="w-full h-72 lg:h-[420px] object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(2,89,89,0.12) 0%, rgba(255,131,0,0.08) 100%)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          OVERVIEW
      ══════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
              <div>
                <span className="inline-block mb-3 px-3 py-1 bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] rounded-full text-sm">
                  Descripción General
                </span>
                <h2 className="mb-5 text-gray-800 dark:text-gray-100">El proyecto</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  IUPI nació en el hackathon{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">No Country</strong> de enero 2025,
                  con una duración de 5 semanas. El desafío fue diseñar una billetera virtual que pudiera
                  operar simultáneamente en el mercado de capitales y el mercado cripto dentro de una misma
                  app, con todos los requerimientos de un MVP completo.
                </p>
              </div>

              <div>
                <span className="inline-block mb-3 px-3 py-1 bg-[#FF8300]/10 text-[#FF8300] rounded-full text-sm">
                  Ficha del proyecto
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Rol", value: "UX/UI Designer", delay: 0.1 },
                    { label: "Sector", value: "Fintech · Web App", delay: 0.2 },
                    { label: "Duración", value: "5 semanas", delay: 0.3 },
                  ].map(({ label, value, delay }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(2,89,89,0.12)" }}
                      className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-shadow duration-200"
                    >
                      <p className="text-xs text-gray-400 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-[#025959] dark:text-[#4ecfcf] text-sm">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 uppercase tracking-widest">
                Herramientas utilizadas
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Figma className="w-7 h-7" />, label: "Figma" },
                  { icon: <FileText className="w-7 h-7" />, label: "Notion" },
                  { icon: <Github className="w-7 h-7" />, label: "GitHub" },
                  { icon: <MessageSquare className="w-7 h-7" />, label: "Slack" },
                ].map(({ icon, label }) => (
                  <ToolBadge key={label} icon={icon} label={label} brandColor={toolBrandColors[label] || "#025959"} />
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          EL PROBLEMA (anchor: empatizar)
      ══════════════════════════════ */}
      <section id="empatizar" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="inline-block mb-3 px-3 py-1 bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] rounded-full text-sm">
                  01 · Empatizar
                </span>
                <h2 className="mb-5 text-gray-800 dark:text-gray-100">
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl overflow-hidden shadow-xl"
              >
                <img src={FINANCE_IMG} alt="Financial inclusion" className="w-full h-80 object-cover" />
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          PROCESO DE DISEÑO (sticky trigger)
      ══════════════════════════════ */}
      <section
        ref={processSectionRef}
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <span className="inline-block mb-3 px-3 py-1 bg-[#FF8300]/10 text-[#FF8300] rounded-full text-sm">
              Design Thinking
            </span>
            <h2 className="text-gray-800 dark:text-gray-100">Proceso de diseño</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">
              5 etapas del Design Thinking para construir una solución centrada en el usuario.
              Haz clic en cada paso para saltar a esa sección.
            </p>
          </FadeSection>

          {/* Mobile: horizontal scroll strip */}
          <div className="sm:hidden">
            <FadeSection>
              <ProcessMobileStrip />
            </FadeSection>
          </div>

          {/* Tablet: 2-row pill grid */}
          <div className="hidden sm:block lg:hidden">
            <FadeSection>
              <ProcessTabletGrid />
            </FadeSection>
          </div>

          {/* Desktop: circular diagram */}
          <div className="hidden lg:block">
            <FadeSection delay={0.1}>
              <ProcessCircleDiagram />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          INVESTIGACIÓN (anchor: definir)
      ══════════════════════════════ */}
      <section id="definir" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <span className="inline-block mb-3 px-3 py-1 bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] rounded-full text-sm">
                  02 · Definir — Investigación
                </span>
                <h2 className="mb-5 text-gray-800 dark:text-gray-100">Hallazgos clave</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Encuestas, entrevistas y benchmarking con 120+ participantes para entender los
                  patrones de comportamiento financiero en Argentina.
                </p>
                <ul className="space-y-3">
                  {insights.map((insight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-4 h-4 flex-shrink-0 rounded-full bg-[#FF8300]/20 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8300]" />
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{insight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="rounded-t-3xl overflow-hidden shadow-xl">
                  <img src={RESEARCH_IMG} alt="Research data" className="w-full h-64 object-cover" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-b-3xl p-6 border border-t-0 border-gray-100 dark:border-gray-700 shadow-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Muestra de investigación</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[{ n: "120+", label: "Encuestados" }, { n: "15", label: "Entrevistas" }, { n: "8", label: "Benchmarks" }].map(({ n, label }) => (
                      <div key={label}>
                        <p className="text-2xl text-[#025959] dark:text-[#4ecfcf]">{n}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          IDEACIÓN (anchor: idear)
      ══════════════════════════════ */}
      <section id="idear" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-12">
            <span className="inline-block mb-3 px-3 py-1 bg-[#FF8300]/10 text-[#FF8300] rounded-full text-sm">
              03 · Idear — Ideación
            </span>
            <h2 className="text-gray-800 dark:text-gray-100">Del concepto al diseño</h2>
          </FadeSection>

          <div className="md:hidden">
            <FadeSection delay={0.1}>
              <MobileCarousel images={[WIREFRAME_IMG, MOCKUP_IMG]} />
            </FadeSection>
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <FadeSection delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(2,89,89,0.15)" }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl overflow-hidden shadow-xl h-72 cursor-pointer"
              >
                <img src={WIREFRAME_IMG} alt="Wireframes" className="w-full h-full object-cover" />
              </motion.div>
              <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">Wireframes y bocetos iniciales</p>
            </FadeSection>
            <FadeSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(2,89,89,0.15)" }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl overflow-hidden shadow-xl h-72 cursor-pointer"
              >
                <img src={MOCKUP_IMG} alt="Mockups" className="w-full h-full object-cover" />
              </motion.div>
              <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">Mockups de alta fidelidad</p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          RESULTADOS (anchor: prototipar)
      ══════════════════════════════ */}
      <section id="prototipar" className="py-16 md:py-24 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="md:hidden">
                <MobileCarousel images={[WIREFRAME_IMG, MOCKUP_IMG, HERO_IMG]} />
              </div>
              <motion.div
                className="hidden md:block rounded-3xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={MOCKUP_IMG} alt="IUPI final mockups" className="w-full h-80 object-cover" />
              </motion.div>

              <div>
                <span className="inline-block mb-3 px-3 py-1 bg-[#025959]/10 dark:bg-[#025959]/25 text-[#025959] dark:text-[#4ecfcf] rounded-full text-sm">
                  04 · Prototipar — Resultados
                </span>
                <h2 className="mb-5 text-gray-800 dark:text-gray-100">Funcionalidades finales</h2>
                <ul className="space-y-4 mb-8">
                  {functionalities.map(({ icon, text }, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <span className="text-[#FF8300] flex-shrink-0">{icon}</span>
                      {text}
                    </motion.li>
                  ))}
                </ul>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#025959]/10 to-[#FF8300]/10 dark:from-[#025959]/20 dark:to-[#FF8300]/15 border border-[#025959]/15 dark:border-[#025959]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-[#FF8300]" />
                    <h4 className="text-gray-800 dark:text-gray-100">Demo Day</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    IUPI fue presentado exitosamente en el Demo Day de No Country ante un panel de evaluadores
                    de la industria fintech, recibiendo feedback positivo por la claridad del flujo y la
                    propuesta de valor.
                  </p>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          IMPACTO (anchor: probar)
      ══════════════════════════════ */}
      <section id="probar" className="py-16 md:py-20 bg-gradient-to-br from-[#025959] to-[#014040] dark:from-[#012020] dark:to-[#010c0c] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <FadeSection>
            <span className="inline-block mb-4 px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
              05 · Probar — Impacto
            </span>
            <TrendingUp className="w-12 h-12 text-[#FF8300] mx-auto mb-6" />
            <h2 className="mb-5 text-white">El impacto del proyecto</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              IUPI demostró que es posible diseñar una experiencia financiera inclusiva sin sacrificar
              potencia funcional. En 5 semanas logramos un MVP completo con flujos validados por usuarios reales.
            </p>
            <blockquote className="relative border-l-4 border-[#FF8300] pl-6 text-left max-w-xl mx-auto">
              <p className="text-white/90 italic leading-relaxed">
                "El diseño no solo hace las cosas bonitas — las hace accesibles para quienes antes no tenían acceso."
              </p>
              <footer className="mt-2 text-white/55 text-sm">— Reflexión del equipo IUPI</footer>
            </blockquote>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          CERTIFICADO
      ══════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection className="text-center mb-10">
            <span className="inline-block mb-3 px-3 py-1 bg-[#FF8300]/10 text-[#FF8300] rounded-full text-sm">
              Reconocimiento
            </span>
            <h2 className="text-gray-800 dark:text-gray-100">Certificado de participación</h2>
          </FadeSection>
          <FadeSection delay={0.15}>
            <div className="max-w-xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 24px 60px rgba(2,89,89,0.18)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl overflow-hidden shadow-2xl mb-6 cursor-zoom-in"
              >
                <img src={CERT_IMG} alt="NoCountry certificate" className="w-full h-72 object-cover" />
              </motion.div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-[#FF8300]" />
                  <h4 className="text-gray-800 dark:text-gray-100">No Country · Hackathon 2025</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reconocimiento por participación como{" "}
                  <strong className="text-[#025959] dark:text-[#4ecfcf]">UX/UI Designer</strong> en el
                  hackathon IUPI, proyecto de ahorro e inversiones para el mercado argentino. Enero 2025.
                </p>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA FINAL
      ══════════════════════════════ */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeSection>
            <p className="text-gray-500 dark:text-gray-400 mb-6">¿Te interesa conocer más sobre mi trabajo?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButtons />
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}

function CtaButtons() {
  const navigate = useNavigate();
  return (
    <>
      
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(2,89,89,0.30)" }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {   navigate("/");
          setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 400);
        }}
        className="flex items-center justify-center gap-2 px-7 py-3 bg-[#025959] text-white dark:text-White rounded-xl hover:bg-[#037070] dark:hover:bg-[#037070] transition-all duration-300"
      >
        Contactar
      </motion.button>
    </>
  );
}
