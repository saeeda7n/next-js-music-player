import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const globalForPrisma = global as unknown as { queryClient: any };

export const queryClient =
  globalForPrisma.queryClient || postgres(process.env.DATABASE_URL as string);

if (process.env.NODE_ENV !== "production")
  globalForPrisma.queryClient = queryClient;
// export const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient, { schema });
