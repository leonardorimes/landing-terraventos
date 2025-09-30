"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";
import LoadingScreen from "./LoadingScreen";
import ResizeLoading from "./ResizeLoading";
import { useResizeLoading } from "../hooks/useResizeLoading";
import { useLanguage } from "@/contexts/LanguageContext";

// Declaração global do YouTube Player API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Interface para as props do componente Hero
interface HeroProps {
  onContactClick: () => void;
}

// Componente principal da seção Hero da Comunidade Terra Ventos
// Este componente contém o vídeo de fundo, animações e call-to-actions principais
export default function Hero({ onContactClick }: HeroProps) {
  const { t } = useLanguage();

  // Estados para controle de vídeos
  const [currentVideo, setCurrentVideo] = useState<string>("");

  // ID do vídeo fixo do YouTube que será exibido como fundo
  const videoId = "C1MRkfuTtOI"; // Vídeo fixo do YouTube

  // Estados para controlar diferentes fases de carregamento
  const [isLoading, setIsLoading] = useState(true); // Loading screen inicial
  const [isVideoLoading, setIsVideoLoading] = useState(false); // Carregamento do vídeo
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Reprodução do vídeo
  const [videoError, setVideoError] = useState(false); // Erro no carregamento do vídeo

  // Refs para controle do player
  const playerRef = useRef<any>(null);
  const playerReadyRef = useRef(false);

  // Hook personalizado para detectar redimensionamento significativo da janela
  const isResizeLoading = useResizeLoading({
    threshold: 25, // 25% de mudança para triggerar o loading
    duration: 3000, // 3 segundos de duração do loading
  });

  // Função para finalizar o loading screen inicial
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Função para verificar se pode finalizar o loading
  useEffect(() => {
    if (!isVideoLoading && isLoading) {
      // Pequeno delay para garantir que tudo está estável
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoading, isLoading]);

  // Função para inicializar o YouTube Player API
  const initializeYouTubeAPI = () => {
    if (window.YT && window.YT.Player) {
      console.log("🎬 YouTube API já carregada");
      createPlayer();
    } else {
      console.log("🎬 Carregando YouTube API...");

      // Carregar a API do YouTube
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Callback quando a API estiver pronta
      window.onYouTubeIframeAPIReady = () => {
        console.log("✅ YouTube API carregada com sucesso");
        createPlayer();
      };
    }
  };

  // Função para criar o player
  const createPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    console.log("🎬 Criando player do YouTube para vídeo:", videoId);
    setIsVideoLoading(true);
    setVideoError(false);

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: 1, // Reproduzir automaticamente
        mute: 1, // Mutado por padrão
        loop: 1, // Loop automático
        controls: 0, // Controles customizados
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        fs: 0, // Sem fullscreen
        disablekb: 1, // Sem controles de teclado
        playlist: videoId,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  };

  // Event handlers do YouTube Player
  const onPlayerReady = (event: any) => {
    console.log("✅ Player pronto");
    playerReadyRef.current = true;
    setIsVideoLoading(false);
    setIsVideoPlaying(true);
  };

  const onPlayerStateChange = (event: any) => {
    console.log("🎬 Estado do player mudou:", event.data);

    // YouTube Player States: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === 1) {
      // Playing
      setIsVideoPlaying(true);
    } else if (event.data === 2 || event.data === 3) {
      // Paused or Buffering
      setIsVideoPlaying(false);
    }
  };

  const onPlayerError = (event: any) => {
    console.error("❌ Erro no player do YouTube:", event.data);
    setIsVideoLoading(false);
    setIsVideoPlaying(false);
    setVideoError(true);
  };

  // Effect para inicializar o player quando o componente montar
  useEffect(() => {
    initializeYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <>
      {/* Tela de loading inicial */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Loading durante redimensionamento da janela */}
      <ResizeLoading isVisible={isResizeLoading} />

      {/* Seção principal do Hero */}
      <section className="relative min-h-screen flex items-center w-full max-w-full overflow-hidden">
        {/* Container do vídeo de fundo */}
        <div className="absolute inset-0 w-full h-full">
          {/* Fundo preto como fallback caso o vídeo não carregue */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Container do YouTube Player */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <div
              id="youtube-player"
              className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {/* Overlay de loading durante carregamento do vídeo */}
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xl font-semibold mb-2">
                  {t("hero.loading")}
                </p>
                <p className="text-sm text-white/80">
                  {t("hero.loading.subtitle")}
                </p>
                <div className="text-xs text-white/60 mt-2 space-y-1">
                  <p>ID: {videoId}</p>
                  <p>Status: Carregando player...</p>
                </div>
              </div>
            </div>
          )}

          {/* Fallback caso o vídeo não carregue */}
          {videoError && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold mb-2">
                  {t("hero.video.error")}
                </p>
                <p className="text-sm text-white/80">
                  {t("hero.video.error.subtitle")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay escuro para melhorar a visibilidade do texto */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        {/* Gradiente sutil para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15 z-15"></div>

        {/* Container principal do conteúdo */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center py-8 md:py-0">
          <div className="text-center max-w-4xl mx-auto w-full">
            <motion.div
              className="text-white space-y-4 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge de destaque da comunidade */}
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                {t("hero.exclusive")}
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight font-breathing font-breathing-shadow-dark drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <AnimatedText delay={0.2} className="block">
                  {t("hero.community")}
                </AnimatedText>
                <motion.span
                  className="text-accent-500 block font-breathing font-breathing-shadow-dark"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8,
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {t("hero.title")}
                </motion.span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-3xl lg:text-4xl font-semibold text-white/95 drop-shadow-lg font-avenir"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {t("hero.subtitle")}
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-avenir"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {t("hero.description")}
              </motion.p>

              {/* Botões de Call-to-Action */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.button
                  onClick={onContactClick}
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-avenir"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("hero.cta")}
                </motion.button>

                <motion.button
                  onClick={onContactClick}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 font-avenir"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("hero.discover")}
                </motion.button>
              </motion.div>

              {/* Estatísticas da comunidade */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 1.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2 font-breathing">
                    {t("stats.value")}
                  </div>
                  <div className="text-sm text-white/80 font-avenir">
                    {t("stats.investment")}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2 font-breathing">
                    500+
                  </div>
                  <div className="text-sm text-white/80 font-avenir">
                    {t("stats.members")}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2 font-breathing">
                    15+
                  </div>
                  <div className="text-sm text-white/80 font-avenir">
                    {t("stats.countries")}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
