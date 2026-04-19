import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SiFigma } from "react-icons/si";
import { PenLine } from "lucide-react";
import iupiPort from "../../imports/iupi port.jpg";
import bookiePort from "../../imports/bookie port.jpg";
import bankPort from "../../imports/+bank port.jpg";

/* ─── Tool types ────────────────────────────────────────────────────────── */
type AdobeTool  = { type: "adobe";  label: string; abbr: string; bg: string };
type SiTool     = { type: "si";     label: string; Icon: React.ElementType };
type LucideTool = { type: "lucide"; label: string; Icon: React.ElementType };
type TextTool   = { type: "text";   label: string; abbr: string; bg: string };
type ToolDef    = AdobeTool | SiTool | LucideTool | TextTool;

const TOOLS: Record<string, ToolDef> = {
  Figma:       { type: "si",     label: "Figma",         Icon: SiFigma },
  Photoshop:   { type: "adobe",  label: "Photoshop",     abbr: "Ps", bg: "#31A8FF" },
  Illustrator: { type: "adobe",  label: "Illustrator",   abbr: "Ai", bg: "#FF9A00" },
  PenLine:     { type: "lucide", label: "Lápiz y Papel", Icon: PenLine },
  DALLE:       { type: "text",   label: "DALL·E",        abbr: "DL", bg: "#10A37F" },
  Midjourney:  { type: "text",   label: "Midjourney",    abbr: "MJ", bg: "#000000" },
};

export function Projects() {
  const projects = [
    {
      slug: "/case-study/iupi",
      title: "IUPI — Fintech de ahorro e inversiones",
      role: "Diseñadora UX/UI",
      description:
        "Una app que simplifica la inversión: capitales y cripto en un mismo lugar, diseñada para que cualquier usuario pueda operar con confianza.",
      image: iupiPort,
      tools: ["Figma", "Illustrator", "Photoshop", "PenLine"],
    },
    {
      slug: "/case-study/bookie",
      title: "Bookie — App de lectura geolocalizada",
      role: "Diseñadora UX/UI",
      description:
        "Transformamos la lectura en una experiencia viva: historias que se desbloquean en el mundo real, guiando al usuario paso a paso sin perder la magia.",
      image: bookiePort,
      tools: ["Figma", "Photoshop", "PenLine", "DALLE", "Midjourney"],
    },
    {
      slug: "/case-study/+bank",
      title: "Mas+ Bank — App bancaria responsive",
      role: "Diseñadora UX/UI",
      description:
        "Un banco digital pensado para la vida cotidiana: transferencias seguras y simples, accesibles desde cualquier dispositivo sin fricciones.",
      image: bankPort,
      tools: ["Figma", "Illustrator", "Photoshop", "PenLine"],
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ¡Hacé clic en las imágenes para ver los estudios de caso!
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} slug={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tool badge with tooltip ────────────────────────────────────────────── */
function ToolBadge({ toolKey }: { toolKey: string }) {
  const [hovered, setHovered] = useState(false);
  const def = TOOLS[toolKey];
  if (!def) return null;

  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        className="w-10 h-10 rounded-lg shadow-md flex items-center justify-center cursor-default border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
      >
        {(def.type === "si" || def.type === "lucide") ? (
          <def.Icon className="w-5 h-5 text-gray-800 dark:text-gray-100" />
        ) : (
          <span className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-none">
            {def.abbr}
          </span>
        )}
      </motion.div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none"
        >
          {def.label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  slug,
}: {
  project: { title: string; role: string; description: string; image: string; tools: string[] };
  index: number;
  slug: string;
}) {
  const isEven = index % 2 === 0;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? "md:grid-flow-dense" : ""}`}
    >
      {/* Image — clickable */}
      <motion.div
        className={`relative group cursor-pointer ${!isEven ? "md:col-start-2" : ""}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate(slug)}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#025959]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span className="text-white text-lg">Ver caso de estudio →</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className={!isEven ? "md:col-start-1 md:row-start-1" : ""}>
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 bg-[#FF8300] text-white rounded-full text-sm">
            {project.role}
          </div>
          <h3 className="text-3xl text-gray-800 dark:text-gray-100">{project.title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
          {/* Tool badges only — no secondary CTA button */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.tools.map((tool, i) => (
              <ToolBadge key={i} toolKey={tool} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
