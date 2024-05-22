"use client";
import React, { HTMLAttributes } from "react";
import Image from "next/image";
import { RiLoaderFill } from "@remixicon/react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
type Props = HTMLAttributes<HTMLDivElement> & {
  background?: string | null;
  label?: string;
  disabled?: boolean;
  closed?: boolean;
};

const container = cva(
  [
    "group",
    "sticky",
    "top-0",
    "max-h-screen",
    "overflow-hidden",
    "w-full",
    "overflow-hidden",
    "bg-black/30",
    "[transition:max-width_0.3s]",
    "after:absolute after:inset-0 after:transition-colors after:duration-300",
    "after:bg-black/95",
    "hover:after:bg-black/10",
  ],
  {
    variants: {
      closed: {
        true: ["!max-w-0"],
        false: ["max-w-44", "hover:max-w-52"],
      },
      disabled: { true: ["pointer-events-none"] },
    },
    compoundVariants: [
      {
        closed: true,
        className: ["!max-w-12"],
      },
    ],
  },
);

const PageButton = ({
  background,
  label,
  disabled,
  closed,
  ...props
}: Props) => {
  return (
    <section
      role={"button"}
      className={cn("select-none", container({ disabled, closed }))}
      {...props}
    >
      {!!background && (
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
            initial={{ opacity: 0.2 }}
            exit={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "backInOut" }}
            className="h-full w-full"
          >
            <Image
              draggable={false}
              className={cn(
                "cover-mask h-full w-full object-cover object-center [filter:url(#coverFilter)]",
              )}
              src={background}
              width={1920}
              height={1024}
              alt="Name"
            />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="absolute inset-0 z-10 flex items-center justify-center mix-blend-color-dodge group-hover:mix-blend-difference group-has-[.loading]:bg-transparent">
        <AnimatePresence mode="popLayout">
          <motion.h4
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            key={label}
            className="whitespace-nowrap font-anton text-5xl uppercase [writing-mode:vertical-lr]"
          >
            {label}
          </motion.h4>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PageButton;
