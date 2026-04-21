import { createApp } from "honox/server";
import authService from "./routes/api/auth";

const app = createApp();
console.log("Starting server...");
app.route("/api", authService);

export default app;
