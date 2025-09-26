"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Componente de seção de cadastro para a Comunidade Terra Ventos
// Este componente contém um formulário completo para novos membros se inscreverem
export default function SignupSection() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    paisEstado: "",
    faixaInvestimento: "",
    interessePrincipal: "",
    aceitoComunicacoes: false,
  });

  // Estados para controlar o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário (aqui você integraria com sua API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      // Limpar formulário após sucesso
      setTimeout(() => {
        setSubmitStatus("idle");
        setFormData({
          nome: "",
          email: "",
          whatsapp: "",
          paisEstado: "",
          faixaInvestimento: "",
          interessePrincipal: "",
          aceitoComunicacoes: false,
        });
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção com título e descrição */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Entre para a Comunidade Terra Ventos
          </motion.h2>
          <motion.p
            className="text-lg text-secondary-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Preencha seus dados e receba oportunidades sob medida.
          </motion.p>
        </div>

        {/* Container do formulário com animações */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mensagem de sucesso quando o formulário é enviado */}
            {submitStatus === "success" && (
              <motion.div
                className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cadastro realizado com sucesso! Em breve entraremos em
                  contato.
                </div>
              </motion.div>
            )}

            {/* Mensagem de erro quando há problemas no envio */}
            {submitStatus === "error" && (
              <motion.div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Erro ao enviar formulário. Tente novamente.
                </div>
              </motion.div>
            )}

            {/* Campos do formulário organizados em grid responsivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo de nome completo */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-black"
                />
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-black"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+55 (DDD) 9XXXX-XXXX"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-black"
                />
              </div>

              {/* País/Estado */}
              <div>
                <label
                  htmlFor="paisEstado"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  País/Estado
                </label>
                <input
                  type="text"
                  id="paisEstado"
                  name="paisEstado"
                  value={formData.paisEstado}
                  onChange={handleInputChange}
                  placeholder="Ex: Brasil / CE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-black"
                />
              </div>

              {/* Faixa de Investimento */}
              <div>
                <label
                  htmlFor="faixaInvestimento"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  Faixa de investimento *
                </label>
                <div className="relative">
                  <select
                    id="faixaInvestimento"
                    name="faixaInvestimento"
                    value={formData.faixaInvestimento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors appearance-none bg-white text-black"
                  >
                    <option value="">Selecione</option>
                    <option value="ate-100k">Até R$ 100.000</option>
                    <option value="100k-500k">R$ 100.000 - R$ 500.000</option>
                    <option value="500k-1m">R$ 500.000 - R$ 1.000.000</option>
                    <option value="1m-5m">R$ 1.000.000 - R$ 5.000.000</option>
                    <option value="acima-5m">Acima de R$ 5.000.000</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interesse Principal */}
              <div>
                <label
                  htmlFor="interessePrincipal"
                  className="block text-sm font-medium text-primary-500 mb-2"
                >
                  Interesse principal *
                </label>
                <div className="relative">
                  <select
                    id="interessePrincipal"
                    name="interessePrincipal"
                    value={formData.interessePrincipal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors appearance-none bg-white text-black"
                  >
                    <option value="">Selecione</option>
                    <option value="investimento">Investimento</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="kitesurf">Kitesurf</option>
                    <option value="turismo">Turismo</option>
                    <option value="negocios">Negócios</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="aceitoComunicacoes"
                name="aceitoComunicacoes"
                checked={formData.aceitoComunicacoes}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
              />
              <label
                htmlFor="aceitoComunicacoes"
                className="ml-3 text-sm text-gray-600"
              >
                Aceito receber comunicações da Terra Ventos sobre oportunidades
                de investimento e eventos da comunidade.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.aceitoComunicacoes}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 min-w-[200px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </div>
                ) : (
                  "Quero fazer parte"
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              Seus dados estão protegidos, conforme nossa{" "}
              <a
                href="#"
                className="text-accent-500 hover:text-accent-600 underline"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
