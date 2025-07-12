"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CourseCreatedSuccess() {
  const { state, dispatch } = useCourseCreation();

  useEffect(() => {
    // Reseta o estado após 10 segundos na página de sucesso
    const timer = setTimeout(() => {
      dispatch({ type: 'RESET' });
    }, 10000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Usar dados da API se disponíveis, senão usar dados do contexto
  const courseData = state.createdCourseData;
  const displayName = courseData?.course_name || state.courseName;
  const displayLevel = courseData?.knowledge_level || state.knowledgeLevel;
  const displayPace = courseData?.study_pace || state.studyPace;
  const displayGoals = courseData?.goals_and_motivations || state.goalsAndMotivations;
  const displayAdditionalInfo = courseData?.additional_information || state.additionalInformation;

  // Função para formatar nível de conhecimento
  const formatKnowledgeLevel = (level: string) => {
    switch (level) {
      case 'novato':
        return '🌱 Iniciante';
      case 'intermediario':
        return '📚 Intermediário';
      case 'avancado':
        return '🎓 Avançado';
      default:
        return level;
    }
  };

  // Função para formatar ritmo de estudo
  const formatStudyPace = (pace: string) => {
    switch (pace) {
      case 'pausado':
        return '🐌 Pausado';
      case 'moderado':
        return '🚶 Moderado';
      case 'rapido':
        return '🏃 Rápido';
      default:
        return pace;
    }
  };

  // Função para formatar objetivos
  const formatGoals = (goals: string) => {
    switch (goals) {
      case 'aprovacao_prova':
        return '📋 Aprovação em Prova';
      case 'dominio_tema':
        return '🎯 Domínio do Tema';
      case 'hobby':
        return '🎨 Hobby Pessoal';
      default:
        return goals;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="max-w-4xl text-center">
        {/* Animação de sucesso */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-6xl">🎉</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[#593100] mb-6">
          Parabéns! 🚀
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-[#cc6200] mb-8">
          Seu curso foi criado com sucesso!
        </h2>

        <div className="bg-[#ffddc2] rounded-xl p-8 shadow-lg mb-8 border-2 border-[#cc6200]">
          <h3 className="text-xl font-bold text-[#593100] mb-6">
            📚 Detalhes do seu curso:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">Nome do curso:</h4>
              <p className="text-[#593100] text-lg font-medium">{displayName}</p>
            </div>

            {courseData?.course_id && (
              <div className="bg-[#fff7f0] rounded-lg p-4">
                <h4 className="font-semibold text-[#593100] mb-2">ID do curso:</h4>
                <p className="text-[#593100] text-sm font-mono bg-[#ffddc2] px-2 py-1 rounded">
                  {courseData.course_id}
                </p>
              </div>
            )}
            
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">Nível:</h4>
              <p className="text-[#593100]">{formatKnowledgeLevel(displayLevel || '')}</p>
              {courseData?.knowledge_level_description && (
                <p className="text-[#593100] text-sm opacity-75 mt-1">
                  {courseData.knowledge_level_description}
                </p>
              )}
            </div>
            
            <div className="bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">Ritmo:</h4>
              <p className="text-[#593100]">{formatStudyPace(displayPace || '')}</p>
              {courseData?.study_pace_description && (
                <p className="text-[#593100] text-sm opacity-75 mt-1">
                  {courseData.study_pace_description}
                </p>
              )}
            </div>
            
            <div className="bg-[#fff7f0] rounded-lg p-4 md:col-span-2">
              <h4 className="font-semibold text-[#593100] mb-2">Objetivo:</h4>
              <p className="text-[#593100]">{formatGoals(displayGoals || '')}</p>
              {courseData?.goals_and_motivations_description && (
                <p className="text-[#593100] text-sm opacity-75 mt-1">
                  {courseData.goals_and_motivations_description}
                </p>
              )}
            </div>
          </div>

          {displayAdditionalInfo && (
            <div className="mt-6 bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">Informações adicionais:</h4>
              <p className="text-[#593100] leading-relaxed">{displayAdditionalInfo}</p>
            </div>
          )}

          {courseData?.course_created_at && (
            <div className="mt-6 bg-[#fff7f0] rounded-lg p-4">
              <h4 className="font-semibold text-[#593100] mb-2">Data de criação:</h4>
              <p className="text-[#593100] text-sm">
                {new Date(courseData.course_created_at).toLocaleString('pt-BR')}
              </p>
            </div>
          )}
        </div>

        {/* Próximos passos */}
        <div className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">🎯 Próximos passos:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-[#593100]">
              <h4 className="font-semibold mb-2">1. 📧 Verificar email</h4>
              <p className="text-sm">Você receberá um email com os detalhes do seu curso.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-[#593100]">
              <h4 className="font-semibold mb-2">2. 🎓 Acessar plataforma</h4>
              <p className="text-sm">Seu curso estará disponível na área do aluno.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-[#593100]">
              <h4 className="font-semibold mb-2">3. 🚀 Começar a estudar</h4>
              <p className="text-sm">Inicie sua jornada de aprendizado personalizada!</p>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full shadow-lg font-semibold text-[#593100] bg-[#ffddc2] border-2 border-[#cc6200] hover:bg-[#fff7f0] transition"
          >
            🏠 Voltar ao Início
          </Link>
          
          <Link
            href="/create-course-step-one"
            onClick={() => dispatch({ type: 'RESET' })}
            className="px-8 py-4 rounded-full shadow-lg font-semibold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105"
          >
            ➕ Criar outro curso
          </Link>
          
          <Link
            href="/api-test"
            className="px-8 py-4 rounded-full shadow-lg font-semibold text-[#593100] bg-white border-2 border-[#cc6200] hover:bg-[#ffddc2] transition"
          >
            🧪 Testar API
          </Link>
        </div>

        {/* Mensagem adicional */}
        <div className="mt-12 text-center">
          <p className="text-lg text-[#593100] opacity-80">
            Obrigado por escolher o Falky! 💜
          </p>
          <p className="text-base text-[#593100] opacity-60 mt-2">
            Seu curso personalizado está sendo preparado com muito carinho.
          </p>
        </div>
      </div>
    </div>
  );
} 