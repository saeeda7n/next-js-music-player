"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { AnimatePresence, motion } from "framer-motion";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/components/player/player";
import { usePlayerStore } from "@/store";

type ArtistPageTitleProps = {
  headerTitle?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function AppHeader({
  headerTitle,
  className,
  subtitle,
  ...props
}: ArtistPageTitleProps) {
  const ref = useRef<any>();
  const dimension = usePlayerStore((state) => state.dimension);

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
    <header
      style={
        {
          "--left": dimension[0] + "rem",
          "--right": dimension[1] + "rem",
        } as React.CSSProperties
      }
      ref={ref}
      {...props}
      className={cn(
        "fixed left-[--left] right-[--right] top-0 z-50 space-y-1 px-16 pb-2 leading-[0] duration-300 [transition-property:left,right]",
        className,
      )}
    >
      <div className="overflow-hidden leading-none">{headerTitle}</div>
      <div className="inline-block overflow-hidden">{subtitle}</div>
    </header>
  );
}
