"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";
import AppImage from "@/components/appImage";
import { AnimatePresence, motion } from "framer-motion";
import { SLIDES } from "@/data/slider";

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
      <SliderNavigator
        total={SLIDES.length}
        onChange={setIndex}
        index={index}
      />
    </div>
  );
};

function Slide({
  slide: { action, body, title, background },
}: {
  slide: (typeof SLIDES)[0];
}) {
  const Component = action.Component as TagType;
  const props = action.props as ActionProps;
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute h-full w-full"
          transition={{ ease: "linear" }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={title}
        >
          <AppImage
            src={background}
            alt={title}
            loaderClassName="bg-black/50"
            className="slider-mask object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          transition={{ ease: "linear" }}
          key={title}
          exit={{ opacity: 0, y: "50%" }}
          initial={{ opacity: 0, y: "50%" }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex h-full w-full flex-1 flex-col justify-end gap-2 px-16 py-16"
        >
          <h4 className="font-anton text-5xl font-bold tracking-wider">
            {title}
          </h4>
          <p className="max-w-lg font-dosis text-lg font-medium text-zinc-400">
            {body}
          </p>
          <Component {...(props as any)} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MainSlider;

export type TagType = "a";

export type LinkType = HTMLAttributes<HTMLLinkElement>;

export type ActionProps = LinkType;
