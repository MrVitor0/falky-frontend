"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  group: "courses" | "resources";
}

const menuItems: MenuItem[] = [
  // Grupo Cursos
  {
    id: "home",
    label: "Home",
    href: "/dashboard",
    icon: "🏠",
    group: "courses",
  },
  {
    id: "new-course",
    label: "Novo Curso",
    href: "/create-course-step-one",
    icon: "➕",
    group: "courses",
  },
  {
    id: "my-courses",
    label: "Meus Cursos",
    href: "/dashboard/my-courses",
    icon: "📋",
    group: "courses",
  },
  {
    id: "in-progress",
    label: "Em Andamento",
    href: "/dashboard/in-progress",
    icon: "📚",
    group: "courses",
  },
  {
    id: "completed",
    label: "Concluídos",
    href: "/dashboard/completed",
    icon: "✅",
    group: "courses",
  },

  // Grupo Recursos
  {
    id: "library",
    label: "Biblioteca",
    href: "/dashboard/library",
    icon: "📖",
    group: "resources",
  },
  {
    id: "reports",
    label: "Relatórios",
    href: "/dashboard/reports",
    icon: "📊",
    group: "resources",
  },
  {
    id: "settings",
    label: "Configurações",
    href: "/dashboard/settings",
    icon: "⚙️",
    group: "resources",
  },
];

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const coursesItems = menuItems.filter((item) => item.group === "courses");
  const resourcesItems = menuItems.filter((item) => item.group === "resources");

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#ffddc2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦜</span>
              <h1 className="text-xl font-bold text-[#593100]">Falky</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-[#ffddc2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#cc6200] to-[#ff8c00] flex items-center justify-center text-white font-bold">
              {user?.user_metadata?.name?.[0] || user?.email?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#593100] truncate">
                {user?.user_metadata?.name || user?.email}
              </p>
              <p className="text-xs text-[#593100] opacity-60">Estudante</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Cursos */}
          <div>
            <h3 className="text-xs font-semibold text-[#593100] opacity-60 uppercase tracking-wider mb-3">
              Cursos
            </h3>
            <ul className="space-y-1">
              {coursesItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white"
                        : "text-[#593100] hover:bg-[#ffddc2]"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-xs font-semibold text-[#593100] opacity-60 uppercase tracking-wider mb-3">
              Recursos
            </h3>
            <ul className="space-y-1">
              {resourcesItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white"
                        : "text-[#593100] hover:bg-[#ffddc2]"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#ffddc2]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-[#593100] hover:bg-[#ffddc2] transition-colors"
          >
            <span className="text-lg flex-shrink-0">🚪</span>
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
