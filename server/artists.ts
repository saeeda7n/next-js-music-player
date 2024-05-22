import { Hono } from "hono";
import { getArtist, getArtists } from "@/server/actions/artists";

export const artists = new Hono().basePath("/artists");
artists.get("/", async (c) => {
  return c.json(await getArtists());
});

artists.get("/:slugOrId", async (c) => {
  return c.json(await getArtist(c.req.param("slugOrId")));
});
