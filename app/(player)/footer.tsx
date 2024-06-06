"use client";
import React from "react";
import { usePlayerStore } from "@/store";
import { cn } from "@/lib/utils";
const tools = [
 "Text to speech",
 "Extract track text",
 "Find lyrics",
 "Download youtube Mp3",
 "Ask for a song",
];

const links = [
 "Latest track",
 "Explore artists",
 "Explore tracks",
 "Explore albums",
 "Explore events around you",
];

const socials = ["Instagram", "Telegram", "Linkedin", "Youtube", "Facebook"];

const api = ["API Access", "Source code", "Pricing", "Open Api"];

const footer = ["Privacy policy", "Terms of use", "Site map"];

const Footer = () => {
 const isPlayerOpen = !!usePlayerStore((state) => state.currentTrack);
 return (
  <footer
   className={cn(
    "relative space-y-8 bg-[#050505] px-16 pb-5 pt-10 duration-300 [transition-property:padding-bottom]",
    {
     "pb-36": isPlayerOpen,
    },
   )}
  >
   <div className="grid grid-cols-5">
    <div className="flex flex-col space-y-2 font-dosis">
     <h6 className="text-lg font-semibold text-zinc-300">Tools</h6>
     <ul>
      {tools.map((item) => (
       <li
        key={item}
        className="font-medium text-zinc-600 transition duration-300 hover:text-zinc-300"
       >
        <a href="">{item}</a>
       </li>
      ))}
     </ul>
    </div>
    <div className="flex flex-col space-y-2 font-dosis">
     <h6 className="text-lg font-semibold text-zinc-300">Find here</h6>
     <ul>
      {links.map((item) => (
       <li
        key={item}
        className="font-medium text-zinc-600 transition duration-300 hover:text-zinc-300"
       >
        <a href="">{item}</a>
       </li>
      ))}
     </ul>
    </div>
    <div className="flex flex-col space-y-2 font-dosis">
     <h6 className="text-lg font-semibold text-zinc-300">Social</h6>
     <ul>
      {socials.map((item) => (
       <li
        key={item}
        className="font-medium text-zinc-600 transition duration-300 hover:text-zinc-300"
       >
        <a href="">{item}</a>
       </li>
      ))}
     </ul>
    </div>
    <div className="flex flex-col space-y-2 font-dosis">
     <h6 className="text-lg font-semibold text-zinc-300">Open Data</h6>
     <ul>
      {api.map((item) => (
       <li
        key={item}
        className="font-medium text-zinc-600 transition duration-300 hover:text-zinc-300"
       >
        <a href="">{item}</a>
       </li>
      ))}
     </ul>
    </div>
   </div>
   <div className="flex justify-between border-t border-zinc-900 pt-4">
    <p className="font-dosis text-sm text-zinc-500">
     Copyright © {new Date().getFullYear()} ~ Site name ~. All rights reserved.
    </p>

    {/*<ul className="flex items-center gap-2 font-dosis text-sm font-medium">*/}
    {/*  {footer.map((item) => (*/}
    {/*    <li*/}
    {/*      key={item}*/}
    {/*      className="flex items-center gap-2 after:inline-block after:h-4 after:border-r last:after:border-r-0"*/}
    {/*    >*/}
    {/*      <a href="">{item}</a>*/}
    {/*    </li>*/}
    {/*  ))}*/}
    {/*</ul>*/}
    <a className="font-dosis text-sm text-zinc-500" href="">
     English/USA
    </a>
   </div>
  </footer>
 );
};

export default Footer;
