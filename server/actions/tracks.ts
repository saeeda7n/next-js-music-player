"use server";
import { db } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { albumTable, mediaTable } from "@/lib/drizzle/schema";
import { cache } from "react";

export async function getRandomTracks() {
 return db.query.trackTable.findMany({
  orderBy: sql`RANDOM()`,
  with: {
   playable: {
    columns: { placeholder: true },
    extras: {
     url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
      "url",
     ),
    },
   },
   artist: {
    columns: { name: true, slug: true },
   },
   cover: {
    columns: { placeholder: true },
    extras: {
     url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
      "url",
     ),
    },
   },
  },
 });
}

export const getTrack = cache(async function (slug: string) {
 return db.query.trackTable.findFirst({
  where: (table, { eq }) => eq(table.slug, slug),
  with: {
   playable: {
    columns: { placeholder: true },
    extras: {
     url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
      "url",
     ),
    },
   },
   artist: {
    columns: { name: true, slug: true },
   },
   cover: {
    columns: { placeholder: true },
    extras: {
     url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
      "url",
     ),
    },
   },
  },
 });
});
