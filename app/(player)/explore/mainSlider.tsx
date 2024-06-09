"use client";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import AppImage from "@/components/appImage";
import { motion } from "framer-motion";
import { SLIDES } from "@/data/slider";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

function SliderNavigator({
 index,
 onChange,
 total,
}: {
 total: number;
 index: number;
 onChange: (index: number) => void;
}) {
 return (
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-end gap-1 px-8 py-8">
   {[...new Array(total)].map((item, _index) => (
    <div
     onClick={() => onChange(_index)}
     key={item}
     className={`${
      index === _index ? "z-10" : "hover:opacity-50"
     } pointer-events-auto relative size-4 cursor-pointer rounded-full bg-indigo-600`}
    >
     {index === _index && (
      <motion.div
       className="absolute inset-0.5 bg-gray-50 shadow-[0_0_30px_-5px]"
       layoutId="root"
       style={{ borderRadius: 50 }}
       transition={{ duration: 0.7, type: "spring" }}
      ></motion.div>
     )}
    </div>
   ))}
  </div>
 );
}

const MainSlider = () => {
 const [index, setIndex] = useState(0);
 useEffect(() => {
  const clear = setTimeout(
   () => setIndex((p) => (p + 1) % SLIDES.length),
   10_000,
  );
  return () => clearTimeout(clear);
 }, [index]);
 return (
  <div className="relative h-full w-full">
   <Slide slide={SLIDES[index]} />
   <SliderNavigator total={SLIDES.length} onChange={setIndex} index={index} />
  </div>
 );
};

function Slide({ slide }: { slide: (typeof SLIDES)[0] }) {
 const [payload, setPayload] = useState(SLIDES[0]);
 const scope = useRef(null);
 const content = useRef(null);
 const background = useRef(null);

 const Component = payload.action.Component as TagType;
 const props = payload.action.props as ActionProps;

 const { contextSafe, context } = useGSAP({ scope });

 const animateIn = contextSafe(() => {
  gsap.fromTo(
   content.current,
   {
    yPercent: 100,
   },
   {
    yPercent: 0,
   },
  );
  gsap.fromTo(background.current, { opacity: 0 }, { opacity: 1 });
 });

 const animateOut = contextSafe((payload: any) => {
  gsap
   .timeline({
    onComplete: () => {
     setPayload(payload);
     animateIn();
    },
   })
   .to(
    content.current,
    {
     yPercent: 100,
    },
    0,
   )
   .to(background.current, { opacity: 0 }, 0);
 });

 useEffect(() => {
  slide && animateOut(slide);
 }, [slide]);

 return (
  <div ref={scope} className="relative h-full w-full overflow-hidden">
   <div ref={background} className="absolute h-full w-full">
    <AppImage
     src={payload.background}
     alt={payload.title}
     loaderClassName="bg-black/50"
     className="slider-mask object-cover object-center"
    />
   </div>
   <div
    ref={content}
    className="relative flex h-full w-full flex-1 flex-col justify-end gap-2 px-16 py-16"
   >
    <h4 className="font-anton text-5xl font-bold tracking-wider">
     {payload.title}
    </h4>
    <p className="max-w-lg font-dosis text-lg font-medium text-zinc-400">
     {payload.body}
    </p>
    <Component {...(props as any)} />
   </div>
  </div>
 );
}

export default MainSlider;

export type TagType = "a";

export type LinkType = HTMLAttributes<HTMLLinkElement>;

export type ActionProps = LinkType;
