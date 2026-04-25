import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
import { useAnalytics } from "../hooks/useAnalytics";

function MainPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Exploration />
      <Skills />
      {/* <Feedback /> — oculta hasta completar contenido */}
      <Contact />
      <Footer />
    </div>
  );
}

/* Scroll al top en cada cambio de ruta */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Wrapper con animación de deslizamiento horizontal */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ x: "-8%", opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
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
    /* overflow-x-hidden recorta la página que entra por la derecha */
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<PageTransition><MainPage /></PageTransition>} />
          <Route path="/case-study/iupi"    element={<PageTransition><IUPICaseStudy /></PageTransition>} />
          <Route path="/case-study/bookie"  element={<PageTransition><BookieCaseStudy /></PageTransition>} />
          <Route path="/case-study/+bank"      element={<PageTransition><BankCaseStudy /></PageTransition>} />
          <Route path="/case-study/portfolio" element={<PageTransition><PortfolioCaseStudy /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <AnalyticsLayer />
      <AnimatedRoutes />
    </ThemeProvider>
  );
}
