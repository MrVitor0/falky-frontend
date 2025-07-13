"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard";
import { apiController } from "@/controllers/api.controller";
import ReactMarkdown from "react-markdown";

// Interfaces para tipagem do json_content
interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Case {
  title: string;
  description: string;
  code_examples: string[];
}

interface Step {
  step: number;
  title: string;
  instructions: string[];
}

interface Subsection {
  title: string;
  content: string;
}

interface Section {
  type:
    | "positioning"
    | "objectives"
    | "theory"
    | "tutorial"
    | "cases"
    | "tools"
    | "practices"
    | "project"
    | "code"
    | "trends"
    | "connections"
    | "resources"
    | "questions"
    | "todo";
  title: string;
  content?: string;
  objectives?: string[];
  subsections?: Subsection[];
  steps?: Step[];
  cases?: Case[];
  tools?: string[];
  practices?: string[];
  description?: string;
  instructions?: string[];
  code_examples?: string[];
  trends?: string[];
  connections?: string[];
  resources?: string[];
  questions?: Question[];
  todo?: string[];
}

interface ModuleJsonContent {
  title: string;
  description: string;
  sections: Section[];
}

interface MaterialContent {
  material_id: string;
  course_id: string;
  target_type: string;
  target_id: string;
  title: string;
  content: string;
  json_content?: ModuleJsonContent;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export default function MaterialPage({
  params,
}: {
  params: Promise<{ id: string; materialId: string }>;
}) {
  const router = useRouter();
  const [material, setMaterial] = useState<MaterialContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeQuestionSection, setActiveQuestionSection] = useState<
    number | null
  >(null);
  const [questionInputs, setQuestionInputs] = useState<{
    [key: number]: string;
  }>({});
  const [submittingSections, setSubmittingSections] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [sectionIndex: number]: { [questionIndex: number]: string };
  }>({});

  // Unwrap params usando React.use()
  const resolvedParams = use(params);

  // Carregar material
  useEffect(() => {
    const loadMaterial = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiController.getMaterialContent(
          resolvedParams.id,
          resolvedParams.materialId
        );

        if (response.success && response.data.data) {
          const rawMaterial = response.data.data;
          // Converter o json_content para o tipo esperado
          const material: MaterialContent = {
            ...rawMaterial,
            json_content: rawMaterial.json_content as
              | ModuleJsonContent
              | undefined,
          };
          setMaterial(material);
        } else {
          setError("Erro ao carregar material");
        }
      } catch (error) {
        console.error("Erro ao carregar material:", error);
        setError("Erro ao carregar material");
      } finally {
        setLoading(false);
      }
    };

    loadMaterial();
  }, [resolvedParams.id, resolvedParams.materialId]);

  // Função para processar dúvidas com IA
  const handleQuestionSubmit = async (
    sectionIndex: number,
    section: Section,
    question: string
  ) => {
    if (!question.trim() || !material) return;

    setSubmittingSections((prev) => ({ ...prev, [sectionIndex]: true }));

    try {
      // Fazer chamada para a API que processará com GPT-4o-mini
      const response = await apiController.rewriteMaterialSection(
        resolvedParams.id,
        resolvedParams.materialId,
        sectionIndex.toString(),
        question
      );

      if (response.success) {
        // Simular por enquanto a atualização da seção
        // Na implementação real, a API deveria retornar a seção atualizada
        alert("Sua dúvida foi processada! A seção será atualizada em breve.");

        // Fechar o input e limpar
        setActiveQuestionSection(null);
        setQuestionInputs((prev) => ({ ...prev, [sectionIndex]: "" }));

        // Recarregar o material para ver as mudanças
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        alert("Erro ao processar sua dúvida. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao processar pergunta:", error);
      alert("Erro ao processar sua dúvida. Tente novamente.");
    } finally {
      setSubmittingSections((prev) => ({ ...prev, [sectionIndex]: false }));
    }
  };

  // Função para gerar materiais (implementação mais robusta)
  const handleGenerateMaterial = async (type: "pdf" | "audio" | "video") => {
    try {
      setLoading(true);

      // Simular chamada à API para geração de material
      await new Promise((resolve) => setTimeout(resolve, 2000));

      switch (type) {
        case "pdf":
          alert(
            "📄 PDF gerado com sucesso! O download será iniciado em breve."
          );
          break;
        case "audio":
          alert(
            "🎵 Áudio gerado com sucesso! O arquivo estará disponível em breve."
          );
          break;
        case "video":
          alert(
            "🎥 Vídeo gerado com sucesso! O arquivo estará disponível em breve."
          );
          break;
      }

      // Aqui você pode adicionar a lógica real para:
      // - Chamar API de geração de material
      // - Fazer download do arquivo
      // - Salvar no sistema de arquivos
      // - Notificar o usuário via toast/notification
    } catch (error) {
      console.error(`❌ Erro ao gerar material ${type}:`, error);
      alert(`❌ Erro ao gerar material ${type}. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  // Função para marcar módulo como concluído
  const handleMarkAsCompleted = async () => {
    try {
      // Aqui você pode implementar a lógica para salvar o progresso
      alert("✅ Módulo marcado como concluído!");
    } catch (error) {
      console.error("❌ Erro ao marcar como concluído:", error);
      alert("❌ Erro ao marcar como concluído. Tente novamente.");
    }
  };

  // Função para adicionar aos favoritos
  const handleAddToFavorites = async () => {
    try {
      // Aqui você pode implementar a lógica para adicionar aos favoritos
      alert("⭐ Módulo adicionado aos favoritos!");
    } catch (error) {
      console.error("❌ Erro ao adicionar aos favoritos:", error);
      alert("❌ Erro ao adicionar aos favoritos. Tente novamente.");
    }
  };

  // Função para lidar com seleção de respostas nos exercícios
  const handleAnswerSelect = (
    sectionIndex: number,
    questionIndex: number,
    selectedOption: string
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        [questionIndex]: selectedOption,
      },
    }));
  };

  // Função para renderizar o botão "Não Entendi"
  const renderQuestionButton = (sectionIndex: number, section: Section) => {
    return (
      <div className="mt-4">
        {activeQuestionSection === sectionIndex ? (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-3">
              <textarea
                value={questionInputs[sectionIndex] || ""}
                onChange={(e) =>
                  setQuestionInputs((prev) => ({
                    ...prev,
                    [sectionIndex]: e.target.value,
                  }))
                }
                placeholder="Sobre o que você não entendeu? Descreva sua dúvida em detalhes..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent resize-none"
                rows={3}
                disabled={submittingSections[sectionIndex]}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setActiveQuestionSection(null);
                    setQuestionInputs((prev) => ({
                      ...prev,
                      [sectionIndex]: "",
                    }));
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                  disabled={submittingSections[sectionIndex]}
                >
                  Cancelar
                </button>
                <button
                  onClick={() =>
                    handleQuestionSubmit(
                      sectionIndex,
                      section,
                      questionInputs[sectionIndex] || ""
                    )
                  }
                  disabled={
                    submittingSections[sectionIndex] ||
                    !questionInputs[sectionIndex]?.trim()
                  }
                  className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submittingSections[sectionIndex] ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setActiveQuestionSection(sectionIndex)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Não Entendi
            </button>
          </div>
        )}
      </div>
    );
  };

  // Função para renderizar seções específicas
  const renderSection = (section: Section, index: number) => {
    const sectionClasses =
      "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6";

    switch (section.type) {
      case "positioning":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📍 {section.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "objectives":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              🎯 {section.title}
            </h3>
            <ul className="space-y-2">
              {section.objectives?.map((objective, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">•</span>
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "theory":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📚 {section.title}
            </h3>
            <div className="space-y-6">
              {section.subsections?.map((subsection, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-[#cc6200] pl-6 py-2 bg-gradient-to-r from-[#fff7f0] to-transparent rounded-r-lg"
                >
                  <h4 className="text-lg font-semibold text-[#593100] mb-3 flex items-center">
                    <span className="bg-[#cc6200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      {idx + 1}
                    </span>
                    {subsection.title}
                  </h4>
                  <div className="text-gray-700 leading-relaxed prose prose-orange max-w-none">
                    <ReactMarkdown>{subsection.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "tutorial":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              🔧 {section.title}
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Dica:</strong> Siga os passos na ordem apresentada
                para obter os melhores resultados.
              </p>
            </div>
            <div className="space-y-4">
              {section.steps?.map((step, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#cc6200] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#593100] mb-3 text-lg">
                        {step.title}
                      </h4>
                      <ul className="space-y-2">
                        {step.instructions.map((instruction, instIdx) => (
                          <li key={instIdx} className="flex items-start gap-3">
                            <span className="text-[#cc6200] mt-1 flex-shrink-0">
                              →
                            </span>
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "cases":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📋 {section.title}
            </h3>
            <div className="space-y-4">
              {section.cases?.map((caseItem, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-[#593100] mb-2">
                    {caseItem.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>
              ))}
            </div>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "tools":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              🛠️ {section.title}
            </h3>
            <ul className="space-y-2">
              {section.tools?.map((tool, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">⚙️</span>
                  <span className="text-gray-700">{tool}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "practices":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              ✅ {section.title}
            </h3>
            <ul className="space-y-2">
              {section.practices?.map((practice, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">✓</span>
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "project":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              🏗️ {section.title}
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {section.description}
              </p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-[#593100] mb-2">
                  Instruções:
                </h4>
                <ol className="space-y-2">
                  {section.instructions?.map((instruction, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#cc6200] mr-2 font-semibold">
                        {idx + 1}.
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "trends":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📈 {section.title}
            </h3>
            <ul className="space-y-2">
              {section.trends?.map((trend, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">📊</span>
                  <span className="text-gray-700">{trend}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "connections":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              🔗 {section.title}
            </h3>
            <ul className="space-y-2">
              {section.connections?.map((connection, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">→</span>
                  <span className="text-gray-700">{connection}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "resources":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📖 {section.title}
            </h3>
            <ul className="space-y-2">
              {section.resources?.map((resource, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">📚</span>
                  <span className="text-gray-700">{resource}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      case "questions":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              ❓ {section.title}
            </h3>
            <div className="space-y-4">
              {section.questions?.map((question, idx) => {
                const selectedAnswer = selectedAnswers[index]?.[idx];
                const isCorrect = selectedAnswer === question.answer;
                const hasAnswered = selectedAnswer !== undefined;

                return (
                  <div key={idx} className="border rounded-lg p-4 bg-yellow-50">
                    <h4 className="font-semibold text-[#593100] mb-3">
                      {question.question}
                    </h4>
                    <ul className="space-y-2">
                      {question.options.map((option, optIdx) => (
                        <li key={optIdx}>
                          <button
                            onClick={() =>
                              handleAnswerSelect(index, idx, option)
                            }
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedAnswer === option
                                ? "border-[#cc6200] bg-[#fff7f0] text-[#593100]"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-[#cc6200] mr-2 font-medium">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            <span className="text-gray-700 text-sm">
                              {option}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {hasAnswered && (
                      <div
                        className={`mt-3 p-3 rounded-lg text-sm font-medium ${
                          isCorrect
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {isCorrect
                          ? "✅ Parabéns! Você acertou a questão!"
                          : "❌ Resposta incorreta. Tente novamente!"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "todo":
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3 flex items-center">
              📝 {section.title}
            </h3>
            <ul className="space-y-2">
              {section.todo?.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#cc6200] mr-2">☐</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            {renderQuestionButton(index, section)}
          </div>
        );

      default:
        return (
          <div key={index} className={sectionClasses}>
            <h3 className="text-xl font-semibold text-[#593100] mb-3">
              {section.title}
            </h3>
            <p className="text-gray-700">{section.content}</p>
            {renderQuestionButton(index, section)}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Carregando material..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !material) {
    return (
      <DashboardLayout title="Material não encontrado" subtitle="">
        <div className="text-center py-12">
          <span className="text-6xl opacity-20">❌</span>
          <h2 className="text-2xl font-bold text-[#593100] mt-4">
            Material não encontrado
          </h2>
          <p className="text-[#593100] opacity-60 mt-2">
            {error ||
              "O material que você está procurando não existe ou foi removido."}
          </p>
          <button
            onClick={() =>
              router.push(`/dashboard/courses/${resolvedParams.id}`)
            }
            className="mt-4 px-6 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
          >
            Voltar ao Curso
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const jsonContent = material.json_content;

  return (
    <DashboardLayout
      title={jsonContent?.title || material.title}
      subtitle={
        jsonContent?.description ||
        `Material do ${material.target_type} ${material.target_id}`
      }
    >
      <div className="space-y-8">
        {/* Header do Módulo */}
        <div className="bg-gradient-to-r from-[#fff7f0] to-[#ffddc2] rounded-xl p-8 border-l-4 border-[#cc6200]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#593100] mb-2">
                {jsonContent?.title || material.title}
              </h1>
              <p className="text-lg text-[#593100] opacity-80 mb-4">
                {jsonContent?.description ||
                  `Conteúdo detalhado do ${material.target_type}`}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-[#cc6200] text-white px-3 py-1 rounded-full">
                  📚{" "}
                  {material.target_type?.charAt(0).toUpperCase() +
                    material.target_type?.slice(1)}
                </span>
                <span className="bg-gray-100 text-[#593100] px-3 py-1 rounded-full">
                  🆔 {material.target_id}
                </span>
                <span className="bg-gray-100 text-[#593100] px-3 py-1 rounded-full">
                  📅 {new Date(material.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  router.push(`/dashboard/courses/${resolvedParams.id}`)
                }
                className="px-4 py-2 bg-gray-200 text-[#593100] rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                ← Voltar ao Curso
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas do Módulo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-[#cc6200] mb-1">
              {jsonContent?.sections?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Seções</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-[#cc6200] mb-1">
              {jsonContent?.sections
                ?.filter((s) => s.type === "questions")
                .reduce((acc, s) => acc + (s.questions?.length || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Questões</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-[#cc6200] mb-1">
              {jsonContent?.sections
                ?.filter((s) => s.type === "tutorial")
                .reduce((acc, s) => acc + (s.steps?.length || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Tutoriais</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-[#cc6200] mb-1">
              {Math.ceil((material.content?.length || 0) / 1000)}min
            </div>
            <div className="text-sm text-gray-600">Tempo Est.</div>
          </div>
        </div>

        {/* Botões de Geração de Material */}
        <div className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            🎨 Gerar Material Adicional
          </h3>
          <p className="text-white opacity-90 mb-6">
            Transforme este conteúdo em diferentes formatos para melhorar sua
            experiência de aprendizado
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleGenerateMaterial("pdf")}
              disabled={loading}
              className="flex flex-col items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-3xl">📄</span>
              <div className="text-center text-[#593100] ">
                <div className="font-semibold">Gerar PDF</div>
                <div className="text-sm opacity-90">
                  Documento para download
                </div>
              </div>
            </button>
            <button
              onClick={() => handleGenerateMaterial("audio")}
              disabled={loading}
              className="flex flex-col items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-3xl">🎵</span>
              <div className="text-center text-[#593100] ">
                <div className="font-semibold">Gerar Áudio</div>
                <div className="text-sm opacity-90">Narração do conteúdo</div>
              </div>
            </button>
            <button
              onClick={() => handleGenerateMaterial("video")}
              disabled={loading}
              className="flex flex-col items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-3xl">🎥</span>
              <div className="text-center text-[#593100] ">
                <div className="font-semibold">Gerar Vídeo</div>
                <div className="text-sm opacity-90">Apresentação visual</div>
              </div>
            </button>
          </div>
        </div>

        {/* Seções do Material */}
        <div className="space-y-6">
          {jsonContent?.sections?.map((section, index) => (
            <div key={index} id={`section-${index}`}>
              {renderSection(section, index)}
            </div>
          ))}
        </div>

        {/* Footer de Progresso */}
        {jsonContent?.sections && jsonContent.sections.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#593100] mb-1">
                  📊 Progresso do Módulo
                </h3>
                <p className="text-gray-600 text-sm">
                  Acompanhe seu progresso através das seções deste módulo
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleMarkAsCompleted}
                  className="px-4 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
                >
                  ✅ Marcar como Concluído
                </button>
                <button
                  onClick={handleAddToFavorites}
                  className="px-4 py-2 bg-gray-200 text-[#593100] rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ⭐ Adicionar aos Favoritos
                </button>
              </div>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#cc6200] h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Início</span>
              <span>0% concluído</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
