"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepTwo() {
  const router = useRouter();
  const { state, dispatch } = useCourseCreation();
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    // Simulação de fetch do backend
    const fetchQuestion = async () => {
      setLoading(true);
      // Aqui você faria o fetch real, ex:
      // const res = await fetch(`/api/motivation-question?subject=${state.courseName}`);
      // const data = await res.json();
      // setQuestion(data.question);
      // Simulação:
      setTimeout(() => {
        setQuestion(
          `Qual a sua motivação para aprender sobre ${
            state.courseName || "este assunto"
          }?`
        );
        setLoading(false);
      }, 500);
    };
    fetchQuestion();
  }, [state.courseName]);

  const handleContinue = () => {
    dispatch({ type: "SET_STEP_TWO_ANSWER", payload: motivation });
    dispatch({ type: "NEXT_STEP" });
    router.push("/create-course-step-three");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl bg-[#ffddc2] rounded-3xl p-12 shadow-2xl flex flex-col items-center border border-[#ffb877]">
        {loading ? (
          <div className="text-[#593100] text-xl">Carregando pergunta...</div>
        ) : (
          <>
            <label className="text-2xl font-bold text-[#593100] mb-8 text-center">
              {question}
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Conte para a IA o que te motiva, seus objetivos, ou o que espera alcançar..."
              className="w-full max-w-xl px-6 py-5 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm resize-none min-h-[120px]"
            />
            <button
              onClick={handleContinue}
              disabled={motivation.trim().length < 5}
              className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
