"use client";
import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { getRandomPlaylists } from "@/server/actions/playlists";
import AppImage from "@/components/appImage";
import Image from "next/image";

function PlaylistTrackCard({
 track,
 index,
 total,
}: {
 track: Props["playlists"][0]["tracks"][0]["track"];
 index: number;
 total: number;
}) {
 return (
  <div
   className="absolute h-56 w-56"
   style={{
    left: index * 8 + "px",
    top: index * 4 + "px",
    opacity: 1 - index / total,
   }}
  >
   <Image
    fill={true}
    src={track.cover.url}
    alt={track.cover.placeholder || track.title!}
   />
  </div>
 );
}

function PlaylistCard({ playlist }: { playlist: Props["playlists"][0] }) {
 return (
  <div className="">
   <div className="relative h-60 w-60">
    {playlist.tracks.map(({ track }, index, all) => (
     <PlaylistTrackCard
      key={track.id}
      total={all.length}
      track={track}
      index={all.length - 1 - index}
     />
    ))}
   </div>
   <div className="">
    <a
     href={`/playlists/${playlist.publicKey}`}
     className="block font-dosis text-lg font-semibold"
    >
     {playlist.name}
    </a>
    <span suppressHydrationWarning className="font-dosis font-medium">
     +{~~(Math.random() * 10 + 2)} tracks
    </span>
   </div>
  </div>
 );
}

type Props = {
 playlists: Awaited<ReturnType<typeof getRandomPlaylists>>;
};
const Playlists = ({ playlists }: Props) => {
 return (
  <div className="relative h-[18.5rem] w-full">
   <div className="absolute inset-0">
    <Swiper
     slidesPerView="auto"
     spaceBetween={30}
     freeMode={true}
     modules={[FreeMode]}
     className="mySwiper h-full w-full"
    >
     {playlists.map((playlist) => (
      <SwiperSlide key={playlist.id} className="group !w-56 space-y-1">
       <PlaylistCard playlist={playlist} />
      </SwiperSlide>
     ))}
    </Swiper>
   </div>
  </div>
 );
};

export default Playlists;
