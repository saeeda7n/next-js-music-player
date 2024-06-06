"use server";
import { db } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { mediaTable, trackTable } from "@/lib/drizzle/schema";

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
export async function getTrack(slug: string) {
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
}
