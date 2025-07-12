"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CreateCourseStepFour() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const missions = [
    {
      id: "voo-panoramico",
      title: "Voo Panorâmico",
      emoji: "🪺",
      description:
        "Aprender por puro prazer. O curso terá um formato mais leve e inspirador, focado na descoberta, curiosidades e na alegria de explorar um novo interesse sem pressão.",
    },
    {
      id: "dominar-territorio",
      title: "Dominar o Território",
      emoji: "🎯",
      description:
        "Vamos explorar cada centímetro deste céu. O curso será profundo e abrangente, com teoria, prática e conceitos avançados para você se tornar um especialista no assunto.",
    },
    {
      id: "caca-alvo",
      title: "Caça ao Alvo",
      emoji: "🎯",
      description:
        "Foco total na missão! O curso será otimizado com resumos, exercícios práticos e simulados, cobrindo exatamente o que você precisa para ser aprovado.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fff7f0] pt-16 px-4">
      <Link
        href="/create-course-step-three"
        className="self-start mb-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Qual é a missão do nosso voo?
      </h1>

      <p className="text-xl md:text-2xl text-[#593100] text-center mb-12 max-w-4xl">
        Saber o seu objetivo final nos ajuda a traçar a rota perfeita no céu do
        conhecimento.
      </p>

      {/* Cards de missões/objetivos */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        {missions.map((mission) => (
          <div
            key={mission.id}
            onClick={() => setSelectedMission(mission.id)}
            className={`rounded-2xl p-8 shadow-lg border-4 transition-all cursor-pointer ${
              selectedMission === mission.id
                ? "bg-[#cc6200] border-[#593100] shadow-xl scale-105"
                : "bg-[#ffddc2] border-[#cc6200] hover:shadow-xl hover:scale-102"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center mb-4 text-4xl ${
                    selectedMission === mission.id
                      ? "bg-[#ffddc2]"
                      : "bg-[#fff7f0]"
                  }`}
                >
                  {mission.emoji}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  selectedMission === mission.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {mission.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  selectedMission === mission.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {mission.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Continuar - só aparece quando algo está selecionado */}
      {selectedMission && (
        <div className="mb-8">
          <Link href="/create-course-step-five">
            <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
              Continuar
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
