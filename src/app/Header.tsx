import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-[#fff7f0]">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo Falky"
          width={100}
          height={100}
          priority
        />
      </div>
      <nav className="flex gap-8">
        <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
          Sobre
        </button>
        <Link 
          href="/api-test"
          className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative flex items-center justify-center"
        >
          🧪 Teste API
        </Link>
        <button className="px-8 py-3 w-48 rounded-full shadow-md font-semibold text-[#593100] bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] hover:brightness-110 hover:saturate-150 transition border-none relative">
          Entrar
        </button>
      </nav>
    </header>
  );
}
