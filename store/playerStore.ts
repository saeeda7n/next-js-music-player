import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type PlayableTrack = {
 cover: {
  url: string;
  placeholder: string | null;
 };
 playable: {
  url: string;
 } | null;
 id: number;
 name: string;
 slug: string;
 artist: {
  name: string;
  slug: string;
 };
};

type PlaylistProps = {
 key: string | number;
 name: string;
 tracks: PlayableTrack[];
};
export type PlayerStoreProps = {
 setTrack: (track: PlayableTrack) => void;
 setIsReady: (isReady: boolean) => void;
 currentTrack: PlayableTrack | null;
 isReady: boolean;
 dimension: [number, number];
 setDimension: (dimension: [number, number]) => void;
 isPlaying: boolean;
 setIsPlaying: (isPlaying: boolean) => void;
 playlist?: PlaylistProps;
 setPlayList: (playlist: PlaylistProps) => void;
 playNext: () => void;
 playPrevious: () => void;
 clearTrack: () => void;
};

export const usePlayerStore = create<PlayerStoreProps>()(
 devtools(
  persist(
   (set) => ({
    playNext: () =>
     set((state) => {
      const currentIndex = state?.playlist?.tracks.findIndex(
       ({ id }) => id === state.currentTrack?.id,
      );
      if (typeof currentIndex === "number" && currentIndex >= 0) {
       const next =
        state.playlist?.tracks.at(currentIndex + 1) ||
        state.playlist?.tracks.at(0);

       return { currentTrack: (state.currentTrack = next || null) };
      }
      return {};
     }),
    playPrevious: () =>
     set((state) => {
      const currentIndex = state?.playlist?.tracks.findIndex(
       ({ id }) => id === state.currentTrack?.id,
      );
      if (typeof currentIndex === "number" && currentIndex >= 0) {
       const previous = state.playlist?.tracks.at(currentIndex - 1);
       return { currentTrack: (state.currentTrack = previous || null) };
      }
      return {};
     }),
    playlist: undefined,
    setPlayList: (playlist) =>
     set((state) => ({ playlist: (state.playlist = playlist) })),
    dimension: [0, 0],
    setDimension: (dimension) =>
     set((state) => ({ dimension: (state.dimension = dimension) })),
    isReady: false,
    setIsReady: (isReady) =>
     set((state) => ({ isReady: (state.isReady = isReady) })),
    currentTrack: null,
    setTrack: (track: PlayableTrack) =>
     set((state) => ({ currentTrack: (state.currentTrack = track) })),
    isPlaying: false,
    setIsPlaying: (isPlaying) =>
     set((state) => ({ isPlaying: (state.isPlaying = isPlaying) })),
    clearTrack: () =>
     set((state) => ({ currentTrack: (state.currentTrack = null) })),
   }),
   {
    name: "player-storage",
   },
  ),
 ),
);

export type PlayerOptionsStore = {
 autoNext: boolean;
 setAutoNext: (auto: boolean) => void;
 loop: boolean;
 toggleLoop: () => void;
 muted: boolean;
 mute: (mute: boolean) => void;
 volume: number;
 setVolume: (volume: number) => void;
};
export type LoopState = 0 | 1 | 2;

export const usePlayerOptions = create<PlayerOptionsStore>()(
 devtools(
  persist(
   (set) => ({
    muted: false,
    mute: (mute) => set((state) => ({ muted: (state.muted = mute) })),
    autoNext: true,
    setAutoNext: (auto) =>
     set((state) => ({ autoNext: (state.autoNext = auto) })),
    loop: false,
    toggleLoop: () => set((state) => ({ loop: (state.loop = !state.loop) })),
    volume: 1,
    setVolume: (volume) =>
     set((state) => ({ volume: (state.volume = volume) })),
   }),
   {
    name: "player-options-storage",
   },
  ),
 ),
);
