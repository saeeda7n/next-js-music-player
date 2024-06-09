"use client";
import React from "react";
import Link from "next/link";
import { RiPlayFill, RiPlayList2Fill } from "@remixicon/react";
import {
 Popover,
 PopoverButton,
 PopoverPanel,
 Transition,
} from "@headlessui/react";
import { PlayableTrack, usePlayerStore } from "@/store";
import AppImage from "@/components/appImage";
import { cn } from "@/lib/utils";

export function Playlist() {
 const playlist = usePlayerStore((state) => state.playlist);
 const currentTrack = usePlayerStore((state) => state.currentTrack);
 const setTrack = usePlayerStore((state) => state.setTrack);

 return (
  <Popover className="flex items-center">
   <PopoverButton className="group outline-none">
    <RiPlayList2Fill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90" />
   </PopoverButton>
   <Transition
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
   >
    {playlist && (
     <PopoverPanel anchor="top end" className="z-50 w-72 bg-zinc-950">
      <div className="max-h-96 space-y-1 overflow-y-scroll px-3 pb-4">
       <h3 className="sticky top-0 z-50 mb-2 items-center bg-zinc-950 pb-2 pt-3 text-xs font-bold">
        {playlist.name}
       </h3>
       {playlist.tracks.map((track) => (
        <PlaylistTrackCard
         onPressPlay={setTrack}
         key={track.id}
         track={track}
         isActive={currentTrack?.id === track.id}
        />
       ))}
      </div>
     </PopoverPanel>
    )}
   </Transition>
  </Popover>
 );
}

type PlaylistTrackCardProps = {
 track: PlayableTrack;
 isActive: boolean;
 onPressPlay: (track: PlayableTrack) => void;
};

function PlaylistTrackCard({
 track,
 isActive,
 onPressPlay,
}: PlaylistTrackCardProps) {
 return (
  <div
   className={cn("group relative overflow-hidden p-[2px]", {
    "border-animation active": isActive,
   })}
  >
   <div className="relative flex items-center gap-2 bg-zinc-950 pe-2">
    <div className="relative size-12 flex-shrink-0 bg-gray-100">
     <AppImage
      draggable={false}
      src={track.cover.url}
      alt={track.cover.placeholder || track.name}
     />
    </div>
    <div className="flex flex-col justify-center gap-1.5 overflow-hidden">
     <Link
      href={`/explore/tracks/${track.slug}`}
      className="truncate text-sm/3 font-medium"
     >
      {track.name}
     </Link>
     <Link
      className="line-clamp-2 text-xs font-light leading-none"
      href={`/explore/artists?id=${track.artist?.slug}`}
     >
      {track.artist.name}
     </Link>
    </div>
    <button
     onClick={() => onPressPlay(track)}
     className="ms-auto flex size-6 flex-shrink-0 items-center justify-center rounded-full border opacity-0 transition duration-300 group-hover:opacity-100"
    >
     <RiPlayFill className="size-4" />
    </button>
   </div>
  </div>
 );
}
