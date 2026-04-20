import { Hono } from "hono";
import webApp from "./view/Main";

const app = new Hono();

app.route("/", webApp);

export default {
  fetch: app.fetch,
};
