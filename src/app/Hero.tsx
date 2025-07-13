"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const handleCreateCourse = () => {
    router.push("/create-course-step-one");
  };

  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center py-12 px-6 gap-8 md:gap-24">
      <div className="flex-1 flex flex-col items-center md:items-end justify-center w-full max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4 leading-tight text-center md:text-right">
          Seu <span className="text-[#cc6200]">Professor</span> perfeito
          <br />
          não existia... <span className="text-[#cc6200]">Até agora!</span>
        </h1>
        <p className="text-lg md:text-xl text-[#593100] mb-6 text-center md:text-right">
          Use nossa IA para criar seu próprio mentor, treinado com todo o
          conhecimento do seu{" "}
          <span className="text-[#cc6200]">especialista favorito.</span>
        </p>
        <button
          onClick={handleCreateCourse}
          className="px-8 py-3 w-72 rounded-full shadow-md font-semibold text-[#fff] bg-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative"
        >
          Quero criar meu professor
        </button>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/teachers.png"
          alt="Diversidade na educação"
          width={400}
          height={400}
          priority
        />
      </div>
    </section>
  );
}
