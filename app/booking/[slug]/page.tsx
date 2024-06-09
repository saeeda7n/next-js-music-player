import React from "react";
import { SLIDES } from "@/data/slider";
import { SideNavigator } from "@/components/sideNavigator";
import Link from "next/link";
import AppImage from "@/components/appImage";
import Footer from "@/app/(player)/footer";
import { Metadata } from "next";

type Props = {
 params: { slug: string };
};

export async function generateMetadata({
 params: { slug },
}: Props): Promise<Metadata | undefined> {
 const content = getContent(slug)!;
 if (content) {
  return { title: content.title };
 }
}

const Page = async ({ params: { slug } }: Props) => {
 const content = getContent(slug)!;
 return (
  <>
   <SideNavigator closed />
   <header className="fixed left-12 right-12 top-0 z-50 flex h-20 items-center bg-zinc-950 px-16">
    <h1 className="font-anton text-3xl tracking-wider">
     <Link href={"/explore"}>Site Title</Link>
    </h1>
   </header>
   <main className="flex min-h-screen flex-1 flex-col gap-10 pt-32">
    <AppImage
     draggable={false}
     src={content.background}
     alt={content.title}
     className="-z-10 opacity-10 blur-3xl"
    />
    <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col bg-zinc-950">
     <div className="relative h-[28rem]">
      <AppImage
       draggable={false}
       src={content.background}
       alt={content.title}
       className="slider-mask object-cover object-center"
      />
     </div>
     <div className="z-10 -mt-32 flex min-h-[28rem] flex-1 flex-col justify-between px-10 py-10">
      <div className="flex items-center justify-between">
       <h2 className="font-anton text-3xl tracking-wider">{content.title}</h2>

       <div className="flex flex-col items-center">
        <span className="font-anton tracking-wider">Ticket Price</span>
        <b className="font-anton text-xl tracking-widest opacity-50">210$</b>
       </div>
      </div>

      <div className="flex font-dosis text-lg font-medium">
       {/*<span>Buy Tickets for</span>*/}
      </div>

      <div className="flex justify-end gap-2">
       <button className="flex h-10 items-center justify-center border bg-white px-8 font-anton uppercase tracking-wider text-neutral-900 transition duration-300 hover:bg-zinc-950 hover:text-gray-50">
        Secure your seat
       </button>
      </div>
     </div>
    </div>

    <Footer className="pb-5" />
   </main>
   <SideNavigator closed />
  </>
 );
};

function getContent(slug: string) {
 return SLIDES.find(
  (value) => value.action.props.href.split("/").at(-1) === slug,
 );
}

export default Page;
