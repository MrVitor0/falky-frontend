"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourseCreation, GOALS_AND_MOTIVATIONS_OPTIONS } from "@/contexts/CourseCreationContext";
import { MotivationGoalType } from "@/types/api.types";

export default function CreateCourseStepFour() {
  const router = useRouter();
  const { state, dispatch, canProceedToNext } = useCourseCreation();

  const handleOptionSelect = (goal: MotivationGoalType) => {
    dispatch({ type: 'SET_GOALS_AND_MOTIVATIONS', payload: goal });
  };

  const handleContinue = () => {
    if (canProceedToNext()) {
      dispatch({ type: 'NEXT_STEP' });
      router.push("/create-course-step-five");
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    router.push("/create-course-step-three");
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
          <span className="text-sm font-medium text-[#593100]">Passo 4 de 5</span>
          <span className="text-sm font-medium text-[#593100]">80%</span>
        </div>
        <div className="w-full bg-[#ffddc2] rounded-full h-2">
          <div className="bg-[#cc6200] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: '80%' }}></div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Qual é o seu objetivo?
      </h1>
      <p className="text-xl md:text-2xl text-[#593100] text-center mb-4 max-w-2xl">
        O que você espera alcançar com este curso?
      </p>
      <p className="text-lg text-[#593100] text-center mb-12 max-w-2xl opacity-80">
        Sua motivação nos ajuda a focar no que realmente importa para você.
      </p>
      
      <div className="w-full max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GOALS_AND_MOTIVATIONS_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`
                bg-[#ffddc2] rounded-2xl p-8 shadow-lg border-4 cursor-pointer 
                transition-all duration-300 hover:shadow-xl hover:scale-105
                ${state.goalsAndMotivations === option.value 
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
                {state.goalsAndMotivations === option.value && (
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

      {/* Resumo do curso */}
      <div className="w-full max-w-3xl bg-[#ffddc2] rounded-xl p-8 mb-8 border-2 border-[#cc6200]">
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#593100] mb-6">
            🎯 Resumo das suas preferências:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">📚 Curso:</h4>
              <p className="text-[#593100]">{state.courseName}</p>
            </div>
            
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">📊 Nível:</h4>
              <p className="text-[#593100]">
                {state.knowledgeLevel === 'novato' ? 'Iniciante' :
                 state.knowledgeLevel === 'intermediario' ? 'Intermediário' :
                 state.knowledgeLevel === 'avancado' ? 'Avançado' : ''}
              </p>
            </div>
            
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">⏱️ Ritmo:</h4>
              <p className="text-[#593100]">
                {state.studyPace === 'pausado' ? 'Pausado' :
                 state.studyPace === 'moderado' ? 'Moderado' :
                 state.studyPace === 'rapido' ? 'Rápido' : ''}
              </p>
            </div>
            
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">🎯 Objetivo:</h4>
              <p className="text-[#593100]">
                {state.goalsAndMotivations === 'aprovacao_prova' ? 'Aprovação em Prova' :
                 state.goalsAndMotivations === 'dominio_tema' ? 'Domínio do Tema' :
                 state.goalsAndMotivations === 'hobby' ? 'Hobby Pessoal' : ''}
              </p>
            </div>
          </div>
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
          Finalizar
        </button>
      </div>
    </div>
  );
}
