"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CreateCourseStepThree() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const styles = [
    {
      id: "passo-coruja",
      title: "Passo da Coruja",
      emoji: "🦉",
      description:
        "Aulas mais detalhadas, com mais exemplos e tempo para reflexão. Perfeito para quem gosta de aprender sem pressa e com profundidade.",
    },
    {
      id: "voo-aguia",
      title: "Voo da Águia",
      emoji: "🦅",
      description:
        "Um equilíbrio entre teoria e prática, com tempo para absorver os conceitos. O ritmo padrão para um aprendizado sólido e confiante.",
    },
    {
      id: "ritmo-beija-flor",
      title: "Ritmo Beija-Flor",
      emoji: "🐦",
      description:
        "Aulas rápidas e objetivas, com foco total nos pontos-chave. Ideal para quem quer aprender o essencial no menor tempo possível.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fff7f0] pt-16 px-4">
      <Link
        href="/create-course-step-two"
        className="self-start mb-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Qual será o seu estilo de voo?
      </h1>

      <p className="text-xl md:text-2xl text-[#593100] text-center mb-12 max-w-4xl">
        Cada jornada no céu é única. Escolha o ritmo das suas asas para que o
        aprendizado seja perfeito para você.
      </p>

      {/* Cards de estilos de aprendizado */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`rounded-2xl p-8 shadow-lg border-4 transition-all cursor-pointer ${
              selectedStyle === style.id
                ? "bg-[#cc6200] border-[#593100] shadow-xl scale-105"
                : "bg-[#ffddc2] border-[#cc6200] hover:shadow-xl hover:scale-102"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center mb-4 text-4xl ${
                    selectedStyle === style.id ? "bg-[#ffddc2]" : "bg-[#fff7f0]"
                  }`}
                >
                  {style.emoji}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  selectedStyle === style.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {style.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  selectedStyle === style.id
                    ? "text-[#fff7f0]"
                    : "text-[#593100]"
                }`}
              >
                {style.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Continuar - só aparece quando algo está selecionado */}
      {selectedStyle && (
        <div className="mb-8">
          <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
