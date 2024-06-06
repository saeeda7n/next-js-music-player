import { Hono } from "hono";

export const playlists = new Hono().basePath("/playlists");
