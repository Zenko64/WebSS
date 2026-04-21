/**
 * @file index.ts
 * @name Redis Client
 * @description Initializes the Redis Client Singleton.
 * @module core/cache
 * @author Zenko
 */
import { RedisClient } from "bun";
import { getConfig } from "../config";

const env = getConfig();
const redis = new RedisClient(env.redisUrl, {
  autoReconnect: true,
});

export default redis;
