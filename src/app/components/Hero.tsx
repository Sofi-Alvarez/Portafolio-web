import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

/* ─── CSS keyframes injected once ─────────────────────────────────────────── */
const WAVE_STYLES = `
  @keyframes heroWave {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes heroBlobFloat {
    0%,100% { transform: translateY(0px)   translateX(0px);   }
    33%     { transform: translateY(-20px)  translateX(12px);  }
    66%     { transform: translateY(10px)   translateX(-8px);  }
  }
`;

export function Hero() {
  const { isDark } = useTheme();

  /* ── Background gradient mesh ── */
  const bgStyle: React.CSSProperties = {
    background: isDark
      ? `
          radial-gradient(60% 50% at 15% 10%, rgba(2,89,89,0.22), transparent 60%),
          radial-gradient(50% 50% at 90% 0%,  rgba(255,131,0,0.14), transparent 60%),
          #0a1515
        `
      : `
          radial-gradient(60% 50% at 15% 10%, rgba(2,89,89,0.14), transparent 60%),
          radial-gradient(50% 50% at 90% 0%,  rgba(255,131,0,0.12), transparent 60%),
          #f8fefe
        `,
  };

  return (
    <section
      id="home"
      aria-label="Presentación"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
      style={bgStyle}
    >
      {/* ── Inject wave + blob keyframes ── */}
      <style>{WAVE_STYLES}</style>

      {/* ── Decorative blob — top-left (teal) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: "rgba(2,89,89,0.18)",
          animation: "heroBlobFloat 9s ease-in-out infinite",
        }}
      />

      {/* ── Decorative blob — bottom-right (orange) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background: "rgba(255,131,0,0.16)",
          animation: "heroBlobFloat 12s ease-in-out infinite reverse",
        }}
      />

      {/* ── Animated SVG wave layers (bottom edge) ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Slowest wave — lightest teal */}
        <svg
          className="absolute bottom-0 left-0 min-w-[200%]"
          style={{ height: "40%", animation: "heroWave 32s linear infinite" }}
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,224 C240,288 480,160 720,176 C960,192 1200,288 1440,272
               C1680,256 1920,160 2160,160 C2400,160 2640,256 2880,224
               L2880,320 L0,320 Z"
            fill={isDark ? "rgba(2,89,89,0.16)" : "rgba(2,89,89,0.10)"}
          />
        </svg>

        {/* Medium wave — mid teal */}
        <svg
          className="absolute bottom-0 left-0 min-w-[200%]"
          style={{ height: "34%", animation: "heroWave 22s linear infinite" }}
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,192 C320,128 640,256 960,224 C1280,192 1600,96 1920,128
               C2240,160 2560,256 2880,192 L2880,320 L0,320 Z"
            fill={isDark ? "rgba(2,89,89,0.22)" : "rgba(2,89,89,0.16)"}
          />
        </svg>

        {/* Fastest wave — teal-to-orange gradient */}
        <svg
          className="absolute bottom-0 left-0 min-w-[200%]"
          style={{ height: "26%", animation: "heroWave 14s linear infinite" }}
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroWaveGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#025959" stopOpacity={isDark ? "0.38" : "0.28"} />
              <stop offset="100%" stopColor="#FF8300" stopOpacity={isDark ? "0.30" : "0.22"} />
            </linearGradient>
          </defs>
          <path
            d="M0,256 C320,192 640,288 960,256 C1280,224 1600,160 1920,192
               C2240,224 2560,288 2880,256 L2880,320 L0,320 Z"
            fill="url(#heroWaveGrad)"
          />
        </svg>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        {/* Status badge */}
        <motion.span
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap"
          style={{
            borderColor: "rgba(2,89,89,0.25)",
            background: isDark ? "rgba(2,89,89,0.18)" : "rgba(2,89,89,0.08)",
            color: isDark ? "#4ecfcf" : "#025959",
          }}
        >
          ✦ Product Designer & Design Engineer · Disponible
        </motion.span>

        {/* Greeting */}
        <motion.p
          className="mt-8 text-xl sm:text-2xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Hola, soy{" "}
          <span className="font-bold" style={{ color: "#FF8300" }}>
            ¡Sofía!
          </span>
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Una{" "}
          <span style={{ color: "#025959" }}>Product Designer</span>{" "}
          creando experiencias digitales{" "}
          {/* "excepcionales" with SVG hand-drawn underline */}
          <span className="relative inline-block" style={{ color: "#FF8300" }}>
            excepcionales
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2,8 Q50,2 100,7 T198,6"
                stroke="#FF8300"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-8 mx-auto max-w-2xl text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          De la investigación a producción. Diseño y desarrollo asistido por IA
          hasta el producto testeado con usuarios reales. Las decisiones de
          diseño son mías; la IA implementa.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            whileHover={{
              y: -2,
              backgroundColor: "#037070",
              boxShadow: "0 14px 32px rgba(2,89,89,0.40)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base sm:text-lg font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#025959] focus:ring-offset-2"
            style={{
              background: "#025959",
              boxShadow: "0 10px 28px rgba(2,89,89,0.30)",
            }}
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Ir a la sección de proyectos"
            data-ga-action="cta_click"
            data-ga-category="CTA"
            data-ga-label="Ver Proyectos Hero"
          >
            Ver Proyectos →
          </motion.button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-hidden="true"
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
