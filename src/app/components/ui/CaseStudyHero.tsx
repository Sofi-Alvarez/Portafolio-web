/**
 * CaseStudyHero — shared hero section for all case study pages.
 *
 * Layout (Lovable design):
 *  - Gradient-mesh background in case brand color
 *  - Two static blob decorations
 *  - Centered badge pill
 *  - 2-column grid: left = title + description + tag pills / right = device mockup
 *
 * Variants:
 *  "phones"        → two overlapping phone frames (IUPI, Bookie)
 *  "desktop-phone" → browser frame + floating phone (Mas+ Bank)
 */

import { motion } from "motion/react";
import { useTheme } from "../../contexts/ThemeContext";

/* ─── Types ─────────────────────────────────────────────────────────────── */
export interface CaseStudyHeroProps {
  /** Badge text, e.g. "Caso de Estudio · IUPI" */
  badgeLabel: string;
  /** Plain part of H1, e.g. "IUPI –" */
  titlePrefix: string;
  /** Colored part of H1, e.g. "Ahorro e Inversiones" */
  titleAccent: string;
  description: string;
  tags: string[];
  /** Fallback image used for all frames when specific overrides are not provided */
  image: string;
  imageAlt: string;
  /** phones variant — first phone screen (front, rotated -6°) */
  imageMobile1?: string;
  /** phones variant — second phone screen (back, rotated +6°) */
  imageMobile2?: string;
  /** desktop-phone variant — desktop browser frame content */
  imageDesktop?: string;
  /** desktop-phone variant — small floating phone content */
  imageMobileSmall?: string;
  /** Brand hex, e.g. "#025959" */
  brandColor: string;
  /** Dark-mode brand hex, e.g. "#4ecfcf" */
  brandColorDark: string;
  /** Right-side mockup style */
  variant?: "phones" | "desktop-phone";
}

/* ─── Phone-frame sub-component ─────────────────────────────────────────── */
function PhoneFrame({
  image, alt, rotation, width = 196, marginLeft = 0, marginTop = 0, zIndex = 1,
}: {
  image: string; alt: string; rotation: number; width?: number;
  marginLeft?: number; marginTop?: number; zIndex?: number;
}) {
  const border   = Math.round(width * 0.038);
  const radius   = Math.round(width * 0.158);
  const notchH   = Math.round(width * 0.082);
  const pillW    = Math.round(width * 0.30);
  const pillH    = Math.round(width * 0.038);
  const screenH  = Math.round(width * 1.72);

  return (
    <div style={{
      width,
      marginLeft,
      marginTop,
      flexShrink: 0,
      position: "relative",
      zIndex,
      borderRadius: radius,
      border:  `${border}px solid #111827`,
      background: "#fff",
      overflow: "hidden",
      transform: `rotate(${rotation}deg)`,
      boxShadow: "0 24px 64px rgba(0,0,0,0.34), 0 0 0 1px rgba(0,0,0,0.10)",
    }}>
      {/* Notch */}
      <div style={{
        height: notchH,
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ width: pillW, height: pillH, background: "#374151", borderRadius: 99 }} />
      </div>
      {/* Screen content */}
      <img
        src={image}
        alt={alt}
        style={{ width: "100%", height: screenH, objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ─── Desktop-browser frame sub-component ───────────────────────────────── */
function DesktopFrame({ image, alt }: { image: string; alt: string }) {
  return (
    <div style={{
      borderRadius: 10,
      border: "2px solid #d1d5db",
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 20px 56px rgba(0,0,0,0.22)",
    }}>
      {/* macOS traffic-light bar */}
      <div style={{
        height: 28,
        background: "#f3f4f6",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        gap: 5,
      }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#eab308" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
      </div>
      <img
        src={image}
        alt={alt}
        style={{ width: "100%", height: 256, objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export function CaseStudyHero({
  badgeLabel,
  titlePrefix,
  titleAccent,
  description,
  tags,
  image,
  imageAlt,
  imageMobile1,
  imageMobile2,
  imageDesktop,
  imageMobileSmall,
  brandColor,
  brandColorDark,
  variant = "phones",
}: CaseStudyHeroProps) {
  const { isDark } = useTheme();
  const color = isDark ? brandColorDark : brandColor;

  /* Background gradient mesh */
  const bgStyle: React.CSSProperties = {
    background: isDark
      ? [
          `radial-gradient(55% 45% at 10%  8%, ${brandColor}26, transparent 55%)`,
          `radial-gradient(45% 40% at 90%  0%, ${brandColor}18, transparent 55%)`,
          "#0a1515",
        ].join(", ")
      : [
          `radial-gradient(55% 45% at 10%  8%, ${brandColor}22, transparent 55%)`,
          `radial-gradient(45% 40% at 90%  0%, ${brandColor}14, transparent 55%)`,
          "#f8fefe",
        ].join(", "),
  };

  return (
    <section
      aria-label="Presentación del caso de estudio"
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28 pb-20"
      style={bgStyle}
    >

      {/* ── Blob top-left ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: `${brandColor}2e`,
        }}
      />

      {/* ── Blob bottom-right ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{
          background: `${brandColor}1e`,
        }}
      />

      {/* ── Badge (centered) ── */}
      <div className="relative z-10 flex justify-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium"
          style={{ borderColor: `${brandColor}4d`, color }}
        >
          {badgeLabel}
        </motion.span>
      </div>

      {/* ── Two-column content ── */}
      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

        {/* Left: text */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-gray-900 dark:text-gray-100">
            {titlePrefix}{" "}
            <span style={{ color }}>{titleAccent}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.06 }}
                className="rounded-full border px-4 py-1.5 text-sm font-medium"
                style={{
                  borderColor: `${brandColor}4d`,
                  background: isDark ? `${brandColor}26` : `${brandColor}14`,
                  color,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right: device mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow behind the mockup */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 m-auto h-[380px] w-[380px] rounded-full blur-3xl"
            style={{ background: `${brandColor}3d` }}
          />

          {variant === "phones" ? (
            /* ── Dual phone layout (escalado en mobile para que no se corte contra el borde) ── */
            <div className="flex items-center justify-center scale-[0.82] sm:scale-100 origin-center">
              <PhoneFrame
                image={imageMobile1 ?? image}
                alt={imageAlt}
                rotation={-6}
                zIndex={10}
                width={186}
              />
              <PhoneFrame
                image={imageMobile2 ?? imageMobile1 ?? image}
                alt={imageAlt}
                rotation={6}
                zIndex={9}
                width={186}
                marginLeft={-32}
                marginTop={40}
              />
            </div>
          ) : (
            /* ── Desktop + floating phone layout ── */
            <div className="relative pb-10 pr-4 sm:pr-8">
              <DesktopFrame image={imageDesktop ?? image} alt={imageAlt} />
              <div
                className="absolute -bottom-2 -right-2 sm:-right-6"
                style={{ zIndex: 10 }}
              >
                <PhoneFrame
                  image={imageMobileSmall ?? imageMobile1 ?? image}
                  alt={imageAlt}
                  rotation={8}
                  width={156}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
