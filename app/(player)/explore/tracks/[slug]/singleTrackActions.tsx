"use client";
import { getTrack } from "@/server/actions/tracks";
import React from "react";
import {
 RiCheckFill,
 RiDownloadCloud2Fill,
 RiHeartLine,
 RiPauseFill,
 RiPlayFill,
 RiPlayListAddFill,
} from "@remixicon/react";
import { PlayableTrack, usePlayerStore } from "@/store";
import { usePlayer } from "@/components/player/player";
import {
 Listbox,
 ListboxButton,
 ListboxOption,
 ListboxOptions,
 Transition,
} from "@headlessui/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { track: NonNullable<Awaited<ReturnType<typeof getTrack>>> };

function PlayButton({ track }: { track: PlayableTrack }) {
 const setTrack = usePlayerStore((state) => state.setTrack);
 const currentTrack = usePlayerStore((state) => state.currentTrack);
 const isPlaying = usePlayerStore((state) => state.isPlaying);
 const { player } = usePlayer();
 const isThisPlaying = currentTrack?.id == track.id;
 const Icon =
  isPlaying && isThisPlaying ? (
   <RiPauseFill className="size-8" />
  ) : (
   <RiPlayFill className="size-8" />
  );
 return (
  <button
   onClick={() => {
    setTrack(track);
    player?.playPause();
   }}
   className="flex size-16 items-center justify-center rounded-[50%] bg-indigo-600 duration-300 [transition-property:border-radius] hover:rounded-[45%]"
  >
   {Icon}
  </button>
 );
}

const people = [
 { id: 1, name: "Dummy Playlist 1" },
 { id: 2, name: "Dummy Playlist 2" },
 { id: 3, name: "Dummy Playlist 3" },
 { id: 4, name: "Dummy Playlist 4" },
 { id: 5, name: "Dummy Playlist 5" },
];

function AddToPlayList() {
 const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);

 return (
  <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
   <ListboxButton
    className={cn(
     "h-12 max-w-52 truncate rounded-full border-none bg-white/5 px-5 py-1.5 text-white",
    )}
   >
    {selectedPeople.length > 0 ? (
     selectedPeople.map((person) => person.name).join(", ")
    ) : (
     <>
      <RiPlayListAddFill className="mb-0.5 me-2 inline" />
      Add to play list
     </>
    )}
   </ListboxButton>
   <Transition
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
   >
    <ListboxOptions
     anchor="bottom start"
     className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
    >
     {people.map((person) => (
      <ListboxOption
       key={person.id}
       value={person}
       className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
      >
       <div className="flex size-5 items-center justify-center">
        {selectedPeople.find((p) => p.id === person.id) && <RiCheckFill />}
       </div>
       {person.name}
      </ListboxOption>
     ))}
    </ListboxOptions>
   </Transition>
  </Listbox>
 );
}

function Download({ url }: { url: string }) {
 return (
  <a
   href={url}
   className="flex h-12 items-center justify-center gap-2 rounded-full bg-gray-50/5 px-5 transition duration-300 hover:bg-green-500/40"
  >
   <RiDownloadCloud2Fill />
   Download
  </a>
 );
}

export function SingleTrackActions({ track }: Props) {
 return (
  <div className="mt-8 flex flex-wrap items-end gap-2">
   <PlayButton track={track} />
   <button className="flex size-12 items-center justify-center rounded-full bg-gray-50/5 transition duration-300 hover:bg-pink-600/40">
    <RiHeartLine />
   </button>

   <Download url={track.playable!.url} />
   <AddToPlayList />
  </div>
 );
}
