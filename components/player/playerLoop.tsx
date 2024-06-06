import { usePlayerOptions } from "@/store";
import { cn } from "@/lib/utils";
import { RiLoopRightFill } from "@remixicon/react";
import React from "react";

export function Loop() {
  const loop = usePlayerOptions((state) => state.loop);
  const toggleLoop = usePlayerOptions((state) => state.toggleLoop);

  return (
    <button className={cn("group", { active: loop })} onClick={toggleLoop}>
      <RiLoopRightFill className="size-5 text-gray-50 opacity-50 transition duration-300 group-hover:opacity-90 group-[.active]:opacity-90" />
    </button>
  );
}
