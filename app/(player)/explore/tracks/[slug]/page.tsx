import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getRandomTracks, getTrack } from "@/server/actions/tracks";
import { SideNavigator } from "@/components/sideNavigator";
import AppImage from "@/components/appImage";
import { notFound } from "next/navigation";
import SetDimensions from "@/components/setDimensions";
import { formatSecondToMinutes } from "@/lib/utils";
import { SingleTrackActions } from "@/app/(player)/explore/tracks/[slug]/singleTrackActions";
import { SingleTrackBackground } from "@/app/(player)/explore/tracks/[slug]/singleTrackBackground";
import Footer from "@/app/(player)/footer";

type Props = {
 params: { slug: string };
};

export async function generateMetadata({
 params: { slug },
}: Props): Promise<Metadata | undefined> {
 const track = await getTrack(slug);
 if (track)
  return {
   title: `${track.title} | Player name`,
  };
}

const Page = async ({ params: { slug } }: Props) => {
 const tracks = await getRandomTracks();
 const track = await getTrack(slug);
 if (!track) return notFound();
 return (
  <>
   <SetDimensions dimensions={[3, 3]} />
   <SideNavigator closed />
   <main className="relative flex flex-1 flex-col gap-10 bg-black/40">
    <div className="flex min-h-screen flex-col justify-center px-16 py-32">
     <div className="absolute inset-0 overflow-hidden">
      <SingleTrackBackground src={track.cover.url} />
     </div>
     <div className="relative mb-24 flex gap-8 max-lg:flex-col">
      <div className="relative size-80 flex-shrink-0 bg-black/50 xl:size-96">
       <AppImage
        draggable={false}
        className="object-cover object-center"
        src={track.cover.url}
        alt={track.cover.placeholder || track.name}
       />
      </div>
      <div className="flex w-full max-w-6xl flex-col justify-center">
       <h2 className="font-anton text-6xl xl:text-7xl 2xl:text-8xl">
        {track.name}
       </h2>
       <Link
        className="me-auto font-anton text-2xl xl:text-3xl"
        href={`/explore/artists?id=${track.artist.slug}`}
       >
        {track.artist.name}
       </Link>

       <ul className="font-dosis font-medium tracking-wider">
        <li>Duration: {formatSecondToMinutes(track.duration || 0)}</li>
        <li>Album: {track.albumId || "Single"}</li>
       </ul>

       <SingleTrackActions track={track} />
      </div>
     </div>
    </div>

    <Footer />
   </main>
   <SideNavigator closed />
  </>
 );
};

export default Page;
