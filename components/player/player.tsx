"use client";
import React, { createContext, useContext, useState } from "react";
import {
 RiCloseFill,
 RiLoopRightFill,
 RiPauseFill,
 RiPlayFill,
 RiSettings4Fill,
 RiSkipLeftFill,
 RiSkipRightFill,
} from "@remixicon/react";
import PlayerWaveSurfer from "@/components/player/playerWaveSurfer";
import AppImage from "@/components/appImage";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayerOptions, usePlayerStore } from "@/store";
import WaveSurfer from "wavesurfer.js";

import VolumeControl from "@/components/player/volumeControl";
import { Playlist } from "@/components/player/playlist";
import { PlayerSettings } from "@/components/player/playerSettings";
import { Loop } from "@/components/player/playerLoop";
import { PlayerControls } from "@/components/player/playerControls";
import Link from "next/link";

type PlayerContext = {
 player?: WaveSurfer | null;
 setPlayer: (player: WaveSurfer | null) => void;
};

export const playerContext = createContext<PlayerContext | null>(null);

export const usePlayer = () => {
 const thisPlayerContext = useContext(playerContext);
 if (!thisPlayerContext)
  throw new Error("usePlayer has to be used within <PlayerContext.Provider>");
 return thisPlayerContext;
};

export function PlayerProvider({ children }: any) {
 const currentTrack = usePlayerStore((state) => state.currentTrack);
 const dimension = usePlayerStore((state) => state.dimension);
 const [player, setPlayer] = useState<WaveSurfer | null>(null);
 useGSAP(() => {
  gsap
   .timeline({
    scrollTrigger: {
     trigger: "body",
     start: "top top",
     end: "200 top",
     scrub: 0.2,
    },
   })
   .fromTo(
    ".cover",
    {
     y: "-3rem",
    },
    {
     y: 0,
    },
   );
 });
 return (
  <playerContext.Provider value={{ player, setPlayer }}>
   {children}
   <div
    style={
     {
      "--left": dimension[0] + "rem",
      "--right": dimension[1] + "rem",
     } as React.CSSProperties
    }
    className="pointer-events-none fixed bottom-0 left-[--left] right-[--right] z-50 flex h-44 select-none items-end overflow-hidden font-dosis duration-300 [transition-property:left,right]"
   >
    <div
     className={cn(
      "pointer-events-auto flex h-32 flex-1 translate-y-44 transition duration-500",
      {
       "translate-y-0": currentTrack,
      },
     )}
    >
     <div className="relative flex items-start bg-[#050505]">
      <div className="cover relative size-32">
       {currentTrack && (
        <AppImage
         key={currentTrack.cover.url}
         draggable={false}
         className="rounded-tr-sm bg-black/90 object-cover object-center"
         src={currentTrack.cover.url}
         alt={currentTrack.cover.placeholder || currentTrack.name + " - Cover"}
        />
       )}
      </div>
      <PlayerControls />
     </div>
     <div className="font-tajawal relative bottom-0 mt-auto flex h-32 flex-1 flex-col justify-between gap-2 bg-[#050505] px-10 py-5 backdrop-blur">
      <div className="player-border-mask absolute -top-0 left-0 right-0 h-0.5 bg-indigo-600" />
      <div className="flex items-center justify-between">
       <div className="overflow-hidden">
        <AnimatePresence mode="wait">
         <motion.div
          key={currentTrack?.id}
          initial={{ y: "-100%" }}
          exit={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ ease: "backInOut" }}
          className="flex items-center gap-1"
         >
          <h4 className="text-lg font-medium tracking-wide">
           {currentTrack?.name}
          </h4>
         </motion.div>
        </AnimatePresence>
       </div>
       <PlayerOptionsContainer />
      </div>
      <PlayerWaveSurfer />
     </div>
    </div>
   </div>
  </playerContext.Provider>
 );
}

function ClosePlayer() {
 const clearTrack = usePlayerStore((state) => state.clearTrack);

 return (
  <button className="group" onClick={clearTrack}>
   <RiCloseFill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90 group-[.active]:opacity-90" />
  </button>
 );
}

function PlayerOptionsContainer() {
 return (
  <div className="flex items-center gap-3">
   <VolumeControl />
   <Loop />
   <PlayerSettings />
   <Playlist />
   <ClosePlayer />
  </div>
 );
}
