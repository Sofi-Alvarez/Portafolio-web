import { motion } from "motion/react";
import { useState } from "react";
import {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiNotion,
  SiJira,
  SiTrello,
  SiNetlify,
  SiOpenai,
  SiGooglegemini,
  SiHtml5,
  SiReact,
  SiGit,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa6";
import { PenLine } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type AdobeTool  = { type: "adobe";  name: string; abbr: string; color: string; bg: string };
type SiTool     = { type: "si";     name: string; color: string; icon: React.ElementType };
type LucideTool = { type: "lucide"; name: string; color: string; icon: React.ElementType };
type TextTool   = { type: "text";   name: string; abbr: string; color: string; bg: string };
type ToolEntry  = AdobeTool | SiTool | LucideTool | TextTool;

/* ─── Data ──────────────────────────────────────────────────────────────── */
const uxSkills = [
  "User Research (flows, benchmarks, entrevistas)",
  "Information Architecture & Sitemaps",
  "Wireframing (low/high fidelity) & Prototyping interactivo",
  "Interaction Design (IxD)",
  "Usability Testing & Validación",
  "User Personas & Journey Mapping",
  "UX Writing & Microcopy",
  "UX Analytics & Medición",
];

const designSkills = [
  "UI Design / Visual Design — Lead",
  "Design Systems & Componentes — Lead",
  "Responsive Design",
  "Accessibility (WCAG 2.1/2.2) — Principal",
  "Motion Design & Animaciones",
  "Branding & Identity",
];

const technicalSkills = [
  "HTML5 & CSS3",
  "React (con TailwindCSS para estilos responsive)",
  "Git & Version Control",
  "Criterios de integración con RESTful APIs (desde diseño)",
  "Performance Optimization aplicado al diseño",
];

const designTools: ToolEntry[] = [
  { type: "si",     name: "Figma",        color: "#F24E1E", icon: SiFigma },
  { type: "si",     name: "FigJam",       color: "#F24E1E", icon: SiFigma },
  { type: "adobe",  name: "Photoshop",    color: "#31A8FF", abbr: "Ps", bg: "#31A8FF" },
  { type: "adobe",  name: "Illustrator",  color: "#FF9A00", abbr: "Ai", bg: "#FF9A00" },
  { type: "adobe",  name: "Adobe XD",     color: "#FF61F6", abbr: "Xd", bg: "#FF61F6" },
  { type: "si",     name: "Notion",       color: "#000000", icon: SiNotion },
  { type: "si",     name: "Jira",         color: "#0052CC", icon: SiJira },
  { type: "si",     name: "Trello",       color: "#0052CC", icon: SiTrello },
  { type: "si",     name: "Netlify",      color: "#00C7B7", icon: SiNetlify },
  { type: "lucide", name: "Lápiz y Papel",color: "#B45309", icon: PenLine },
];

const aiTools: ToolEntry[] = [
  { type: "text",   name: "Claude",       abbr: "Cl", color: "#D97706", bg: "#D97706" },
  { type: "si",     name: "ChatGPT",      color: "#10A37F", icon: SiOpenai },
  { type: "si",     name: "Gemini",       color: "#4285F4", icon: SiGooglegemini },
  { type: "text",   name: "Midjourney",   abbr: "MJ", color: "#000000", bg: "#111111" },
  { type: "text",   name: "DALL·E",       abbr: "DL", color: "#10A37F", bg: "#10A37F" },
  { type: "text",   name: "Lovable",      abbr: "Lv", color: "#E11D48", bg: "#E11D48" },
  { type: "text",   name: "Nanobanana",   abbr: "Nb", color: "#CA8A04", bg: "#CA8A04" },
  { type: "text",   name: "Uizard",       abbr: "Ui", color: "#6366F1", bg: "#6366F1" },
];

const techStack: ToolEntry[] = [
  { type: "si",     name: "HTML5",       color: "#E34F26", icon: SiHtml5 },
  { type: "si",     name: "CSS3",        color: "#1572B6", icon: FaCss3Alt },
  { type: "si",     name: "React",       color: "#61DAFB", icon: SiReact },
  { type: "si",     name: "Git",         color: "#F05032", icon: SiGit },
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
            Habilidades UX/Diseño
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Mi filosofía de diseño se centra en crear experiencias intuitivas, accesibles y
            escalables que resuelvan problemas reales de los usuarios mientras cumplen objetivos
            de negocio.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl mb-6 text-[#025959] dark:text-[#FF8300]">UX Skills</h3>
              <SkillList items={uxSkills} dotColor="bg-[#025959] dark:bg-[#FF8300]" />
            </div>
            <div>
              <h3 className="text-2xl mb-6 text-[#FF8300] dark:text-[#025959]">Design Skills</h3>
              <SkillList items={designSkills} dotColor="bg-[#FF8300] dark:bg-[#025959]" />
            </div>
          </div>

          {/* Design tools */}
          <h3 className="text-2xl mb-6 text-gray-800 dark:text-gray-100">Herramientas de Diseño</h3>
          <div className="flex flex-wrap gap-4 mb-10">
            {designTools.map((tool, i) => <ToolIcon key={i} tool={tool} />)}
          </div>

          {/* AI tools */}
          <h3 className="text-2xl mb-2 text-gray-800 dark:text-gray-100">IA aplicada al diseño</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Herramientas de IA que integro en mi flujo de trabajo creativo
          </p>
          <div className="flex flex-wrap gap-4">
            {aiTools.map((tool, i) => <ToolIcon key={i} tool={tool} />)}
          </div>
        </motion.div>

        {/* ── Technical Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Habilidades Técnicas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Creo en la importancia de entender el desarrollo frontend para crear diseños
            implementables y mantener una colaboración efectiva con desarrolladores.
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

          <h3 className="text-2xl mb-6 text-gray-800 dark:text-gray-100">Stack Tecnológico</h3>
          <div className="flex flex-wrap gap-4">
            {techStack.map((tech, i) => <ToolIcon key={i} tool={tech} />)}
          </div>
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

function ToolIcon({ tool }: { tool: ToolEntry }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center cursor-pointer overflow-hidden"
        style={
          tool.type === "adobe"
            ? { background: hovered ? "white" : tool.bg }
            : { background: hovered ? tool.color : "white" }
        }
      >
        {tool.type === "adobe" ? (
          <span className="font-bold text-sm leading-none"
            style={{ color: hovered ? tool.color : "white" }}>
            {tool.abbr}
          </span>
        ) : tool.type === "text" ? (
          <span className="font-bold text-sm leading-none"
            style={{ color: hovered ? "white" : tool.color }}>
            {tool.abbr}
          </span>
        ) : (
          /* si or lucide */
          <tool.icon style={{ width: "1.75rem", height: "1.75rem", color: hovered ? "#ffffff" : tool.color }} />
        )}
      </motion.div>
      {hovered && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-10 pointer-events-none"
        >
          {tool.name}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
