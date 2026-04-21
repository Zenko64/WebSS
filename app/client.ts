/**
 * @file client.ts
 * @name Client Entry Point
 * @description This is the Client-Side JS Entry Point. It intializes the Honox Client and sets up the hydration and element creator function.
 * @module app/client
 * @author Zenko
 */
import { createClient } from "honox/client";

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(root, elem as any); // Type ANY to supress a Type Error that doesn't cause the crash at runtime.
  },
  createElement: async (type: any, props: any) => {
    const { createElement } = await import("react");
    return createElement(type, props) as any;
  },
});
