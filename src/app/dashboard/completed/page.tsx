"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Course } from "@/lib/types";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
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
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Concluído
          </span>
          <span className="text-xs font-medium text-[#593100]">
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
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-[#593100] opacity-70">Progresso</span>
        <span className="text-xs font-medium text-[#593100]">
          {course.progress}%
        </span>
        <div className="w-24 bg-[#ffddc2] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
    </div>
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

export default function CompletedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.map((c: Course) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        }));
        setCourses(parsed.filter((c: Course) => c.status === "concluido"));
      });
  }, []);

  return (
    <DashboardLayout title="Concluídos" subtitle="Cursos que você já finalizou">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-[#593100]">
          {courses.length} curso{courses.length !== 1 ? "s" : ""} concluído
          {courses.length !== 1 ? "s" : ""}
        </h2>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-medium text-[#593100] mb-2">
              Nenhum curso concluído
            </h3>
            <p className="text-[#593100] opacity-70 mb-4">
              Conclua um curso para vê-lo aqui.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
