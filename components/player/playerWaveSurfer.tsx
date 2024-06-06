"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatSecondToMinutes } from "@/lib/utils";
import { RiLoader5Fill } from "@remixicon/react";
import WaveSurfer from "wavesurfer.js";
import { useWavesurfer } from "@wavesurfer/react";
import { WavesurferConf } from "@/wavesurfer.conf";
import { usePlayerOptions, usePlayerStore } from "@/store";
import { usePlayer } from "@/components/player/player";

const PlayerWaveSurfer = () => {
  const { setPlayer } = usePlayer();
  const container = useRef(null);
  const [firstLoad, setFirstLoad] = useState(0);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const playNext = usePlayerStore((state) => state.playNext);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const { autoNext, loop, volume } = usePlayerOptions();
  const { wavesurfer, currentTime, isPlaying } = useWavesurfer({
    ...WavesurferConf,
    url: currentTrack?.playable?.url,
    container,
  });

  useEffect(() => {
    return () => wavesurfer?.destroy();
  }, []);

  useEffect(() => {
    if (wavesurfer) setPlayer(wavesurfer);
    if (wavesurfer && currentTrack?.playable) {
      wavesurfer?.once("ready", async () => {
        if (firstLoad > 0) await wavesurfer.play();
        setFirstLoad((n) => n + 1);
      });
    }
  }, [currentTrack?.playable?.url, wavesurfer]);

  // control autoplay and loop
  useEffect(() => {
    if (wavesurfer) {
      const unloadFinish = wavesurfer.on("finish", async () => {
        if (loop) await wavesurfer.play();
        else if (autoNext) playNext();
      });
      return () => unloadFinish();
    }
  }, [wavesurfer, autoNext, loop]);

  //control playing state
  useEffect(() => {
    setIsPlaying((isPlaying && wavesurfer?.isPlaying()) || false);
  }, [isPlaying, wavesurfer?.isPlaying()]);

  //control mute state
  useEffect(() => {
    wavesurfer?.setVolume(volume);
  }, [volume, wavesurfer]);

  const formattedCurrentTime = formatSecondToMinutes(currentTime);
  const formattedDuration = formatSecondToMinutes(wavesurfer?.getDuration());

  return (
    <div className="flex items-end justify-between gap-2 text-sm font-medium">
      <span className="-mb-1 w-10 text-left opacity-90">
        {formattedCurrentTime}
      </span>
      <div className="relative h-12 flex-1">
        <div className="absolute inset-0">
          {wavesurfer && (
            <LoaderContainer
              key={wavesurfer.options.url}
              wavesurfer={wavesurfer}
            />
          )}

          <div ref={container} className="player w-full" />
        </div>
      </div>
      <span className="-mb-1 w-10 text-right opacity-50">
        {formattedDuration}
      </span>
    </div>
  );
};

export default PlayerWaveSurfer;

type LoaderContainerProps = {
  wavesurfer: WaveSurfer;
};

function LoaderContainer({ wavesurfer }: LoaderContainerProps) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const unload = wavesurfer.on(
      "loading",
      (e) => (setProgress(e), setReady(false)),
    );
    const unloadTimeUpdate = wavesurfer.on("timeupdate", () => null);
    const unloadReady = wavesurfer.on("decode", async () => setReady(true));
    return () => (unload(), unloadReady(), unloadTimeUpdate());
  }, []);
  return (
    !ready && (
      <div className="absolute inset-0 z-50 flex items-center justify-center gap-1">
        {progress >= 100 && (
          <RiLoader5Fill className={"absolute mb-6 animate-spin"} />
        )}
        <div className="h-1 w-full animate-pulse self-end rounded-full bg-white/10">
          <div
            className="relative h-full flex-nowrap items-center overflow-hidden rounded-full bg-white/40 duration-300 [transition-property:width]"
            style={{ width: `${progress}%` }}
          >
            <div className="player-progress-mask absolute end-0 h-full w-44 rounded-full bg-white shadow-2xl shadow-red-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
