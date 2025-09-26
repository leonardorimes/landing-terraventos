"use client";

import { motion } from "framer-motion";

export default function SolutionSection() {
  return (
    <motion.section
      id="nossa-missao"
      className="py-20 relative overflow-hidden min-h-screen flex items-center"
      style={{ backgroundColor: "#142431" }}
      initial={{ y: -200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      {/* Background Image with People */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop&crop=center"
          alt="Comunidade Terra Ventos"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Geometric overlay */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary-500/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-500 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-diodrum text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            FORGE CONEXÕES INESQUECÍVEIS
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-avenir"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            A Terra Ventos torna o litoral nordestino sem fronteiras para você.
            Você criará conexões profundas e pessoais com outros investidores
            que entendem seus desafios e conquistas.
          </motion.p>

          <motion.button
            className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-avenir"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VEJA COMO FUNCIONA
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
