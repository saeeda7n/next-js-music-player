import { Hono } from "hono";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { trackTable } from "@/lib/drizzle/schema";

export const tracks = new Hono().basePath("/tracks");
tracks.get("/", async (c) => {
  return c.json(
    await db.query.trackTable.findMany({
      columns: { coverId: false, playableId: false, artistId: false },
      with: {
        artist: { with: { backgroundImage: { columns: { storeKey: true } } } },
        cover: { columns: { storeKey: true } },
        playable: { columns: { storeKey: true } },
      },
    }),
  );
});

tracks.get("/:slug", async (c) => {
  const { slug } = c.req.param();
  return c.json(
    await db.query.trackTable.findFirst({
      where: eq(trackTable.slug, slug),
      with: {
        artist: { with: { backgroundImage: { columns: { storeKey: true } } } },
        cover: { columns: { storeKey: true } },
        playable: { columns: { storeKey: true } },
      },
    }),
  );
});
