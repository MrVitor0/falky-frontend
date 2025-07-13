"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard";
import { apiController } from "@/controllers/api.controller";
import ReactMarkdown from "react-markdown";

interface MaterialContent {
  material_id: string;
  course_id: string;
  target_type: string;
  target_id: string;
  title: string;
  content: string;
  json_content?: Record<string, unknown>;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export default function MaterialPage({
  params,
}: {
  params: { id: string; materialId: string };
}) {
  const router = useRouter();
  const [material, setMaterial] = useState<MaterialContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar material
  useEffect(() => {
    const loadMaterial = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiController.getMaterialContent(params.id, params.materialId);
        
        if (response.success && response.data) {
          setMaterial(response.data);
        } else {
          setError("Erro ao carregar material");
        }
      } catch (error) {
        console.error("Erro ao carregar material:", error);
        setError("Erro ao carregar material");
      } finally {
        setLoading(false);
      }
    };

    loadMaterial();
  }, [params.id, params.materialId]);

  if (loading) {
    return (
      <DashboardLayout title="Carregando material..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !material) {
    return (
      <DashboardLayout title="Material não encontrado" subtitle="">
        <div className="text-center py-12">
          <span className="text-6xl opacity-20">❌</span>
          <h2 className="text-2xl font-bold text-[#593100] mt-4">
            Material não encontrado
          </h2>
          <p className="text-[#593100] opacity-60 mt-2">
            {error || "O material que você está procurando não existe ou foi removido."}
          </p>
          <button
            onClick={() => router.push(`/dashboard/courses/${params.id}`)}
            className="mt-4 px-6 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
          >
            Voltar ao Curso
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={material.title} subtitle={`Material do ${material.target_type} ${material.target_id}`}>
      <div className="space-y-6">
        {/* Cabeçalho do Material */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#593100] mb-2">
                {material.title}
              </h1>
              <div className="flex gap-4 text-sm text-[#593100] opacity-70">
                <span>Tipo: {material.target_type}</span>
                <span>ID: {material.target_id}</span>
                <span>Criado em: {new Date(material.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/dashboard/courses/${params.id}`)}
              className="px-4 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
            >
              Voltar ao Curso
            </button>
          </div>
        </div>

        {/* Conteúdo do Material */}
                 <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
           <div className="prose prose-lg max-w-none text-[#593100]">
             <ReactMarkdown>
               {material.content}
             </ReactMarkdown>
           </div>
         </div>

        {/* Informações Adicionais */}
        {material.json_content && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <h3 className="text-lg font-semibold text-[#593100] mb-4">
              📋 Informações Estruturadas
            </h3>
            <div className="bg-[#fff7f0] p-4 rounded-lg">
              <pre className="text-sm text-[#593100] overflow-x-auto">
                {JSON.stringify(material.json_content, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
          <h3 className="text-lg font-semibold text-[#593100] mb-4">
            🔧 Ações
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                // Implementar funcionalidade de reescrita
                console.log("Reescrever material");
              }}
              className="px-4 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
            >
              ✏️ Solicitar Reescrita
            </button>
            <button
              onClick={() => {
                // Implementar funcionalidade de download
                const element = document.createElement("a");
                const file = new Blob([material.content], { type: "text/markdown" });
                element.href = URL.createObjectURL(file);
                element.download = `${material.title}.md`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              📥 Baixar Material
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 