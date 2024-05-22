import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { RiLoader5Fill } from "@remixicon/react";

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
        className={cn(className)}
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
