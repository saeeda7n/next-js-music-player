"use client";
import React from "react";
import { AppHeader } from "@/components/appHeader";
import { AnimatePresence, motion } from "framer-motion";
import { RiVerifiedBadgeFill } from "@remixicon/react";

type Props = {
  artistName: string;
  artistFullName?: string | null;
};
const ArtistPageHeader = ({ artistName, artistFullName }: Props) => {
  return (
    <AppHeader
      headerTitle={
        <AnimatePresence mode="wait">
          <motion.div
            key={artistName}
            initial={{ y: "-100%" }}
            exit={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ease: "backInOut" }}
            className="flex items-center gap-1"
          >
            <h1 className="font-anton text-[length:calc(var(--titleSize)*1rem)] font-medium uppercase leading-none">
              {artistName}
            </h1>
          </motion.div>
        </AnimatePresence>
      }
      subtitle={
        <AnimatePresence mode="wait">
          <motion.div
            key={artistFullName}
            initial={{ x: "-100%" }}
            exit={{ x: "100%", scaleX: 1 }}
            animate={{ x: 0 }}
            transition={{ ease: "backInOut" }}
            className="flex items-center gap-1 text-[length:calc(var(--subtitleSize)*1rem)]"
          >
            <RiVerifiedBadgeFill className="size-5 text-blue-500" />
            <p className="font-medium">{artistFullName}</p>
          </motion.div>
        </AnimatePresence>
      }
    />
  );
};

export default ArtistPageHeader;
