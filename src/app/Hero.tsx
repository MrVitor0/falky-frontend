import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between py-12 px-6 gap-8">
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#cc6200] mb-4 leading-tight">
          Educação para todos, personalizada por IA
        </h1>
        <p className="text-lg md:text-xl text-[#593100] mb-6">
          Nossa plataforma usa inteligência artificial para criar cursos sob
          medida para cada pessoa, respeitando ritmos, interesses e necessidades
          — inclusive neurodivergências.
          <br />
          Acreditamos que a educação transforma vidas, famílias e o mundo.
          <br />
          Junte-se a nós na missão de universalizar o acesso ao conhecimento de
          qualidade.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/hero.svg"
          alt="Diversidade na educação"
          width={400}
          height={350}
          priority
        />
      </div>
    </section>
  );
}
