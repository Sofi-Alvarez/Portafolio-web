import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { SiFigma } from "react-icons/si";
import { PenLine } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import iupiPort   from "../../imports/iupicont.svg";
import bookiePort  from "../../imports/Bookiecont.svg";
import bankPort    from "../../imports/Masbankcont.svg";
import vibeDesign1 from "../../imports/Portfolio vibe-design1.jpg";

/* ══════════════════════════════════════════════════════════
   TOOL DEFINITIONS
══════════════════════════════════════════════════════════ */
type ToolDef =
  | { type: "icon"; label: string; Icon: React.ElementType; color: string }
  | { type: "text"; label: string; abbr: string;            color: string };

const TOOLS: Record<string, ToolDef> = {
  Figma:       { type: "icon", label: "Figma",         Icon: SiFigma,  color: "#1ABCFE" },
  Photoshop:   { type: "text", label: "Photoshop",     abbr: "Ps",     color: "#31A8FF" },
  Illustrator: { type: "text", label: "Illustrator",   abbr: "Ai",     color: "#FF9A00" },
  PenLine:     { type: "icon", label: "Lápiz y Papel", Icon: PenLine,  color: "#6B7280" },
  DALLE:       { type: "text", label: "DALL·E",        abbr: "DL",     color: "#10A37F" },
  Midjourney:  { type: "text", label: "Midjourney",    abbr: "MJ",     color: "#1A1A2E" },
  FigmaMake:   { type: "icon", label: "Figma Make",    Icon: SiFigma,  color: "#8B5CF6" },
  ClaudeCode:  { type: "text", label: "Claude Code",   abbr: "CC",     color: "#CC785C" },
  Lovable:     { type: "text", label: "Lovable",       abbr: "Lv",     color: "#A855F7" },
  ChatGPT:     { type: "text", label: "ChatGPT",       abbr: "GPT",    color: "#10A37F" },
};

/* ══════════════════════════════════════════════════════════
   PROJECT DATA
══════════════════════════════════════════════════════════ */
interface ProjectDef {
  slug: string;
  title: string;
  badge: string;
  role: string;
  description: string;
  image: string;
  tools: string[];
  accentColor: string;
}

const PROJECTS: ProjectDef[] = [
  {
    slug: "/case-study/iupi",
    title: "IUPI — Fintech de ahorro e inversiones",
    badge: "Estudios 2024",
    role: "Diseñadora UX/UI",
    description:
      "Una app que simplifica la inversión: capitales y cripto en un mismo lugar, diseñada para que cualquier usuario pueda operar con confianza.",
    image: iupiPort,
    tools: ["Figma", "Illustrator", "Photoshop", "PenLine"],
    accentColor: "#004AAC",
  },
  {
    slug: "/case-study/portfolio",
    title: "Portfolio Web — Vibe-Coding",
    badge: "Vibe-Coding",
    role: "UX/UI Designer + Developer",
    description:
      "El portfolio que estás viendo, construido desde cero en 2 semanas con Vibe Coding y Claude Code. Design system propio, dark mode, responsive y case studies completos.",
    image: vibeDesign1,
    tools: ["FigmaMake", "PenLine", "ClaudeCode", "Lovable", "ChatGPT"],
    accentColor: "#025959",
  },
  {
    slug: "/case-study/+bank",
    title: "Mas+ Bank — App bancaria responsive",
    badge: "Estudios 2024",
    role: "Diseñadora UX/UI",
    description:
      "Un banco digital pensado para la vida cotidiana: transferencias seguras y simples, accesibles desde cualquier dispositivo sin fricciones.",
    image: bankPort,
    tools: ["Figma", "Illustrator", "Photoshop", "PenLine"],
    accentColor: "#025959",
  },
  {
    slug: "/case-study/bookie",
    title: "Bookie — App de lectura geolocalizada",
    badge: "Estudios 2024",
    role: "Diseñadora UX/UI",
    description:
      "Transformamos la lectura en una experiencia viva: historias que se desbloquean en el mundo real, guiando al usuario paso a paso sin perder la magia.",
    image: bookiePort,
    tools: ["Figma", "Photoshop", "PenLine", "DALLE", "Midjourney"],
    accentColor: "#FF8300",
  },
];

/* ══════════════════════════════════════════════════════════
   TOOL CHIP — compact, static, no hover, title tooltip
══════════════════════════════════════════════════════════ */
function ToolChip({ toolKey, isDark }: { toolKey: string; isDark: boolean }) {
  const def = TOOLS[toolKey];
  if (!def) return null;
  const tileBg = isDark ? "rgba(55,65,81,0.85)" : "#ffffff";
  return (
    <span
      title={def.label}
      aria-label={def.label}
      className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0"
      style={{ background: tileBg }}
    >
      {def.type === "icon" ? (
        <def.Icon className="w-4 h-4" style={{ color: def.color }} />
      ) : (
        <span className="text-[9px] font-bold leading-none" style={{ color: def.color }}>
          {def.abbr}
        </span>
      )}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   CARD FOOTER — tools + CTA row (shared across all sizes)
══════════════════════════════════════════════════════════ */
function CardFooter({ project, isDark }: { project: ProjectDef; isDark: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 mt-auto">
      <div className="flex items-center gap-1.5 flex-wrap">
        {project.tools.map((key) => (
          <ToolChip key={key} toolKey={key} isDark={isDark} />
        ))}
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#025959] dark:text-[#4ecfcf] whitespace-nowrap group-hover:gap-2 transition-all duration-200">
        Ver caso
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRIMARY CARD — IUPI (full width, image left on desktop)
══════════════════════════════════════════════════════════ */
function PrimaryCard({ project, index }: { project: ProjectDef; index: number }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -4, boxShadow: `0 28px 56px ${project.accentColor}28` }}
      onClick={() => navigate(project.slug)}
      onKeyDown={(e) => e.key === "Enter" && navigate(project.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Ver caso de estudio: ${project.title}`}
      data-ga-action="project_click"
      data-ga-category="Projects"
      data-ga-label={project.title}
      className="group flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#025959] focus:ring-offset-2 transition-shadow"
    >
      {/* Image — full top on mobile, left 44% on desktop */}
      <div
        className="relative overflow-hidden h-56 sm:h-72 md:h-auto md:w-[44%] flex-shrink-0 flex items-center justify-center"
        style={{ background: isDark ? `${project.accentColor}18` : `${project.accentColor}0d` }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Right-edge fade into content panel on desktop */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to right, transparent 55%, rgb(17,24,39) 100%)"
              : "linear-gradient(to right, transparent 55%, #ffffff 100%)",
          }}
        />
      </div>

      {/* Content panel */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-10">
        {/* Badge + role */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#FF8300] text-white shadow-sm">
            {project.badge}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {project.role}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="h-0.5 rounded-full mb-5"
          style={{ background: `linear-gradient(to right, ${project.accentColor}70, transparent)` }}
        />

        <CardFooter project={project} isDark={isDark} />
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════
   SECONDARY CARD — Portfolio / Mas+ Bank (image top, info below)
══════════════════════════════════════════════════════════ */
function SecondaryCard({ project, index }: { project: ProjectDef; index: number }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: `0 20px 44px ${project.accentColor}24` }}
      onClick={() => navigate(project.slug)}
      onKeyDown={(e) => e.key === "Enter" && navigate(project.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Ver caso de estudio: ${project.title}`}
      data-ga-action="project_click"
      data-ga-category="Projects"
      data-ga-label={project.title}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#025959] focus:ring-offset-2 transition-shadow h-full"
    >
      {/* Image — contained in a padded tinted box */}
      <div
        className="relative overflow-hidden h-52 sm:h-60 flex items-center justify-center flex-shrink-0"
        style={{ background: isDark ? `${project.accentColor}18` : `${project.accentColor}0d` }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04] p-4"
        />
        {/* Bottom edge fade into info block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent 60%, rgb(17,24,39) 100%)"
              : "linear-gradient(to bottom, transparent 60%, #ffffff 100%)",
          }}
        />
      </div>

      {/* Info block */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Badge + role */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#FF8300] text-white shadow-sm">
            {project.badge}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {project.role}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 leading-snug mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="h-0.5 rounded-full mb-4"
          style={{ background: `linear-gradient(to right, ${project.accentColor}60, transparent)` }}
        />

        <CardFooter project={project} isDark={isDark} />
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════
   TERTIARY CARD — Bookie (compact horizontal, centered)
══════════════════════════════════════════════════════════ */
function TertiaryCard({ project, index }: { project: ProjectDef; index: number }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: `0 16px 36px ${project.accentColor}28` }}
      onClick={() => navigate(project.slug)}
      onKeyDown={(e) => e.key === "Enter" && navigate(project.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Ver caso de estudio: ${project.title}`}
      data-ga-action="project_click"
      data-ga-category="Projects"
      data-ga-label={project.title}
      className="group flex mx-auto w-full max-w-2xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#025959] focus:ring-offset-2 transition-shadow"
    >
      {/* Square image sidebar */}
      <div
        className="relative overflow-hidden w-28 sm:w-36 flex-shrink-0 flex items-center justify-center"
        style={{ background: isDark ? `${project.accentColor}18` : `${project.accentColor}0d` }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.05] p-3"
        />
      </div>

      {/* Info block */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Badge + role */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#FF8300] text-white shadow-sm">
            {project.badge}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {project.role}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 leading-snug mb-1.5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        <CardFooter project={project} isDark={isDark} />
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION EXPORT
══════════════════════════════════════════════════════════ */
export function Projects() {
  const [iupi, portfolio, bank, bookie] = PROJECTS;

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hacé clic en cualquier proyecto para ver el caso de estudio completo.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">

          {/* Row 1 — Primary hero: IUPI */}
          <PrimaryCard project={iupi} index={0} />

          {/* Row 2 — Secondary 2-col: Portfolio + Mas+ Bank */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <SecondaryCard project={portfolio} index={1} />
            <SecondaryCard project={bank}      index={2} />
          </div>

          {/* Row 3 — Tertiary compact: Bookie */}
          <TertiaryCard project={bookie} index={3} />

        </div>
      </div>
    </section>
  );
}
