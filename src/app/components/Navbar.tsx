import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import logo2 from "../../imports/logo2.svg";
import logo2dark from "../../imports/logo2dark.svg";
import { scrollBehavior } from "../utils/motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Drawer mobile: foco al primer ítem, Escape cierra, Tab queda dentro del menú */
  useEffect(() => {
    if (!isMenuOpen) return;
    drawerRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current || !menuButtonRef.current) return;
      const focusables = [menuButtonRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>("button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "Inicio",      href: "#home"     },
    { label: "Proyectos",   href: "#projects" },
    { label: "Sobre mí",    href: "#about"    },
    // { label: "Valoraciones",href: "#feedback" }, // oculta hasta completar contenido
    { label: "Contacto",    href: "#contact"  },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: scrollBehavior() });
      setIsMenuOpen(false);
      /* Mover el foco a la sección para que teclado y lector de pantalla sigan el salto */
      if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
      (element as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <>
      <nav aria-label="Principal" className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              aria-label="Ir al inicio"
            >
              <img src={isDark ? logo2dark : logo2} alt="" className="w-10 h-10 object-contain" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="min-h-11 px-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-[#025959] dark:hover:text-[#FF8300] transition-all motion-safe:hover:scale-110 duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dark/Light Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col p-6 pt-20">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left py-4 text-lg text-gray-700 dark:text-gray-200 hover:text-[#025959] dark:hover:text-[#FF8300] hover:bg-gray-50 dark:hover:bg-gray-700 px-4 rounded-lg transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}