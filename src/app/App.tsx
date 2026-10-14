import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Exploration } from "./components/Exploration";
import { Skills } from "./components/Skills";
import { Feedback } from "./components/Feedback";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { IUPICaseStudy } from "./components/ui/IUPICaseStudy";
import { BookieCaseStudy } from "./components/ui/BookieCaseStudy";
import { BankCaseStudy } from "./components/ui/BankCaseStudy";
import { PortfolioCaseStudy } from "./components/ui/PortfolioCaseStudy";
import { MilestoneCaseStudy } from "./components/ui/MilestoneCaseStudy";
import { useAnalytics } from "../hooks/useAnalytics";

function MainPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Projects />
      <About />
      <Exploration />
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

/* Scroll al top en cada cambio de ruta */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Wrapper con fundido entre páginas (sin desplazamiento, apto para sensibilidad al movimiento) */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
    >
      {children}
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
