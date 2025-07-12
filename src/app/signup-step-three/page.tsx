"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupStepThree() {
  const [selectedNeurodivergence, setSelectedNeurodivergence] = useState("");
  const router = useRouter();
  const { updatePreferences } = useAuth();

  const neurodivergences = [
    {
      id: "none",
      title: "Nenhuma neurodivergência",
      description: "Não me identifico com nenhuma das opções abaixo",
      icon: "✨",
    },
    {
      id: "autismo_leve",
      title: "Autismo leve",
      description: "TEA nível 1 / Asperger",
      icon: "🧩",
    },
    {
      id: "tdah",
      title: "TDAH",
      description: "Transtorno de Déficit de Atenção com Hiperatividade",
      icon: "⚡",
    },
    {
      id: "dislexia",
      title: "Dislexia",
      description: "Dificuldade específica de aprendizagem na leitura",
      icon: "📖",
    },
    {
      id: "discalculia",
      title: "Discalculia",
      description: "Dificuldade específica de aprendizagem com números",
      icon: "🔢",
    },
    {
      id: "transtorno_processamento_sensorial",
      title: "Transtorno do Processamento Sensorial",
      description: "TPS - Dificuldade em processar informações sensoriais",
      icon: "🌈",
    },
  ];

  const handleFinish = async () => {
    if (selectedNeurodivergence) {
      // Salvar dados finais no localStorage
      const existingData = JSON.parse(
        localStorage.getItem("signupData") || "{}"
      );
      const finalData = {
        ...existingData,
        neurodivergence: selectedNeurodivergence,
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem("signupData", JSON.stringify(finalData));

      // Salvar no Context API
      await updatePreferences({
        name: finalData.name,
        profession: finalData.profession,
        birth_date: finalData.birthDate,
        teacher_personality: finalData.teacherPersonality,
        neurodivergence: selectedNeurodivergence,
      });

      // Limpar dados temporários
      localStorage.removeItem("signupData");

      // Redirecionar para a home
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4 py-8">
      <Link
        href="/signup-step-two"
        className="absolute top-24 left-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Personalize ainda mais sua experiência
          </h1>
          <p className="text-lg text-[#593100] opacity-80 mb-4">
            Essa informação é opcional e confidencial, mas nos ajuda a criar uma
            experiência de aprendizado mais eficaz para você
          </p>
          <div className="bg-[#ffddc2] rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-[#593100] text-sm">
              💡 <strong>Sua privacidade é nossa prioridade.</strong> Essas
              informações são usadas apenas para personalizar seu aprendizado e
              nunca são compartilhadas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {neurodivergences.map((neurodivergence) => (
            <div
              key={neurodivergence.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedNeurodivergence === neurodivergence.id
                  ? "transform scale-105"
                  : "hover:scale-102"
              }`}
              onClick={() => setSelectedNeurodivergence(neurodivergence.id)}
            >
              <div
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedNeurodivergence === neurodivergence.id
                    ? "border-[#cc6200] bg-gradient-to-br from-[#cc6200]/10 to-[#ff8c00]/10 shadow-lg"
                    : "border-[#ffddc2] bg-white hover:border-[#cc6200]/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {neurodivergence.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#593100] mb-2">
                      {neurodivergence.title}
                    </h3>
                    <p className="text-[#593100] opacity-80 leading-relaxed">
                      {neurodivergence.description}
                    </p>
                  </div>
                </div>

                {/* Radio button indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      selectedNeurodivergence === neurodivergence.id
                        ? "border-[#cc6200] bg-[#cc6200]"
                        : "border-[#ffddc2]"
                    }`}
                  >
                    {selectedNeurodivergence === neurodivergence.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedNeurodivergence && (
          <div className="flex justify-end">
            <button
              onClick={handleFinish}
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
            >
              Finalizar Cadastro
            </button>
          </div>
        )}

        {/* Indicador de progresso */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
