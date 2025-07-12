import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CourseCreationProvider } from "@/contexts/CourseCreationContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Falky - Educação Personalizada com IA",
  description: "Plataforma educacional com assistente IA personalizado para diferentes tipos de aprendizagem e neurodivergência",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <CourseCreationProvider>
          {children}
        </CourseCreationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
