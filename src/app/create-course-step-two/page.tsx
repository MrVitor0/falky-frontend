"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourseCreation, KNOWLEDGE_LEVEL_OPTIONS } from "@/contexts/CourseCreationContext";
import { KnowledgeLevelType } from "@/types/api.types";

export default function CreateCourseStepTwo() {
  const router = useRouter();
  const { state, dispatch, canProceedToNext } = useCourseCreation();

  const handleOptionSelect = (level: KnowledgeLevelType) => {
    dispatch({ type: 'SET_KNOWLEDGE_LEVEL', payload: level });
  };

  const handleContinue = () => {
    if (canProceedToNext()) {
      dispatch({ type: 'NEXT_STEP' });
      router.push("/create-course-step-three");
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    router.push("/create-course-step-one");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fff7f0] pt-16 px-4">
      <Link
        href="/"
        className="self-start mb-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar ao Início
      </Link>
      
      {/* Indicador de progresso */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#593100]">Passo 2 de 5</span>
          <span className="text-sm font-medium text-[#593100]">40%</span>
        </div>
        <div className="w-full bg-[#ffddc2] rounded-full h-2">
          <div className="bg-[#cc6200] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: '40%' }}></div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Qual é o seu nível atual?
      </h1>
      <p className="text-xl md:text-2xl text-[#593100] text-center mb-4 max-w-2xl">
        Em <span className="font-semibold text-[#cc6200]">&ldquo;{state.courseName}&rdquo;</span>, você se considera:
      </p>
      <p className="text-lg text-[#593100] text-center mb-12 max-w-2xl opacity-80">
        Isso nos ajudará a personalizar o conteúdo e o ritmo ideal para você.
      </p>
      
      <div className="w-full max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KNOWLEDGE_LEVEL_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`
                bg-[#ffddc2] rounded-2xl p-8 shadow-lg border-4 cursor-pointer 
                transition-all duration-300 hover:shadow-xl hover:scale-105
                ${state.knowledgeLevel === option.value 
                  ? 'border-[#cc6200] bg-[#fff7f0]' 
                  : 'border-[#cc6200] hover:border-[#ff8c00]'
                }
              `}
              onClick={() => handleOptionSelect(option.value)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-[#fff7f0] rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">{option.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#593100] mb-3">
                  {option.label}
                </h3>
                <p className="text-base text-[#593100] opacity-80 leading-relaxed">
                  {option.description}
                </p>
                
                {/* Indicador de seleção */}
                {state.knowledgeLevel === option.value && (
                  <div className="mt-4 flex items-center gap-2 text-[#cc6200]">
                    <div className="w-2 h-2 bg-[#cc6200] rounded-full"></div>
                    <span className="text-sm font-semibold">Selecionado</span>
                    <div className="w-2 h-2 bg-[#cc6200] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="w-full max-w-3xl flex justify-between items-center">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-white border-2 border-[#cc6200] hover:bg-[#ffddc2] transition"
        >
          ← Voltar
        </button>
        
        <button
          onClick={handleContinue}
          disabled={!canProceedToNext()}
          className="px-8 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
