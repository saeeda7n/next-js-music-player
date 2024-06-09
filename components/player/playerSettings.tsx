import {
 Popover,
 PopoverButton,
 PopoverPanel,
 Switch,
 Transition,
} from "@headlessui/react";
import { RiLoopRightFill, RiSettings4Fill } from "@remixicon/react";
import { usePlayerOptions } from "@/store";
import { cn } from "@/lib/utils";
import React from "react";

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

export function PlayerSettings() {
 return (
  <Popover className="flex items-center">
   <PopoverButton className="group outline-none">
    <RiSettings4Fill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90" />
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
