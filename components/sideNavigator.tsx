"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageNoise } from "@/components/filters/noise";
import AppImage from "@/components/appImage";
import { Route } from "next";

type Props<T extends string> =
 | {
    closed: true;
   }
 | {
    closed?: false;
    id?: string | number;
    url?: Route<T> | URL;
    backgroundImage?: string;
    label?: string;
   };

export const SideNavigator = (props: Props<string>) => {
 const { closed } = props;
 return (
  <aside
   className={cn(
    "group sticky top-0 z-50 flex max-h-screen max-w-40 flex-1 flex-shrink-0 overflow-hidden bg-black bg-cover bg-center [transition:max-width_0.3s]",
    { "pointer-events-none max-w-0 sm:max-w-12": closed },
   )}
  >
   <ImageNoise />
   <AnimatePresence mode="wait">
    {!closed && props.backgroundImage && props.label && (
     <motion.div
      key={props.id}
      initial={{ opacity: 0.0, scale: 1 }}
      animate={{ opacity: 1, scale: 1.05 }}
      exit={{ opacity: 0.0, scale: 1 }}
      className="cover-mask absolute inset-0"
     >
      <AppImage
       className="h-full w-full object-cover object-center [filter:url(#coverFilter)]"
       src={props.backgroundImage}
       alt={props.label}
      />
     </motion.div>
    )}
   </AnimatePresence>
   {!closed && props.url && (
    <Link
     href={props.url as any}
     className="relative flex flex-1 items-center justify-center bg-black/95 py-10 transition-colors duration-300 group-hover:bg-black/10"
    >
     <AnimatePresence mode="popLayout">
      {!closed && (
       <motion.h2
        key={props.id}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        className="whitespace-nowrap font-anton text-4xl font-bold uppercase tracking-wider mix-blend-color-dodge [writing-mode:vertical-rl] group-hover:mix-blend-difference"
       >
        {props.label}
       </motion.h2>
      )}
     </AnimatePresence>
    </Link>
   )}
  </aside>
 );
};
