"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Verificar se o usuário já está logado
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
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
      email: "",
      password: "",
      name: "",
      general: "",
    };

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

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
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
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            general: error.message || "Erro ao fazer login",
          }));
        } else {
          router.push("/");
        }
      } else {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name
        );
        if (error) {
          setErrors((prev) => ({
            ...prev,
            general: error.message || "Erro ao criar conta",
          }));
        } else {
          // Conta criada com sucesso, redirecionar para home
          router.push("/");
        }
      }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <Link
        href="/"
        className="absolute top-24 left-8 flex items-center gap-2 text-[#593100] hover:text-[#cc6200] transition font-medium"
      >
        ← Voltar
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#593100] mb-4">
            {isLogin ? "Entre na sua conta" : "Crie sua conta"}
          </h1>
          <p className="text-lg text-[#593100] opacity-80">
            {isLogin
              ? "Acesse sua jornada de aprendizado personalizada"
              : "Comece sua jornada de aprendizado personalizada"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-lg font-medium text-[#593100] mb-3">
                  Nome
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
            )}

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

            <div>
              <label className="block text-lg font-medium text-[#593100] mb-3">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Digite sua senha"
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

            {errors.general && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  errors.general.includes("criada")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading
                ? isLogin
                  ? "Entrando..."
                  : "Criando conta..."
                : isLogin
                ? "Entrar"
                : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#cc6200] hover:text-[#ff8c00] font-medium transition"
            >
              {isLogin
                ? "Não tem conta? Criar conta"
                : "Já tem conta? Fazer login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
