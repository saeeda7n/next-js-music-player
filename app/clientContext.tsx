"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayerProvider } from "@/components/player/player";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});

const ClientContext = ({ children }: PropsWithChildren) => {
  return (
    <PlayerProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PlayerProvider>
  );
};

export default ClientContext;
