"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export function SingleTrackBackground({ src }: { src: string }) {
 const scope = useRef(null);
 useGSAP(
  () => {
   gsap.to(scope.current, {
    opacity: 0.5,
    scale: 3,
    duration: 8,
   });
  },
  { scope },
 );
 return (
  <div
   ref={scope}
   className="absolute start-80 top-44 size-96 bg-local bg-center opacity-0 blur-3xl"
   style={{ backgroundImage: `url('${src}')` }}
  />
 );
}
