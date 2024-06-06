import { Hono } from "hono";
import { artists } from "@/server/artists";
import { tracks } from "@/server/tracks";
import { playlists } from "@/server/playlists";

export const app = new Hono({}).basePath("/api/v1");

app.route("/", artists);
app.route("/", tracks);
app.route("/", playlists);
