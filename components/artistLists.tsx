import React from "react";
import { getArtists } from "@/server/actions/artists";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const ArtistLists = () => {
  const { data: artists, isPending } = useQuery({
    queryFn: () => getArtists(),
    queryKey: [""],
  });
  if (isPending) return <div>sadsad</div>;
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12">
      <ul className="container flex gap-4">
        {artists?.map((artist) => (
          <li key={artist.id}>
            <Link href={`/test?artist=${artist.slug}`} shallow>
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistLists;
