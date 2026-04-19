import { Routes, Route } from "react-router";
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

function MainPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Exploration />
      <Skills />
      <Feedback />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/case-study/iupi" element={<IUPICaseStudy />} />
        <Route path="/case-study/bookie" element={<BookieCaseStudy />} />
        <Route path="/case-study/+bank" element={<BankCaseStudy />} />
      </Routes>
    </ThemeProvider>
  );
}
