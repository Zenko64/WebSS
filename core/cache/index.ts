import { RedisClient } from "bun";
import { getConfig } from "../config";

const env = getConfig();
const redis = new RedisClient(env.redisUrl, {
  autoReconnect: true,
});

export default redis;
