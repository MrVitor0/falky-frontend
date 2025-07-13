"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateCourseFinishing() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/course-created-success");
    }, 10000); // 10 segundos
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="max-w-xl w-full text-center animate-fadeIn">
        <div className="mb-8">
          <div className="w-28 h-28 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-5xl">⏳</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
          Estamos criando seu curso personalizado...
        </h1>
        <p className="text-lg text-[#593100] opacity-80 mb-6">
          Isso pode levar alguns instantes. Estamos preparando tudo com carinho
          para você!
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="w-64 h-3 bg-[#ffddc2] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#cc6200] to-[#ff8c00] animate-loading-bar"
              style={{ width: "100%" }}
            ></div>
          </div>
          <span className="text-[#cc6200] text-sm mt-2 animate-pulse">
            Aguarde, seu curso está quase pronto...
          </span>
        </div>
      </div>
      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 10s linear forwards;
        }
      `}</style>
    </div>
  );
}
