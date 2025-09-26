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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lista de vídeos disponíveis (ordenados por tamanho - menor primeiro)
  const availableVideos = [
    "/video/video4.MP4", // Menor (113MB)
    "/video/video2.MP4", // Maior (427MB)
    "/video/video3.MP4", // Maior (427MB)
  ];

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

  // Função para selecionar vídeo aleatório
  const getRandomVideo = () => {
    const filteredVideos = availableVideos.filter(
      (video) => video !== previousVideo
    );
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    return filteredVideos[randomIndex];
  };

  // Carregar vídeo aleatório inicial
  useEffect(() => {
    const randomVideo = getRandomVideo();
    console.log("🎬 Vídeo selecionado:", randomVideo);
    setCurrentVideo(randomVideo);
    setPreviousVideo(randomVideo);
  }, []);

  // Função para carregar vídeo
  const loadVideo = async () => {
    if (!currentVideo || !videoRef.current) return;

    console.log("🎬 Carregando vídeo:", currentVideo);
    setIsVideoLoading(true);
    setIsVideoPlaying(false);
    setVideoError(false);

    try {
      // Reset do vídeo
      videoRef.current.currentTime = 0;
      videoRef.current.load();

      // Aguardar o vídeo estar pronto antes de tentar reproduzir
      videoRef.current.addEventListener(
        "canplay",
        async () => {
          try {
            await videoRef.current?.play();
          } catch (playError) {
            console.log(
              "ℹ️ Autoplay bloqueado, usuário precisa interagir primeiro"
            );
          }
        },
        { once: true }
      );
    } catch (error) {
      console.error("❌ Erro ao carregar vídeo:", error);
      setVideoError(true);
    }
  };

  // Carregar vídeo automaticamente quando currentVideo muda
  useEffect(() => {
    if (currentVideo) {
      loadVideo();
    }
  }, [currentVideo]);

  // Handlers do vídeo
  const handleVideoLoadStart = () => {
    console.log("🔄 Carregamento iniciado");
    setIsVideoLoading(true);
    setVideoError(false);
  };

  const handleVideoCanPlay = () => {
    console.log("✅ Vídeo pronto para reprodução");
    setIsVideoLoading(false);
    setVideoError(false);
  };

  const handleVideoLoadedData = () => {
    console.log("✅ Dados do vídeo carregados");
    setIsVideoLoading(false);
  };

  const handleVideoPlay = () => {
    console.log("▶️ Vídeo reproduzindo");
    setIsVideoPlaying(true);
    setIsVideoLoading(false);
  };

  const handleVideoPause = () => {
    console.log("⏸️ Vídeo pausado");
    setIsVideoPlaying(false);
  };

  const handleVideoEnded = () => {
    console.log("🏁 Vídeo terminou - reiniciando loop");
    setIsVideoPlaying(false);
    // Reiniciar o mesmo vídeo em loop
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const error = e.currentTarget.error;
    console.error("❌ Erro no vídeo:", error);
    console.error("❌ Código do erro:", error?.code);
    console.error("❌ Mensagem do erro:", error?.message);
    console.error("❌ Caminho do vídeo:", currentVideo);
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

          {/* Vídeo */}
          {currentVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-10"
              muted
              playsInline
              preload="metadata"
              loop={false}
              // Otimizações de performance
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onLoadStart={handleVideoLoadStart}
              onCanPlay={handleVideoCanPlay}
              onLoadedData={handleVideoLoadedData}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              // Otimizações de rede
              crossOrigin="anonymous"
            >
              <source src={currentVideo} type="video/mp4" />
              Seu navegador não suporta reprodução de vídeo.
            </video>
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
                    onClick={loadVideo}
                    className="bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors text-sm"
                  >
                    🔄 Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/20 z-5"></div>

        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-6"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
          <div className="text-center max-w-4xl mx-auto">
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
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-0"
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
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-avenir"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Junte-se à Comunidade
                </motion.button>
                <motion.a
                  href="#por-que-fazer-parte"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-avenir"
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
