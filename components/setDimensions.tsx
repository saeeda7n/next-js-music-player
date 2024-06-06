"use client";
import React from "react";
import { usePlayerStore } from "@/store";

const SetDimensions = ({ dimensions }: { dimensions: [number, number] }) => {
 const setDimension = usePlayerStore((state) => state.setDimension);
 setDimension(dimensions);
 return null;
};

export default SetDimensions;
