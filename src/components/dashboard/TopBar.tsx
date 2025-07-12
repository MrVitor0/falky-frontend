"use client";
import React from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  onMobileMenuToggle: () => void;
  onSidebarToggle: () => void;
}

export default function TopBar({
  title,
  subtitle,
  onMobileMenuToggle,
  onSidebarToggle,
}: TopBarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-[#ffddc2] px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Title and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:block p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-[#593100]">{title}</h1>
            {subtitle && (
              <p className="text-sm text-[#593100] opacity-60">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button className="p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-[#ffddc2] text-[#593100] transition-colors relative">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5-5-5h5zm0 0v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2"
              />
            </svg>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#cc6200] rounded-full"></span>
          </button>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-[#593100] bg-[#ffddc2] rounded-lg hover:bg-[#cc6200] hover:text-white transition-colors">
              Novo Curso
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
