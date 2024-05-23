import React from "react";
import { getArtists } from "@/server/actions/artists";
import Link from "next/link";

const Page = async () => {
  const artists = await getArtists();
  return (
    <div>
      <ul className="flex">
        {artists.map((artist) => (
          <li>
            <Link key={artist.id} href={`/artists/tracks?id=${artist.slug}`}>
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
