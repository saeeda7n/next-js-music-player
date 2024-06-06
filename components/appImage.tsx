"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { RiLoader5Fill } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";

const AppImage = ({
  onError,
  onLoad,
  className,
  loaderClassName,
  ...props
}: ImageProps & { loaderClassName?: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Image
        onError={_onError}
        onLoadingComplete={_onLoadingComplete}
        fill
        className={cn(
          "opacity-0 transition-opacity duration-300",
          {
            "opacity-100": loaded,
          },
          className,
        )}
        {...props}
      />
      {!loaded && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            loaderClassName,
          )}
        >
          <RiLoader5Fill className="size-8 animate-spin" />
        </div>
      )}
    </>
  );

  function _onError() {}

  function _onLoadingComplete() {
    setLoaded(true);
  }
};

export default AppImage;
