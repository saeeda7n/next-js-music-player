import React from "react";
import AppImage from "@/components/appImage";
import Link from "next/link";
import { getRandomArtists } from "@/server/actions/artists";

// const ArtistsSection = ({
//   artists,
// }: {
//   artists: Awaited<ReturnType<typeof getRandomArtists>>;
// }) => {
const ArtistsSection = async () => {
  const artists = await getRandomArtists();
  return (
    <div className="flex h-64 flex-wrap justify-between gap-5 overflow-hidden">
      {artists.map((artist) => (
        <div className="space-y-2 px-2 py-2">
          <div className="relative size-44">
            <AppImage
              draggable={false}
              className="h-full w-full rounded-full object-cover object-center"
              src={artist.profileImage?.url || ""}
              alt={artist.profileImage?.placeholder || artist.name}
            />
          </div>
          <Link
            href={`/explore/artists?id=${artist.slug}`}
            className="block text-center font-dosis text-lg font-semibold"
          >
            {artist.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArtistsSection;
