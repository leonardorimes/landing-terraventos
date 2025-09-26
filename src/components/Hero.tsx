"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";
import LoadingScreen from "./LoadingScreen";
import ResizeLoading from "./ResizeLoading";
import { useResizeLoading } from "../hooks/useResizeLoading";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [previousVideo, setPreviousVideo] = useState<string>("");

  // Vídeo fixo do YouTube
  const videoId = "C1MRkfuTtOI"; // Vídeo fixo do YouTube

  // Estado para controlar o loading screen
  const [isLoading, setIsLoading] = useState(true);

  // Estado para controlar se vídeo está carregando
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Estado para controlar se vídeo está reproduzindo
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Estado para controlar se houve erro no vídeo
  const [videoError, setVideoError] = useState(false);

  // Hook para detectar redimensionamento significativo
  const isResizeLoading = useResizeLoading({
    threshold: 25, // 25% de mudança para triggerar
    duration: 3000, // 3 segundos de loading
  });

  // Função para completar o loading
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Carregar vídeo fixo do YouTube
  useEffect(() => {
    console.log("🎬 Carregando vídeo do YouTube:", videoId);
    setCurrentVideo(videoId);
    setIsVideoLoading(true);
    setIsVideoPlaying(false);
    setVideoError(false);
  }, []);

  // Handlers do vídeo
  const handleVideoLoadStart = () => {
    console.log("🔄 Carregamento do iframe iniciado");
    setIsVideoLoading(true);
    setVideoError(false);
    // Simular carregamento completo após um tempo
    setTimeout(() => {
      setIsVideoLoading(false);
      setIsVideoPlaying(true);
    }, 2000);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) => {
    console.error("❌ Erro ao carregar vídeo do YouTube:", e);
    console.error("❌ ID do vídeo:", currentVideo);
    console.error(
      "❌ URL completa:",
      `https://www.youtube.com/embed/${currentVideo}`
    );
    setIsVideoLoading(false);
    setIsVideoPlaying(false);
    setVideoError(true);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Resize Loading */}
      <ResizeLoading isVisible={isResizeLoading} />

      <section className="relative min-h-screen flex items-center w-full max-w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Fundo preto como fallback */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Vídeo do YouTube */}
          {currentVideo && (
            <div className="absolute inset-0 w-full h-full z-5 overflow-hidden">
              <iframe
                className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&loop=1&playlist=${currentVideo}&controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&disablekb=1&enablejsapi=1`}
                title="Background Video"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen={false}
                onLoad={handleVideoLoadStart}
                onError={handleVideoError}
                loading="eager"
              />
            </div>
          )}

          {/* Loading do vídeo */}
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xl font-semibold mb-2">Carregando Vídeo</p>
                <p className="text-sm text-white/80">Aguarde...</p>
              </div>
            </div>
          )}

          {/* Mensagem de erro */}
          {videoError && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
              <div className="text-center text-white max-w-md mx-auto px-4">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-xl font-semibold mb-2">
                  Erro ao carregar vídeo
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Arquivo: {currentVideo.split("/").pop()}
                </p>
                <p className="text-xs text-white/60 mb-4">
                  Caminho: {currentVideo}
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors text-sm"
                  >
                    🔄 Recarregar página
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15 z-15"></div>

        {/* Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto w-full">
            <motion.div
              className="text-white space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                Comunidade Exclusiva
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight font-diodrum drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <AnimatedText delay={0.2} className="block">
                  Comunidade
                </AnimatedText>
                <motion.span
                  className="text-accent-500 block font-diodrum"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8,
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  Terra Ventos
                </motion.span>
              </motion.h1>

              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 drop-shadow-lg font-avenir"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Onde investir é viver
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md font-avenir"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Junte-se a uma rede exclusiva de investidores, kitesurfistas e
                amantes do litoral nordestino. Acesso antecipado a oportunidades
                imobiliárias, curadoria jurídica e um lifestyle conectado ao
                vento e ao mar.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-0 w-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.6,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.button
                  onClick={onContactClick}
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-avenir w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Junte-se à Comunidade
                </motion.button>
                <motion.a
                  href="#por-que-fazer-parte"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-avenir w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Conheça as Oportunidades
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats - Hidden on mobile to avoid overlap */}
        <motion.div
          className="hidden md:block absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center text-white">
            <div className="text-3xl font-bold text-accent-500">500+</div>
            <div className="text-sm text-white/80">Investidores Ativos</div>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center text-white">
            <div className="text-3xl font-bold text-accent-500">R$ 50M+</div>
            <div className="text-sm text-white/80">Volume Investido</div>
          </div>
        </motion.div>

        {/* Mobile Stats - Inline with content */}
        <div className="md:hidden flex justify-center gap-6 mt-6">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center text-white">
              <div className="text-2xl font-bold text-accent-500">500+</div>
              <div className="text-xs text-white/80">Investidores</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="text-center text-white">
              <div className="text-2xl font-bold text-accent-500">R$ 50M+</div>
              <div className="text-xs text-white/80">Volume</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute top-1/4 left-8 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>

        <motion.div
          className="hidden md:block absolute bottom-1/4 right-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.1, rotate: -10 }}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </motion.div>
      </section>
    </>
  );
}
