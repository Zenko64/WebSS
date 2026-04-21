import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import build from "@hono/vite-build";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      server: {
        watch: {
          ignored: ["core/**"],
        },
      },
      clearScreen: false,
      resolve: {
        tsconfigPaths: true,
      },
      build: {
        rolldownOptions: {
          input: ["app/client.ts"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/[name]-[hash].js",
            assetFileNames: "static/[name].[ext]",
          },
        },
        emptyOutDir: false,
      },
    };
  } else {
    return {
      clearScreen: false,
      resolve: {
        tsconfigPaths: true,
      },
      server: {
        warmup: {
          ssrFiles: ["./app/index.ts"],
        },
      },
      optimizeDeps: {
        include: [
          "react",
          "react-dom",
          "hono",
          "@hono/react-renderer",
          "honox",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
      },
      ssr: {
        external: [
          "react",
          "react-dom",
          "postgres",
          "drizzle-orm",
          "better-auth",
          "zod",
          "@base-ui/react",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
      },
      plugins: [
        honox({
          client: {
            input: ["app/client.ts"],
            assetsDir: "static",
            jsxImportSource: "@hono/react-renderer",
          },
          entry: "app/index.ts",
          islandComponents: { islandDir: "app/client" },
        }),
        tailwindcss(),
        build({ entry: "app/index.ts" }),
      ],
    };
  }
});
