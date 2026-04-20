/**
 * @name app/index.ts
 * @description The entry point for the HonoX App. It sets up the server and exports it so that Bun runs it.
 * @module app/index.ts
 * @author Zenko
 */
import { createApp } from "honox/server";

const app = createApp();

export default app;
