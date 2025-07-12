import { Course, CourseStats, CourseActivity, DashboardData } from "./types";

// Dados mock para cursos
const mockCourses: Course[] = [
  {
    id: "1",
    name: "JavaScript Fundamentals",
    description: "Aprenda os fundamentos do JavaScript do zero ao avançado",
    status: "em_andamento",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    category: "Programação",
    difficulty: "iniciante",
    estimatedHours: 40,
    tags: ["javascript", "web", "frontend"],
  },
  {
    id: "2",
    name: "React Avançado",
    description: "Domine React com hooks, context e patterns avançados",
    status: "em_andamento",
    progress: 30,
    totalLessons: 25,
    completedLessons: 7,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    category: "Programação",
    difficulty: "avancado",
    estimatedHours: 60,
    tags: ["react", "frontend", "javascript"],
  },
  {
    id: "3",
    name: "Design Thinking",
    description: "Metodologia para resolver problemas de forma criativa",
    status: "concluido",
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-15"),
    category: "Design",
    difficulty: "intermediario",
    estimatedHours: 30,
    tags: ["design", "metodologia", "criatividade"],
  },
  {
    id: "4",
    name: "Node.js Backend",
    description: "Construa APIs robustas com Node.js e Express",
    status: "pausado",
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12"),
    category: "Programação",
    difficulty: "intermediario",
    estimatedHours: 50,
    tags: ["nodejs", "backend", "api"],
  },
  {
    id: "5",
    name: "UX/UI Design",
    description: "Princípios de design para criar interfaces incríveis",
    status: "concluido",
    progress: 100,
    totalLessons: 22,
    completedLessons: 22,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-12-10"),
    category: "Design",
    difficulty: "intermediario",
    estimatedHours: 45,
    tags: ["ux", "ui", "design", "figma"],
  },
];

const mockActivities: CourseActivity[] = [
  {
    id: "act_1",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    type: "lesson_completed",
    timestamp: new Date("2024-01-20T10:30:00"),
    description: "Completou: Arrays e Métodos",
  },
  {
    id: "act_2",
    courseId: "2",
    courseName: "React Avançado",
    type: "lesson_completed",
    timestamp: new Date("2024-01-18T14:15:00"),
    description: "Completou: Custom Hooks",
  },
  {
    id: "act_3",
    courseId: "3",
    courseName: "Design Thinking",
    type: "course_completed",
    timestamp: new Date("2023-12-15T16:45:00"),
    description: "Curso concluído com sucesso!",
  },
  {
    id: "act_4",
    courseId: "4",
    courseName: "Node.js Backend",
    type: "course_paused",
    timestamp: new Date("2024-01-12T09:20:00"),
    description: "Curso pausado temporariamente",
  },
  {
    id: "act_5",
    courseId: "5",
    courseName: "UX/UI Design",
    type: "course_completed",
    timestamp: new Date("2023-12-10T11:30:00"),
    description: "Curso concluído com certificado!",
  },
];

// Utilitários para localStorage
const STORAGE_KEYS = {
  COURSES: "falky_courses",
  ACTIVITIES: "falky_activities",
  HAS_COURSES: "falky_has_courses",
};

export class MockCourseDB {
  // Verificar se o usuário tem cursos
  static hasAnyCourses(): boolean {
    if (typeof window === "undefined") return false;

    const hasCoursesFlag = localStorage.getItem(STORAGE_KEYS.HAS_COURSES);
    if (hasCoursesFlag !== null) {
      return JSON.parse(hasCoursesFlag);
    }

    const courses = this.getCourses();
    return courses.length > 0;
  }

  // Definir se o usuário tem cursos (para testing)
  static setHasCourses(hasCourses: boolean): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(hasCourses));

    if (hasCourses && this.getCourses().length === 0) {
      // Se marcou como tendo cursos mas não tem dados, inicializar com mock
      this.initializeMockData();
    }
  }

  // Inicializar dados mock
  static initializeMockData(): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(mockCourses));
    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(mockActivities)
    );
    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(true));
  }

  // Limpar todos os dados
  static clearAllData(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.HAS_COURSES);
  }

  // CRUD de cursos
  static getCourses(): Course[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!stored) return [];

    try {
      const courses = JSON.parse(stored) as Course[];
      return courses.map((course) => ({
        ...course,
        createdAt: new Date(course.createdAt),
        updatedAt: new Date(course.updatedAt),
      }));
    } catch {
      return [];
    }
  }

  static addCourse(
    course: Omit<Course, "id" | "createdAt" | "updatedAt">
  ): Course {
    if (typeof window === "undefined") throw new Error("Not in browser");

    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const courses = this.getCourses();
    courses.push(newCourse);

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(true));

    // Adicionar atividade
    this.addActivity({
      courseId: newCourse.id,
      courseName: newCourse.name,
      type: "course_started",
      description: "Novo curso iniciado",
    });

    return newCourse;
  }

  static updateCourse(id: string, updates: Partial<Course>): Course | null {
    if (typeof window === "undefined") return null;

    const courses = this.getCourses();
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) return null;

    const updatedCourse = {
      ...courses[index],
      ...updates,
      updatedAt: new Date(),
    };

    courses[index] = updatedCourse;
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));

    return updatedCourse;
  }

  static deleteCourse(id: string): boolean {
    if (typeof window === "undefined") return false;

    const courses = this.getCourses();
    const filteredCourses = courses.filter((c) => c.id !== id);

    if (filteredCourses.length === courses.length) return false;

    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(filteredCourses));

    // Atualizar flag se não há mais cursos
    if (filteredCourses.length === 0) {
      localStorage.setItem(STORAGE_KEYS.HAS_COURSES, JSON.stringify(false));
    }

    return true;
  }

  static getCourseById(id: string): Course | undefined {
    return this.getCourses().find((c) => c.id === id);
  }

  static getCoursesByStatus(status: Course["status"]): Course[] {
    return this.getCourses().filter((c) => c.status === status);
  }

  // Atividades
  static getActivities(): CourseActivity[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!stored) return [];

    try {
      const activities = JSON.parse(stored) as CourseActivity[];
      return activities.map((activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }));
    } catch {
      return [];
    }
  }

  static addActivity(
    activity: Omit<CourseActivity, "id" | "timestamp">
  ): CourseActivity {
    if (typeof window === "undefined") throw new Error("Not in browser");

    const newActivity: CourseActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const activities = this.getActivities();
    activities.unshift(newActivity); // Adicionar no início

    // Manter apenas as últimas 50 atividades
    const limitedActivities = activities.slice(0, 50);

    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(limitedActivities)
    );

    return newActivity;
  }

  // Estatísticas
  static getStats(): CourseStats {
    const courses = this.getCourses();

    const stats: CourseStats = {
      totalCourses: courses.length,
      inProgress: courses.filter((c) => c.status === "em_andamento").length,
      completed: courses.filter((c) => c.status === "concluido").length,
      paused: courses.filter((c) => c.status === "pausado").length,
      totalHoursStudied: courses.reduce((total, course) => {
        return total + (course.estimatedHours * course.progress) / 100;
      }, 0),
      averageProgress:
        courses.length > 0
          ? courses.reduce((total, course) => total + course.progress, 0) /
            courses.length
          : 0,
    };

    return stats;
  }

  // Dados completos do dashboard
  static getDashboardData(): DashboardData {
    return {
      courses: this.getCourses(),
      stats: this.getStats(),
      recentActivity: this.getActivities().slice(0, 10),
    };
  }
}

// Função para facilitar o uso
export const mockCourseDB = MockCourseDB;
