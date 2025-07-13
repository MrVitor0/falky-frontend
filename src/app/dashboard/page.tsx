"use client";
import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard";
import { useCourses } from "@/contexts/CourseContext";

export default function DashboardPage() {
  const { courses, recentActivity, loading } = useCourses();

  // Debug: Função para limpar dados e recarregar
  const handleDebugClear = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Debug: Função para inicializar dados mock
  const handleDebugInit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("falky_has_courses", "true");
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard" subtitle="Bem-vindo de volta!">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200] mx-auto mb-4"></div>
            <p className="text-[#593100]">Carregando seus cursos...</p>

            {/* Botões de debug temporários */}
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={handleDebugInit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                🔄 Inicializar Mock Data
              </button>
              <button
                onClick={handleDebugClear}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                🗑️ Limpar Dados
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const inProgressCourses = courses.filter(
    (course) => course.status === "em_andamento"
  );

  const notStartedCourses = courses.filter(
    (course) => course.status === "nao_iniciado"
  );

  return (
    <DashboardLayout title="Dashboard" subtitle="Bem-vindo de volta!">
      <div className="space-y-6">
        {/* Cursos Não Iniciados - Mostrar apenas se houver */}
        {notStartedCourses.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#593100]">
                Cursos Prontos para Começar
              </h2>
              <Link
                href="/dashboard/my-courses?filter=nao_iniciado"
                className="text-[#cc6200] hover:text-[#ff8c00] text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notStartedCourses.slice(0, 3).map((course) => (
                <Link
                  key={course.id}
                  href={`/dashboard/courses/${course.id}`}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#cc6200] hover:bg-[#fff7f0] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#593100] text-sm">
                      {course.name}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      Não iniciado
                    </span>
                  </div>
                  <p className="text-xs text-[#593100] opacity-60 mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#593100] opacity-60">
                    <span>{course.totalLessons} aulas</span>
                    <span>{course.estimatedHours}h</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cursos Não Iniciados */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#593100]">
                Cursos para Começar
              </h2>
              <Link
                href="/dashboard/my-courses"
                className="text-[#cc6200] hover:text-[#ff8c00] text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>

            {notStartedCourses.length > 0 ? (
              <div className="space-y-4">
                {notStartedCourses.slice(0, 3).map((course) => (
                  <Link
                    key={course.id}
                    href={`/dashboard/courses/${course.id}`}
                    className="block p-4 bg-[#fff7f0] rounded-lg hover:bg-[#ffddc2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#593100]">
                        {course.name}
                      </h3>
                      <span className="text-sm text-[#593100] opacity-60 bg-[#ffddc2] px-2 py-1 rounded-full">
                        Novo
                      </span>
                    </div>
                    <p className="text-sm text-[#593100] opacity-60 mb-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#593100] opacity-60">
                      <span>📚 {course.totalLessons} aulas</span>
                      <span>⏱️ {course.estimatedHours}h</span>
                      <span className="capitalize">{course.difficulty}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-6xl opacity-20">🚀</span>
                <p className="text-[#593100] opacity-60 mt-2">
                  Nenhum curso para começar
                </p>
                <Link
                  href="/create-course-step-one"
                  className="text-[#cc6200] hover:text-[#ff8c00] text-sm font-medium mt-2 inline-block"
                >
                  Criar primeiro curso
                </Link>
              </div>
            )}
          </div>

          {/* Cursos em Andamento */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#593100]">
                Cursos em Andamento
              </h2>
              <Link
                href="/dashboard/in-progress"
                className="text-[#cc6200] hover:text-[#ff8c00] text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>

            {inProgressCourses.length > 0 ? (
              <div className="space-y-4">
                {inProgressCourses.slice(0, 3).map((course) => (
                  <Link
                    key={course.id}
                    href={`/dashboard/courses/${course.id}`}
                    className="block p-4 bg-[#fff7f0] rounded-lg hover:bg-[#ffddc2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#593100]">
                        {course.name}
                      </h3>
                      <span className="text-sm text-[#593100] opacity-60">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-[#ffddc2] rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-[#593100] opacity-60">
                      {course.completedLessons} de {course.totalLessons} aulas
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-6xl opacity-20">📚</span>
                <p className="text-[#593100] opacity-60 mt-2">
                  Nenhum curso em andamento
                </p>
                <Link
                  href="/create-course-step-one"
                  className="text-[#cc6200] hover:text-[#ff8c00] text-sm font-medium mt-2 inline-block"
                >
                  Criar primeiro curso
                </Link>
              </div>
            )}
          </div>

          {/* Atividade Recente */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <h2 className="text-xl font-bold text-[#593100] mb-4">
              Atividade Recente
            </h2>

            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">
                        {activity.type === "lesson_completed"
                          ? "✓"
                          : activity.type === "course_completed"
                          ? "🎉"
                          : activity.type === "course_started"
                          ? "🚀"
                          : "⏸️"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#593100] truncate">
                        {activity.courseName}
                      </p>
                      <p className="text-xs text-[#593100] opacity-60">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-[#593100] opacity-40 flex-shrink-0">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-6xl opacity-20">📋</span>
                <p className="text-[#593100] opacity-60 mt-2">
                  Nenhuma atividade recente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
