import React from "react";
import { getArtist } from "@/server/actions/artists";
import { ImageNoise, TextNoise } from "@/components/filters/noise";
import { notFound } from "next/navigation";
import { PageHeader } from "@/app/(player)/explore/artists/pageHeader";
import PageBackground from "@/app/(player)/explore/artists/pageBackground";
import ArtistTrackList from "@/app/(player)/explore/artists/artistTrackList";
import { SideNavigator } from "@/components/sideNavigator";

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
        url={`/explore/artists?id=${artist.previous?.slug}`}
        closed={!artist.previous}
      />
      <main className="relative flex-1">
        <div className="relative flex min-h-screen flex-1 bg-black/40">
          <div className="absolute inset-0">
            <PageBackground
              id={artist.id}
              alt={artist.name}
              src={artist.backgroundImage!.url}
            />
          </div>
          <div className="relative flex flex-1 flex-col gap-10 bg-black/85 pb-44">
            <PageHeader
              className="z-50"
              name={artist.name}
              fullName={artist.fullName}
            />
            <div className="flex flex-1 flex-col justify-center px-16">
              <ArtistTrackList
                name={artist.name}
                id={artist.id}
                previous={artist.previous}
                next={artist.next}
                tracks={artist.tracks}
              />
            </div>
          </div>
        </div>
      </main>
      <SideNavigator
        id={artist.next?.id}
        backgroundImage={artist.next?.backgroundImage?.url}
        label={artist.next?.name}
        url={`/explore/artists?id=${artist.next?.slug}`}
        closed={!artist.next}
      />
    </>
  );
};

export default Page;
