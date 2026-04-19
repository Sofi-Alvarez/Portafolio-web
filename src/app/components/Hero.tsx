import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface WaveLayer {
  yRatio: number;       // vertical position as ratio of height
  ampRatio: number;     // amplitude as ratio of height
  freq: number;         // spatial frequency
  speed: number;        // animation speed multiplier
  phaseOffset: number;  // initial phase offset
  color: string;
  alpha: number;
  fillDown: boolean;    // fills downward or upward
}

function drawOrganicWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  layer: WaveLayer,
  time: number
) {
  const { yRatio, ampRatio, freq, speed, phaseOffset, color, alpha, fillDown } = layer;
  const baseY = h * yRatio;
  const amp = h * ampRatio;
  const phase = time * speed + phaseOffset;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();

  // Compute y at a given x using summed harmonics for organic look
  const getY = (x: number) => {
    const t = x / w; // 0..1
    return (
      baseY +
      amp * Math.sin(freq * Math.PI * 2 * t + phase) +
      amp * 0.45 * Math.sin(freq * 2.7 * Math.PI * 2 * t + phase * 1.3 + 1.1) +
      amp * 0.25 * Math.cos(freq * 1.4 * Math.PI * 2 * t + phase * 0.8 + 2.4) +
      amp * 0.15 * Math.sin(freq * 3.8 * Math.PI * 2 * t + phase * 1.9 + 0.7)
    );
  };

  // Build path using cubic bezier segments for smooth organic curves
  const segments = 8;
  const segW = w / segments;

  const startY = getY(0);
  ctx.moveTo(fillDown ? 0 : w, fillDown ? h : 0);
  ctx.lineTo(0, startY);

  for (let i = 0; i < segments; i++) {
    const x0 = i * segW;
    const x1 = (i + 1) * segW;
    const cp1x = x0 + segW * 0.33;
    const cp2x = x0 + segW * 0.67;

    // Sample y at control point positions for smooth curves
    const cp1y = getY(x0 + segW * 0.2);
    const cp2y = getY(x0 + segW * 0.8);
    const endY = getY(x1);

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, endY);
  }

  ctx.lineTo(w, fillDown ? h : 0);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      time += 0.006;
      const w = canvas.width;
      const h = canvas.height;
      const dark = isDarkRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Background gradient ──────────────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, w * 0.6, h);
      if (dark) {
        bg.addColorStop(0, "#010e0e");
        bg.addColorStop(0.6, "#011818");
        bg.addColorStop(1, "#020c0c");
      } else {
        bg.addColorStop(0, "#edfafa");
        bg.addColorStop(0.5, "#f8fefe");
        bg.addColorStop(1, "#fff8f3");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ── Color palette ────────────────────────────────────────────────
      const c = {
        tealDeep:   dark ? "#012e2e" : "#025959",
        tealMid:    dark ? "#025959" : "#037070",
        tealLight:  dark ? "#037070" : "#049a9a",
        tealFaint:  dark ? "#024040" : "#02b3b3",
        orange:     "#FF8300",
        orangeMid:  "#FF9A33",
      };

      // ── Wave layers ──────────────────────────────────────────────────
      // Each wave: position, amplitude, frequency, speed, phase, color, alpha, fillDown
      const layers: WaveLayer[] = [
        // ── Top cluster — flows from top down ──
        { yRatio: 0.08, ampRatio: 0.09, freq: 0.8, speed: 0.45, phaseOffset: 0.0,  color: c.tealMid,   alpha: 0.10, fillDown: false },
        { yRatio: 0.13, ampRatio: 0.11, freq: 1.1, speed: 0.55, phaseOffset: 1.5,  color: c.tealDeep,  alpha: 0.07, fillDown: false },
        { yRatio: 0.19, ampRatio: 0.08, freq: 0.6, speed: 0.35, phaseOffset: 3.0,  color: c.tealLight, alpha: 0.06, fillDown: false },
        { yRatio: 0.25, ampRatio: 0.10, freq: 1.3, speed: 0.65, phaseOffset: 0.8,  color: c.tealMid,   alpha: 0.08, fillDown: false },
        // orange accent top
        { yRatio: 0.10, ampRatio: 0.07, freq: 1.6, speed: 0.9,  phaseOffset: 4.5,  color: c.orange,    alpha: 0.04, fillDown: false },

        // ── Bottom cluster — fills from bottom up ──
        { yRatio: 0.78, ampRatio: 0.10, freq: 0.9, speed: 0.50, phaseOffset: 0.5,  color: c.tealFaint, alpha: 0.07, fillDown: true },
        { yRatio: 0.72, ampRatio: 0.12, freq: 1.2, speed: 0.40, phaseOffset: 2.0,  color: c.tealMid,   alpha: 0.09, fillDown: true },
        { yRatio: 0.66, ampRatio: 0.09, freq: 0.7, speed: 0.60, phaseOffset: 1.2,  color: c.tealDeep,  alpha: 0.11, fillDown: true },
        { yRatio: 0.60, ampRatio: 0.11, freq: 1.4, speed: 0.35, phaseOffset: 3.5,  color: c.tealLight, alpha: 0.06, fillDown: true },
        { yRatio: 0.55, ampRatio: 0.08, freq: 1.0, speed: 0.70, phaseOffset: 0.3,  color: c.tealMid,   alpha: 0.08, fillDown: true },
        // orange accent bottom
        { yRatio: 0.88, ampRatio: 0.07, freq: 1.7, speed: 0.85, phaseOffset: 1.8,  color: c.orangeMid, alpha: 0.05, fillDown: true },
        { yRatio: 0.82, ampRatio: 0.06, freq: 2.0, speed: 1.10, phaseOffset: 5.0,  color: c.orange,    alpha: 0.04, fillDown: true },

        // ── Midfield accent strands ──
        { yRatio: 0.48, ampRatio: 0.13, freq: 0.5, speed: 0.28, phaseOffset: 2.8,  color: c.tealDeep,  alpha: 0.05, fillDown: true },
        { yRatio: 0.42, ampRatio: 0.10, freq: 0.7, speed: 0.32, phaseOffset: 4.2,  color: c.tealMid,   alpha: 0.04, fillDown: false },
      ];

      // Draw from back to front
      layers.forEach((layer) => drawOrganicWave(ctx, w, h, layer, time));

      // ── Soft radial vignette to keep center clear ────────────────────
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.55;
      const vignette = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius);
      vignette.addColorStop(0, dark ? "rgba(1,14,14,0)" : "rgba(248,254,254,0)");
      vignette.addColorStop(1, dark ? "rgba(1,14,14,0)" : "rgba(248,254,254,0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20"
    >
      {/* ── Animated Canvas Background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* ── Subtle center glow to lift text ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 75%)",
        }}
      />
      {/* Dark mode center glow */}
      <div
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(1,20,20,0.60) 0%, transparent 75%)",
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Greeting */}
          

          {/* Name */}
          <motion.h1
            className="mb-5 font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ><span className="text-gray-800 dark:text-gray-100 text-[26px]">Hola, soy </span><span
              className="relative inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #025959 0%, #039595 50%, #025959 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >¡Sofía!</span></motion.h1>

          {/* Tagline */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.9 }}
          >
            <style>{`
              @keyframes gradientShift {
                0%   { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
            <p
              className="max-w-2xl mx-auto font-extrabold"
              style={{
                fontSize: "48px",
                backgroundImage: "linear-gradient(135deg, #FF8300 0%, #038080 25%, #FF8300 50%, #038080 75%, #FF8300 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "400% 400%",
                animation: "gradientShift 8s linear infinite",
              }}
            >Una diseñadora <span>UX/UI</span> creando experiencias digitales <span>excepcionales</span></p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(2,89,89,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-[#025959] text-white rounded-xl hover:bg-[#037070] transition-all duration-300"
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Proyectos
            </motion.button>

            
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#025959]/70 dark:text-[#4ecfcf]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}