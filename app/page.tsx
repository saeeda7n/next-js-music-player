"use client";
import colors from "tailwindcss/colors";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { cn } from "@/lib/utils";
import AppImage from "@/components/appImage";
import Link from "next/link";
import { RiPlayFill } from "@remixicon/react";
import React from "react";
import ArtistAlbumsSlider from "@/app/(player)/explore/artists/artistAlbumsSlider";

const Page = ({ show = false, close }: any) => {
  return (
    <div className="flex w-full items-center justify-center px-96">
      <div className="flex w-full flex-1 flex-col">
        <div className="flex w-full bg-red-700 py-16">
          <ArtistAlbumsSlider />
        </div>
      </div>
    </div>
  );
};

export default Page;
