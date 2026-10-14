import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Feedback } from "./components/Feedback";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAnalytics } from "../hooks/useAnalytics";
import { scrollBehavior } from "./utils/motion";

/* Cada caso de estudio se descarga recién cuando se visita (code splitting por ruta) */
const IUPICaseStudy      = lazy(() => import("./components/ui/IUPICaseStudy").then((m) => ({ default: m.IUPICaseStudy })));
const BookieCaseStudy    = lazy(() => import("./components/ui/BookieCaseStudy").then((m) => ({ default: m.BookieCaseStudy })));
const BankCaseStudy      = lazy(() => import("./components/ui/BankCaseStudy").then((m) => ({ default: m.BankCaseStudy })));
const PortfolioCaseStudy = lazy(() => import("./components/ui/PortfolioCaseStudy").then((m) => ({ default: m.PortfolioCaseStudy })));
const MilestoneCaseStudy = lazy(() => import("./components/ui/MilestoneCaseStudy").then((m) => ({ default: m.MilestoneCaseStudy })));

/* Título de la pestaña por ruta: orienta en pestañas, historial y lector de pantalla */
const PAGE_TITLES: Record<string, string> = {
  "/":                     "Sofía Álvarez — Product Designer",
  "/case-study/milestone": "Milestone, caso de estudio — Sofía Álvarez",
  "/case-study/iupi":      "IUPI, caso de estudio — Sofía Álvarez",
  "/case-study/portfolio": "Portfolio Web, caso de estudio — Sofía Álvarez",
  "/case-study/+bank":     "Mas+ Bank, caso de estudio — Sofía Álvarez",
  "/case-study/bookie":    "Bookie, caso de estudio — Sofía Álvarez",
};

/* Posición del scroll del home, para devolverla al volver de un caso de estudio.
   "Atrás/adelante" del navegador se detecta con popstate (los navigate() de la app no lo disparan) */
let homeScrollY = 0;
let lastNavWasHistory = false;
let arrivedByHistory = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => { lastNavWasHistory = true; });
}

/* Al montar el home: si se llegó con atrás/adelante del navegador, vuelve a donde estaba la persona;
   si se llegó con state.section (ej. "contact"), baja a esa sección */
function MainPage() {
  const { state } = useLocation();
  useLayoutEffect(() => {
    const section = (state as { section?: string } | null)?.section;
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    } else if (arrivedByHistory && homeScrollY > 0) {
      window.scrollTo({ top: homeScrollY, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Projects />
      <About />
      <Skills />
      {/* <Feedback /> — oculta hasta completar contenido */}
      <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* Salto al contenido: con HashRouter un href="#main" cambiaría la ruta, así que se mueve el foco a mano */
function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main");
        main?.focus();
        main?.scrollIntoView();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-[#025959] focus:text-white focus:font-semibold focus:shadow-lg"
    >
      Saltar al contenido
    </a>
  );
}

/* En cada cambio de ruta: guarda la posición del home al salir y actualiza el título.
   El scroll de la página nueva se resuelve cuando se monta (ver PageTransition y MainPage) */
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current === "/" && pathname !== "/") homeScrollY = window.scrollY;
    arrivedByHistory = lastNavWasHistory;
    lastNavWasHistory = false;
    prevPath.current = pathname;
    document.title = PAGE_TITLES[pathname] ?? PAGE_TITLES["/"];
  }, [pathname]);
  return null;
}

/* Wrapper con fundido entre páginas (sin desplazamiento, apto para sensibilidad al movimiento) */
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  /* "instant": el scroll-behavior smooth global animaría el salto y quedaría a mitad de camino */
  useLayoutEffect(() => {
    if (pathname !== "/") window.scrollTo({ top: 0, behavior: "instant" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
    >
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-900" aria-busy="true" />}>
        {children}
      </Suspense>
    </motion.div>
  );
}

function AnalyticsLayer() {
  useAnalytics();
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<PageTransition><MainPage /></PageTransition>} />
          <Route path="/case-study/iupi"    element={<PageTransition><IUPICaseStudy /></PageTransition>} />
          <Route path="/case-study/bookie"  element={<PageTransition><BookieCaseStudy /></PageTransition>} />
          <Route path="/case-study/+bank"      element={<PageTransition><BankCaseStudy /></PageTransition>} />
          <Route path="/case-study/portfolio" element={<PageTransition><PortfolioCaseStudy /></PageTransition>} />
          <Route path="/case-study/milestone" element={<PageTransition><MilestoneCaseStudy /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      {/* reducedMotion="user": respeta prefers-reduced-motion en todas las animaciones de Motion */}
      <MotionConfig reducedMotion="user">
      <SkipLink />
      <ScrollToTop />
      <AnalyticsLayer />
      <AnimatedRoutes />
      <Analytics />
      </MotionConfig>
    </ThemeProvider>
  );
}
