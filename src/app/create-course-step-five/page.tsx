"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCourseStepFive() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simular redirecionamento após completar
          setTimeout(() => {
            // router.push("/course-ready"); // Página final
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Atualiza a cada 50ms

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 10) {
          clearInterval(stepInterval);
          return 10;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(stepInterval);
  }, []);

  const circumference = 2 * Math.PI * 45; // raio de 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <Link
        href="/create-course-step-four"
        className="absolute top-24 left-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-8">
          Criando um curso que realmente te entende.
        </h1>

        <div className="bg-[#ffddc2] rounded-lg p-6 mb-12 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-[#593100] leading-relaxed">
            Esta etapa é <strong>100% opcional</strong> e suas respostas são
            confidenciais. Ao compartilhar como seu cérebro funciona, você
            permite que nossa IA ative &ldquo;ajustes especiais&rdquo; no seu
            curso, tornando-o muito mais eficaz e agradável para você.
          </p>
        </div>

        <p className="text-2xl md:text-3xl font-semibold text-[#593100] mb-12">
          Estamos Adaptando o Curso pra você...
        </p>

        {/* Progress Circular */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Círculo de fundo */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ffddc2"
                strokeWidth="8"
                fill="none"
              />
              {/* Círculo de progresso */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#cc6200"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-100 ease-out"
              />
            </svg>
            {/* Texto no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#593100]">
                {currentStep}/10
              </span>
            </div>
          </div>

          {/* Porcentagem */}
          <p className="text-lg font-medium text-[#593100]">
            {Math.round(progress)}% concluído
          </p>
        </div>

        {/* Mensagens de progresso */}
        <div className="text-center">
          <p className="text-lg text-[#593100] opacity-80">
            {progress < 30 && "Analisando suas preferências..."}
            {progress >= 30 && progress < 60 && "Personalizando conteúdo..."}
            {progress >= 60 && progress < 90 && "Ajustando metodologia..."}
            {progress >= 90 && "Finalizando seu curso personalizado..."}
          </p>
        </div>
      </div>
    </div>
  );
}
