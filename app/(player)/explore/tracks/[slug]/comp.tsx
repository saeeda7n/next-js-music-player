"use client";
import React, { useRef } from "react";
import { getRandomTracks } from "@/server/actions/tracks";
import TransitionLink from "@/components/transitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const Comp = ({
 tracks,
}: {
 tracks: Awaited<ReturnType<typeof getRandomTracks>>;
}) => {
 const scope = useRef(null);
 const { contextSafe } = useGSAP(
  () => {
   gsap.fromTo(
    "a",
    { yPercent: -100, stagger: 0.1, opacity: 0 },
    { yPercent: 0, stagger: 0.1, opacity: 1 },
   );
  },
  { scope },
 );
 const animateOut = contextSafe((onComplete?: () => void) => {
  gsap.to("a", {
   yPercent: 100,
   opacity: 0,
   stagger: 0.1,
   onComplete: () => onComplete && onComplete(),
  });
 });

 return (
  <main
   ref={scope}
   className="relative flex min-h-screen flex-1 flex-col bg-black/40 px-16 pt-52"
  >
   {tracks.map((track) => (
    <TransitionLink
     animation={animateOut}
     href={`/explore/tracks/${track.slug}`}
     key={track.id}
    >
     {track.artist.name}
    </TransitionLink>
   ))}
  </main>
 );
};

export default Comp;
