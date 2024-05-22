"use client";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/server/actions/artists";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import { RiLoader5Fill, RiLoaderFill } from "@remixicon/react";

type Props = {
  params: { slugOrId: string };
};

export default function Page({ params: { slugOrId } }: Props) {
  const { setCurrentArtist } = useAppStore();
  const { data, isPending } = useQuery({
    queryFn: () => getArtist(slugOrId),
    queryKey: ["getArtist", slugOrId],
  });
  useEffect(() => {
    if (data) setCurrentArtist(data);
  }, [data]);
  return isPending ? (
    <div className="pointer-events-none absolute inset-0 z-50 p-10">
      <div className="relative ms-auto flex size-8 items-center  justify-center">
        <RiLoader5Fill className="size-8 animate-spin" />
        <div className="absolute size-6 rounded-full border-[3px] border-white/20"></div>
      </div>
    </div>
  ) : null;
}
