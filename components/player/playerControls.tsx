import { usePlayerStore } from "@/store";
import {
  RiPauseFill,
  RiPlayFill,
  RiSkipLeftFill,
  RiSkipRightFill,
} from "@remixicon/react";
import React from "react";
import { usePlayer } from "@/components/player/player";

export function PlayerControls() {
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
