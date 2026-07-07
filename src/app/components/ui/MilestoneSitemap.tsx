/**
 * MilestoneSitemap — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

interface Section {
  name: string; icon: string; color: string; tagBg: string;
  children?: string[]; note?: string;
}

const SECTIONS: Section[] = [
  { name: "Inicio",        icon: "⌂", color: "#4F6BF6", tagBg: "#EDF1FE",
    note: "Dashboard con resumen general por categoría — sin subpantallas propias." },
  { name: "Registros",     icon: "✎", color: "#C23B3B", tagBg: "#FDEAEA",
    children: ["Registrar gasto o ingreso", "Sugerencias al anotar gasto", "Mis registros anotados"] },
  { name: "Ahorro",        icon: "◎", color: "#22B8A0", tagBg: "#E3F6F2",
    children: ["Mi meta de ahorro semanal", "Progreso de mi meta", "Simulador de ahorro"] },
  { name: "Aprender",      icon: "✓", color: "#B5732A", tagBg: "#FFF1DE",
    children: ["Tips y mini-lecciones financieras", "Bienvenida y primeros pasos"] },
  { name: "Perfil",        icon: "☺", color: "#8A5FD6", tagBg: "#F1EAFB",
    children: ["Mi perfil", "Mis categorías", "Logros e insignias"] },
  { name: "Configuración", icon: "⚙", color: "#5b6373", tagBg: "#EEF0F3",
    children: ["Ajustes de la app", "Modo claro u oscuro", "Avisos y recordatorios", "Ayuda y preguntas frecuentes"] },
];

export function MilestoneSitemap() {
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>⌂</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Ideate · Sitemap</span>
      </div>
      <h1 style={{ font: `700 28px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>La arquitectura, según el modelo mental del usuario</h1>
      <p style={{ font: `400 14.5px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 28px", maxWidth: 680 }}>
        Derivado de un card sorting abierto: 5 clusters naturales de agrupación se tradujeron en 6 secciones con navegación clara.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
        {SECTIONS.map((s) => (
          <div key={s.name} className="rounded-2xl flex flex-col" style={{ background: "#fff", padding: "20px 22px", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 10px 24px -18px rgba(18,20,26,.12)", borderTop: `3px solid ${s.color}`, gap: 12 }}>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center rounded-lg flex-none" style={{ width: 32, height: 32, background: s.tagBg, color: s.color, font: `700 15px ${FONT}` }}>{s.icon}</span>
              <div style={{ font: `700 15px ${FONT}`, color: "#12141a" }}>{s.name}</div>
            </div>

            {s.children && (
              <div className="flex flex-col" style={{ gap: 12 }}>
                {s.children.map((c) => (
                  <div key={c} className="grid items-start" style={{ gridTemplateColumns: "5px 1fr", columnGap: 8, font: `500 12.5px/1.4 ${FONT}`, color: "#3a3f4c" }}>
                    <span className="rounded-full" style={{ width: 5, height: 5, marginTop: 6, background: s.color }} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}
            {s.note && (
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 12.5, lineHeight: 1.5, color: "#8b93a3" }}>{s.note}</div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl" style={{ marginTop: 26, padding: "20px 24px", background: "#fff", boxShadow: "0 1px 2px rgba(18,20,26,.04)" }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#a2a8b5", marginBottom: 8 }}>
          Por qué algunas cards no son pantallas
        </div>
        <p style={{ font: `400 12.5px/1.6 ${FONT}`, color: "#5b6373", margin: 0 }}>
          "Tachar un gasto fijo", "editar/eliminar registro" y "filtro de historial" son acciones dentro de una pantalla, no secciones propias — el card sorting agrupa conceptos, no necesariamente navegación.
        </p>
      </div>
    </div>
  );
}
