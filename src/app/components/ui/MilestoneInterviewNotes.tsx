/**
 * MilestoneInterviewNotes — standalone "fintech clean" component.
 * Handoff from Claude Design, reimplemented pixel-perfect in plain React/Tailwind.
 */
const FONT = "'Manrope', sans-serif";
const SERIF = "'Instrument Serif', serif";

interface Quote {
  text: string;
  speaker: string;
  initial: string;
  avatarBg: string;
  tag: string;
  tagBg: string;
  tagColor: string;
}

const QUOTES: Quote[] = [
  { text: "Yo necesito tachar, necesito algo que yo pueda decir: esto ya está pagado.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Cierre emocional", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
  { text: "Como no hay, lo más fácil para mí es escribirlo.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Papel vs digital", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
  { text: "No quiero pasar a mano a otro producto los gastos, porque perdía tiempo.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "Carga manual", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Capaz te olvidás un día y ya se te arruina el traqueo.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "Retención", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Educación financiera cero.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Educación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "No me gustaría ya tanto una charla que te motive, sino algo más educativo que me enseñe.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Educación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "Me genera mucha desconfianza… veo esos gurúes y después no activo nada.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Confianza", tagBg: "#FDEAEA", tagColor: "#C23B3B" },
  { text: "Capaz me estoy perdiendo algo… y no sé si son todas iguales.", speaker: "María", initial: "M", avatarBg: "#22B8A0", tag: "FOMO", tagBg: "#E3F6F2", tagColor: "#22B8A0" },
  { text: "Cuando estoy cómodo trato de no darle bola.", speaker: "Gabriel", initial: "G", avatarBg: "#B5732A", tag: "Motivación", tagBg: "#FFF1DE", tagColor: "#B5732A" },
  { text: "No sé cuánto gasto en desayuno, almuerzo, cena. Te mentiría.", speaker: "Rossana", initial: "R", avatarBg: "#4F6BF6", tag: "Visibilidad", tagBg: "#EDF1FE", tagColor: "#4F6BF6" },
];

export function MilestoneInterviewNotes() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 32px", fontFamily: FONT, background: "#F7F8FB" }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#EDF1FE", color: "#4F6BF6", font: `700 13px ${FONT}` }}>"</span>
        <span style={{ font: `700 11px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#7b8494" }}>Notas de entrevista</span>
      </div>
      <h1 style={{ font: `700 30px/1.25 ${FONT}`, color: "#12141a", margin: "0 0 10px" }}>Voces de la entrevista</h1>
      <p style={{ font: `400 15px/1.6 ${FONT}`, color: "#5b6373", margin: "0 0 32px", maxWidth: 640 }}>
        Las 10 citas más poderosas de Rossana, Gabriel y María — seleccionadas por expresar el dolor de forma visceral y desarmar supuestos del equipo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 18 }}>
        {QUOTES.map((q, i) => (
          <div key={i} className="rounded-2xl flex flex-col" style={{ background: "#fff", padding: "22px 22px 18px", boxShadow: "0 1px 2px rgba(18,20,26,.04), 0 10px 24px -18px rgba(18,20,26,.14)", gap: 12 }}>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "#1c1f27", margin: 0 }}>"{q.text}"</p>
            <div className="flex items-center justify-between" style={{ marginTop: "auto" }}>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: q.avatarBg, color: "#fff", font: `700 10px ${FONT}` }}>{q.initial}</span>
                <span style={{ font: `700 11.5px ${FONT}`, color: "#12141a" }}>{q.speaker}</span>
              </div>
              <span className="rounded-full" style={{ font: `600 9.5px ${FONT}`, letterSpacing: ".03em", textTransform: "uppercase", padding: "3px 9px", background: q.tagBg, color: q.tagColor }}>{q.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl" style={{ marginTop: 28, padding: "22px 26px", background: "#12141a" }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: ".06em", textTransform: "uppercase", color: "#8fa0ff", marginBottom: 8 }}>
          Síntesis del research
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "#fff", margin: 0 }}>
          "El usuario no quiere controlar gastos. Quiere sentir tranquilidad."
        </p>
      </div>
    </div>
  );
}
