"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRickAndMortyCharacter } from "@/hooks/useApiController";

export default function CreateCourseStepOne() {
  const [courseInput, setCourseInput] = useState("");
  const { character, loading, error, fetchRandomCharacter } =
    useRickAndMortyCharacter();

  // Effect para mostrar o nome do personagem quando carregado
  useEffect(() => {
    if (character) {
      console.log("Nome do personagem:", character.name);
    }
  }, [character]);

  const handleContinue = async () => {
    if (!courseInput.trim()) {
      alert("Por favor, digite um tópico para o curso");
      return;
    }
  };

  const handleAPITesting = async () => {
    if (!courseInput.trim()) {
      alert("Por favor, digite um tópico para o curso");
      return;
    }

    try {
      await fetchRandomCharacter();

      if (error) {
        alert("Erro ao processar solicitação. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao fazer chamada para a API:", err);
      alert("Erro ao processar solicitação. Tente novamente.");
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
        Imagine um curso sobre qualquer assunto. Agora, basta digitar o tópico
        para torná-lo real em minutos.
      </p>
      <div className="w-full max-w-3xl bg-[#ffddc2] rounded-xl p-8 shadow-md flex flex-col items-center mb-16">
        <div className="w-full flex gap-4 items-center">
          <input
            type="text"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
            placeholder="Ex: Inteligência Artificial, Culinária Italiana, Fotografia..."
            className="flex-1 px-4 py-2 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#593100] placeholder-opacity-30"
          />
          <button
            onClick={handleContinue}
            className="px-6 py-2 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
          <button
            onClick={handleAPITesting}
            disabled={loading}
            className="px-6 py-2 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Carregando..." : "Testar API"}
          </button>
        </div>
      </div>

      {/* Cards de cursos sugeridos */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-[#ffddc2] rounded-2xl p-6 shadow-lg border-4 border-[#cc6200] hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-[#fff7f0] rounded-lg flex items-center justify-center mb-2">
                  📚
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#593100] mb-2">
                Desvende a Inteligência Artificial
              </h3>
              <p className="text-sm text-[#593100] opacity-80">
                Lorem ipsum dolor sit
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
