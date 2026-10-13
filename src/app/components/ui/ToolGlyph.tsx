import type { CSSProperties, ElementType } from "react";
import {
  SiFigma, SiClaude, SiOpenai, SiGooglegemini, SiMaze, SiNotion, SiJira,
  SiFlutter, SiFirebase, SiReact,
} from "react-icons/si";
import { PenLine } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   TOOL GLYPH — logo SVG de cada herramienta
   · Si existe el logo oficial (Simple Icons) se usa ese.
   · Si no existe, se dibuja un monograma SVG con fondo de marca
     y letras con contraste ≥ 4.5:1 (verificado).
   · El SVG siempre es decorativo (aria-hidden): el nombre accesible
     lo pone el contenedor (texto visible o role="img" + aria-label).
══════════════════════════════════════════════════════════ */

type GlyphDef =
  | { kind: "icon"; Icon: ElementType; color: string }
  | { kind: "mono"; text: string; fg: string; bg: string };

const GLYPHS: Record<string, GlyphDef> = {
  "Figma":         { kind: "icon", Icon: SiFigma,        color: "#F24E1E" },
  "FigJam":        { kind: "icon", Icon: SiFigma,        color: "#F24E1E" },
  "Figma Make":    { kind: "icon", Icon: SiFigma,        color: "#8B5CF6" },
  "Claude":        { kind: "icon", Icon: SiClaude,       color: "#D97757" },
  "Claude Code":   { kind: "icon", Icon: SiClaude,       color: "#D97757" },
  "ChatGPT":       { kind: "icon", Icon: SiOpenai,       color: "#10A37F" },
  "DALL·E":        { kind: "icon", Icon: SiOpenai,       color: "#10A37F" },
  "Gemini":        { kind: "icon", Icon: SiGooglegemini, color: "#8E75B2" },
  "Nanobanana":    { kind: "icon", Icon: SiGooglegemini, color: "#8E75B2" },
  "Maze":          { kind: "icon", Icon: SiMaze,         color: "#1F1F1F" },
  "Notion":        { kind: "icon", Icon: SiNotion,       color: "#000000" },
  "Jira":          { kind: "icon", Icon: SiJira,         color: "#0052CC" },
  "Flutter":       { kind: "icon", Icon: SiFlutter,      color: "#02569B" },
  "Firebase":      { kind: "icon", Icon: SiFirebase,     color: "#FFCA28" },
  "React":         { kind: "icon", Icon: SiReact,        color: "#61DAFB" },
  "Lápiz y Papel": { kind: "icon", Icon: PenLine,        color: "#6B7280" },
  /* Sin logo disponible en Simple Icons → monograma de marca */
  "Photoshop":     { kind: "mono", text: "Ps", fg: "#31A8FF", bg: "#001E36" },
  "Illustrator":   { kind: "mono", text: "Ai", fg: "#FF9A00", bg: "#330000" },
  "Adobe XD":      { kind: "mono", text: "Xd", fg: "#FF61F6", bg: "#470137" },
  "Stitch":        { kind: "mono", text: "St", fg: "#FFFFFF", bg: "#1A73E8" },
  "Lovable":       { kind: "mono", text: "Lv", fg: "#FFFFFF", bg: "#BE123C" },
  "Useberry":      { kind: "mono", text: "Ub", fg: "#FFFFFF", bg: "#5B3FD9" },
  "Uizard":        { kind: "mono", text: "Ui", fg: "#FFFFFF", bg: "#4F46E5" },
  "Midjourney":    { kind: "mono", text: "MJ", fg: "#FFFFFF", bg: "#111111" },
};

export function hasToolGlyph(name: string) {
  return name in GLYPHS;
}

/** Logo de la herramienta. `color` permite forzar el color del ícono (ej. estado hover). */
export function ToolGlyph({
  name, className = "w-7 h-7", color, style,
}: { name: string; className?: string; color?: string; style?: CSSProperties }) {
  const def = GLYPHS[name];
  if (!def) return null;

  if (def.kind === "icon") {
    return <def.Icon aria-hidden="true" focusable="false" className={className} style={{ color: color ?? def.color, ...style }} />;
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className} style={style}>
      <rect width="32" height="32" rx="7" fill={def.bg} />
      <text
        x="16" y="21.5" textAnchor="middle"
        fontFamily="Manrope, system-ui, sans-serif" fontWeight="800"
        fontSize={def.text.length > 2 ? 11 : 14} fill={def.fg}
      >
        {def.text}
      </text>
    </svg>
  );
}

/** Ficha de herramienta con logo + nombre visible (usada en los case studies). */
export function ToolBadge({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-default select-none">
      <div className="w-14 h-14 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700/90 flex items-center justify-center">
        <ToolGlyph name={label} className="w-7 h-7" />
      </div>
      <span className="text-xs font-medium text-center text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
}
