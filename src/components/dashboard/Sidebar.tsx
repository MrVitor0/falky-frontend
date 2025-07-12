"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
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

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
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
      className={`h-screen bg-white shadow-lg border-r border-[#ffddc2] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#ffddc2]">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦜</span>
                <h1 className="text-xl font-bold text-[#593100]">Falky</h1>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors"
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-[#ffddc2]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#cc6200] to-[#ff8c00] flex items-center justify-center text-white font-bold">
              {user?.user_metadata?.name?.[0] || user?.email?.[0] || "U"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#593100] truncate">
                  {user?.user_metadata?.name || user?.email}
                </p>
                <p className="text-xs text-[#593100] opacity-60">Estudante</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          {/* Cursos */}
          <div>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-[#593100] opacity-60 uppercase tracking-wider mb-3">
                Cursos
              </h3>
            )}
            <ul className="space-y-1">
              {coursesItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white"
                        : "text-[#593100] hover:bg-[#ffddc2]"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-[#593100] opacity-60 uppercase tracking-wider mb-3">
                Recursos
              </h3>
            )}
            <ul className="space-y-1">
              {resourcesItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white"
                        : "text-[#593100] hover:bg-[#ffddc2]"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
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
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#593100] hover:bg-[#ffddc2] transition-colors"
          >
            <span className="text-lg flex-shrink-0">🚪</span>
            {!collapsed && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
