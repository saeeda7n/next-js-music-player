import React from "react";
import { getArtist } from "@/server/actions/artists";
import { ImageNoise, TextNoise } from "@/components/filters/noise";
import ArtistNavigator from "@/app/(player)/artists/tracks/artistNavigator";
import { notFound } from "next/navigation";
import { PageHeader } from "@/app/(player)/artists/tracks/pageHeader";
import { Player } from "@/components/player/player";
import PageBackground from "@/app/(player)/artists/tracks/pageBackground";

const Page = async ({ searchParams: { id } }: any) => {
  const artist = await getArtist(id);

  if (!artist) return notFound();
  return (
    <>
      <ImageNoise />
      <TextNoise />
      <ArtistNavigator closed={!artist?.previous} artist={artist?.previous} />
      <div className="relative flex-1">
        <div className="relative flex min-h-screen flex-1 bg-black/40">
          <div className="absolute inset-0">
            <PageBackground
              id={artist.id}
              alt={artist.name}
              src={artist.backgroundImage!.url}
            />
            <Player />
          </div>
          <div className="relative flex flex-1 flex-col gap-10 bg-black/85 pb-56">
            <PageHeader name={artist.name} fullName={artist.fullName} />
            <div className="px-16"></div>
          </div>
        </div>
      </div>
      <ArtistNavigator closed={!artist?.next} artist={artist?.next} />
    </>
  );
};

export default Page;
