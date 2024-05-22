import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
