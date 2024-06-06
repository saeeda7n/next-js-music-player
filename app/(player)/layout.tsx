import React, { PropsWithChildren } from "react";
import { PlayerProvider } from "@/components/player/player";

const Layout = ({ children }: PropsWithChildren) => {
 return (
  <>
   <PlayerProvider>{children}</PlayerProvider>
  </>
 );
};

export default Layout;
