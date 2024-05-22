"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import AppImage from "@/components/appImage";

const Page = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="relative h-96 w-96 ">
        <AppImage
          alt="asdasd"
          className="h-full w-full object-cover object-center"
          src="https://musicc.storage.iran.liara.space/0bf63f77-f46b-4c07-a156-46ccf0366201.webp?111"
        />
      </div>
    </div>
  );
};

export default Page;
