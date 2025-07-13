"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { websocketService } from "@/services/websocket.service";
import { ResearchStatus } from "@/lib/types";

interface SourceWithId {
  id: string;
  title: string;
  url: string;
  domain: string;
  timestamp: number;
  isLeaving?: boolean;
}

interface StepMessage {
  id: string;
  message: string;
  timestamp: number;
  type: "generic" | "websocket" | "step";
}

export default function CreateCourseLoading() {
  const router = useRouter();
  const { state, dispatch, checkResearchStatus } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState(
    "Preparando seu curso personalizado..."
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const isProcessing = useRef(false);
  const statusCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const totalSteps = 10;
  const [stepMessages, setStepMessages] = useState<StepMessage[]>([]);
  const [sourcesFound, setSourcesFound] = useState<SourceWithId[]>([]);
  const [currentWebSocketMessage, setCurrentWebSocketMessage] =
    useState<string>("");
  const [webSocketProgress, setWebSocketProgress] = useState(0);
  const [hasWebSocketUpdate, setHasWebSocketUpdate] = useState(false);
  const [genericMessagesLoaded, setGenericMessagesLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MAX_SOURCES_VISIBLE = 4; // Tamanho fixo da fila de fontes
  const MAX_MESSAGES_VISIBLE = 5; // Número máximo de mensagens visíveis

  // Função para scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Função para extrair ou determinar o ícone correto da mensagem
  const getMessageIcon = (
    message: string,
    type: "generic" | "websocket" | "step"
  ) => {
    // Se a mensagem já tem um emoji no início, extraí-lo
    const emojiMatch = message.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u
    );
    if (emojiMatch) {
      return emojiMatch[0];
    }

    // Fallback baseado no tipo e conteúdo
    switch (type) {
      case "websocket":
        if (message.includes("Fonte encontrada")) return "📚";
        if (message.includes("pesquisa")) return "🔍";
        if (message.includes("domínios")) return "🌐";
        if (message.includes("análise") || message.includes("analisando"))
          return "🧠";
        if (message.includes("questões")) return "❓";
        if (message.includes("documento")) return "📄";
        return "🔍";
      case "step":
        if (message.includes("sucesso") || message.includes("concluída"))
          return "🎉";
        if (message.includes("preparando")) return "🔍";
        if (message.includes("gerando")) return "⚙️";
        if (message.includes("executando")) return "📊";
        if (message.includes("analisando")) return "🧠";
        return "🤖";
      case "generic":
        if (message.includes("pesquisa")) return "🔍";
        if (message.includes("domínios")) return "🌐";
        if (message.includes("análise")) return "📊";
        return "🚀";
      default:
        return "🤖";
    }
  };

  // Função para limpar mensagem (remover emoji do início se existir)
  const cleanMessage = (message: string) => {
    return message.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, "");
  };

  // Função para adicionar mensagem
  const addMessage = (
    message: string,
    type: "generic" | "websocket" | "step"
  ) => {
    setStepMessages((prev) => {
      // Verificar se a mensagem já existe para evitar duplicatas
      const cleanedMessage = cleanMessage(message);
      const messageExists = prev.some(
        (msg) =>
          cleanMessage(msg.message) === cleanedMessage && msg.type === type
      );

      if (messageExists) {
        return prev; // Não adicionar se já existe
      }

      const newMessage: StepMessage = {
        id: `${type}-${cleanedMessage
          .slice(0, 10)
          .replace(/[^a-zA-Z0-9]/g, "")}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`, // ID único e seguro
        message: cleanedMessage, // Armazenar mensagem limpa
        timestamp: Date.now(),
        type,
      };

      const newMessages = [...prev, newMessage];

      // Manter apenas as últimas mensagens
      if (newMessages.length > MAX_MESSAGES_VISIBLE) {
        // Marcar mensagens antigas como saindo
        return newMessages.slice(-MAX_MESSAGES_VISIBLE);
      }

      return newMessages;
    });

    // Scroll para baixo após adicionar mensagem
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    // Carregar algumas etapas genéricas iniciais apenas uma vez
    if (!genericMessagesLoaded) {
      const genericSteps = [
        "Iniciando pesquisa personalizada...",
        "Configurando domínios de busca...",
        "Preparando análise de conteúdo...",
      ];

      // Adicionar mensagens genéricas com delay
      genericSteps.forEach((step, index) => {
        setTimeout(() => {
          addMessage(step, "generic");
        }, index * 800);
      });

      setGenericMessagesLoaded(true);
    }
  }, [genericMessagesLoaded]);

  // Configurar WebSocket quando courseId estiver disponível
  useEffect(() => {
    if (!state.courseId) return;

    // Configurar callbacks do WebSocket
    websocketService.setOnConnectionChange((connected) => {
      if (connected) {
        // Conectar ao curso quando WebSocket estiver conectado
        websocketService.joinCourse(state.courseId!);
      }
    });

    websocketService.setOnResearchUpdate((update) => {
      // Atualizar estado com dados do WebSocket
      dispatch({ type: "SET_RESEARCH_STATUS", payload: update.status });
      dispatch({ type: "SET_RESEARCH_PROGRESS", payload: update.progress });
      dispatch({ type: "SET_RESEARCH_MESSAGE", payload: update.message });

      // Atualizar progresso do WebSocket (sempre crescente)
      if (update.progress !== undefined) {
        setWebSocketProgress((prev) => Math.max(prev, update.progress));
        setHasWebSocketUpdate(true);
      }

      // Atualizar mensagem em tempo real
      if (update.message) {
        setCurrentWebSocketMessage(update.message);
        addMessage(update.message, "websocket");
      }

      // Mapear steps do WebSocket para mensagens amigáveis
      if (update.current_step) {
        const stepMessages = {
          preparation: "Preparando pesquisa...",
          generating_domains: "Gerando domínios de pesquisa...",
          generating_queries: "Criando queries de pesquisa...",
          executing_searches: "Executando pesquisas...",
          analyzing_results: "Analisando resultados...",
          generating_quiz: "Gerando questões...",
          creating_document: "Criando documento final...",
          completed: "Pesquisa concluída!",
        };

        const stepMessage =
          stepMessages[update.current_step as keyof typeof stepMessages];

        if (stepMessage) {
          // Adicionar mensagem de step (verificação de duplicata já está na função addMessage)
          addMessage(stepMessage, "step");
        }
      }
    });

    websocketService.setOnSourceFound((source) => {
      const newSource: SourceWithId = {
        id: `${source.source.domain}-${Date.now()}`,
        title: source.source.title,
        url: source.source.url,
        domain: source.source.domain,
        timestamp: Date.now(),
        isLeaving: false,
      };

      setSourcesFound((prev) => {
        const newSources = [...prev, newSource];

        // Se exceder o limite, marcar as antigas como "saindo"
        if (newSources.length > MAX_SOURCES_VISIBLE) {
          const sourcesToRemove = newSources.length - MAX_SOURCES_VISIBLE;
          for (let i = 0; i < sourcesToRemove; i++) {
            newSources[i].isLeaving = true;
          }

          // Remover as fontes marcadas como "saindo" após animação
          setTimeout(() => {
            setSourcesFound((current) => current.filter((s) => !s.isLeaving));
          }, 500); // Tempo da animação
        }

        return newSources;
      });

      // Adicionar fonte encontrada às mensagens
      addMessage(`Fonte encontrada: ${source.source.title}`, "websocket");
    });

    websocketService.setOnResearchCompleted(() => {
      // Marcar como concluído
      dispatch({
        type: "SET_RESEARCH_STATUS",
        payload: ResearchStatus.COMPLETED,
      });
      dispatch({ type: "SET_RESEARCH_PROGRESS", payload: 100 });
      dispatch({
        type: "SET_RESEARCH_MESSAGE",
        payload: "Pesquisa concluída com sucesso!",
      });

      // Garantir progresso final
      setWebSocketProgress(100);
      setProgress(100);
      setCurrentStep(10);
      setHasWebSocketUpdate(true);

      // Adicionar mensagem final
      addMessage("Curso criado com sucesso!", "step");

      // Redirecionar para a tela de interview
      setTimeout(() => {
        router.push("/create-course-interview");
      }, 2000);
    });

    // Conectar ao curso se WebSocket já estiver conectado
    if (websocketService.getConnectionStatus()) {
      websocketService.joinCourse(state.courseId);
    }

    // Cleanup
    return () => {
      websocketService.setOnConnectionChange(() => {});
      websocketService.setOnResearchUpdate(() => {});
      websocketService.setOnSourceFound(() => {});
      websocketService.setOnResearchCompleted(() => {});
    };
  }, [state.courseId, dispatch]);

  // Atualizar progresso visual baseado no WebSocket ou estado
  useEffect(() => {
    const updateProgress = () => {
      // Priorizar progresso do WebSocket se disponível
      if (hasWebSocketUpdate && webSocketProgress > 0) {
        const progressValue = Math.max(progress, webSocketProgress);
        const stepValue = Math.max(
          1,
          Math.min(10, Math.ceil((progressValue / 100) * 10))
        );

        setProgress(progressValue);
        setCurrentStep(stepValue);
      } else {
        // Fallback para progresso do estado
        const progressValue = Math.max(progress, state.researchProgress || 0);
        const stepValue = Math.max(
          1,
          Math.min(10, Math.ceil((progressValue / 100) * 10))
        );

        setProgress(progressValue);
        setCurrentStep(stepValue);
      }
    };

    updateProgress();
  }, [webSocketProgress, state.researchProgress, hasWebSocketUpdate]);

  useEffect(() => {
    // Evitar múltiplas execuções
    if (isProcessing.current) {
      return;
    }

    // Se não temos courseId, redirecionar para step-one
    if (!state.courseId) {
      router.push("/create-course-step-one");
      return;
    }

    // Marcar como em processamento
    isProcessing.current = true;

    const monitorResearch = async () => {
      try {
        // Iniciar verificação de status
        statusCheckInterval.current = setInterval(async () => {
          try {
            // Verificar status atual
            await checkResearchStatus();

            const getStatusMessage = (status: string) => {
              switch (status) {
                case "preparation":
                  return "Preparando pesquisa...";
                case "researching":
                  return currentWebSocketMessage || "Pesquisando fontes...";
                case "analyzing":
                  return "Analisando conteúdo...";
                case "completed":
                  return "Pesquisa concluída!";
                case "failed":
                  return "Erro na pesquisa";
                default:
                  return "Processando...";
              }
            };

            // Atualizar mensagem de loading
            const message = getStatusMessage(
              state.researchStatus || "preparation"
            );
            setLoadingMessage(message);

            // Se pesquisa completa (status = completed E progress = 100), redirecionar
            if (
              state.researchStatus === "completed" &&
              (state.researchProgress >= 100 || webSocketProgress >= 100)
            ) {
              if (statusCheckInterval.current) {
                clearInterval(statusCheckInterval.current);
              }

              setProgress(100);
              setCurrentStep(10); // Garantir que mostra 10/10
              setLoadingMessage("Curso criado com sucesso! Redirecionando...");

              // Marcar como completo
              dispatch({ type: "COMPLETE_CREATION" });

              // Delay para mostrar 100% antes de redirecionar para a interview
              setTimeout(() => {
                router.push("/create-course-interview");
              }, 1500);
              return;
            }

            // Se pesquisa falhou, parar e mostrar erro
            if (state.researchStatus === "failed") {
              if (statusCheckInterval.current) {
                clearInterval(statusCheckInterval.current);
              }

              console.error("❌ Erro na pesquisa");
              setLoadingMessage("Erro na pesquisa. Redirecionando...");
              setTimeout(() => {
                router.push("/create-course-step-five");
              }, 2000);
              return;
            }
          } catch (error) {
            console.error(
              "🔧 [DEBUG] Loading - Erro ao verificar status:",
              error
            );
          }
        }, 1500); // Verificar a cada 1.5 segundos para melhor responsividade
      } catch (error) {
        console.error("❌ Erro durante o processo:", error);
        setLoadingMessage("Erro ao criar curso");
        setProgress(0);

        // Aguardar um pouco antes de redirecionar para mostrar a mensagem de erro
        setTimeout(() => {
          router.push("/create-course-step-five");
        }, 2000);
      } finally {
        isProcessing.current = false;
        // Limpar interval se ainda estiver rodando
        if (statusCheckInterval.current) {
          clearInterval(statusCheckInterval.current);
        }
      }
    };

    monitorResearch();

    // Cleanup function para limpar interval quando componente desmontar
    return () => {
      if (statusCheckInterval.current) {
        clearInterval(statusCheckInterval.current);
      }
    };
  }, [
    router,
    dispatch,
    state.courseId,
    checkResearchStatus,
    state.researchMessage,
    state.researchStatus,
    currentWebSocketMessage,
    webSocketProgress,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo/Ícone animado */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-6xl">🚀</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
          {state.researchStatus === "completed"
            ? "Curso criado com sucesso!"
            : "Criando seu curso personalizado"}
        </h1>

        {/* Status da pesquisa */}
        {state.researchStatus && (
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 text-white rounded-full text-sm font-medium ${
                state.researchStatus === "completed"
                  ? "bg-green-500"
                  : state.researchStatus === "failed"
                  ? "bg-red-500"
                  : "bg-[#cc6200]"
              }`}
            >
              Status:{" "}
              {state.researchStatus === "researching"
                ? "Pesquisando"
                : state.researchStatus === "analyzing"
                ? "Analisando"
                : state.researchStatus === "completed"
                ? "Concluído"
                : state.researchStatus === "failed"
                ? "Erro"
                : "Preparando"}
            </span>
          </div>
        )}

        {/* Indicador de step */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-[#cc6200] font-bold text-3xl">
              {currentStep}/{totalSteps}
            </div>
          </div>
        </div>

        {/* Mensagem de loading */}
        <p className="text-lg md:text-xl text-[#593100] mb-8 opacity-80">
          {loadingMessage}
        </p>

        {/* Barra de progresso */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm text-[#593100] mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[#ffddc2] rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Mensagens como WhatsApp - Altura fixa */}
        <div className="bg-[#fff] border border-[#ffddc2] rounded-xl p-4 mb-4 text-left shadow-sm">
          <h4 className="text-[#cc6200] font-bold mb-2 text-base">
            Processo de pesquisa da IA:
          </h4>
          <div className="h-32 overflow-y-auto overflow-x-hidden">
            <div className="space-y-2">
              {stepMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 transition-all duration-500 ease-out ${
                    index < stepMessages.length - MAX_MESSAGES_VISIBLE
                      ? "opacity-0 transform -translate-y-2"
                      : "opacity-100 transform translate-y-0"
                  }`}
                  style={{
                    animation: "slideInUp 0.4s ease-out",
                  }}
                >
                  <span className="text-[#cc6200] mt-0.5 flex-shrink-0">
                    {getMessageIcon(msg.message, msg.type)}
                  </span>
                  <span className="text-[#593100] text-sm leading-relaxed">
                    {msg.message}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Fontes encontradas com sistema de fila */}
        {sourcesFound.length > 0 && (
          <div className="bg-[#fff] border border-[#ffddc2] rounded-xl p-4 mb-8 text-left shadow-sm">
            <h4 className="text-[#cc6200] font-bold mb-2 text-base">
              Fontes encontradas (
              {sourcesFound.filter((s) => !s.isLeaving).length}):
            </h4>
            <div
              className="space-y-2 relative overflow-hidden"
              style={{ minHeight: `${MAX_SOURCES_VISIBLE * 60}px` }}
            >
              {sourcesFound.map((source) => (
                <div
                  key={source.id}
                  className={`flex items-start gap-2 p-2 bg-[#ffddc2] rounded transition-all duration-500 ease-out ${
                    source.isLeaving
                      ? "opacity-0 transform -translate-y-4"
                      : "opacity-100 transform translate-y-0"
                  }`}
                  style={{
                    animation: source.isLeaving
                      ? "fadeUpAndOut 0.5s ease-out forwards"
                      : "fadeInUp 0.3s ease-out",
                  }}
                >
                  <span className="text-[#cc6200] mt-0.5">📚</span>
                  <div className="flex-1">
                    <p className="text-[#593100] text-sm font-medium truncate">
                      {source.title}
                    </p>
                    <p className="text-[#593100] text-xs opacity-60">
                      {source.domain}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUpAndOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        /* Scrollbar customizada para o container de mensagens */
        .h-32::-webkit-scrollbar {
          width: 6px;
        }

        .h-32::-webkit-scrollbar-track {
          background: #ffddc2;
          border-radius: 10px;
        }

        .h-32::-webkit-scrollbar-thumb {
          background: #cc6200;
          border-radius: 10px;
        }

        .h-32::-webkit-scrollbar-thumb:hover {
          background: #a04f00;
        }
      `}</style>
    </div>
  );
}
