import { ThemeProvider } from "@/client/providers/ThemeProvider";
import { reactRenderer } from "@hono/react-renderer";
import { Script } from "honox/server";
import React from "react";

export default reactRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/app/assets/main.css" />
        <Script src="/app/client.ts" async />
        <title>{title ?? "WebSS"}</title>
      </head>
      <React.StrictMode>
        <ThemeProvider defaultTheme="dark">
          <body>{children}</body>
        </ThemeProvider>
      </React.StrictMode>
    </html>
  );
});
