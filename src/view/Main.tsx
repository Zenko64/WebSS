import { Hono } from "hono";

const webApp = new Hono();

webApp.get("*", async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
        </head>
        <body>{content}</body>
      </html>,
    );
  });
  await next()
});

webApp.get("/", async (c) => {
  return c.render(
    <div>
      <h1>Hello World</h1>
    </div>,
  );
});

export default webApp;
