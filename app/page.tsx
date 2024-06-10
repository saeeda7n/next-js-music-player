"use client";
import Link from "next/link";
import { Backgrounds, Circles, Details, StarsBox } from "@/app/pageElements";

function Header() {
 return (
  <header className="fixed left-0 right-0 top-0 z-50 flex h-16 backdrop-blur">
   <div className="container flex items-center justify-between">
    <h1 className="font-anton text-2xl font-semibold tracking-wider">
     Player name
    </h1>

    <Link
     href={"/explore"}
     className="flex h-10 items-center justify-center border px-8 font-anton uppercase tracking-wider transition duration-300 hover:bg-gray-50 hover:text-neutral-900"
    >
     Explore
    </Link>
   </div>
  </header>
 );
}

function NoiseBackground() {
 return (
  <div
   className="pointer-events-none fixed inset-0 z-30 bg-repeat opacity-50"
   style={{
    backgroundImage: `url('/assets/images/noise.webp')`,
   }}
  ></div>
 );
}

const Page = () => {
 return (
  <>
   <Header />
   <Backgrounds />
   <main className="container relative z-40 flex min-h-screen w-full items-center justify-between gap-8 gap-y-16 py-32 max-sm:flex-col">
    <section className="space-y-8">
     <StarsBox />
     <header className="max-w-2xl space-y-5">
      <h2 className="flex flex-wrap gap-1.5 text-6xl font-bold sm:text-5xl md:text-7xl">
       More than
       <span className="bg-gradient-to-l from-indigo-700 to-sky-600 bg-clip-text text-transparent">
        million
       </span>
       music tracks
      </h2>
      <p className="text-xl text-zinc-400">
       Discover a curated roster of world-class bands, composers, and artists,
       easily accessible with innovative tools and features
      </p>
     </header>
     <footer className="flex">
      <Link
       role="button"
       href={"/explore"}
       className="explore-button relative flex h-12 items-center justify-center border px-10 font-anton text-lg uppercase tracking-wider transition duration-300 hover:bg-gray-50 hover:text-neutral-900"
      >
       Explore
      </Link>
     </footer>
    </section>

    <Details />
   </main>

   <Circles />
   <NoiseBackground />
  </>
 );
};

export default Page;
