"use client";
import React, { useEffect } from "react";
import { usePlayerStore } from "@/store";

const ClientState = () => {
  const setDimension = usePlayerStore((state) => state.setDimension);
  useEffect(() => {
    setDimension([3, 3]);
  }, []);
  return null;
};

export default ClientState;
