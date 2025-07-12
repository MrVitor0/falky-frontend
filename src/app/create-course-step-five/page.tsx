"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { apiController } from "@/controllers/api.controller";

export default function CreateCourseStepFive() {
  const router = useRouter();
  const { state, dispatch, getCoursePreferencesData } = useCourseCreation();
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(state.additionalInformation);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAdditionalInfo(value);
    dispatch({ type: 'SET_ADDITIONAL_INFORMATION', payload: value });
  };

  const handleCreateCourse = async () => {
    setLoading(true);
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

      // Criar um delay mínimo de 3 segundos para a experiência do usuário
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));

      // Chamar a API
      const apiCall = apiController.setCoursePreferences(completeData);

      // Aguardar tanto a API quanto o tempo mínimo de loading
      const [response] = await Promise.all([apiCall, minLoadingTime]);

      if (response.success) {
        console.log("✅ Curso criado com sucesso:", response.data);
        dispatch({ type: 'COMPLETE_CREATION' });
        
        // Redirecionar para página de sucesso
        router.push("/course-created-success");
      } else {
        console.error("❌ Erro ao criar curso:", response.error);
        alert("Erro ao criar curso: " + response.error);
      }
    } catch (error) {
      console.error("❌ Erro ao criar curso:", error);
      alert("Erro ao criar curso. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    router.push("/create-course-step-four");
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
          <span className="text-sm font-medium text-[#593100]">Passo 5 de 5</span>
          <span className="text-sm font-medium text-[#593100]">100%</span>
        </div>
        <div className="w-full bg-[#ffddc2] rounded-full h-2">
          <div className="bg-[#cc6200] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: '100%' }}></div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Estamos quase lá! 🎉
      </h1>
      <p className="text-xl md:text-2xl text-[#593100] text-center mb-4 max-w-3xl">
        Seu curso personalizado está pronto para ser criado!
      </p>
      <p className="text-lg text-[#593100] text-center mb-12 max-w-2xl opacity-80">
        Quer nos contar mais alguma coisa? (Opcional)
      </p>

      {/* Campo de informações adicionais */}
      <div className="w-full max-w-3xl bg-[#ffddc2] rounded-xl p-8 shadow-md mb-8">
        <label className="block text-lg font-semibold text-[#593100] mb-4 text-center">
          💬 Informações adicionais sobre seu aprendizado:
        </label>
        <textarea
          value={additionalInfo}
          onChange={handleInputChange}
          placeholder="Ex: Tenho experiência com Python, prefiro exemplos práticos, gostaria de focar em projetos reais..."
          rows={4}
          className="w-full px-4 py-3 text-base text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#593100] placeholder-opacity-50 resize-none"
        />
        <p className="text-sm text-[#593100] opacity-70 mt-2 text-center">
          Essas informações nos ajudam a personalizar ainda mais seu curso.
        </p>
      </div>

      {/* Resumo final do curso */}
      <div className="w-full max-w-4xl bg-[#ffddc2] rounded-xl p-8 mb-8 border-2 border-[#cc6200]">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#593100] mb-2">
            🎯 Seu curso será criado com estas configurações:
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fff7f0] rounded-lg p-6">
            <h4 className="font-bold text-lg text-[#593100] mb-4 flex items-center gap-2">
              📚 Informações do Curso
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-[#593100]">Nome:</span>
                <p className="text-[#593100] text-lg">{state.courseName}</p>
              </div>
              <div>
                <span className="font-semibold text-[#593100]">Nível de conhecimento:</span>
                <p className="text-[#593100]">
                  {state.knowledgeLevel === 'novato' ? '🌱 Iniciante' :
                   state.knowledgeLevel === 'intermediario' ? '📚 Intermediário' :
                   state.knowledgeLevel === 'avancado' ? '🎓 Avançado' : ''}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#fff7f0] rounded-lg p-6">
            <h4 className="font-bold text-lg text-[#593100] mb-4 flex items-center gap-2">
              ⚙️ Preferências de Estudo
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-[#593100]">Ritmo de estudo:</span>
                <p className="text-[#593100]">
                  {state.studyPace === 'pausado' ? '🐌 Pausado e detalhado' :
                   state.studyPace === 'moderado' ? '🚶 Moderado e equilibrado' :
                   state.studyPace === 'rapido' ? '🏃 Rápido e dinâmico' : ''}
                </p>
              </div>
              <div>
                <span className="font-semibold text-[#593100]">Objetivo principal:</span>
                <p className="text-[#593100]">
                  {state.goalsAndMotivations === 'aprovacao_prova' ? '📋 Aprovação em Prova' :
                   state.goalsAndMotivations === 'dominio_tema' ? '🎯 Domínio do Tema' :
                   state.goalsAndMotivations === 'hobby' ? '🎨 Hobby Pessoal' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {additionalInfo && (
          <div className="mt-6 bg-[#fff7f0] rounded-lg p-6">
            <h4 className="font-bold text-lg text-[#593100] mb-2 flex items-center gap-2">
              💬 Informações Adicionais
            </h4>
            <p className="text-[#593100] leading-relaxed">{additionalInfo}</p>
          </div>
        )}
      </div>

      {/* Botões de navegação */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          disabled={loading}
          className="px-6 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-white border-2 border-[#cc6200] hover:bg-[#ffddc2] transition disabled:opacity-50"
        >
          ← Voltar
        </button>
        
        <button
          onClick={handleCreateCourse}
          disabled={loading}
          className="px-8 py-4 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Criando curso...
            </>
          ) : (
            <>
              🚀 Criar meu curso!
            </>
          )}
        </button>
      </div>
    </div>
  );
}
