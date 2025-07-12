"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CreateCourseStepTwo() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    {
      id: "ninho",
      title: "No Ninho",
      emoji: "🪺",
      description:
        "Estou no ninho, observando o horizonte. Quero entender o básico do território e me preparar para o meu primeiro voo no assunto.",
    },
    {
      id: "primeiro-voo",
      title: "Primeiro Voo",
      emoji: "🦅",
      description:
        "Já estou batendo as asas e pronto para praticar. Quero treinar meus mergulhos e aprender as técnicas essenciais de forma mais profunda.",
    },
    {
      id: "mestre-ceus",
      title: "Mestre dos Céus",
      emoji: "🧠",
      description:
        "O céu é o meu domínio. Quero voar nas maiores altitudes, pular o básico e focar na estratégia e na maestria do tema.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fff7f0] pt-16 px-4">
      <Link
        href="/create-course-step-one"
        className="self-start mb-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Vamos calibrar seu aprendizado
      </h1>

      <div className="border-2 border-[#cc6200] rounded-lg p-4 mb-12">
        <p className="text-xl md:text-2xl text-[#593100] text-center max-w-4xl">
          Responda a 3 perguntas rápidas para que eu possa criar o curso
          perfeito para o seu cérebro.
        </p>
      </div>

      {/* Cards de níveis de conhecimento */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        {levels.map((level) => (
          <div
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`rounded-2xl p-8 shadow-lg border-4 transition-all cursor-pointer ${
              selectedLevel === level.id
                ? "bg-[#cc6200] border-[#593100] shadow-xl scale-105"
                : "bg-[#ffddc2] border-[#cc6200] hover:shadow-xl hover:scale-102"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center mb-4 text-4xl ${
                    selectedLevel === level.id ? "bg-[#ffddc2]" : "bg-[#fff7f0]"
                  }`}
                >
                  {level.emoji}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  selectedLevel === level.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {level.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  selectedLevel === level.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {level.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Continuar - só aparece quando algo está selecionado */}
      {selectedLevel && (
        <div className="mb-8">
          <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
