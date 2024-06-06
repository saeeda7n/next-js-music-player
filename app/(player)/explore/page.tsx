import React from "react";
import { SideNavigator } from "@/components/sideNavigator";
import { AppHeader } from "@/components/appHeader";
import { getRandomPlaylists } from "@/server/actions/playlists";
import { getRandomTracks } from "@/server/actions/tracks";
import ClientState from "@/app/(player)/explore/clientState";
import MainSlider from "@/app/(player)/explore/mainSlider";
import MostPlayed from "@/app/(player)/explore/mostPlayed";
import ArtistsSection from "@/app/(player)/explore/artistsSection";
import Footer from "@/app/(player)/footer";
import Playlists from "@/app/(player)/explore/playlists";

const Page = async () => {
 const [playlists, tracks] = await Promise.all([
  getRandomPlaylists(),
  getRandomTracks(),
 ]);

 return (
  <>
   <SideNavigator closed={true} />
   <ClientState />

   <main className="flex flex-1 flex-col">
    <AppHeader
     headerTitle={
      <h1 className="font-anton text-[length:calc(var(--titleSize)*1rem)] font-medium uppercase leading-none">
       Player Name
      </h1>
     }
    />
    <section className="h-[70vh] min-h-[42rem] w-full">
     <MainSlider />
    </section>
    <section className="w-full space-y-8 px-16 py-16">
     <header className="flex items-center justify-between border-b border-s-4 border-zinc-800 py-2 ps-4">
      <h4 className="font-anton text-2xl tracking-widest">Latest</h4>
      <div className="">
       <a href="/artists">More</a>
      </div>
     </header>
     <MostPlayed tracks={tracks} />
    </section>
    <section className="w-full space-y-8 px-16 py-16">
     <h4 className="border-b border-s-4 border-zinc-800 py-2 ps-4 font-anton text-2xl tracking-widest">
      Most Played
     </h4>
     <MostPlayed tracks={tracks} />
    </section>
    <section className="w-full space-y-8 px-16 py-16">
     <h4 className="border-b border-s-4 border-zinc-800 py-2 ps-4 font-anton text-2xl tracking-widest">
      Favorite Artists
     </h4>
     <ArtistsSection />
    </section>
    <section className="w-full space-y-8 px-16 py-16">
     <h4 className="border-b border-s-4 border-zinc-800 py-2 ps-4 font-anton text-2xl tracking-widest">
      Playlists
     </h4>
     <Playlists playlists={playlists} />
    </section>
    <section className="w-full space-y-8 px-16 py-16">
     <h4 className="border-b border-s-4 border-zinc-800 py-2 ps-4 font-anton text-2xl tracking-widest">
      Public lists
     </h4>
     <Playlists playlists={playlists} />
    </section>
    <Footer />
   </main>

   <SideNavigator closed={true} />
  </>
 );
};

export default Page;
