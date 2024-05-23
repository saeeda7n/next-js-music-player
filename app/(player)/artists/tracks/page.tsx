import React, { Suspense } from "react";
import { getArtist } from "@/server/actions/artists";
import { ImageNoise, TextNoise } from "@/components/filters/noise";
import SideNavigator from "@/components/sideNavigator";
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
      <SideNavigator
        id={artist.previous?.id}
        backgroundImage={artist.previous?.backgroundImage?.url}
        label={artist.previous?.name}
        url={`/artists/tracks?id=${artist.previous?.slug}`}
        closed={!artist.previous}
      />
      <section className="relative flex-1">
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
      </section>
      <SideNavigator
        id={artist.next?.id}
        backgroundImage={artist.next?.backgroundImage?.url}
        label={artist.next?.name}
        url={`/artists/tracks?id=${artist.next?.slug}`}
        closed={!artist.next}
      />
    </>
  );
};

export default Page;
