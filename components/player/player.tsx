"use client";
import React from "react";
import Image from "next/image";
import { RiPauseFill, RiSkipLeftFill, RiSkipRightFill } from "@remixicon/react";
import Wavesurfer from "@/components/player/wavesurfer";
import PlayerContext from "@/components/player/playerContext";

const Player = () => {
  return (
    <PlayerContext>
      <div className="static z-50 mt-auto flex w-full">
        <div className="flex h-64 w-48 flex-col bg-zinc-950">
          <Image
            draggable={false}
            className="size-48 rounded-tr-sm object-cover object-center"
            src="https://i1.sndcdn.com/artworks-yONlx451iQjt5Wzl-gGoXrg-t500x500.jpg"
            alt="Logo"
            width={512}
            height={512}
          />
          <div className="flex flex-1 items-center justify-between px-5 py-2">
            <button>
              <RiSkipLeftFill />
            </button>
            <button className="flex size-9 items-center justify-center rounded-full border border-neutral-400/50">
              <RiPauseFill className="size-4" />
            </button>
            <button>
              <RiSkipRightFill />
            </button>
          </div>
        </div>
        <div className="sticky bottom-0 mt-auto flex h-44 flex-1 flex-col justify-between  gap-2 bg-zinc-950 px-16  py-8 font-tajawal">
          <h4 className="text-xl font-medium">Angel Numbers</h4>
          <Wavesurfer />
        </div>
      </div>
    </PlayerContext>
  );
};

export default Player;
