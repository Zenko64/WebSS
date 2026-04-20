import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import build from "@hono/vite-build";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
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
      resolve: {
        tsconfigPaths: true,
      },
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        honox({
          entry: "app/index.ts",
        }),
        tailwindcss(),
        build({ entry: "app/index.ts" }),
        
      ],
    };
  }
});
