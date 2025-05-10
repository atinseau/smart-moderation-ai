declare module "bun" {
  interface Env {
    PORT: string;
    TOKEN_PRIVATE_KEY: string
    AUTH_SECRET: string
  }
}
