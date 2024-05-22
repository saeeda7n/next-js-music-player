import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { getArtist } from "@/server/actions/artists";

export type AppStoreProps = {
  currentTrackId: number;
  currentArtist: Awaited<ReturnType<typeof getArtist>>;
  setCurrentArtist: (artist: Awaited<ReturnType<typeof getArtist>>) => void;
  setTrackId: (id: number) => void;
  slug: string;
  setSlug: (slug: string) => void;
};

export const useAppStore = create<AppStoreProps>()(
  devtools(
    persist(
      (set) => ({
        slug: "",
        setSlug: (slug) => set((state) => ({ slug })),
        currentArtist: null,
        setCurrentArtist: (artist) =>
          set((state) => ({ currentArtist: (state.currentArtist = artist) })),
        currentTrackId: 0,
        setTrackId: (id) =>
          set((state) => ({ currentTrackId: (state.currentTrackId = id) })),
      }),
      {
        name: "app-storage",
      },
    ),
  ),
);
