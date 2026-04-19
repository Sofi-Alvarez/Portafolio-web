import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const feedbacks = [
    {
      rating: 5,
      comment:
        "Juan demostró una comprensión excepcional de nuestras necesidades de usuario. Su enfoque metódico y centrado en datos transformó completamente nuestra experiencia de usuario.",
      name: "María González",
      agency: "Digital Innovations Inc.",
      project: "E-commerce Redesign",
    },
    {
      rating: 5,
      comment:
        "El trabajo de diseño fue impecable. La atención al detalle y la capacidad para equilibrar estética con funcionalidad superó nuestras expectativas.",
      name: "Carlos Rodríguez",
      agency: "Tech Solutions Ltd.",
      project: "Banking Dashboard",
    },
    {
      rating: 5,
      comment:
        "Profesional excepcional con gran capacidad de comunicación. Entregó un diseño que no solo se veía increíble sino que también mejoró nuestras métricas de conversión.",
      name: "Ana Martínez",
      agency: "StartUp Ventures",
      project: "Fitness Platform",
    },
    {
      rating: 5,
      comment:
        "Juan es un diseñador que realmente entiende el negocio. Su trabajo en nuestro proyecto ayudó a aumentar el engagement en un 60%.",
      name: "Pedro Sánchez",
      agency: "Growth Marketing Co.",
      project: "Social Media App",
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % feedbacks.length;
      cards.push({ ...feedbacks[index], displayIndex: i });
    }
    return cards;
  };

  return (
    <section id="feedback" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-800 dark:text-gray-100">
            Testimonios de Clientes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Lo que dicen mis clientes sobre trabajar conmigo
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map((feedback, i) => (
                <motion.div
                  key={`${currentIndex}-${i}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeedbackCard feedback={feedback} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#025959] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-[#FF8300]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#025959] hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-[#FF8300]" />
          </button>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackCard feedback={feedbacks[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#025959] hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-[#FF8300]" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#025959] hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-[#FF8300]" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#025959] w-8" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedbackCard({
  feedback,
}: {
  feedback: {
    rating: number;
    comment: string;
    name: string;
    agency: string;
    project: string;
  };
}) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-600 h-full flex flex-col">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: feedback.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#FF8300] text-[#FF8300]" />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 flex-grow">
        "{feedback.comment}"
      </p>

      {/* Author Info */}
      <div className="border-t border-gray-100 dark:border-gray-600 pt-4">
        <div className="text-gray-800 dark:text-gray-100 mb-1">{feedback.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{feedback.agency}</div>
        <div className="text-sm text-[#025959] dark:text-[#FF8300] mt-1">Proyecto: {feedback.project}</div>
      </div>
    </div>
  );
}