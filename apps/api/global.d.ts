declare module "bun" {
  interface Env {
    PORT: string;
    TOKEN_PRIVATE_KEY: string
    AUTH_SECRET: string
    RABBITMQ_DEFAULT_USER: string
    RABBITMQ_DEFAULT_PASS: string
    REDIS_URL: string
    META_APP_ID: string
    META_APP_SECRET: string
  }
}
