import { Hono } from "hono";
import { artists } from "@/server/artists";
import { tracks } from "@/server/tracks";

export const app = new Hono({}).basePath("/api/v1");

app.route("/", artists);
app.route("/", tracks);
