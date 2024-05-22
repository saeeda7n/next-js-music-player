"use client";
import React from "react";
import ArtistNavigator from "@/app/(player)/artists/(artist)/[slugOrId]/artistNavigator";
import { useAppStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { ImageNoise, TextNoise } from "@/components/filters/noise";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import AppImage from "@/components/appImage";

const Layout = ({ children }: any) => {
  const artist = useAppStore((state) => state.currentArtist);
  if (!artist) return <div>{children}</div>;
  return (
    <>
      <ImageNoise />
      <TextNoise />
      <ArtistNavigator closed={!artist?.previous} artist={artist?.previous} />
      <section className="relative flex min-h-screen flex-1 overflow-hidden bg-black/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, scale: 0.98 }}
            exit={{ opacity: 0.0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "backInOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <AppImage
              loading="eager"
              src={artist.backgroundImage!.url}
              alt={artist.name}
              className="h-full w-full origin-center object-cover object-center blur"
            />
          </motion.div>
        </AnimatePresence>
        <div className="relative flex flex-1 flex-col bg-black/85 px-16 py-28">
          <div>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={artist.id}
                  initial={{ y: "-100%" }}
                  exit={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ ease: "backInOut" }}
                  className="flex items-center gap-1"
                >
                  <h1 className="font-anton text-[length:clamp(4rem,6vw,6rem)] font-medium uppercase leading-none tracking-wide">
                    {artist.name}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="inline-block overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={artist.id}
                  initial={{ x: "-100%" }}
                  exit={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ ease: "backInOut" }}
                  className="flex items-center gap-1"
                >
                  <RiVerifiedBadgeFill className="size-5 text-blue-500" />
                  <p className="font-medium">{artist.fullName}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        {children}
      </section>
      <ArtistNavigator closed={!artist?.next} artist={artist?.next} />
    </>
  );
};

export default Layout;
