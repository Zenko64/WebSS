/**
 * @file config.ts
 * @name Config
 * @description This file parses and validates the environment variables provided using Zod.
 * It ensures that all required configuration is present before starting the application.
 * @module core/config
 * @author Zenko
 */
import z from "zod";

const configSchema = z.object({
  appUrl: z.url(),
  host: z.string(),
  port: z.number(),
  redisUrl: z.url(),
  secret: z.string().min(32),
});

const env = configSchema.safeParse({
  appUrl: process.env.APP_URL,
  host: process.env.HOST,
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  secret: process.env.SECRET,
});

if (!env.success) {
  throw new Error(
    "An error has occurred while parsing the configuration:",
    env.error,
  );
}

export default env.data;
