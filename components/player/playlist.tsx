import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { RiPlayList2Fill } from "@remixicon/react";
import React from "react";

export function Playlist() {
  return (
    <Popover className="flex items-center">
      <PopoverButton className="text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        <RiPlayList2Fill className="size-5 opacity-50 transition duration-300 hover:opacity-90" />
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
          <div className="select-none p-3">asd</div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
