"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupStepOne() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    birthDate: "",
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpar erro quando o usuário começar a digitar
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      profession: "",
      birthDate: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.profession.trim()) {
      newErrors.profession = "Área/Profissão é obrigatória";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Salvar dados no localStorage para usar nas próximas etapas
      localStorage.setItem(
        "signupData",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("signupData") || "{}"),
          ...formData,
        })
      );
      router.push("/signup-step-two");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <Link
        href="/"
        className="absolute top-24 left-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Vamos nos conhecer melhor!
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            Conte um pouco sobre você para personalizarmos sua experiência
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Como você gostaria de ser chamado?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Digite seu nome"
                className={`w-full px-4 py-3 rounded-lg border-2 text-[#593100] placeholder-[#593100]/50 focus:outline-none focus:ring-2 focus:ring-[#cc6200] transition ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-[#ffddc2] bg-[#fff7f0] focus:border-[#cc6200]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Área/Profissão */}
            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Qual é sua área ou profissão?
              </label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) =>
                  handleInputChange("profession", e.target.value)
                }
                placeholder="Ex: Desenvolvedor, Estudante, Marketing, etc."
                className={`w-full px-4 py-3 rounded-lg border-2 text-[#593100] placeholder-[#593100]/50 focus:outline-none focus:ring-2 focus:ring-[#cc6200] transition ${
                  errors.profession
                    ? "border-red-500 bg-red-50"
                    : "border-[#ffddc2] bg-[#fff7f0] focus:border-[#cc6200]"
                }`}
              />
              {errors.profession && (
                <p className="text-red-500 text-sm mt-1">{errors.profession}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Data de nascimento
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 text-[#593100] focus:outline-none focus:ring-2 focus:ring-[#cc6200] transition ${
                  errors.birthDate
                    ? "border-red-500 bg-red-50"
                    : "border-[#ffddc2] bg-[#fff7f0] focus:border-[#cc6200]"
                }`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
            >
              Continuar
            </button>
          </div>
        </div>

        {/* Indicador de progresso */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#cc6200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffddc2] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffddc2] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
