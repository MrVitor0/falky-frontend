import Header from "./Header";
import Hero from "./Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff7f0]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Hero />
      </main>
    </div>
  );
}
