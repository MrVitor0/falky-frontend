"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepOne() {
  const router = useRouter();
  const { state, dispatch, canProceedToNext } = useCourseCreation();
  const [inputValue, setInputValue] = useState(state.courseName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch({ type: "SET_COURSE_NAME", payload: value });
  };

  const handleContinue = () => {
    if (canProceedToNext()) {
      dispatch({ type: "NEXT_STEP" });
      router.push("/create-course-step-two");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl bg-[#ffddc2] rounded-3xl p-12 shadow-2xl flex flex-col items-center border border-[#ffb877]">
        <label className="text-3xl font-bold text-[#593100] mb-8 text-center">
          O que você quer aprender hoje?
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ex: Inteligência Artificial, Culinária, Fotografia..."
          className="w-full max-w-xl px-6 py-5 text-2xl text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm"
        />
        <button
          onClick={handleContinue}
          disabled={!canProceedToNext()}
          className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
