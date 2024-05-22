"use client";
import React, { createContext, PropsWithChildren, useContext } from "react";
type PlayerProps = {};
const playerContext = createContext<PlayerProps | null>(null);

export const usePlayer = () => {
  const thisPlayerContext = useContext(playerContext);
  if (!thisPlayerContext)
    throw new Error("usePlayer has to be used within <PlayerContext.Provider>");
  return thisPlayerContext;
};
const PlayerContext = ({ children }: PropsWithChildren) => {
  return (
    <playerContext.Provider value={null}>{children}</playerContext.Provider>
  );
};

export default PlayerContext;
