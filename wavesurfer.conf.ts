import { type WaveSurferOptions } from "wavesurfer.js";

export const WavesurferConf: Omit<WaveSurferOptions, "container"> = {
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
};
