"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import AppImage from "@/components/appImage";
import Link from "next/link";
import { getRandomTracks } from "@/server/actions/tracks";
import "swiper/css";
import "swiper/css/free-mode";
import { RiHeartLine, RiPlayLine } from "@remixicon/react";
import { PlayableTrack, usePlayerStore } from "@/store";

type Props = {
 tracks: Awaited<ReturnType<typeof getRandomTracks>>;
};

type TrackCardProps = {
 track: Props["tracks"][0];
 onPressPlay: (track: PlayableTrack) => void;
};

function TrackCard({ track, onPressPlay }: TrackCardProps) {
 return (
  <>
   <div className="relative aspect-square w-full bg-black/50">
    <AppImage
     draggable={false}
     src={track.cover.url}
     alt={track.cover.placeholder || track.title!}
    />
    <div className="track-card-mask absolute inset-0 flex place-items-end bg-black/80 opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100">
     <div className="flex gap-2 px-5 py-4">
      <button
       className="flex size-10 items-center justify-center rounded-full bg-indigo-600"
       onClick={() => onPressPlay(track)}
      >
       <RiPlayLine />
      </button>
      <button className="flex size-10 items-center justify-center rounded-full">
       <RiHeartLine />
      </button>
     </div>
    </div>
   </div>
   <div className="pb-2 font-dosis">
    <Link href={`/explore/tracks/${track.slug}`}>
     <h5 className="text-lg font-semibold">{track.name}</h5>
    </Link>
    <Link
     href={`/explore/artists?id=${track.artist.slug}`}
     className="text-sm font-medium"
    >
     {track.artist.name}
    </Link>
   </div>
  </>
 );
}

const MostPlayed = ({ tracks }: Props) => {
 const setTrack = usePlayerStore((state) => state.setTrack);
 const setPlaylist = usePlayerStore((state) => state.setPlayList);
 const onPressPlay = (track: PlayableTrack) => {
  setTrack(track);
  setPlaylist({
   tracks,
   name: "Most Played",
   key: "most played",
  });
 };

 return (
  <div className="relative h-[18.5rem] w-full">
   <div className="absolute inset-0">
    <Swiper
     slidesPerView="auto"
     spaceBetween={16}
     freeMode={true}
     pagination={{
      clickable: true,
     }}
     modules={[FreeMode]}
     className="mySwiper h-full w-full"
    >
     {tracks.map((track) => (
      <SwiperSlide className="group !w-56 space-y-1" key={track.id}>
       <TrackCard onPressPlay={onPressPlay} track={track} />
      </SwiperSlide>
     ))}
    </Swiper>
   </div>
  </div>
 );
};

export default MostPlayed;
