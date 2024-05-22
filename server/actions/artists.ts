"use server";
import { db } from "@/lib/drizzle";
import { asc, desc, eq, gt, lt, or, sql } from "drizzle-orm";
import { artistTable, mediaTable } from "@/lib/drizzle/schema";
import { Sleep } from "@/lib/utils";
const media = [
  {
    id: 1,
    name: "Madison Beer",
    slug: "madison-beer",
    created_at: "2024-05-19 23:02:14.55328+03:30",
    updated_at: "2024-05-19 23:02:14.55328+03:30",
    full_name: "Madison Beer",
    background_id: 4,
  },
  {
    id: 3,
    name: "Billie Eilish",
    slug: "billie-eilish",
    created_at: "2024-05-19 23:05:08.54841+03:30",
    updated_at: "2024-05-19 23:05:08.54841+03:30",
    full_name: "Billie Eilish Pirate Baird O'Connell",
    background_id: 2,
  },
  {
    id: 4,
    name: "Chris Brown",
    slug: "chris-brown",
    created_at: "2024-05-19 23:06:07.829025+03:30",
    updated_at: "2024-05-19 23:06:07.829025+03:30",
    full_name: "Christopher Maurice Brown",
    background_id: 3,
  },
  {
    id: 7,
    name: "The Weeknd",
    slug: "the-weeknd",
    created_at: "2024-05-21 21:23:59.191566+03:30",
    updated_at: "2024-05-21 21:23:59.191566+03:30",
    full_name: "Abel Makkonen Tesfaye",
    background_id: 9,
  },
  {
    id: 5,
    name: "Dua Lipa",
    slug: "dua-lipa",
    created_at: "2024-05-19 23:06:48.548077+03:30",
    updated_at: "2024-05-19 23:06:48.548077+03:30",
    full_name: "Dua Lipa",
    background_id: 8,
  },
  {
    id: 8,
    name: "Sabrina Carpenter",
    slug: "sabrina-carpenter",
    created_at: "2024-05-21 21:31:36.411285+03:30",
    updated_at: "2024-05-21 21:31:36.411285+03:30",
    full_name: "Sabrina Annlynn Carpenter",
    background_id: 10,
  },
  {
    id: 9,
    name: "khalid",
    slug: "khalid",
    created_at: "2024-05-21 21:36:19.543331+03:30",
    updated_at: "2024-05-21 21:36:19.543331+03:30",
    full_name: "Khalid Donnel Robinson",
    background_id: 11,
  },
  {
    id: 2,
    name: "Michael Jackson",
    slug: "michael-jackson",
    created_at: "2024-05-21 22:00:09.535369+03:30",
    updated_at: "2024-05-21 22:00:09.535369+03:30",
    full_name: "Michael Joseph Jackson",
    background_id: 12,
  },
  {
    id: 10,
    name: "Charlotte Lawrence",
    slug: "charlotte-lawrence",
    created_at: "2024-05-21 22:12:16.784278+03:30",
    updated_at: "2024-05-21 22:12:16.784278+03:30",
    full_name: "Charlotte Sarah Lawrence",
    background_id: 13,
  },
];
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
