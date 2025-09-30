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

  // Função para finalizar o loading screen inicial - quando player estiver pronto
  const handleLoadingComplete = () => {
    // Finaliza o loading quando o player estiver pronto (não precisa mais aguardar 2s)
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
        autoplay: 0, // Não reproduzir automaticamente
        mute: 0, // Não mutado por padrão
        loop: 0, // Não loop automático
        controls: 0, // Controles customizados
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        fs: 1, // Permitir fullscreen
        disablekb: 0, // Permitir controles de teclado
        iv_load_policy: 3, // Sem anotações
        cc_load_policy: 0, // Sem legendas automáticas
        enablejsapi: 1, // Habilitar JavaScript API
        origin: window.location.origin, // Definir origem
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
    setIsVideoPlaying(false); // Não está tocando automaticamente
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

      {/* Seção principal do Hero - Layout estilo Aman Villas */}
      <section className="relative min-h-screen w-full max-w-full overflow-hidden bg-stone-50">
        {/* Parte superior - Conteúdo de texto */}
        <div className="relative z-20 bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Loading indicator minimalista */}
            {isVideoLoading && (
              <div className="mb-8">
                <div className="w-8 h-8 border border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm font-light text-primary-600 tracking-wide">
                  Preparando experiência...
                </p>
              </div>
            )}

            {/* Título principal */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-breathing font-breathing-shadow-light text-primary-500 mb-6"
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
                className="text-accent-500 block font-breathing font-breathing-shadow-light"
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

            {/* Subtítulo */}
            <motion.h2
              className="text-lg md:text-2xl lg:text-3xl font-semibold text-primary-600 font-avenir mb-8"
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

            {/* Descrição */}
            <motion.p
              className="text-base md:text-lg text-secondary-500 leading-relaxed max-w-3xl mx-auto font-avenir mb-12"
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

            {/* Badge exclusivo */}
            <motion.div
              className="inline-flex items-center bg-primary-100 border border-primary-200 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
              <span className="text-primary-700 font-medium">
                {t("hero.exclusive")}
              </span>
            </motion.div>

            {/* Botão CTA */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.button
                onClick={onContactClick}
                className="bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-avenir"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("hero.cta")}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Parte inferior - Player Moderno */}
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          {/* Fundo preto como fallback caso o vídeo não carregue */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Container do YouTube Player */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div
              id="youtube-player"
              className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {/* Overlay gradiente sutil no vídeo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

          {/* Player Controls Moderno */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            {/* Botão Play Central - Só aparece quando vídeo não está tocando */}
            {!isVideoPlaying && (
              <motion.button
                onClick={() => {
                  if (playerRef.current && playerReadyRef.current) {
                    try {
                      const playerState = playerRef.current.getPlayerState();
                      console.log("🎬 Estado atual do player:", playerState);

                      if (playerState === 1) {
                        // Playing
                        playerRef.current.pauseVideo();
                        console.log("⏸️ Pausando vídeo");
                      } else {
                        // Not playing (unstarted, paused, ended, etc.)
                        playerRef.current.playVideo();
                        console.log("▶️ Iniciando vídeo");
                      }
                    } catch (error) {
                      console.error("❌ Erro ao controlar player:", error);
                    }
                  } else {
                    console.log("⚠️ Player não está pronto ainda");
                  }
                }}
                className="group bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border border-white/20 hover:bg-white transition-all duration-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            )}

            {/* Controles inferiores - Aparecem no hover ou quando não está tocando */}
            <div className="absolute bottom-6 left-6 right-6 group">
              <div
                className={`bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-opacity duration-300 ${
                  !isVideoPlaying
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {/* Barra de progresso */}
                <div className="mb-4">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "25%" }}
                      transition={{ duration: 2, delay: 2 }}
                    />
                  </div>
                </div>

                {/* Controles principais */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Play/Pause */}
                    <button
                      onClick={() => {
                        if (playerRef.current && playerReadyRef.current) {
                          try {
                            const playerState =
                              playerRef.current.getPlayerState();
                            if (playerState === 1) {
                              // Playing
                              playerRef.current.pauseVideo();
                            } else {
                              // Not playing
                              playerRef.current.playVideo();
                            }
                          } catch (error) {
                            console.error(
                              "❌ Erro ao controlar player:",
                              error
                            );
                          }
                        }
                      }}
                      className="text-white hover:text-accent-400 transition-colors duration-200"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>

                    {/* Tempo */}
                    <span className="text-white/80 text-sm font-mono">
                      0:05 / 0:42
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Volume */}
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-white/80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                      <div className="w-16 h-1 bg-white/20 rounded-full">
                        <div className="w-3/4 h-full bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Fullscreen */}
                    <button className="text-white/80 hover:text-white transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    </button>

                    {/* Settings */}
                    <button className="text-white/80 hover:text-white transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      </section>
    </>
  );
}
