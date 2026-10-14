import { motion } from "motion/react";
import {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiNotion,
  SiJira,
  SiTrello,
  SiNetlify,
  SiMiro,
  SiLoom,
  SiOpenai,
  SiGooglegemini,
  SiClaude,
  SiHtml5,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFlutter,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa6";
import { PenLine } from "lucide-react";
import { ToolGlyph, hasToolGlyph } from "./ui/ToolGlyph";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type AdobeTool  = { type: "adobe";  name: string; abbr: string; color: string; bg: string };
type SiTool     = { type: "si";     name: string; color: string; icon: React.ElementType };
type LucideTool = { type: "lucide"; name: string; color: string; icon: React.ElementType };
type TextTool   = { type: "text";   name: string; abbr: string; color: string; bg: string };
type ToolEntry  = AdobeTool | SiTool | LucideTool | TextTool;

/* ─── Data ──────────────────────────────────────────────────────────────── */
const uxSkills = [
  "UX Research: entrevistas, encuestas, benchmark y evaluación heurística",
  "Testing de usabilidad moderado y no moderado (Maze, SEQ)",
  "Arquitectura de información: card sorting, sitemaps y user flows",
  "Interaction Design (IxD)",
  "User Personas, journey maps, customer journeys y How Might We",
  "UX Writing y microcopy",
  "UX Analytics y medición (Google Analytics, Vercel Web Analytics)",
  "Definición de MVP y descubrimiento con stakeholders",
  "Handoff a desarrollo y trabajo en Agile/Scrum",
];

const designSkills = [
  "UI Design: wireframes, mockups y prototipado de baja a alta fidelidad",
  "Design systems en Figma: variables, componentes y variantes",
  "Material Design 3 y responsive design",
  "Accesibilidad (WCAG): contraste AA verificado y diseño para la diversidad",
  "Aplicación de identidad visual sobre marcas existentes",
];

const technicalSkills = [
  "Spec-driven development: cada pantalla se traduce a una especificación antes de construir",
  "Desarrollo asistido por IA: dirijo la construcción con Claude Code",
  "Diseño ↔ código en las dos direcciones con el MCP de Claude para Figma",
  "QA propio antes de cada deploy (flutter analyze, flutter build)",
  "Flutter y Firebase (Auth, Firestore, Hosting) para apps web, Android e iOS",
  "React, TypeScript y Tailwind CSS para sitios web",
  "Git y GitHub con ramas y pull requests, deploy en Vercel y Netlify",
  "Criterios de integración con RESTful APIs (desde diseño)",
  "Optimización de performance: imágenes en WebP, lazy loading y carga inicial liviana",
];

const designTools: ToolEntry[] = [
  { type: "si",     name: "Figma",        color: "#F24E1E", icon: SiFigma },
  { type: "si",     name: "FigJam",       color: "#F24E1E", icon: SiFigma },
  { type: "adobe",  name: "Photoshop",    color: "#31A8FF", abbr: "Ps", bg: "#31A8FF" },
  { type: "adobe",  name: "Illustrator",  color: "#FF9A00", abbr: "Ai", bg: "#FF9A00" },
  { type: "adobe",  name: "Adobe XD",     color: "#FF61F6", abbr: "Xd", bg: "#FF61F6" },
  { type: "text",   name: "Maze",         abbr: "Mz", color: "#2B2C2E", bg: "#2B2C2E" },
  { type: "text",   name: "Useberry",     abbr: "Ub", color: "#5B3FD9", bg: "#5B3FD9" },
  { type: "si",     name: "Miro",         color: "#050038", icon: SiMiro },
  { type: "si",     name: "Notion",       color: "#000000", icon: SiNotion },
  { type: "si",     name: "Jira",         color: "#0052CC", icon: SiJira },
  { type: "si",     name: "Trello",       color: "#0052CC", icon: SiTrello },
  { type: "si",     name: "Loom",         color: "#625DF5", icon: SiLoom },
  { type: "lucide", name: "Lápiz y Papel",color: "#B45309", icon: PenLine },
];

const aiTools: ToolEntry[] = [
  { type: "text",   name: "Claude Code",  abbr: "CC", color: "#CC785C", bg: "#CC785C" },
  { type: "si",     name: "Claude",       color: "#D97706", icon: SiClaude },
  { type: "text",   name: "Figma Make",   abbr: "FM", color: "#8B5CF6", bg: "#8B5CF6" },
  { type: "text",   name: "Stitch",       abbr: "St", color: "#4285F4", bg: "#4285F4" },
  { type: "text",   name: "Lovable",      abbr: "Lv", color: "#E11D48", bg: "#E11D48" },
  { type: "si",     name: "ChatGPT",      color: "#10A37F", icon: SiOpenai },
  { type: "si",     name: "Gemini",       color: "#4285F4", icon: SiGooglegemini },
  { type: "text",   name: "Midjourney",   abbr: "MJ", color: "#000000", bg: "#111111" },
  { type: "text",   name: "DALL·E",       abbr: "DL", color: "#10A37F", bg: "#10A37F" },
  { type: "text",   name: "Nanobanana",   abbr: "Nb", color: "#CA8A04", bg: "#CA8A04" },
  { type: "text",   name: "Uizard",       abbr: "Ui", color: "#6366F1", bg: "#6366F1" },
];

const techStack: ToolEntry[] = [
  { type: "si",     name: "Flutter",     color: "#02569B", icon: SiFlutter },
  { type: "si",     name: "Firebase",    color: "#FFCA28", icon: SiFirebase },
  { type: "si",     name: "React",       color: "#61DAFB", icon: SiReact },
  { type: "si",     name: "TypeScript",  color: "#3178C6", icon: SiTypescript },
  { type: "si",     name: "Tailwind CSS",color: "#06B6D4", icon: SiTailwindcss },
  { type: "si",     name: "Vite",        color: "#646CFF", icon: SiVite },
  { type: "si",     name: "HTML5",       color: "#E34F26", icon: SiHtml5 },
  { type: "si",     name: "CSS3",        color: "#1572B6", icon: FaCss3Alt },
  { type: "si",     name: "Git",         color: "#F05032", icon: SiGit },
  { type: "si",     name: "GitHub",      color: "#181717", icon: SiGithub },
  { type: "si",     name: "Vercel",      color: "#000000", icon: SiVercel },
  { type: "si",     name: "Netlify",     color: "#00C7B7", icon: SiNetlify },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── UX / Design Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Habilidades de UX y diseño
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Decido con evidencia, no con opinión: valido con research y testing, y reviso una
            decisión cuando los datos la contradicen.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl mb-6 text-[#025959] dark:text-[#FF8300]">Investigación y UX</h3>
              <SkillList items={uxSkills} dotColor="bg-[#025959] dark:bg-[#FF8300]" />
            </div>
            <div>
              <h3 className="text-2xl mb-6 text-[#025959] dark:text-[#4ecfcf]">Diseño de interfaz</h3>
              <SkillList items={designSkills} dotColor="bg-[#FF8300] dark:bg-[#025959]" />
            </div>
          </div>

          {/* Design tools */}
          <h3 className="text-2xl mb-6 text-gray-800 dark:text-gray-100">Herramientas de diseño</h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-5 mb-10">
            {designTools.map((tool, i) => <ToolIcon key={i} tool={tool} />)}
          </ul>

          {/* AI tools */}
          <h3 className="text-2xl mb-2 text-gray-800 dark:text-gray-100">IA aplicada al diseño y la construcción</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            La IA ejecuta; el criterio, la arquitectura y las decisiones de diseño son míos
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-5">
            {aiTools.map((tool, i) => <ToolIcon key={i} tool={tool} />)}
          </ul>
        </motion.div>

        {/* ── Technical Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Construcción
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Llevo el diseño a producto publicado con desarrollo asistido por IA. Mi método:
            research, arquitectura, design system, especificación, construcción con IA, QA,
            testing con usuarios e iteración.
          </p>

          <ul className="grid md:grid-cols-2 gap-3 mb-12">
            {technicalSkills.map((skill, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-lg"
              >
                <div className="w-2 h-2 mt-2 bg-[#025959] dark:bg-[#FF8300] rounded-full flex-shrink-0" />
                {skill}
              </motion.li>
            ))}
          </ul>

          <h3 className="text-2xl mb-6 text-gray-800 dark:text-gray-100">Stack tecnológico</h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-5">
            {techStack.map((tech, i) => <ToolIcon key={i} tool={tech} />)}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function SkillList({ items, dotColor }: { items: string[]; dotColor: string }) {
  return (
    <ul className="space-y-3">
      {items.map((skill, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-lg"
        >
          <div className={`w-2 h-2 mt-2 ${dotColor} rounded-full flex-shrink-0`} />
          {skill}
        </motion.li>
      ))}
    </ul>
  );
}

/* Ícono + nombre visible: el nombre no depende de un tooltip (que no aparece en touch ni con teclado) */
function ToolIcon({ tool }: { tool: ToolEntry }) {
  const hasLogo = hasToolGlyph(tool.name);

  return (
    <li className="w-20 flex flex-col items-center gap-2 text-center">
      <div className="w-16 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 bg-white flex items-center justify-center overflow-hidden">
        {hasLogo ? (
          <ToolGlyph name={tool.name} style={{ width: "1.75rem", height: "1.75rem" }} />
        ) : "icon" in tool && (
          /* Logo oficial de Simple Icons / Lucide */
          <tool.icon aria-hidden="true" focusable="false" style={{ width: "1.75rem", height: "1.75rem", color: tool.color }} />
        )}
      </div>
      <span className="text-xs font-medium leading-tight text-gray-600 dark:text-gray-300">{tool.name}</span>
    </li>
  );
}
