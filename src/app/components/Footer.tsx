import { Heart } from "lucide-react";
import logo2 from "../../imports/logo2.svg";

export function Footer() {
  return (
    <footer className="bg-[#025959] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={logo2} alt="Sofía Álvarez" className="w-12 h-12 object-contain mb-4 brightness-0 invert" />
            <p className="text-white/80">
              Creando experiencias digitales excepcionales con diseño centrado en el usuario.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  Sobre mi
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/80 hover:text-white transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-white/80">
              <li>Buenos Aires, Argentina</li>
              <li>alvarez.sofib@gmail.com</li>
              <li>+54 11 6028 5989</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p className="flex items-center justify-center gap-2">
            © 2026 Sofía Álvarez. Hecho con <Heart className="w-4 h-4 fill-[#FF8300] text-[#FF8300]" /> usando React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
