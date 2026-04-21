import { auth } from "../../../core/utils/auth";
import { Hono } from "hono";

const app = new Hono();

app.on(["POST", "GET"], "/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

export default app;
