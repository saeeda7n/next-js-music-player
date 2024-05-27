"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { RiPlayFill } from "@remixicon/react";
import { getArtist } from "@/server/actions/artists";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { PlayableTrack, usePlayerStore } from "@/store";

const ArtistTrackList = ({
  tracks,
  previous,
  next,
  name,
  id,
}: ArtistTrackListProps) => {
  const ALLOWED_DURATION = 0.3;
  const setTrack = usePlayerStore(({ setTrack }) => setTrack);
  const setPlaylist = usePlayerStore(({ setPlayList }) => setPlayList);
  const currentTrack = usePlayerStore(({ currentTrack }) => currentTrack);
  const setDimension = usePlayerStore(({ setDimension }) => setDimension);

  useEffect(() => {
    setDimension([previous ? 10 : 3, next ? 10 : 3]);
  }, [previous, next]);

  const variantsBoxContainer: Variants = {
    init: ({ index, total }) => ({
      opacity: 0,
      y: -index * 40 + "%",
      transition: {
        delay: index * (ALLOWED_DURATION / total),
        ease: "backInOut",
      },
    }),
    exit: ({ index, total }) => ({
      opacity: 0,
      y: (total - index) * 40 + "%",
      transition: {
        delay: index * (ALLOWED_DURATION / total),
        ease: "backInOut",
      },
    }),
    animate: ({ index, total }) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * (ALLOWED_DURATION / total),
        ease: "backInOut",
      },
    }),
  };

  function setPlaylistAndTrack(track: PlayableTrack) {
    setTrack(track);
    setPlaylist({ name: `${name} Top 5`, key: id, tracks });
  }

  return (
    <div className="space-y-2">
      <ul className="max-w-96">
        <AnimatePresence mode="wait">
          {tracks.map((track, index) => (
            <motion.li
              data-type={"track"}
              custom={{ index: index, total: tracks.length }}
              variants={variantsBoxContainer}
              exit="exit"
              initial="init"
              animate="animate"
              key={track.id}
            >
              <TrackPlayCard
                track={track}
                isPlaying={currentTrack?.id === track.id}
                onPressPlay={setPlaylistAndTrack}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ArtistTrackList;

function TrackPlayCard({ track, isPlaying, onPressPlay }: TrackPlayCardProps) {
  return (
    <div
      className={cn("group flex cursor-pointer flex-wrap items-center", {
        active: isPlaying,
        canPlay: track.playable,
      })}
      key={track.id}
    >
      <button
        onClick={() =>
          onPressPlay && onPressPlay({ ...track, playable: track.playable! })
        }
        className="absolute -translate-x-6 opacity-0 transition duration-300 group-hover:opacity-100 group-[.active]:-translate-x-1.5 group-[.active]:opacity-100 group-[.canPlay]:group-hover:-translate-x-1.5"
      >
        <RiPlayFill className="size-5" />
      </button>
      <span
        className={
          "font-dosis flex h-9 items-center text-xl tracking-wider text-gray-400 transition duration-300 group-[.active]:translate-x-5 group-[.active]:font-medium group-[.active]:text-gray-50  group-[.canPlay]:group-hover:translate-x-5 group-[.canPlay]:group-hover:text-gray-200"
        }
      >
        {track.name}
      </span>
    </div>
  );
}

export type ArtistTrackListProps = Pick<
  NonNullable<Awaited<ReturnType<typeof getArtist>>>,
  "tracks" | "previous" | "next" | "id" | "name"
>;
export type ArtistTracks = ArtistTrackListProps["tracks"];

export type TrackPlayCardProps = {
  track: ArtistTracks[0];
  isPlaying?: boolean;
  onPressPlay?: (track: PlayableTrack) => void;
};
