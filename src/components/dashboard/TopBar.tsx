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
      </div>
    </header>
  );
}
