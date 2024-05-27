"use client";
import React, { createContext, useContext, useState } from "react";
import {
  RiLoopRightFill,
  RiPauseFill,
  RiPlayFill,
  RiPlayList2Fill,
  RiSettings4Fill,
  RiSkipLeftFill,
  RiSkipRightFill,
  RiVolumeDownFill,
} from "@remixicon/react";
import PlayerProgress from "@/components/player/playerProgress";
import AppImage from "@/components/appImage";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LoopState, usePlayerOptions, usePlayerStore } from "@/store";
import WaveSurfer from "wavesurfer.js";
import {
  Field,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Radio,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import VolumeControl from "@/components/player/volumeControl";
import { Playlist } from "@/components/player/playlist";

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

export function PlayerProvider() {
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
      <div
        style={
          {
            "--left": dimension[0] + "rem",
            "--right": dimension[1] + "rem",
          } as React.CSSProperties
        }
        className="font-dosis pointer-events-none fixed bottom-0 left-[--left] right-[--right] z-50 flex h-44 items-end overflow-hidden duration-300 [transition-property:left,right]"
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
                  alt={
                    currentTrack.cover.placeholder ||
                    currentTrack.name + " - Cover"
                  }
                />
              )}
            </div>
            <PlayerControls />
          </div>
          <div className="bottom-0 mt-auto  flex h-32 flex-1 flex-col justify-between gap-2 bg-[#050505] px-10 py-5 font-tajawal backdrop-blur">
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
            <PlayerProgress />
          </div>
        </div>
      </div>
    </playerContext.Provider>
  );
}

function PlayerControls() {
  const { player } = usePlayer();
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playNext = usePlayerStore((state) => state.playNext);
  const playPrevious = usePlayerStore((state) => state.playPrevious);
  const Icon = isPlaying ? (
    <RiPauseFill className="size-4" />
  ) : (
    <RiPlayFill className="size-4" />
  );
  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-12 flex-1 items-center justify-between px-4 backdrop-blur">
      <button onClick={playPrevious}>
        <RiSkipLeftFill className="size-5" />
      </button>
      <button
        onClick={() => player?.playPause()}
        className="flex size-8 items-center justify-center rounded-full border border-neutral-400/50"
      >
        {Icon}
      </button>
      <button onClick={playNext}>
        <RiSkipRightFill className="size-5" />
      </button>
    </div>
  );
}

function PlayerOptionsContainer() {
  return (
    <div className="flex items-center gap-3">
      <VolumeControl />
      <Loop />
      <PlayerSettings />
      <Playlist />
    </div>
  );
}

const PlayerSettingsCards = {
  AutoPlay: () => {
    const autoNext = usePlayerOptions((state) => state.autoNext);
    const setAutoNext = usePlayerOptions((state) => state.setAutoNext);
    return (
      <div className="flex items-center justify-between gap-5">
        <div className="block px-3 py-2">
          <p className="font-semibold text-white">Auto Play</p>
          <p className="text-xs text-white/50">Play next track automatically</p>
        </div>
        <Switch
          checked={autoNext}
          onChange={setAutoNext}
          className="group inline-flex h-5 w-8 items-center rounded-full bg-zinc-900 transition data-[checked]:bg-indigo-600"
        >
          <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-4" />
        </Switch>
      </div>
    );
  },
};

function PlayerSettings() {
  return (
    <Popover className="flex items-center">
      <PopoverButton className="text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <RiSettings4Fill className="size-5 opacity-50 transition duration-300 hover:opacity-90" />
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="top end"
          className="z-50 divide-y divide-white/5 bg-zinc-950 text-sm/6 backdrop-blur [--anchor-gap:var(--spacing-5)]"
        >
          <div className="select-none p-3">
            <PlayerSettingsCards.AutoPlay />
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

function Loop() {
  const loop = usePlayerOptions((state) => state.loop);
  const toggleLoop = usePlayerOptions((state) => state.toggleLoop);
  const states = ["None", "Single", "Playlist"];

  return (
    <button className={cn("group", { active: loop })} onClick={toggleLoop}>
      <RiLoopRightFill className="size-5 opacity-50 transition duration-300 group-hover:opacity-90 group-[.active]:opacity-90" />
    </button>
  );
}
