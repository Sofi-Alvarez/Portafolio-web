import { Heart } from "lucide-react";
import logo2 from "../../imports/logo2.svg";

const LINKS = [
  { label: "Inicio",    id: "home"     },
  { label: "Proyectos", id: "projects" },
  { label: "Sobre mí",  id: "about"    },
  // { label: "Valoraciones", id: "feedback" }, // oculta hasta completar contenido
  { label: "Contacto",  id: "contact"  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer className="bg-[#025959] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <img src={logo2} alt="Sofía Álvarez" className="w-12 h-12 object-contain mb-4 brightness-0 invert" />
            <p className="text-white/80">
              Product Designer & Design Engineer. Llevo productos de la investigación al código funcionando.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-white/80 hover:text-white transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-white/80">
              <li>Buenos Aires, Argentina</li>
              <li>alvarez.sofib@gmail.com</li>
              <li>+54 11 6028 5989</li>
              <li>
                <a href="https://www.linkedin.com/in/sof%C3%ADa-%C3%A1lvarez-20/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                {" · "}
                <a href="https://github.com/Sofi-Alvarez" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p className="flex items-center justify-center gap-2">
            © 2026 Sofía Álvarez. Diseñado por mí con <Heart className="w-4 h-4 fill-[#FF8300] text-[#FF8300]" /> e implementado con Claude Code
          </p>
        </div>
      </div>
    </footer>
  );
}
