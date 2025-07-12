"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { apiController } from "@/controllers/api.controller";

export default function CreateCourseLoading() {
  const router = useRouter();
  const { state, dispatch, getCoursePreferencesData } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState("Preparando seu curso personalizado...");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  useEffect(() => {
    const createCourse = async () => {
      try {
        // Simulando um user_id (em produção, viria da autenticação)
        const userId = "user_demo_123";
        
        // Obter dados formatados do context
        const courseData = getCoursePreferencesData();
        
        // Adicionar user_id aos dados
        const completeData = {
          user_id: userId,
          ...courseData,
        };

        console.log("Criando curso com dados:", completeData);

        // Simular progresso de criação com steps mais detalhados
        const progressSteps = [
          { message: "Iniciando criação do curso...", progress: 10, step: 1 },
          { message: "Analisando suas preferências...", progress: 20, step: 2 },
          { message: "Configurando nível de dificuldade...", progress: 30, step: 3 },
          { message: "Personalizando conteúdo...", progress: 40, step: 4 },
          { message: "Estruturando módulos...", progress: 50, step: 5 },
          { message: "Criando exercícios práticos...", progress: 60, step: 6 },
          { message: "Definindo cronograma...", progress: 70, step: 7 },
          { message: "Ajustando metodologia...", progress: 80, step: 8 },
          { message: "Finalizando detalhes...", progress: 90, step: 9 },
          { message: "Curso quase pronto!", progress: 100, step: 10 }
        ];

        // Criar um delay mínimo de 3 segundos para a experiência do usuário
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));

        // Chamar a API
        const apiCall = apiController.setCoursePreferences(completeData);

        // Simular progresso enquanto aguarda
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const nextStep = progressSteps.find(step => step.progress > prev);
            if (nextStep) {
              setLoadingMessage(nextStep.message);
              setCurrentStep(nextStep.step);
              return nextStep.progress;
            }
            return prev;
          });
        }, 300); // Acelerado para 300ms para cobrir 10 steps em 3 segundos

        // Aguardar tanto a API quanto o tempo mínimo de loading
        const [response] = await Promise.all([apiCall, minLoadingTime]);

        clearInterval(progressInterval);
        
        if (response.success) {
          console.log("✅ Curso criado com sucesso:", response.data);
          
          // Salvar os dados da resposta no contexto
          dispatch({ type: 'SET_CREATED_COURSE_DATA', payload: response.data });
          dispatch({ type: 'COMPLETE_CREATION' });
          
          // Pequeno delay para mostrar 100% antes de redirecionar
          setTimeout(() => {
            router.push("/course-created-success");
          }, 500);
        } else {
          console.error("❌ Erro ao criar curso:", response.error);
          alert("Erro ao criar curso: " + response.error);
          router.push("/create-course-step-five");
        }
      } catch (error) {
        console.error("❌ Erro ao criar curso:", error);
        alert("Erro ao criar curso. Tente novamente.");
        router.push("/create-course-step-five");
      }
    };

    createCourse();
  }, [router, dispatch, getCoursePreferencesData]);

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
          Criando seu curso personalizado
        </h1>

        {/* Indicador de step */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="bg-[#cc6200] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
              {currentStep}
            </div>
            <div className="text-[#593100] font-medium">
              <span className="text-2xl font-bold">{currentStep}</span>
              <span className="text-xl opacity-60">/{totalSteps}</span>
            </div>
          </div>
          <div className="text-sm text-[#593100] opacity-60">
            Etapa {currentStep} de {totalSteps}
          </div>
        </div>

        {/* Mensagem de loading */}
        <p className="text-lg md:text-xl text-[#593100] mb-8 opacity-80">
          {loadingMessage}
        </p>

        {/* Barra de progresso */}
        <div className="w-full bg-[#ffddc2] rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Informações do curso */}
        <div className="bg-[#ffddc2] rounded-xl p-6 border-2 border-[#cc6200] mb-8">
          <h3 className="text-xl font-bold text-[#593100] mb-4">
            📚 Seu curso: {state.courseName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="text-[#593100]">
              <span className="font-semibold">Nível:</span> {' '}
              {state.knowledgeLevel === 'novato' ? '🌱 Iniciante' :
               state.knowledgeLevel === 'intermediario' ? '📚 Intermediário' :
               state.knowledgeLevel === 'avancado' ? '🎓 Avançado' : ''}
            </div>
            <div className="text-[#593100]">
              <span className="font-semibold">Ritmo:</span> {' '}
              {state.studyPace === 'pausado' ? '🐌 Pausado' :
               state.studyPace === 'moderado' ? '🚶 Moderado' :
               state.studyPace === 'rapido' ? '🏃 Rápido' : ''}
            </div>
            <div className="text-[#593100] md:col-span-2">
              <span className="font-semibold">Objetivo:</span> {' '}
              {state.goalsAndMotivations === 'aprovacao_prova' ? '📋 Aprovação em Prova' :
               state.goalsAndMotivations === 'dominio_tema' ? '🎯 Domínio do Tema' :
               state.goalsAndMotivations === 'hobby' ? '🎨 Hobby Pessoal' : ''}
            </div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-[#cc6200] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#cc6200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-[#cc6200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Texto de apoio */}
        <p className="text-sm text-[#593100] opacity-60 mt-8">
          Estamos personalizando cada detalhe para você...
        </p>
      </div>
    </div>
  );
}
