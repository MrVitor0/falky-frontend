"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard";
import { websocketService } from "@/services/websocket.service";
import { apiController } from "@/controllers/api.controller";

interface StepMessage {
  id: string;
  message: string;
  timestamp: number;
  type: "generic" | "websocket" | "step";
}

export default function GenerateMaterialPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetType = searchParams.get("targetType") || "submodule";
  const targetId = searchParams.get("targetId") || "";

  const [loadingMessage, setLoadingMessage] = useState(
    "Preparando geração de material..."
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepMessages, setStepMessages] = useState<StepMessage[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalSteps = 8;
  const MAX_MESSAGES_VISIBLE = 5;

  // Função para scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Função para extrair ou determinar o ícone correto da mensagem
  const getMessageIcon = (
    message: string,
    type: "generic" | "websocket" | "step"
  ) => {
    const emojiMatch = message.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u
    );
    if (emojiMatch) {
      return emojiMatch[0];
    }

    switch (type) {
      case "websocket":
        if (message.includes("material")) return "📄";
        if (message.includes("gerando")) return "⚙️";
        if (message.includes("processando")) return "🔄";
        if (message.includes("concluída")) return "✅";
        return "📄";
      case "step":
        if (message.includes("sucesso") || message.includes("concluída"))
          return "🎉";
        if (message.includes("preparando")) return "🔧";
        if (message.includes("gerando")) return "⚙️";
        if (message.includes("processando")) return "🔄";
        return "🤖";
      case "generic":
        if (message.includes("material")) return "📄";
        if (message.includes("preparando")) return "🔧";
        return "🚀";
      default:
        return "🤖";
    }
  };

  // Função para limpar mensagem
  const cleanMessage = (message: string) => {
    return message.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, "");
  };

  // Função para adicionar mensagem
  const addMessage = (
    message: string,
    type: "generic" | "websocket" | "step"
  ) => {
    setStepMessages((prev) => {
      const cleanedMessage = cleanMessage(message);
      const messageExists = prev.some(
        (msg) =>
          cleanMessage(msg.message) === cleanedMessage && msg.type === type
      );

      if (messageExists) {
        return prev;
      }

      const newMessage: StepMessage = {
        id: `${type}-${cleanedMessage
          .slice(0, 10)
          .replace(/[^a-zA-Z0-9]/g, "")}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`,
        message: cleanedMessage,
        timestamp: Date.now(),
        type,
      };

      const newMessages = [...prev, newMessage];

      if (newMessages.length > MAX_MESSAGES_VISIBLE) {
        return newMessages.slice(-MAX_MESSAGES_VISIBLE);
      }

      return newMessages;
    });

    setTimeout(scrollToBottom, 100);
  };

  // Configurar WebSocket
  useEffect(() => {
    websocketService.setOnConnectionChange((connected) => {
      if (connected) {
        websocketService.joinCourse(params.id);
      }
    });

    websocketService.setOnMaterialUpdate((update) => {
      if (update.progress !== undefined) {
        setProgress(Math.max(progress, update.progress));
        setCurrentStep(
          Math.max(
            1,
            Math.min(
              totalSteps,
              Math.ceil((update.progress / 100) * totalSteps)
            )
          )
        );
      }

      if (update.message) {
        setLoadingMessage(update.message);
        addMessage(update.message, "websocket");
      }
    });

    websocketService.setOnMaterialCompleted(() => {
      setProgress(100);
      setCurrentStep(totalSteps);
      setLoadingMessage("Material gerado com sucesso!");

      addMessage("Material gerado com sucesso!", "step");

      // Redirecionar para a página do curso após um delay
      setTimeout(() => {
        router.push(`/dashboard/courses/${params.id}`);
      }, 2000);
    });

    // Conectar ao curso se WebSocket já estiver conectado
    if (websocketService.getConnectionStatus()) {
      websocketService.joinCourse(params.id);
    }

    // Cleanup
    return () => {
      websocketService.setOnConnectionChange(() => {});
      websocketService.setOnMaterialUpdate(() => {});
      websocketService.setOnMaterialCompleted(() => {});
    };
  }, [params.id, router]);

  // Iniciar geração de material
  useEffect(() => {
    if (!hasStarted && targetType && targetId) {
      setHasStarted(true);

      // Adicionar mensagens iniciais
      addMessage("Iniciando geração de material...", "generic");

      setTimeout(() => {
        addMessage("Conectando com o sistema de IA...", "generic");
      }, 500);

      setTimeout(() => {
        addMessage("Preparando conteúdo personalizado...", "generic");
      }, 1000);

      // Iniciar geração
      setTimeout(async () => {
        try {
          const response = await apiController.generateCourseMaterial(
            params.id,
            targetType,
            targetId
          );

          if (response.success) {
            addMessage("Geração de material iniciada com sucesso!", "step");
          } else {
            console.error("❌ Erro ao iniciar geração:", response.message);
            setLoadingMessage("Erro ao iniciar geração de material");
            addMessage("Erro ao iniciar geração de material", "step");
          }
        } catch (error) {
          console.error("❌ Erro ao iniciar geração:", error);
          setLoadingMessage("Erro ao iniciar geração de material");
          addMessage("Erro ao iniciar geração de material", "step");
        }
      }, 1500);
    }
  }, [hasStarted, targetType, targetId, params.id]);

  return (
    <DashboardLayout
      title="Gerando Material"
      subtitle="Aguarde enquanto criamos o conteúdo personalizado"
    >
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
        <div className="w-full max-w-2xl text-center">
          {/* Logo/Ícone animado */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-6xl">📄</span>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
            Gerando Material do Curso
          </h1>

          {/* Indicador de step */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="text-[#593100] font-medium">
                <span className="text-2xl font-bold">{currentStep}</span>
                <span className="text-xl opacity-60">/{totalSteps}</span>
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

          {/* Mensagens de progresso */}
          <div className="bg-[#fff] border border-[#ffddc2] rounded-xl p-4 mb-4 text-left shadow-sm">
            <h4 className="text-[#cc6200] font-bold mb-2 text-base">
              Processo de geração:
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
        </div>

        <style jsx>{`
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
    </DashboardLayout>
  );
}
