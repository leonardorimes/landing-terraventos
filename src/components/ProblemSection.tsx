"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function ProblemSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16"
          />
        </svg>
      ),
      title: "Acesso exclusivo",
      description: "Receba oportunidades antes do mercado.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Segurança jurídica",
      description: "Terrenos 100% regularizados e matricula verificada.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "Valorização & insights",
      description: "Curadoria baseada em dados e tendência de turismo.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Networking global",
      description: "Investidores BR/INTL, kite e nomades digitais.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Eventos & experiências",
      description: "Sunsets, downwinds e ativações locais.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
      title: "Atendimento consultivo",
      description: "Concierge de investimento e suporte bilingue.",
    },
  ];

  return (
    <AnimatedSection
      id="por-que-fazer-parte"
      background="none"
      color="gray"
      direction="up"
      delay={0.1}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-500 mb-6 font-diodrum"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Por que fazer parte
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-secondary-500 font-avenir"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Mais que um investimento, uma comunidade conectada ao lifestyle
            litorâneo
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.8 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center mb-4">
                <div className="text-accent-500 mr-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-primary-500">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-secondary-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
