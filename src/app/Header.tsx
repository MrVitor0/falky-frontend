import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-[--color-background] border-b border-[--color-beige]">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo Falky"
          width={80}
          height={80}
          priority
        />
      </div>
      <nav className="flex gap-4">
        <button className="px-4 py-2 rounded bg-[--color-primary] text-[--color-offwhite] font-medium hover:bg-[--color-brown] transition">
          Sobre
        </button>
        <button className="px-4 py-2 rounded bg-[--color-primary] text-[--color-offwhite] font-medium hover:bg-[--color-brown] transition">
          Como Funciona
        </button>
        <button className="px-4 py-2 rounded bg-[--color-primary] text-[--color-offwhite] font-medium hover:bg-[--color-brown] transition">
          Entrar
        </button>
      </nav>
    </header>
  );
}
