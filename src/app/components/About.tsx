import { motion } from "motion/react";
import { MapPin, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import sofiaPhoto from "../../imports/foto_sofia.jpeg";

export function About() {
  const stats = [
    { label: "Años de trayectoria, más de 2 en producto digital", value: "7", color: "#025959" },
    { label: "App propia publicada y testeada con usuarios", value: "1", color: "#FF8300" },
    { label: "Casos de estudio con proceso completo", value: "5", color: "#025959" },
  ];

  const keywords = [
    "UX Research",
    "UI Design",
    "User Testing",
    "Usability Testing",
    "Card Sorting",
    "Arquitectura de información",
    "Design Systems",
    "Wireframing",
    "Prototyping",
    "Mobile First",
    "Handoff",
    "Figma",
    "Spec-driven development",
    "Desarrollo asistido por IA",
    "Claude Code",
    "Flutter",
    "React",
    "WCAG",
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl mb-6 text-gray-800 dark:text-gray-100">Sobre mí</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Soy Product Designer & Design Engineer, un perfil híbrido entre diseño y código.
              Traduzco cada pantalla de Figma a una especificación precisa y con eso dirijo el
              desarrollo con Claude Code, hasta publicar el producto y testearlo con usuarios
              reales.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Trabajo con evidencia, no con opinión: research, arquitectura de información,
              design system, especificación, construcción, QA y testing con usuarios, y vuelvo
              atrás cuando los datos contradicen una decisión. Mi foco está en fintech y finanzas
              personales (IUPI, Mas+ Bank y Milestone, mi app en producción), siempre con{" "}
              <strong className="text-[#025959] dark:text-[#4ecfcf]">accesibilidad (WCAG)</strong>{" "}
              desde el inicio.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Vengo de las Artes Visuales y doy clases desde 2019. Los talleres en escuelas y los
              de arteterapia con personas con discapacidad mental me enseñaron a observar,
              explicar y diseñar para la diversidad de usuarios, algo que hoy traslado a cada
              producto.
            </p>
          </motion.div>

          {/* Right: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#025959]/10 to-[#FF8300]/10 dark:from-[#025959]/20 dark:to-[#FF8300]/20 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <img
                    src={sofiaPhoto}
                    alt="Sofía Álvarez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl text-gray-800 dark:text-gray-100 mb-2">Sofía Álvarez</h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Buenos Aires, Argentina</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span>Artes Visuales (UNA) · Diseño UX/UI</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-[#025959] text-white rounded-full text-sm">
                    Design Engineering
                  </span>
                  <span className="px-3 py-1 bg-[#FF8300] text-gray-800 rounded-full text-sm">
                    AI-First
                  </span>
                  <span className="px-3 py-1 bg-[#025959] text-white rounded-full text-sm">
                    Accesibilidad
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF8300]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#025959]/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatBox key={index} {...stat} delay={index * 0.2} />
          ))}
        </div>

        {/* Keywords Ticker */}
        <KeywordsTicker keywords={keywords} />
      </div>
    </section>
  );
}

function StatBox({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-full"
        initial={{ height: "0%" }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
        style={{ backgroundColor: `${color}15` }}
      />
      <div className="relative z-10">
        <div className={`text-3xl mb-2 text-[#025959] ${color === "#FF8300" ? "dark:text-[#FF8300]" : "dark:text-[#4ecfcf]"}`}>
          {value}
        </div>
        <div className="text-gray-600 dark:text-gray-300">{label}</div>
      </div>
    </motion.div>
  );
}

function KeywordsTicker({ keywords }: { keywords: string[] }) {
  const tickerRef = useRef<HTMLDivElement>(null);
  // Duplicate enough times so the strip always fills the screen seamlessly
  const repeated = [...keywords, ...keywords, ...keywords];

  return (
    <div
      className="relative left-1/2 right-1/2 overflow-hidden bg-[#025959] py-5"
      style={{ marginLeft: "-50vw", marginRight: "-50vw", width: "100vw" }}
    >
      <motion.div
        ref={tickerRef}
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeated.map((keyword, index) => (
          <span key={index} className="flex items-center gap-6 text-white text-lg font-medium tracking-wide">
            {keyword}
            <span aria-hidden="true" className="text-white/30 select-none">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
