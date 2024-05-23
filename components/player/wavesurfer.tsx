"use client";
import React, { useRef, useState } from "react";
import WavesurferPlayer, { useWavesurfer } from "@wavesurfer/react";
import { formatSecondToMinutes } from "@/lib/utils";

const Wavesurfer = () => {
  const container = useRef<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentTime, wavesurfer, isReady } = useWavesurfer({
    container: container,
    url: "https://musicc.storage.iran.liara.space/bb5f1522-7c72-4cf4-81d1-b30cb179b157.mp3",
    waveColor: "#181818",
    progressColor: "white",
    hideScrollbar: true,
    height: 48,
    barGap: 6,
    backend: "WebAudio",
    barWidth: 2,
    barRadius: 20,
    barHeight: 24,
    autoCenter: true,
    barAlign: "bottom",
    cursorWidth: 0,
    normalize: true,
    fillParent: true,
  });

  const formattedCurrentTime = formatSecondToMinutes(currentTime);
  const formattedDuration = formatSecondToMinutes(wavesurfer?.getDuration());

  return (
    <div className="flex items-end justify-between gap-2 text-sm font-medium">
      <span className="-mb-1 w-10 text-left opacity-90">
        {formattedCurrentTime}
      </span>
      <div className="relative h-12 flex-1">
        <div className="absolute inset-0">
          <div ref={container} className="player w-full" />
        </div>
      </div>
      <span className="-mb-1 w-10 text-right opacity-50">
        {formattedDuration}
      </span>
    </div>
  );
};

export default Wavesurfer;
