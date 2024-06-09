"use client";
import React, { useEffect, useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const Stars = () => {
 const id = useId();
 const scope = useRef(null);
 useGSAP(
  (context, contextSafe) => {
   if (!contextSafe) return;
   const animate = contextSafe(() => {
    const nextState = gsap.utils.random([
     {
      stop1: "#FC4C02",
      stop2: "#2522D3",
     },
     {
      stop1: "#ffffff",
      stop2: "#ffffff",
     },
     {
      stop1: "#ffffff33",
      stop2: "#ffffff33",
     },
    ]);
    const duration = gsap.utils.random(0.5, 2);
    const delay = gsap.utils.random(0.5, 2);
    gsap
     .timeline({
      onComplete() {
       animate();
      },
     })
     .to(
      ".stop-1",
      {
       delay,
       duration,
       stopColor: nextState.stop1,
      },
      0,
     )
     .to(
      ".stop-2",
      {
       delay,
       duration,
       stopColor: nextState.stop2,
      },
      0,
     );
   });
   animate();
  },
  { scope },
 );

 return (
  <svg
   width="14"
   height="14"
   viewBox="0 0 12 12"
   xmlns="http://www.w3.org/2000/svg"
  >
   <path
    d="M11.6711 5.6732C10.4036 5.29397 9.25132 4.60639 8.31874 3.6728C7.38616 2.73922 6.70278 1.58916 6.3305 0.326798C6.3305 0.240126 6.29587 0.156988 6.2342 0.0957016C6.17253 0.0344152 6.08886 0 6.00165 0C5.91443 0 5.83077 0.0344152 5.76909 0.0957016C5.70742 0.156988 5.67279 0.240126 5.67279 0.326798C5.29967 1.58926 4.6156 2.73931 3.6825 3.67284C2.7494 4.60638 1.59673 5.29391 0.328857 5.6732C0.241639 5.6732 0.157977 5.70762 0.0963048 5.7689C0.0346321 5.83019 0 5.91333 0 6C0 6.08667 0.0346321 6.16977 0.0963048 6.23106C0.157977 6.29234 0.241639 6.3268 0.328857 6.3268C1.59729 6.70502 2.75053 7.39219 3.68379 8.32588C4.61705 9.25957 5.30074 10.4102 5.67279 11.6732C5.67279 11.7599 5.70742 11.843 5.76909 11.9043C5.83077 11.9656 5.91443 12 6.00165 12C6.08886 12 6.17253 11.9656 6.2342 11.9043C6.29587 11.843 6.3305 11.7599 6.3305 11.6732C6.7017 10.4103 7.38472 9.25962 8.31746 8.32588C9.25019 7.39214 10.403 6.70496 11.6711 6.3268C11.7584 6.3268 11.842 6.29234 11.9037 6.23106C11.9654 6.16977 12 6.08667 12 6C12 5.91333 11.9654 5.83019 11.9037 5.7689C11.842 5.70762 11.7584 5.6732 11.6711 5.6732Z"
    fill={`url(#${id})`}
   />
   <defs>
    <linearGradient
     ref={scope}
     id={id}
     x1="8.9407e-08"
     y1="6"
     x2="12"
     y2="6"
     gradientUnits="userSpaceOnUse"
    >
     <stop className="stop-1" stopColor="#FC4C02" />
     <stop className="stop-2" offset="1" stopColor="#2522D3" />
    </linearGradient>
   </defs>
  </svg>
 );
};

export const StarsBox = () => {
 return (
  <div className="mb-12 grid w-64 grid-cols-8 gap-y-4">
   {[...new Array(16)].map(() => (
    <Stars />
   ))}
  </div>
 );
};

export function Circles() {
 const scope = useRef(null);
 useGSAP(
  () => {
   gsap.to([".box-i", ".box-ii", ".box-iii"], {
    rotate: "360deg",
    repeat: -1,
    ease: "none",
    duration: 30,
   });
  },
  { scope },
 );
 return (
  <div
   ref={scope}
   className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center overflow-hidden "
  >
   <div className="container relative">
    <div className="absolute inset-0 flex items-center justify-center">
     <div className="absolute right-52 flex size-[36rem] items-center justify-center ">
      <div className="box-i absolute z-30 mb-24 size-72 origin-[20%_50%] rounded-full bg-[#FC4D03] blur-3xl" />
      <div className="box-ii absolute z-20 mb-32 size-96 origin-bottom rounded-full bg-[#5ACDFF] blur-3xl" />
      <div className="box-iii absolute size-[36rem] origin-[60%_30%] rounded-full bg-[#2A23CF] blur-3xl" />
     </div>
    </div>
   </div>
  </div>
 );
}

export function Backgrounds() {
 const scope = useRef(null);
 useGSAP(
  () => {
   gsap.to([".box-i", ".box-ii", ".box-iii"], {
    rotate: "360deg",
    repeat: -1,
    ease: "none",
    duration: 120,
   });
  },
  { scope },
 );
 return (
  <div ref={scope} className="fixed inset-0 z-10 overflow-hidden">
   <div className="relative z-50 h-full w-full bg-black/90 backdrop-blur-[120px]"></div>
   <div className="box-i absolute -bottom-1/2 end-1/3 z-30 size-[54rem] origin-[100%_50%] rounded-full bg-[#5ACDFF]"></div>
   <div className="box-ii absolute -bottom-1/3 z-20 size-[32rem] origin-[100%_0%] rounded-full bg-[#FC4D03]"></div>
   <div className="box-iii absolute -top-1/2 z-10 size-[72rem] origin-[50%_100%] rounded-full bg-[#2A23CF]"></div>
  </div>
 );
}
