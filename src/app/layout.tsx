import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Falky - Educação personalizada por IA para todos",
  description:
    "Plataforma que usa inteligência artificial para criar cursos personalizados, inclusivos e acessíveis, respeitando ritmos, interesses e neurodivergências. Universalize seu acesso ao conhecimento!",
  openGraph: {
    title: "Falky - Educação personalizada por IA para todos",
    description:
      "Plataforma que usa inteligência artificial para criar cursos personalizados, inclusivos e acessíveis, respeitando ritmos, interesses e neurodivergências. Universalize seu acesso ao conhecimento!",
    url: "https://falky.app/",
    siteName: "Falky",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falky - Educação personalizada por IA para todos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  keywords: [
    "educação",
    "inteligência artificial",
    "cursos personalizados",
    "inclusão",
    "neurodivergência",
    "acessibilidade",
    "universalização",
    "plataforma de cursos",
  ],
  authors: [{ name: "Falky" }],
  creator: "Falky",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
