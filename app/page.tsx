"use client";
import Link from "next/link";
import { Backgrounds, Circles, StarsBox } from "@/app/pageElements";

function Details() {
 return (
  <div className="flex flex-col justify-center gap-20 max-sm:flex-row max-sm:flex-wrap">
   <div className="flex flex-col">
    <b className="text-5xl font-bold">100K+</b>
    <span className="align-text-bottom text-2xl font-bold text-zinc-500">
     Songs
    </span>
   </div>

   <div className="flex flex-col">
    <b className="text-5xl font-bold">20K+</b>
    <span className="align-text-bottom text-2xl font-bold text-zinc-500">
     Artists
    </span>
   </div>

   <div className="flex flex-col">
    <b className="text-5xl font-bold">6K+</b>
    <span className="align-text-bottom text-2xl font-bold text-zinc-500">
     Brands
    </span>
   </div>
  </div>
 );
}

function Header() {
 return (
  <header className="fixed left-0 right-0 top-10 z-50 flex">
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
   className="pointer-events-none absolute inset-0 z-30 bg-repeat opacity-50"
   style={{
    backgroundImage: `url('/assets/images/84325b84f3dab86eca9938a29fe403c6.png')`,
   }}
  ></div>
 );
}

const Page = () => {
 return (
  <>
   <Header />
   <Backgrounds />
   <main className="container relative z-40 flex min-h-screen w-full items-center justify-between gap-8 gap-y-16 overflow-hidden py-32 max-sm:flex-col">
    <section className="space-y-8">
     <StarsBox />
     <header className="max-w-2xl space-y-5">
      <h2 className="text-6xl font-bold sm:text-5xl md:text-7xl">
       More than million music tracks
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
       className="flex h-12 items-center justify-center border px-10 font-anton text-lg uppercase tracking-wider transition duration-300 hover:bg-gray-50 hover:text-neutral-900"
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
