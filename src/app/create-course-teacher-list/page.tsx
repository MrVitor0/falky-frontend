"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import Image from "next/image";

interface Teacher {
  id: string;
  name: string;
  type: "ai" | "human";
  avatar: string;
  photo?: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  description: string;
  teachingStyle: string;
  highlights: string[];
}

export default function CreateCourseListTeachers() {
  const router = useRouter();
  const { state } = useCourseCreation();
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const teachers: Teacher[] = [
    {
      id: "prof-maria",
      name: "Prof. Maria Silva",
      type: "human",
      avatar: "👩‍🏫",
      photo: "/teachers/4.svg",
      specialization: `Doutora em ${state.courseName}`,
      experience: "15 anos de experiência",
      rating: 4.9,
      reviewsCount: 342,
      description:
        "Professora experiente com doutorado e vasta experiência prática. Conhecida por sua didática clara e paciência com iniciantes.",
      teachingStyle: "Didático e Paciente",
      highlights: [
        "🎓 Doutora pela USP",
        "📚 15 anos de experiência acadêmica",
        "👥 Especialista em ensino para iniciantes",
        "💡 Metodologia comprovada",
      ],
    },
    {
      id: "prof-carlos",
      name: "Prof. Carlos Santos",
      type: "human",
      avatar: "👨‍💻",
      photo: "/teachers/2.svg",
      specialization: `Especialista Prático em ${state.courseName}`,
      experience: "10 anos de mercado",
      rating: 4.8,
      reviewsCount: 189,
      description:
        "Profissional atuante no mercado que combina teoria e prática. Ideal para quem busca aplicação real dos conhecimentos.",
      teachingStyle: "Prático e Aplicado",
      highlights: [
        "💼 10 anos de experiência no mercado",
        "🛠️ Foco em aplicação prática",
        "🎯 Projetos reais durante as aulas",
        "🚀 Preparação para o mercado de trabalho",
      ],
    },
    {
      id: "prof-ana",
      name: "Prof. Ana Costa",
      type: "human",
      avatar: "👩‍🔬",
      photo: "/teachers/3.svg",
      specialization: `Pesquisadora em ${state.courseName}`,
      experience: "8 anos de pesquisa",
      rating: 4.7,
      reviewsCount: 156,
      description:
        "Pesquisadora ativa com foco em inovação. Perfeita para quem quer entender os aspectos mais avançados e tendências futuras.",
      teachingStyle: "Inovador e Visionário",
      highlights: [
        "🔬 Pesquisadora ativa na área",
        "🌟 Especialista em tendências futuras",
        "📖 Publicações em revistas internacionais",
        "🎨 Abordagem criativa e inovadora",
      ],
    },
    {
      id: "prof-lucas",
      name: "Prof. Lucas Almeida",
      type: "human",
      avatar: "🧑‍🚀",
      photo: "/teachers/1.svg",
      specialization: `Mentor em ${state.courseName} com foco em tecnologia de ponta`,
      experience: "12 anos em startups e inovação",
      rating: 4.85,
      reviewsCount: 211,
      description:
        "Mentor apaixonado por tecnologia, com experiência em ambientes de startups e projetos inovadores. Ideal para quem busca aprender com exemplos do mundo real e tendências tecnológicas.",
      teachingStyle: "Mentoria prática e inspiradora",
      highlights: [
        "🚀 Experiência em startups de tecnologia",
        "🤝 Mentor de equipes multidisciplinares",
        "🌐 Projetos internacionais",
        "🔝 Foco em inovação e tendências de mercado",
      ],
    },
  ];

  const handleSelectTeacher = (teacherId: string) => {
    setSelectedTeacher(teacherId);
  };

  const handleContinue = () => {
    if (selectedTeacher) {
      // Aqui você salvaria a escolha do professor
      console.log("Professor selecionado:", selectedTeacher);

      // Redirecionar para tela de loading
      router.push("/create-course-finishing");
    }
  };

  const getTeacherCard = (teacher: Teacher) => {
    const isSelected = selectedTeacher === teacher.id;
    const isAI = teacher.type === "ai";

    return (
      <div
        key={teacher.id}
        onClick={() => handleSelectTeacher(teacher.id)}
        className={`
          relative cursor-pointer transition-all duration-300 transform hover:scale-105
          ${isSelected ? "ring-4 ring-[#cc6200] shadow-2xl" : "hover:shadow-xl"}
          ${
            isAI
              ? "bg-gradient-to-br from-[#cc6200] to-[#ff8c00] text-white"
              : "bg-white"
          }
          rounded-2xl p-4 border-2 
          ${
            isSelected
              ? "border-[#cc6200]"
              : isAI
              ? "border-[#ff8c00]"
              : "border-[#ffddc2]"
          }
        `}
      >
        {/* Avatar e informações básicas */}
        <div className="flex items-start gap-3 mb-3">
          {isAI ? (
            <div className="text-3xl">{teacher.avatar}</div>
          ) : (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#ffddc2] flex-shrink-0">
              {teacher.photo ? (
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  {teacher.avatar}
                </div>
              )}
            </div>
          )}
          <div className="flex-1">
            <h3
              className={`text-lg font-bold mb-1 ${
                isAI ? "text-white" : "text-[#593100]"
              }`}
            >
              {teacher.name}
            </h3>
            <p
              className={`text-xs mb-1 ${
                isAI ? "text-white opacity-90" : "text-[#cc6200]"
              }`}
            >
              {teacher.specialization}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs ${
                  isAI ? "text-white opacity-80" : "text-[#593100] opacity-70"
                }`}
              >
                {teacher.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(teacher.rating) ? "⭐" : "☆"
                }`}
              >
                {i < Math.floor(teacher.rating) ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <span
            className={`text-sm font-semibold ${
              isAI ? "text-white" : "text-[#593100]"
            }`}
          >
            {teacher.rating}
          </span>
          <span
            className={`text-xs ${
              isAI ? "text-white opacity-80" : "text-[#593100] opacity-60"
            }`}
          >
            ({teacher.reviewsCount})
          </span>
        </div>

        {/* Descrição */}
        <p
          className={`text-xs mb-3 ${
            isAI ? "text-white opacity-90" : "text-[#593100] opacity-80"
          }`}
        >
          {teacher.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1 mb-3">
          {teacher.highlights.slice(0, 2).map((highlight, index) => (
            <div
              key={index}
              className={`text-xs ${
                isAI ? "text-white opacity-90" : "text-[#593100] opacity-70"
              }`}
            >
              {highlight}
            </div>
          ))}
        </div>

        {/* Estilo de Ensino */}
        <div className="pt-3 border-t border-opacity-20">
          <p
            className={`text-xs font-semibold ${
              isAI ? "text-white opacity-80" : "text-[#593100] opacity-60"
            }`}
          >
            Estilo de Ensino
          </p>
          <p className={`text-sm ${isAI ? "text-white" : "text-[#593100]"}`}>
            {teacher.teachingStyle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff7f0] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Escolha seu Professor
          </h1>
          <p className="text-xl text-[#593100] opacity-80 mb-2">
            Selecionamos os melhores professores para{" "}
            <span className="font-semibold text-[#cc6200]">
              {state.courseName}
            </span>
          </p>
          <p className="text-base text-[#593100] opacity-60">
            Escolha o professor que melhor se adapta ao seu estilo de
            aprendizado
          </p>
        </div>

        {/* Grid de professores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {teachers.map((teacher) => getTeacherCard(teacher))}
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
            disabled={!selectedTeacher}
            className="px-12 py-4 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {selectedTeacher
              ? "🚀 Finalizar Criação"
              : "Selecione um Professor"}
          </button>
        </div>
      </div>
    </div>
  );
}
