"use client";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/server/actions/artists";
import { useEffect } from "react";
import { useAppStore } from "@/store";

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
  return null;
}
