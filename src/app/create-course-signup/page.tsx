"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateCourseSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    birthDate: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp, updatePreferences, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Verificar se o usuário já está logado
  useEffect(() => {
    if (!authLoading && user) {
      // Se já está logado, continuar direto para o loading
      router.push("/create-course-loading");
    }
  }, [user, authLoading, router]);

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
      email: "",
      password: "",
      profession: "",
      birthDate: "",
      general: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      // Criar conta
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.name
      );

      if (signUpError) {
        setErrors((prev) => ({
          ...prev,
          general: signUpError.message || "Erro ao criar conta",
        }));
        return;
      }

      // Salvar preferências básicas
      const { error: prefsError } = await updatePreferences({
        name: formData.name,
        profession: formData.profession,
        birth_date: formData.birthDate,
        teacher_personality: "conversador", // Padrão temporário
        neurodivergence: "none", // Padrão temporário
      });

      if (prefsError) {
        console.warn("Erro ao salvar preferências:", prefsError.message);
      }

      // Continuar o fluxo de criação de curso
      router.push("/create-course-loading");
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Erro inesperado. Tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200] mx-auto mb-4"></div>
          <p className="text-[#593100]">Verificando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
            Quase lá! Vamos criar sua conta
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            Precisamos de algumas informações para personalizar seu curso
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Digite seu email"
                className={`w-full px-4 py-3 rounded-lg border-2 text-[#593100] placeholder-[#593100]/50 focus:outline-none focus:ring-2 focus:ring-[#cc6200] transition ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-[#ffddc2] bg-[#fff7f0] focus:border-[#cc6200]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Digite sua senha (mínimo 6 caracteres)"
                className={`w-full px-4 py-3 rounded-lg border-2 text-[#593100] placeholder-[#593100]/50 focus:outline-none focus:ring-2 focus:ring-[#cc6200] transition ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-[#ffddc2] bg-[#fff7f0] focus:border-[#cc6200]"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Profissão */}
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

            {errors.general && (
              <div className="p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                {errors.general}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-[#ffddc2] text-[#593100] py-3 rounded-lg font-semibold hover:bg-[#ffb877] transition duration-200"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Criando conta..." : "Criar conta e continuar"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#593100] opacity-70 text-sm">
              Já tem uma conta?{" "}
              <button
                onClick={() => router.push("/create-course-login")}
                className="text-[#cc6200] hover:text-[#ff8c00] font-medium transition"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
