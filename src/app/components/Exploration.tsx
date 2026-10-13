import { motion } from "motion/react";

export function Exploration() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#025959]/5 to-[#FF8300]/5 dark:from-[#025959]/10 dark:to-[#FF8300]/10">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute -top-8 -left-4 text-8xl text-[#025959]/20 dark:text-[#4ecfcf]/30">"</div>
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-gray-100 leading-relaxed relative z-10">
            Estoy explorando constantemente{" "}
            <span className="text-[#025959] dark:text-[#FF8300]">nuevas mejores prácticas</span> y{" "}
            <span className="text-[#025959] dark:text-[#4ecfcf]">flujos de trabajo</span>
          </p>
          <div aria-hidden="true" className="absolute -bottom-8 -right-4 text-8xl text-[#025959]/20 dark:text-[#4ecfcf]/30 rotate-180">
            "
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}