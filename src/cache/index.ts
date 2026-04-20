import { RedisClient } from "bun";
import env from "../core/config";

const redis = new RedisClient(env.redisUrl, {
  autoReconnect: true,
});

export default redis;
