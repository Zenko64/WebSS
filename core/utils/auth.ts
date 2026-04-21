import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/auth-schema";
import { getConfig } from "../config";

const config = getConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: config.appUrl,
  secret: config.secret,
  emailAndPassword: { enabled: true },
});
