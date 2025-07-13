"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  // const { user, signOut } = useAuth();

  // const handleSignOut = async () => {
  //   await signOut();
  // };

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-[#fff7f0]">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo Falky"
          width={100}
          height={100}
          priority
        />
      </Link>

      {/* Navegação central */}
      {/* <nav className="flex gap-8">
        <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
          Sobre
        </button>
        <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
          Como Funciona
        </button>
      </nav> */}

      {/* Área do usuário */}
      {/* <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-[#593100] font-medium">
              Olá, {user.user_metadata?.name || user.email}!
            </span>
            <button
              onClick={handleSignOut}
              className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative"
            >
              Sair
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
              Entrar
            </button>
          </Link>
        )}
      </div> */}
    </header>
  );
}
