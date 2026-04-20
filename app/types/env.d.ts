/**
 * @file env.d.ts
 * @name BunEnv
 * @description This file contains type declarations for the env variables consumed by the server.
 * @module types/env
 * @author Zenko
 */
declare module "bun" {
  interface Env {
    APP_URL: string;
    HOST: string;
    PORT: number;
    REDIS_URL: string;
    SECRET: string;
  }
}

declare module "*.css";
