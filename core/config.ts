import z from "zod";

const configSchema = z.object({
  appUrl: z.url(),
  host: z.string(),
  port: z.coerce.number(),
  redisUrl: z.url(),
  secret: z.string().min(32),
  databaseUrl: z.url(),
});

// This will avoid recalculating the config on every call
let cachedConfig: z.infer<typeof configSchema> | null = null;
export function getConfig() {
  if (cachedConfig) return cachedConfig;

  const env = configSchema.safeParse({
    appUrl: process.env.APP_URL,
    host: process.env.HOST,
    port: process.env.PORT,
    redisUrl: process.env.REDIS_URL,
    secret: process.env.SECRET,
    databaseUrl: process.env.DATABASE_URL,
  });

  if (!env.success) {
    console.error(
      "Config validation failed:",
      JSON.stringify(z.treeifyError(env.error), null, 2),
    );
    throw new Error("Invalid configuration.");
  }

  cachedConfig = env.data;
  return cachedConfig;
}
