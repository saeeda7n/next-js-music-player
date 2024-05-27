"use server";
import { db, queryClient } from "@/lib/drizzle";
import { asc, desc, eq, gt, lt, or, sql } from "drizzle-orm";
import {
  artistTable,
  artistToTrackTable,
  mediaTable,
  trackTable,
} from "@/lib/drizzle/schema";
import { Sleep } from "@/lib/utils";
import { tracks } from "@/server/tracks";
import { PgDialect } from "drizzle-orm/pg-core";

export async function getArtists() {
  return db.query.artistTable.findMany({
    with: {
      backgroundImage: {
        columns: {},
        extras: {
          url: sql`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
            "url",
          ),
        },
      },
    },
  });
}

export async function getArtist(slugOrId: string) {
  const where = Number.isNaN(+slugOrId)
    ? eq(artistTable.slug, slugOrId)
    : eq(artistTable.id, +slugOrId);
  const artist = await db.query.artistTable.findFirst({
    where,
    columns: { backgroundId: false },
    with: {
      tracks: {
        limit: 5,
        columns: { coverId: false, playableId: false, artistId: false },
        with: {
          playable: {
            columns: { placeholder: true },
            extras: {
              url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
                "url",
              ),
            },
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
        extras: {
          url: sql<string>`concat('//localhost:3000/api/v1/tracks/',${trackTable.slug})`.as(
            "fetch",
          ),
        },
      },
      backgroundImage: {
        columns: {},
        extras: {
          url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
            "url",
          ),
        },
      },
    },
  });
  if (!artist) return null;
  const [next, previous] = await Promise.all([
    getNextArtist(artist.id),
    getPreviousArtist(artist.id),
  ]);
  return { ...artist, next, previous };
}

export async function getNextArtist(id: number) {
  return (
    (await db.query.artistTable.findFirst({
      orderBy: asc(artistTable.id),
      where: gt(artistTable.id, id),
      columns: { name: true, slug: true, id: true },
      with: {
        backgroundImage: {
          columns: {},
          extras: {
            url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
              "url",
            ),
          },
        },
      },
    })) || null
  );
}

export async function getPreviousArtist(id: number) {
  return (
    (await db.query.artistTable.findFirst({
      orderBy: desc(artistTable.id),
      where: or(lt(artistTable.id, id)),
      columns: { name: true, slug: true, id: true },
      with: {
        backgroundImage: {
          columns: {},
          extras: {
            url: sql<string>`concat('https://cdn.saeedakhshijan.com/',${mediaTable.storeKey})`.as(
              "url",
            ),
          },
        },
      },
    })) || null
  );
}
