import { motion } from "motion/react";
import { Linkedin, FileDown, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import sofiaPhoto from "../../imports/foto_sofia.jpeg";
import cvFile from "../../imports/CV_Sofia_Alvarez_UX_UI.pdf";

export function Contact() {
  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/sof%C3%ADa-%C3%A1lvarez-20/", "_blank");
  };

  const handleResume = () => {
    // Open PDF directly — works both in localhost and production
    window.open(cvFile, "_blank");
  };

  return (
    <section id="contact" className="bg-white dark:bg-gray-900">
      {/* Banda separadora — ancho completo de pantalla */}
      <div className="w-full h-5" style={{ background: "linear-gradient(to right, rgba(2,89,89,0.12), rgba(255,131,0,0.18), rgba(2,89,89,0.12))" }} />
      <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Trabajemos Juntos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            ¿Tenés un proyecto en mente? Me encantaría conocerlo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#025959]/5 to-[#FF8300]/5 dark:from-[#025959]/10 dark:to-[#FF8300]/10 rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={sofiaPhoto}
                  alt="Sofía Álvarez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl text-gray-800 dark:text-gray-100 mb-2">Sofía Álvarez</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">Product Designer & Design Engineer</p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Buenos Aires, Argentina · Trabajo remoto</p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLinkedIn}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#025959] text-white rounded-lg hover:bg-[#025959]/90 transition-colors shadow-lg"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Conectar</span>
                </motion.button>

                <motion.a
                href="/CV_Sofia_Alvarez_UX_UI.pdf#view=FitV"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-ga-action="download_cv"
                data-ga-category="CTA"
                data-ga-label="Obtener currículum"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF8300] text-gray-900 rounded-lg hover:bg-[#FF8300]/90 transition-colors shadow-lg">
                  <FileDown className="w-5 h-5" />
                  <span>Obtener currículum</span>
<span className="sr-only"> (se abre en una pestaña nueva)</span></motion.a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a
                  href="mailto:alvarez.sofib@gmail.com"
                  className="w-11 h-11 bg-white dark:bg-gray-700 rounded-lg shadow flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </a>
                <a
                  href="https://wa.me/541160285989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white dark:bg-gray-700 rounded-lg shadow flex items-center justify-center hover:bg-green-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="WhatsApp (se abre en una pestaña nueva)"
                >
                  <FaWhatsapp aria-hidden="true" style={{ width: "1.25rem", height: "1.25rem", color: "#25D366" }} />
                </a>
                <a
                  href="https://github.com/Sofi-Alvarez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white dark:bg-gray-700 rounded-lg shadow flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub (se abre en una pestaña nueva)"
                  data-ga-action="github_click"
                  data-ga-category="CTA"
                  data-ga-label="GitHub Contacto"
                >
                  <SiGithub aria-hidden="true" className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
