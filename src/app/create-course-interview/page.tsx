"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseInterview() {
  const router = useRouter();
  const { state, dispatch } = useCourseCreation();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Última pergunta - finalizar entrevista
      dispatch({ type: "COMPLETE_INTERVIEW" });
      router.push("/create-course-teacher-style");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP_INTERVIEW" });
    router.push("/create-course-teacher-style");
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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentAnswer.trim().length > 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
            Entrevista Personalizada
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            Responda algumas perguntas para tornar seu curso ainda mais
            personalizado
          </p>
          <p className="text-sm text-[#593100] opacity-60 mt-2">
            Esta etapa é opcional - você pode pular se preferir
          </p>
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
            className="px-6 py-3 rounded-full shadow-md font-medium text-[#593100] bg-white border-2 border-[#ffddc2] hover:bg-[#ffddc2] transition order-3 md:order-1"
          >
            ⏭️ Pular Entrevista
          </button>

          {/* Navegação */}
          <div className="flex gap-4 order-2">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-[#ffddc2] border-2 border-[#cc6200] hover:bg-[#fff7f0] transition"
              >
                ← Anterior
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-8 py-3 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLastQuestion ? "🎯 Continuar" : "Próxima →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
