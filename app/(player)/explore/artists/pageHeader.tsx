"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { AnimatePresence, motion } from "framer-motion";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/components/player/player";

type ArtistPageTitleProps = {
  name: string;
  fullName?: string | null;
} & React.HTMLAttributes<HTMLDivElement>;

export function PageHeader({
  fullName,
  name,
  className,
  ...props
}: ArtistPageTitleProps) {
  const ref = useRef<any>();
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "200 top",
          scrub: 0.2,
        },
      })
      .fromTo(
        ref.current,
        {
          paddingTop: "4rem",
          marginBottom: "0.5rem",
          "--titleSize": 6,
          "--subtitleSize": 1,
        },
        {
          paddingTop: "0.75rem",
          marginBottom: "4rem",
          "--titleSize": 2,
          "--subtitleSize": 0.75,
        },
      )
      .fromTo(
        ref.current,
        {
          background: "#00000000",
        },
        {
          background: "#050505",
        },
        "-=50%",
      );
  });
  return (
    <div
      ref={ref}
      {...props}
      className={cn("sticky top-0 space-y-1 px-16 pb-2 leading-[0]", className)}
    >
      <div className="overflow-hidden leading-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={name}
            initial={{ y: "-100%" }}
            exit={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ease: "backInOut" }}
            className="flex items-center gap-1"
          >
            <h1 className="font-anton text-[length:calc(var(--titleSize)*1rem)] font-medium uppercase leading-none">
              {name}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="inline-block overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={fullName}
            initial={{ x: "-100%" }}
            exit={{ x: "100%", scaleX: 1 }}
            animate={{ x: 0 }}
            transition={{ ease: "backInOut" }}
            className="flex items-center gap-1 text-[length:calc(var(--subtitleSize)*1rem)]"
          >
            <RiVerifiedBadgeFill className="size-5 text-blue-500" />
            <p className="font-medium">{fullName}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
