"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

interface TeacherStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function CreateCourseTeacherStyle() {
  const router = useRouter();
  const { state } = useCourseCreation();
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const teacherStyles: TeacherStyle[] = [
    {
      id: "conversador",
      name: "Conversador",
      description:
        "Explicações em formato de bate-papo, com uma interação natural e descontraída",
      icon: "💬",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "coach_motivacional",
      name: "Coach Motivacional",
      description: "Encorajador, com reforços positivos e frases inspiradoras",
      icon: "🏆",
      color: "from-green-500 to-green-600",
    },
    {
      id: "superdireto",
      name: "Superdireto",
      description: "Sem firulas, foco total no conteúdo, explicações objetivas",
      icon: "🎯",
      color: "from-red-500 to-red-600",
    },
    {
      id: "professor_classico",
      name: "Professor Clássico",
      description:
        "Tom tradicional, respeitoso e formal, com exemplos acadêmicos",
      icon: "🎓",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "cientista",
      name: "Cientista",
      description: "Explicações técnicas, detalhistas e baseadas em lógica",
      icon: "🔬",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "zueiro",
      name: "Zueiro",
      description: "Explicações leves, com piadinhas e linguagem informal",
      icon: "😄",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "gamer",
      name: "Gamer",
      description: "Tudo vira missão, XP, conquista. Aprender é jogar",
      icon: "🎮",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "zen",
      name: "Zen",
      description: "Explicações calmas, com ritmo moderado e atenção plena",
      icon: "🧘",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: "sabio",
      name: "Sábio",
      description: "Usa metáforas e analogias filosóficas para ensinar",
      icon: "🧙‍♂️",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "hacker",
      name: "Hacker",
      description: "Tutor com mentalidade hacker, imersivo e obstinado",
      icon: "💻",
      color: "from-gray-500 to-gray-600",
    },
  ];

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleContinue = () => {
    if (selectedStyle) {
      // Aqui você salvaria o estilo selecionado no contexto
      console.log("Estilo selecionado:", selectedStyle);

      // Redirecionar para pesquisa de professor
      router.push("/create-course-teacher-loading");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7f0] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Escolha o Estilo do Professor
          </h1>
          <p className="text-xl text-[#593100] opacity-80 mb-2">
            Como você gostaria que o Falky AI ensinasse{" "}
            <span className="font-semibold text-[#cc6200]">
              {state.courseName}
            </span>
            ?
          </p>
          <p className="text-base text-[#593100] opacity-60">
            Selecione a personalidade que mais combina com seu estilo de
            aprendizado
          </p>
        </div>

        {/* Grid de estilos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {teacherStyles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleStyleSelect(style.id)}
              className={`
                relative cursor-pointer transition-all duration-300 transform hover:scale-105
                ${
                  selectedStyle === style.id
                    ? "ring-4 ring-[#cc6200] shadow-2xl"
                    : "hover:shadow-xl"
                }
                bg-white rounded-2xl p-6 border-2 
                ${
                  selectedStyle === style.id
                    ? "border-[#cc6200]"
                    : "border-[#ffddc2]"
                }
              `}
            >
              {/* Radio button */}
              <div className="absolute top-4 right-4">
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedStyle === style.id
                      ? "bg-[#cc6200] border-[#cc6200]"
                      : "border-[#cc6200] bg-white"
                  }
                `}
                >
                  {selectedStyle === style.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Ícone e gradiente */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`
                  w-16 h-16 rounded-full bg-gradient-to-r ${style.color} 
                  flex items-center justify-center text-2xl shadow-lg
                `}
                >
                  {style.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#593100] mb-1">
                    {style.name}
                  </h3>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm text-[#593100] opacity-80 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-8 py-4 rounded-full shadow-lg font-semibold text-[#593100] bg-white border-2 border-[#ffddc2] hover:bg-[#ffddc2] transition"
          >
            ← Voltar
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedStyle}
            className="px-12 py-4 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {selectedStyle ? "🔍 Buscar Professor" : "Selecione um Estilo"}
          </button>
        </div>
      </div>
    </div>
  );
}
