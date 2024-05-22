import React from "react";
import { getArtists } from "@/server/actions/artists";
import Link from "next/link";

const ArtistLists = async () => {
  const artists = await getArtists();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12">
      <ul className="container flex gap-4">
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistLists;
