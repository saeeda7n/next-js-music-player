"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getArtist } from "@/server/actions/artists";
import { cn } from "@/lib/utils";
import { ImageNoise } from "@/components/filters/noise";
import AppImage from "@/components/appImage";

type Props = {
  artist?: NonNullable<Awaited<ReturnType<typeof getArtist>>>["next"];
  closed?: boolean;
};

const ArtistNavigator = ({ artist, closed }: Props) => {
  return (
    <section
      className={cn(
        "group relative flex max-w-44 flex-1 overflow-hidden bg-black bg-cover bg-center [transition:max-width_0.3s]",
        { "pointer-events-none max-w-12": closed },
      )}
    >
      <ImageNoise />
      <AnimatePresence mode="wait">
        <motion.div
          key={artist?.id}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0.3, scale: 1 }}
          className="cover-mask absolute inset-0"
        >
          {artist?.backgroundImage && (
            <AppImage
              className="h-full w-full object-cover object-center [filter:url(#coverFilter)]"
              src={artist?.backgroundImage?.url}
              alt={artist?.name}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <Link
        href={`/artists/${artist?.slug}`}
        className="relative flex flex-1 items-center justify-center bg-black/95 transition-colors duration-300 group-hover:bg-black/10"
      >
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={artist?.id}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            className="whitespace-nowrap font-anton text-4xl font-bold uppercase tracking-wider mix-blend-color-dodge [writing-mode:vertical-rl] group-hover:mix-blend-difference"
          >
            {artist?.name}
          </motion.h2>
        </AnimatePresence>
      </Link>
    </section>
  );
};

export default ArtistNavigator;
