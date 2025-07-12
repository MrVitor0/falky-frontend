"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Course,
  CourseStats,
  CourseActivity,
  CourseContextType,
} from "@/lib/types";
import { mockCourseDB } from "@/lib/mock-courses";

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<CourseStats>({
    totalCourses: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    paused: 0,
    totalHoursStudied: 0,
    averageProgress: 0,
  });
  const [recentActivity, setRecentActivity] = useState<CourseActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    // Garantir que está no cliente
    if (typeof window !== "undefined") {
      console.log("Iniciando useEffect do CourseContext");
      loadData();
    } else {
      console.log("Window não está definido, pulando carregamento");
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log("Iniciando carregamento dos dados...");

      // Timeout de segurança para evitar loading infinito
      const timeoutId = setTimeout(() => {
        console.warn("Timeout atingido, forçando fim do loading");
        setLoading(false);
      }, 3000);

      // Verificar se há dados, se não houver, inicializar com mock
      if (!mockCourseDB.hasAnyCourses()) {
        console.log("Nenhum curso encontrado, inicializando dados mock...");
        mockCourseDB.initializeMockData();
      }

      const dashboardData = mockCourseDB.getDashboardData();
      console.log("Dados carregados:", dashboardData);

      // Verificar se os dados são válidos
      if (dashboardData && dashboardData.courses && dashboardData.stats) {
        setCourses(dashboardData.courses);
        setStats(dashboardData.stats);
        setRecentActivity(dashboardData.recentActivity || []);
        console.log("Estado atualizado com sucesso");
      } else {
        console.error("Dados inválidos recebidos:", dashboardData);
        // Definir dados padrão em caso de erro
        setCourses([]);
        setStats({
          totalCourses: 0,
          notStarted: 0,
          inProgress: 0,
          completed: 0,
          paused: 0,
          totalHoursStudied: 0,
          averageProgress: 0,
        });
        setRecentActivity([]);
      }

      clearTimeout(timeoutId);
    } catch (error) {
      console.error("Erro ao carregar dados dos cursos:", error);
      // Definir dados padrão em caso de erro
      setCourses([]);
      setStats({
        totalCourses: 0,
        notStarted: 0,
        inProgress: 0,
        completed: 0,
        paused: 0,
        totalHoursStudied: 0,
        averageProgress: 0,
      });
      setRecentActivity([]);
    } finally {
      setLoading(false);
      console.log("Loading finalizado");
    }
  };

  const addCourse = (
    courseData: Omit<Course, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newCourse = mockCourseDB.addCourse(courseData);
      setCourses((prev) => [...prev, newCourse]);
      refreshStats();
      refreshActivity();
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    try {
      const updatedCourse = mockCourseDB.updateCourse(id, updates);
      if (updatedCourse) {
        setCourses((prev) =>
          prev.map((course) => (course.id === id ? updatedCourse : course))
        );
        refreshStats();

        // Adicionar atividade se mudou o status
        if (updates.status) {
          const activityType =
            updates.status === "concluido"
              ? "course_completed"
              : "course_paused";
          mockCourseDB.addActivity({
            courseId: id,
            courseName: updatedCourse.name,
            type: activityType,
            description: `Curso ${
              updates.status === "concluido" ? "concluído" : "pausado"
            }`,
          });
          refreshActivity();
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
    }
  };

  const deleteCourse = (id: string) => {
    try {
      const success = mockCourseDB.deleteCourse(id);
      if (success) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
        refreshStats();
        refreshActivity();
      }
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
    }
  };

  const getCourseById = (id: string): Course | undefined => {
    return courses.find((course) => course.id === id);
  };

  const getCoursesByStatus = (status: Course["status"]): Course[] => {
    return courses.filter((course) => course.status === status);
  };

  const refreshData = () => {
    loadData();
  };

  const refreshStats = () => {
    const newStats = mockCourseDB.getStats();
    setStats(newStats);
  };

  const refreshActivity = () => {
    const activities = mockCourseDB.getActivities().slice(0, 10);
    setRecentActivity(activities);
  };

  const value: CourseContextType = {
    courses,
    stats,
    recentActivity,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCoursesByStatus,
    refreshData,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
