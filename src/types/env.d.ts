declare module "bun" {
    interface Env {
        APP_URL: string;
        HOST: string;
        PORT: number;
        REDIS_URL: string;
        SECRET: string;
    }
}