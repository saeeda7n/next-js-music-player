"use server";

import { db } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { mediaTable } from "@/lib/drizzle/schema";

export async function getRandomPlaylists() {
 return db.query.playlistTable.findMany({
  columns: {
   ownerId: false,
   backgroundId: false,
   isPublic: false,
  },
  where: (table, { eq }) => eq(table.isPublic, true),
  with: {
   tracks: {
    limit: 3,
    columns: {},
    with: {
     track: {
      columns: { id: true, slug: true, duration: true, title: true },
      with: {
       cover: {
        columns: { placeholder: true },
        extras: {
         url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
          "url",
         ),
        },
       },
       playable: {
        columns: { placeholder: true },
        extras: {
         url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
          "url",
         ),
        },
       },
       artist: { columns: { name: true, slug: true } },
      },
      extras: {},
     },
    },
   },
  },
 });
}
