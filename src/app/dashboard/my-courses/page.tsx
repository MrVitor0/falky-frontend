"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  onStatusChange: (courseId: string, newStatus: Course["status"]) => void;
  onDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onStatusChange,
  onDelete,
}) => {
  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "nao_iniciado":
        return "bg-gray-100 text-gray-800";
      case "em_andamento":
        return "bg-blue-100 text-blue-800";
      case "concluido":
        return "bg-green-100 text-green-800";
      case "pausado":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Course["status"]) => {
    switch (status) {
      case "nao_iniciado":
        return "Não Iniciado";
      case "em_andamento":
        return "Em Andamento";
      case "concluido":
        return "Concluído";
      case "pausado":
        return "Pausado";
      default:
        return "Desconhecido";
    }
  };

  const getDifficultyColor = (difficulty: Course["difficulty"]) => {
    switch (difficulty) {
      case "iniciante":
        return "text-green-600";
      case "intermediario":
        return "text-yellow-600";
      case "avancado":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#593100] mb-2">
            {course.name}
          </h3>
          <p className="text-sm text-[#593100] opacity-70 mb-3">
            {course.description}
          </p>

          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                course.status
              )}`}
            >
              {getStatusText(course.status)}
            </span>
            <span
              className={`text-xs font-medium ${getDifficultyColor(
                course.difficulty
              )}`}
            >
              {course.difficulty}
            </span>
            <span className="text-xs text-[#593100] opacity-60">
              {course.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#593100] opacity-60">
            <span>{course.totalLessons} aulas</span>
            <span>{course.estimatedHours}h estimadas</span>
            <span>Criado em {course.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <select
            value={course.status}
            onChange={(e) =>
              onStatusChange(course.id, e.target.value as Course["status"])
            }
            className="text-xs px-2 py-1 rounded border border-[#ffddc2] bg-white text-[#593100] focus:outline-none focus:ring-2 focus:ring-[#cc6200]"
          >
            <option value="nao_iniciado">Não Iniciado</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="pausado">Pausado</option>
            <option value="concluido">Concluído</option>
          </select>

          <button
            onClick={() => onDelete(course.id)}
            className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>

      {course.progress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#593100] opacity-70">Progresso</span>
            <span className="text-xs font-medium text-[#593100]">
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-[#ffddc2] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#593100] opacity-60 mt-1">
            <span>{course.completedLessons} aulas concluídas</span>
            <span>
              {course.totalLessons - course.completedLessons} restantes
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1">
        {course.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-[#fff7f0] text-[#593100] text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Course["status"] | "all">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "name" | "created" | "updated" | "progress"
  >("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Carregar cursos do JSON
  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        // Converter datas para objetos Date
        const parsed = data.map((c: Course) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        }));
        setCourses(parsed);
      });
  }, []);

  // Verificar se há filtros na URL (corrigido para fallback seguro)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    if (
      filterParam &&
      ["nao_iniciado", "em_andamento", "concluido", "pausado"].includes(
        filterParam
      )
    ) {
      setStatusFilter(filterParam as Course["status"]);
    } else {
      setStatusFilter("all"); // fallback seguro
    }
  }, []);

  // Filtros e busca
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Ordenação
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let aValue: string | number, bValue: string | number;

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "created":
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case "updated":
        aValue = a.updatedAt.getTime();
        bValue = b.updatedAt.getTime();
        break;
      case "progress":
        aValue = a.progress;
        bValue = b.progress;
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Categorias únicas
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  const handleStatusChange = (
    courseId: string,
    newStatus: Course["status"]
  ) => {
    const updates: Partial<Course> = { status: newStatus };

    // Se estiver iniciando um curso, definir progresso como 0 se ainda não foi definido
    if (newStatus === "em_andamento") {
      const course = courses.find((c) => c.id === courseId);
      if (course && course.progress === 0) {
        updates.progress = 0;
        updates.completedLessons = 0;
      }
    }

    // updateCourse(courseId, updates); // This line was removed as per the edit hint
  };

  const handleDelete = (courseId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      console.log("Excluindo curso:", courseId);
      // deleteCourse(courseId); // This line was removed as per the edit hint
    }
  };

  return (
    <DashboardLayout
      title="Meus Cursos"
      subtitle="Gerencie todos os seus cursos"
    >
      <div className="space-y-6">
        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Busca */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#593100] mb-2">
                Buscar cursos
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, descrição ou tags..."
                className="w-full px-3 py-2 border border-[#ffddc2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
              />
            </div>

            {/* Filtro por Status */}
            <div>
              <label className="block text-sm font-medium text-[#593100] mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as Course["status"] | "all")
                }
                className="w-full px-3 py-2 border border-[#ffddc2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
              >
                <option value="all">Todos os status</option>
                <option value="nao_iniciado">Não Iniciado</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="pausado">Pausado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Filtro por Categoria */}
            <div>
              <label className="block text-sm font-medium text-[#593100] mb-2">
                Categoria
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-[#ffddc2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-medium text-[#593100] mb-2">
                Ordenar por
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="flex-1 px-3 py-2 border border-[#ffddc2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
                >
                  <option value="created">Data de criação</option>
                  <option value="updated">Última atualização</option>
                  <option value="name">Nome</option>
                  <option value="progress">Progresso</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="px-3 py-2 border border-[#ffddc2] rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-4 text-center">
            <div className="text-2xl font-bold text-[#593100]">
              {courses.length}
            </div>
            <div className="text-sm text-[#593100] opacity-70">
              Total de Cursos
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {courses.filter((c) => c.status === "em_andamento").length}
            </div>
            <div className="text-sm text-[#593100] opacity-70">
              Em Andamento
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter((c) => c.status === "concluido").length}
            </div>
            <div className="text-sm text-[#593100] opacity-70">Concluídos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#ffddc2] p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {courses.filter((c) => c.status === "nao_iniciado").length}
            </div>
            <div className="text-sm text-[#593100] opacity-70">
              Não Iniciados
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#593100]">
            {sortedCourses.length} curso{sortedCourses.length !== 1 ? "s" : ""}{" "}
            encontrado{sortedCourses.length !== 1 ? "s" : ""}
          </h2>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-[#cc6200] hover:text-[#ff8c00] transition-colors"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Lista de Cursos */}
        {sortedCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-[#593100] mb-2">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Nenhum curso encontrado"
                : "Você ainda não tem cursos"}
            </h3>
            <p className="text-[#593100] opacity-70 mb-4">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Crie seu primeiro curso para começar"}
            </p>
            {!searchTerm &&
              statusFilter === "all" &&
              categoryFilter === "all" && (
                <button
                  onClick={() =>
                    (window.location.href = "/create-course-step-one")
                  }
                  className="px-6 py-3 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white rounded-lg hover:from-[#b35500] hover:to-[#e67a00] transition-all duration-200 font-medium"
                >
                  Criar Primeiro Curso
                </button>
              )}
          </div>
        ) : (
          <div className="grid gap-6">
            {sortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
