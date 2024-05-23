import React, { useState } from "react";
import AppImage from "@/components/appImage";
import ArtistLists from "@/components/artistLists";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/server/actions/artists";

const Page = ({ searchParams }: any) => {
  // const [num, setNum] = useState(1);
  const [name, setName] = useQueryState("artist");
  // const { data } = useQuery({
  //   queryFn: () => getArtist(name!),
  //   queryKey: [name],
  // });
  return (
    <div className="flex flex-1 items-center justify-center">
      {/*<div className="relative h-96 w-96 " onClick={() => setNum(num + 1)}>*/}
      {/*  {JSON.stringify(data)}*/}
      {/*</div>*/}
      {/*{num}*/}
      <ArtistLists />
    </div>
  );
};

export default Page;
