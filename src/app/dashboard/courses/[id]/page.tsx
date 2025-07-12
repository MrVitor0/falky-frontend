"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Submodulo {
  ID_SUBMODULO: string;
  NAME_SUBMODULO: string;
  DESCRICAO_SUBMODULO: string;
  ROADMAP_SUBMODULO: string;
  TEMPO_ESTIMADO: string;
}

interface Modulo {
  ID_MODULO: string;
  NAME_MODULO: string;
  DESCRICAO_MODULO: string;
  SUBMODULOS: Submodulo[];
}

export default function VisualizarModuloPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        // Procurar o módulo pelo ID
        // Supondo que cada curso tem um array 'modulos'
        let found: Modulo | null = null;
        for (const curso of data) {
          if (curso.modulos) {
            const m = curso.modulos.find(
              (m: Modulo) => m.ID_MODULO === params.id
            );
            if (m) {
              found = m;
              break;
            }
          }
        }
        setModulo(found);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <DashboardLayout title="Carregando..." subtitle=" ">
        <div className="p-8 text-center">Carregando módulo...</div>
      </DashboardLayout>
    );
  }
  if (!modulo) {
    return (
      <DashboardLayout title="Módulo não encontrado" subtitle=" ">
        <div className="p-8 text-center">
          Nenhum módulo encontrado para este ID.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={modulo.NAME_MODULO}
      subtitle="Visualização do módulo"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 relative">
        {/* Botão de voltar */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500"
          onClick={() => router.back()}
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Título e descrição do módulo */}
        <h1 className="text-2xl font-bold text-[#593100] mb-2">
          {modulo.NAME_MODULO}
        </h1>
        <p className="text-[#593100] opacity-80 mb-4">
          {modulo.DESCRICAO_MODULO}
        </p>

        {/* Lista de submódulos */}
        <div className="space-y-4">
          {modulo.SUBMODULOS.map((sub) => (
            <div
              key={sub.ID_SUBMODULO}
              className="bg-[#fff7f0] rounded-lg p-4 flex items-center justify-between border border-[#ffddc2]"
            >
              <div>
                <div className="font-semibold text-[#593100]">
                  {sub.NAME_SUBMODULO}
                </div>
                <div className="text-sm text-[#593100] opacity-70">
                  {sub.DESCRICAO_SUBMODULO}
                </div>
              </div>
              <button
                className="ml-4 px-4 py-2 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] text-white rounded-lg font-medium hover:from-[#b35500] hover:to-[#e67a00] transition"
                onClick={() =>
                  alert(`Gerar conteúdo para submódulo ${sub.ID_SUBMODULO}`)
                }
              >
                Gerar
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
