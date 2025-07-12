"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { apiController } from "@/controllers/api.controller";
import { STATIC_USER_ID } from "@/constants/api.constants";
import { FalkyPersonalityType, NeurodivergenceType } from "@/types/api.types";

export default function CreateCourseLoading() {
  const router = useRouter();
  const { state, dispatch, getCoursePreferencesData } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState("Preparando seu curso personalizado...");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const isProcessing = useRef(false);
  const totalSteps = 10;

  useEffect(() => {
    // Evitar múltiplas execuções
    if (isProcessing.current) {
      return;
    }

    const createCourse = async () => {
      let progressInterval: NodeJS.Timeout | null = null;
      
      try {
        isProcessing.current = true;
        
        // Verificar se o usuário chegou aqui através do fluxo correto
        if (!state.courseName) {
          console.error("❌ Dados de curso não encontrados. Redirecionando para o início.");
          router.push("/create-course-step-one");
          return;
        }
        
        // Usar o ID de usuário estático definido nas constantes
        const userId = STATIC_USER_ID;
        
        // Obter dados formatados do context
        console.log("📊 Estado atual do contexto:", {
          courseName: state.courseName,
          knowledgeLevel: state.knowledgeLevel,
          studyPace: state.studyPace,
          goalsAndMotivations: state.goalsAndMotivations,
          additionalInformation: state.additionalInformation
        });
        
        const courseData = getCoursePreferencesData();
        
        // Adicionar user_id aos dados
        const completeData = {
          user_id: userId,
          ...courseData,
        };

        console.log("🚀 Criando curso com dados:", completeData);

        // Simular progresso de criação com steps mais detalhados
        const progressSteps = [
          { message: "Iniciando criação do curso...", progress: 10, step: 1 },
          { message: "Carregando suas preferências...", progress: 20, step: 2 },
          { message: "Configurando preferências do curso...", progress: 30, step: 3 },
          { message: "Iniciando geração do curso...", progress: 40, step: 4 },
          { message: "Estruturando módulos...", progress: 50, step: 5 },
          { message: "Criando exercícios práticos...", progress: 60, step: 6 },
          { message: "Definindo cronograma...", progress: 70, step: 7 },
          { message: "Ajustando metodologia...", progress: 80, step: 8 },
          { message: "Finalizando detalhes...", progress: 90, step: 9 },
          { message: "Curso quase pronto!", progress: 100, step: 10 }
        ];

        // Simular progresso enquanto aguarda
        let currentProgressIndex = 0;
        progressInterval = setInterval(() => {
          if (currentProgressIndex < progressSteps.length) {
            const step = progressSteps[currentProgressIndex];
            setLoadingMessage(step.message);
            setProgress(step.progress);
            setCurrentStep(step.step);
            currentProgressIndex++;
          }
        }, 500);

        // Passo 1: Verificar user preferences (usuário padrão já existe no backend)
        setLoadingMessage("Carregando suas preferências...");
        let userPreferences = null;
        try {
          const userPrefsResponse = await apiController.getUserPreferences(userId);
          if (userPrefsResponse.success) {
            userPreferences = userPrefsResponse.data;
            console.log("✅ User preferences carregadas:", userPreferences);
          } else {
            console.log("⚠️ User preferences não encontradas na resposta da API");
          }
        } catch (error) {
          console.log("⚠️ Erro ao carregar user preferences:", error);
          
          // Tentar criar preferências padrão se necessário
          try {
            const defaultUserPrefs = {
              user_name: "Usuário Falky",
              user_birth_date: "1990-01-01",
              falky_personality: FalkyPersonalityType.CONVERSADOR,
              user_neurodivergence: NeurodivergenceType.NONE,
            };
            
            const createUserPrefsResponse = await apiController.setUserPreferences(defaultUserPrefs);
            if (createUserPrefsResponse.success) {
              userPreferences = createUserPrefsResponse.data;
              console.log("✅ User preferences padrão criadas:", userPreferences);
            }
          } catch (createError) {
            console.log("⚠️ Erro ao criar user preferences padrão:", createError);
            // Continuar mesmo sem user preferences - o backend pode ter o usuário
          }
        }

        // Passo 2: Criar course preferences
        setLoadingMessage("Configurando preferências do curso...");
        const coursePrefsResponse = await apiController.setCoursePreferences(completeData);
        
        if (!coursePrefsResponse.success) {
          throw new Error(`Erro ao criar preferências do curso: ${coursePrefsResponse.error || 'Erro desconhecido'}`);
        }

        console.log("✅ Course preferences criadas:", coursePrefsResponse.data);

        // Passo 3: Iniciar geração do curso (novo fluxo do backend)
        setLoadingMessage("Iniciando geração do curso...");
        const courseGenerationRequest = {
          user_id: userId,
          course_topic: completeData.course_name
        };

        const courseGenerationResponse = await apiController.generateCourse(courseGenerationRequest);
        
        if (!courseGenerationResponse.success) {
          throw new Error(`Erro ao iniciar geração de curso: ${courseGenerationResponse.error || 'Erro desconhecido'}`);
        }

        console.log("✅ Geração de curso iniciada:", courseGenerationResponse.data);
        
        // Passo 4: Simular processamento adicional
        // Por enquanto, sempre pular questionário para simplificar o fluxo
        
        // Simular delay para mostrar progresso
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Limpeza e finalização
        if (progressInterval) {
          clearInterval(progressInterval);
        }
        
        setProgress(100);
        setLoadingMessage("Curso criado com sucesso!");
        
        // Salvar os dados da resposta no contexto
        dispatch({ type: 'SET_CREATED_COURSE_DATA', payload: coursePrefsResponse.data });
        dispatch({ type: 'SET_GENERATED_COURSE_DATA', payload: courseGenerationResponse.data });
        dispatch({ type: 'COMPLETE_CREATION' });
        
        // Pequeno delay para mostrar 100% antes de redirecionar
        setTimeout(() => {
          router.push("/course-created-success");
        }, 1000);

      } catch (error) {
        // Limpeza em caso de erro
        if (progressInterval) {
          clearInterval(progressInterval);
        }
        
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error("❌ Erro durante o processo:", error);
        
        setError(errorMessage);
        setLoadingMessage("Erro ao criar curso");
        setProgress(0);
        
        // Aguardar um pouco antes de redirecionar para mostrar a mensagem de erro
        setTimeout(() => {
          router.push("/create-course-step-five");
        }, 2000);
      } finally {
        isProcessing.current = false;
      }
    };

    createCourse();
  }, [router, dispatch, getCoursePreferencesData, state.courseName]);

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

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">❌ Erro:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

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
