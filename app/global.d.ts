/**
 * @file global.d.ts
 * @name Global Type Declarations
 * @description This file holds the types for Hono's React Renderer.
 * @see {@link https://github.com/honojs/honox} For more information
 * @author Zenko
 */
import "@hono/react-renderer";

declare module "@hono/react-renderer" {
  interface Props {
    title?: string;
  }
}
