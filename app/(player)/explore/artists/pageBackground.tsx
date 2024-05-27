"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppImage from "@/components/appImage";
import { cn } from "@/lib/utils";

type Props = {
  id: string | number;
  alt: string;
  src: string;
};
const PageBackground = ({ src, alt, id }: Props) => {
  return (
    <div className={cn("sticky top-0 h-lvh w-full overflow-hidden")}>
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 1 }}
          exit={{ opacity: 0.0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "linear" }}
          className="h-full w-full overflow-hidden"
        >
          <AppImage
            loading="eager"
            src={src}
            alt={alt}
            className="h-full w-full origin-center scale-105 object-cover object-top blur"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageBackground;
