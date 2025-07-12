"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupStepTwo() {
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const router = useRouter();

  const personalities = [
    {
      id: "conversador",
      title: "Conversador",
      description:
        "Explicações em formato de bate-papo, com uma interação natural e descontraída",
      icon: "💬",
    },
    {
      id: "coach_motivacional",
      title: "Coach Motivacional",
      description: "Encorajador, com reforços positivos e frases inspiradoras",
      icon: "🔥",
    },
    {
      id: "superdireto",
      title: "Super Direto",
      description: "Sem firulas, foco total no conteúdo, explicações objetivas",
      icon: "🎯",
    },
    {
      id: "professor_classico",
      title: "Professor Clássico",
      description:
        "Tom tradicional, respeitoso e formal, com exemplos acadêmicos",
      icon: "🎓",
    },
    {
      id: "cientista",
      title: "Cientista",
      description: "Explicações técnicas, detalhistas e baseadas em lógica",
      icon: "🔬",
    },
    {
      id: "zueiro",
      title: "Zueiro",
      description: "Explicações leves, com piadinhas e linguagem informal",
      icon: "😄",
    },
    {
      id: "gamer",
      title: "Gamer",
      description: "Tudo vira missão, XP, conquista. Aprender é jogar",
      icon: "🎮",
    },
    {
      id: "zen",
      title: "Zen",
      description: "Explicações calmas, com ritmo moderado e atenção plena",
      icon: "🧘",
    },
    {
      id: "sabio",
      title: "Sábio",
      description: "Usa metáforas e analogias filosóficas para ensinar",
      icon: "🦉",
    },
    {
      id: "hacker",
      title: "Hacker",
      description: "Tutor com mentalidade hacker, imersivo e obstinado",
      icon: "💻",
    },
  ];

  const handleContinue = () => {
    if (selectedPersonality) {
      // Salvar dados no localStorage
      const existingData = JSON.parse(
        localStorage.getItem("signupData") || "{}"
      );
      localStorage.setItem(
        "signupData",
        JSON.stringify({
          ...existingData,
          teacherPersonality: selectedPersonality,
        })
      );
      router.push("/signup-step-three");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4 py-8">
      <Link
        href="/signup-step-one"
        className="absolute top-24 left-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Qual personalidade de professor você prefere?
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            Escolha o estilo que mais combina com você para uma experiência
            personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {personalities.map((personality) => (
            <div
              key={personality.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedPersonality === personality.id
                  ? "transform scale-105"
                  : "hover:scale-102"
              }`}
              onClick={() => setSelectedPersonality(personality.id)}
            >
              <div
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedPersonality === personality.id
                    ? "border-[#cc6200] bg-gradient-to-br from-[#cc6200]/10 to-[#ff8c00]/10 shadow-lg"
                    : "border-[#ffddc2] bg-white hover:border-[#cc6200]/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {personality.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#593100] mb-2">
                      {personality.title}
                    </h3>
                    <p className="text-[#593100] opacity-80 leading-relaxed">
                      {personality.description}
                    </p>
                  </div>
                </div>

                {/* Radio button indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      selectedPersonality === personality.id
                        ? "border-[#cc6200] bg-[#cc6200]"
                        : "border-[#ffddc2]"
                    }`}
                  >
                    {selectedPersonality === personality.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPersonality && (
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Indicador de progresso */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffddc2] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
