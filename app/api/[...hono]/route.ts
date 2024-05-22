import { handle } from "hono/vercel";
import { app } from "@/server";

export const POST = handle(app);
export const GET = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
