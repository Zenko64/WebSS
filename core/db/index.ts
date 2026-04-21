import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./auth-schema";
import { getConfig } from "../config";

const config = getConfig();
const client = postgres(config.databaseUrl, { onnotice: (msg) => {} });
export const db = drizzle(client, { schema });

export async function migrateAuth() {
  console.log("Migrating auth database...");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });
  console.log("Auth migrations complete");
}
