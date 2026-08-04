/**
 * CaseStudyMenuNav — header + menú hamburguesa compartido por todos los
 * casos de estudio. Mismo patrón que se definió para Milestone:
 *  - Header sticky con logo, badge "Caso de Estudio · {title}" y botón
 *    hamburguesa (reemplaza los pills/dropdown de "Proceso" de scroll).
 *  - Barra de progreso de lectura.
 *  - Sheet lateral con 2 niveles de jerarquía:
 *    1) Navegación general del sitio (volver al inicio, cambiar tema).
 *    2) Índice del caso de estudio actual — encabezado con el nombre del
 *       caso (lleva a la portada) + sus secciones internas anidadas.
 */
import { ElementType, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ExternalLink, Moon, Sun, X, Menu } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import logo2 from "../../../imports/logo2.svg";
import logo2dark from "../../../imports/logo2dark.svg";

export interface CaseStudyIndexSection {
  id: string;
  label: string;
  Icon: ElementType;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Barra de progreso de lectura ── */
function ReadingProgressBar({ primary, secondary }: { primary: string; secondary: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => { window.removeEventListener("scroll", h); window.removeEventListener("resize", h); };
  }, []);
  return (
    <div className="absolute left-0 right-0 bottom-0 h-[2.5px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})`, width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }} />
    </div>
  );
}

/* ─── Menú hamburguesa: sheet con 2 niveles de jerarquía ── */
function IndexSheet({ open, onClose, activeId, isDark, toggleTheme, title, sections, primary }: {
  open: boolean; onClose: () => void; activeId: string; isDark: boolean; toggleTheme: () => void;
  title: string; sections: CaseStudyIndexSection[]; primary: string;
}) {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="index-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div key="index-sheet" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            role="dialog" aria-modal="true" aria-label="Menú del caso de estudio">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Menú</p>
              <button onClick={onClose} aria-label="Cerrar menú"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* ── Nivel 1: navegación general del sitio ── */}
            <div className="p-3">
              <button onClick={() => { onClose(); navigate("/"); }}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  <ArrowLeft className="w-4 h-4" style={{ color: primary }} />
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Volver al inicio</p>
              </button>
              <button onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  {isDark
                    ? <Sun className="w-4 h-4" style={{ color: primary }} />
                    : <Moon className="w-4 h-4" style={{ color: primary }} />}
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {isDark ? "Modo claro" : "Modo oscuro"}
                </p>
              </button>
            </div>

            {/* ── Nivel 2: índice del caso de estudio actual ── */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              {/* Nombre del caso de estudio — encabezado del grupo + link a la portada */}
              <button onClick={() => { scrollTo(sections[0].id); onClose(); }}
                aria-current={activeId === sections[0].id ? "true" : undefined}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div>
                  <p className="text-base font-bold text-gray-800 dark:text-gray-100">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Ir a la portada</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              </button>

              {/* Secciones internas del caso de estudio — anidadas bajo el nombre */}
              <div className="mt-1">
                {sections.slice(1).map((s, i) => {
                  const active = activeId === s.id;
                  return (
                    <motion.button key={s.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.03 }}
                      onClick={() => { scrollTo(s.id); onClose(); }}
                      aria-current={active ? "true" : undefined}
                      className={`flex items-center gap-3 w-full pl-7 pr-4 py-3 rounded-xl text-left transition-colors group ${
                        active ? "" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      style={active ? { background: `${primary}0f` } : undefined}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "" : "bg-gray-100 dark:bg-gray-800"}`}
                        style={active ? { background: `${primary}1a` } : undefined}>
                        <s.Icon className="w-3.5 h-3.5" style={{ color: primary }} />
                      </span>
                      <div className="flex-1">
                        <p className={`text-sm ${active ? "font-bold" : "font-medium"} text-gray-800 dark:text-gray-100`}>{s.label}</p>
                      </div>
                      {active && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: primary }} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export interface CaseStudyMenuNavProps {
  /** Nombre del caso de estudio, ej. "IUPI" */
  title: string;
  /**
   * Secciones del índice. El primer elemento SIEMPRE representa la
   * portada (id de la sección hero) — se renderiza como encabezado del
   * grupo con el nombre del caso, no como fila de la lista.
   */
  sections: CaseStudyIndexSection[];
  /** Color primario de marca (hex), usado en acentos e íconos del menú. */
  primaryColor: string;
  /** Color secundario de marca (hex), usado en la barra de progreso. Por defecto = primaryColor. */
  secondaryColor?: string;
}

export function CaseStudyMenuNav({ title, sections, primaryColor, secondaryColor }: CaseStudyMenuNavProps) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [activeId, setActiveId] = useState(sections[0].id);
  const secondary = secondaryColor ?? primaryColor;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 110;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActiveId(current);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [sections]);

  return (
    <>
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")} className="flex items-center gap-2" aria-label="Ir al inicio">
            <img src={isDark ? logo2dark : logo2} alt="Sofia Alvarez" className="w-9 h-9 object-contain" />
          </motion.button>

          <span className="hidden sm:inline-block text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Caso de Estudio · {title}
          </span>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIndexOpen(true)}
            aria-label="Abrir menú"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 transition-colors"
            style={{ borderColor: undefined }}>
            <Menu className="w-4 h-4" />
          </motion.button>
        </div>

        <ReadingProgressBar primary={primaryColor} secondary={secondary} />
      </motion.nav>

      <IndexSheet open={indexOpen} onClose={() => setIndexOpen(false)} activeId={activeId}
        isDark={isDark} toggleTheme={toggleTheme} title={title} sections={sections} primary={primaryColor} />
    </>
  );
}
