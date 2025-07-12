"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepOne() {
  const router = useRouter();
  const { state, dispatch, canProceedToNext } = useCourseCreation();
  const [inputValue, setInputValue] = useState(state.courseName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch({ type: 'SET_COURSE_NAME', payload: value });
  };

  const handleContinue = () => {
    if (canProceedToNext()) {
      dispatch({ type: 'NEXT_STEP' });
      router.push("/create-course-step-two");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fff7f0] pt-16 px-4">
      <Link
        href="/"
        className="self-start mb-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>
 
      <h1 className="text-4xl md:text-5xl font-bold text-[#593100] text-center mb-6 mt-10">
        Sua próxima jornada de conhecimento começa aqui.
      </h1>
      <p className="text-xl md:text-2xl text-[#593100] text-center mb-10 max-w-2xl">
        Qual assunto você gostaria de dominar? Digite o nome do seu curso e vamos personalizar sua experiência de aprendizado.
      </p>
           
      {/* Indicador de progresso */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#593100]">Passo 1 de 5</span>
          <span className="text-sm font-medium text-[#593100]">20%</span>
        </div>
        <div className="w-full bg-[#ffddc2] rounded-full h-2">
          <div className="bg-[#cc6200] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: '20%' }}></div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-[#ffddc2] rounded-xl p-8 shadow-md flex flex-col items-center mb-16">
        <div className="w-full flex flex-col gap-4">
          <label className="text-lg font-semibold text-[#593100] text-center">
            Nome do seu curso:
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ex: Inteligência Artificial, Culinária Italiana, Fotografia..."
            className="w-full px-4 py-3 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#593100] placeholder-opacity-30"
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleContinue}
              disabled={!canProceedToNext()}
              className="px-8 py-3 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
      

      {/* Cards de cursos sugeridos */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-[#593100] text-center mb-8">
          💡 Ou escolha uma de nossas sugestões:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            { name: "Inteligência Artificial", icon: "🤖", description: "Domine os conceitos de IA" },
            { name: "Culinária Italiana", icon: "🍝", description: "Aprenda receitas autênticas" },
            { name: "Fotografia Digital", icon: "📸", description: "Capture momentos únicos" },
            { name: "Programação Python", icon: "🐍", description: "Linguagem versátil e poderosa" },
          ].map((course, index) => (
            <div
              key={index}
              className="bg-[#ffddc2] rounded-2xl p-6 shadow-lg border-4 border-[#cc6200] hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                setInputValue(course.name);
                dispatch({ type: 'SET_COURSE_NAME', payload: course.name });
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-[#fff7f0] rounded-lg flex items-center justify-center mb-2">
                    <span className="text-3xl">{course.icon}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#593100] mb-2">
                  {course.name}
                </h3>
                <p className="text-sm text-[#593100] opacity-80">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
