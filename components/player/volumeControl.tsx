import React from "react";
import Slider from "rc-slider";
import colors from "tailwindcss/colors";
import { usePlayerOptions } from "@/store";
import {
  RiLoopRightFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "@remixicon/react";
import "rc-slider/assets/index.css";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

const VolumeControl = () => {
  const setVolume = usePlayerOptions((state) => state.setVolume);
  const volume = usePlayerOptions((state) => state.volume);
  const Icon =
    volume <= 0 ? (
      <RiVolumeMuteFill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90 " />
    ) : volume < 0.5 ? (
      <RiVolumeDownFill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90 " />
    ) : (
      <RiVolumeUpFill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90 " />
    );
  return (
    <Popover className="flex items-center">
      <PopoverButton className="group">{Icon}</PopoverButton>
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
          className="z-50 flex h-12 w-52 items-center gap-4 divide-y divide-white/5 bg-zinc-950 px-5 [--anchor-gap:var(--spacing-5)]"
        >
          <Slider
            onChange={(e) => setVolume(e as number)}
            defaultValue={volume}
            className="border-none"
            min={0}
            max={1}
            styles={{
              track: {
                background: colors.gray["50"],
              },
              rail: {
                background: colors.zinc["500"],
              },
              handle: {
                background: colors.zinc["50"],
                opacity: 1,
                border: 0,
                height: 12,
                width: 12,
              },
            }}
            step={0.01}
          />
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default VolumeControl;
