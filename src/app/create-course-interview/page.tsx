"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { apiController } from "@/controllers/api.controller";

export default function CreateCourseInterview() {
  const router = useRouter();
  const { state, dispatch } = useCourseCreation();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Buscar perguntas do interview-questions.json
    fetch("/interview-questions.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
          setLoading(false);
        }
      })
      .catch(() => {
        // Fallback caso não consiga carregar
        setQuestions([
          "Como você prefere receber feedback durante o aprendizado?",
          "Qual é o seu horário preferido para estudar?",
          "Você aprende melhor com exemplos práticos ou teoria?",
          "Como você supera dificuldades em um tópico?",
          "Qual seria o principal indicador de sucesso para você?",
        ]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Carregar resposta existente quando mudar de pergunta
    if (state.interviewAnswers[currentQuestionIndex]) {
      setCurrentAnswer(state.interviewAnswers[currentQuestionIndex]);
    } else {
      setCurrentAnswer("");
    }
  }, [currentQuestionIndex, state.interviewAnswers]);

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
    dispatch({
      type: "SET_INTERVIEW_ANSWER",
      payload: { index: currentQuestionIndex, answer: value },
    });
  };

  // Função para salvar as preferências do usuário baseadas nas respostas da entrevista
  const saveUserPreferences = async () => {
    try {
      setSubmitting(true);

      // Criar objeto de preferências baseado nas respostas da entrevista
      const preferences = {
        interview_responses: state.interviewAnswers.filter(
          (answer) => answer.trim() !== ""
        ),
        feedback_preference: state.interviewAnswers[0] || "",
        study_schedule: state.interviewAnswers[1] || "",
        learning_style: state.interviewAnswers[2] || "",
        difficulty_handling: state.interviewAnswers[3] || "",
        success_indicators: state.interviewAnswers[4] || "",
        course_topic: state.courseName,
        completed_at: new Date().toISOString(),
        optional_completed: true, // Flag indicando que foi completada opcionalmente
      };

      console.log(
        "💾 Salvando preferências do usuário (opcional):",
        preferences
      );

      // Usar o método do controller para salvar
      const response = await apiController.saveInterviewPreferences(
        preferences
      );

      if (response.success) {
        console.log(
          "✅ Preferências opcionais salvas com sucesso!",
          response.data
        );
        return true;
      } else {
        console.warn(
          "⚠️ Erro ao salvar preferências opcionais:",
          response.message
        );
        // Como é opcional, não bloqueamos o fluxo
        return true;
      }
    } catch (error) {
      console.warn(
        "⚠️ Erro ao salvar preferências opcionais (não crítico):",
        error
      );
      // Como é opcional, sempre retornamos true para não bloquear
      return true;
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Última pergunta - finalizar entrevista
      dispatch({ type: "COMPLETE_INTERVIEW" });

      // Salvar preferências (sem bloquear o fluxo)
      await saveUserPreferences();

      // Redirecionar para a seleção de estilo do professor
      router.push("/create-course-teacher-style");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = async () => {
    try {
      setSubmitting(true);

      // Marcar entrevista como pulada
      dispatch({ type: "SKIP_INTERVIEW" });

      console.log("⏭️ Usuário pulou a entrevista (100% opcional)");

      // Salvar informação de que a entrevista foi pulada (opcional)
      const skipData = {
        course_topic: state.courseName,
        interview_skipped: true,
        skipped_at: new Date().toISOString(),
        optional_skipped: true, // Flag indicando que foi pulada opcionalmente
      };

      console.log("💾 Registrando skip opcional:", skipData);

      try {
        // Usar o método do controller para salvar o skip
        const response = await apiController.saveInterviewSkip(skipData);

        if (response.success) {
          console.log("✅ Skip opcional registrado:", response.data);
        } else {
          console.warn(
            "⚠️ Erro ao registrar skip (não crítico):",
            response.message
          );
        }
      } catch (skipError) {
        console.warn(
          "⚠️ Erro ao registrar skip opcional (não crítico):",
          skipError
        );
      }

      // Redirecionar para a seleção de estilo do professor
      router.push("/create-course-teacher-style");
    } catch (error) {
      console.warn("⚠️ Erro no processo de skip (não crítico):", error);
      // Sempre continuar o fluxo para o próximo passo
      router.push("/create-course-teacher-style");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200] mx-auto mb-4"></div>
          <p className="text-[#593100]">Preparando entrevista...</p>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200] mx-auto mb-4"></div>
          <p className="text-[#593100] text-lg font-semibold">
            {state.interviewSkipped
              ? "Finalizando..."
              : "Salvando suas preferências..."}
          </p>
          <p className="text-[#593100] opacity-60 mt-2">
            Aguarde enquanto processamos suas informações
          </p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentAnswer.trim().length > 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
            Entrevista Opcional de Personalização
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            Responda algumas perguntas para personalizar ainda mais seu curso.
            <br />
            <strong>Totalmente opcional</strong> - você já tem acesso completo
            ao conteúdo!
          </p>
          <p className="text-sm text-[#593100] opacity-60 mt-2">
            Pule se preferir explorar o curso diretamente
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 text-left">
            <p className="text-green-800 text-sm">
              ✅ <strong>Seu curso já está pronto!</strong> Esta entrevista
              apenas ajuda a personalizar a experiência. Você pode acessar todo
              o conteúdo do curso independentemente de completar esta etapa.
            </p>
          </div>
        </div>

        {/* Indicador de progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#593100]">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-[#593100]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-[#ffddc2] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Pergunta atual */}
        <div className="bg-[#ffddc2] rounded-3xl p-8 shadow-2xl border border-[#ffb877] mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#cc6200] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {currentQuestionIndex + 1}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#593100] leading-relaxed">
              {questions[currentQuestionIndex]}
            </h2>
          </div>

          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Compartilhe seus pensamentos aqui..."
            className="w-full px-6 py-4 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 resize-none min-h-[120px]"
          />
        </div>

        {/* Botões de navegação */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Botão Pular (sempre visível) */}
          <button
            onClick={handleSkip}
            disabled={submitting}
            className="px-6 py-3 rounded-full shadow-md font-medium text-[#593100] bg-white border-2 border-[#ffddc2] hover:bg-[#ffddc2] transition order-3 md:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Ir Direto ao Curso
          </button>

          {/* Navegação */}
          <div className="flex gap-4 order-2">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                disabled={submitting}
                className="px-6 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-[#ffddc2] border-2 border-[#cc6200] hover:bg-[#fff7f0] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed || submitting}
              className="px-8 py-3 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isLastQuestion ? "Finalizando..." : "Processando..."}
                </span>
              ) : isLastQuestion ? (
                "🎯 Finalizar"
              ) : (
                "Próxima →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
