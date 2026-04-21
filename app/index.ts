/**
 * @name app/index.ts
 * @description The entry point for the HonoX App. It sets up the server and exports it so that Bun runs it.
 * @module app/index.ts
 * @author Zenko
 */
import { createApp } from "honox/server";
import authService from "./routes/api/auth";

const app = createApp();
console.log("Starting server...");
app.route("/api", authService);

export default app;
