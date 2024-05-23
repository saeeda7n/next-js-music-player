"use client";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { RiPauseFill, RiSkipLeftFill, RiSkipRightFill } from "@remixicon/react";
import Wavesurfer from "@/components/player/wavesurfer";
import AppImage from "@/components/appImage";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

type PlayerContext = {
  DefaultPlayer: () => ReactNode;
};

const playerContext = createContext<PlayerContext | null>(null);

export const usePlayer = () => {
  const thisPlayerContext = useContext(playerContext);
  if (!thisPlayerContext)
    throw new Error("usePlayer has to be used within <PlayerContext.Provider>");
  return thisPlayerContext;
};

export function PlayerProvider({ children }: PropsWithChildren) {
  return (
    <playerContext.Provider
      value={{
        DefaultPlayer: () => <DefaultPlayer />,
      }}
    >
      {children}
    </playerContext.Provider>
  );
}

export function Player() {
  const { DefaultPlayer } = usePlayer();
  return <DefaultPlayer />;
}
function DefaultPlayer() {
  const ref = useRef<any>();
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "350 bottom",
          end: "500 bottom",
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
    <div
      ref={ref}
      className="sticky bottom-0 left-0 right-0 top-[calc(100vh-8rem)] z-50 flex w-full "
    >
      <div className="relative flex bg-[#050505]">
        <div className="cover relative size-32">
          <AppImage
            draggable={false}
            className="rounded-tr-sm bg-black/90 object-cover object-center"
            src="https://i1.sndcdn.com/artworks-yONlx451iQjt5Wzl-gGoXrg-t500x500.jpg?asd21313"
            alt="Logo"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-12 flex-1 items-center justify-between px-5 backdrop-blur">
          <button>
            <RiSkipLeftFill />
          </button>
          <button className="flex size-9 items-center justify-center rounded-full border border-neutral-400/50">
            <RiPauseFill className="size-4" />
          </button>
          <button>
            <RiSkipRightFill />
          </button>
        </div>
      </div>
      <div className="bottom-0 mt-auto flex h-32 flex-1 flex-col justify-between gap-2 bg-[#050505] px-10 py-5 font-tajawal backdrop-blur">
        <h4 className="text-xl font-medium">Angel Numbers</h4>
        <Wavesurfer />
      </div>
    </div>
  );
}
