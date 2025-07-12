"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { handleCourseCreationNavigation } from "@/lib/navigation-utils";
import { mockCourseDB } from "@/lib/mock-courses";

export default function Hero() {
  const { user, preferences, hasPreferences } = useAuth();
  const router = useRouter();

  // Verificar se o usuário tem cursos e redirecionar para dashboard
  useEffect(() => {
    if (user && hasPreferences() && mockCourseDB.hasAnyCourses()) {
      router.push("/dashboard");
    }
  }, [user, hasPreferences, router]);

  // localStorage.setItem("falky_has_courses", "true");
  // window.location.reload();

  const handleCreateCourse = () => {
    handleCourseCreationNavigation(user, preferences, hasPreferences, router);
  };

  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between py-12 px-6 gap-8">
      <div className="ml-16 flex-1 flex flex-col items-start justify-center w-full ">
        <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4 leading-tight">
          Sua mente é única.
          <br />
          Seu aprendizado também
        </h1>
        <p className="text-lg md:text-xl text-[#593100] mb-6">
          Seja pra focar melhor, aprofundar um tema ou
          <br />
          comecar do zero,{" "}
          <span className="text-[#cc6200]">
            o curso se molda a você. Não o contrário:
          </span>
        </p>

        <button
          onClick={handleCreateCourse}
          className="px-8 py-3 w-72 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative"
        >
          Quero criar meu curso
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/hero.svg"
          alt="Diversidade na educação"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
}
