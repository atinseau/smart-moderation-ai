import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

// Importing plugins
import metaPlugin from "./plugins/meta";
import userPlugin from "./plugins/user";
import authPlugin from "./plugins/auth";
import errorPlugin from "./plugins/error";
import platformPlugin from "./plugins/platform";
import contentsPlugin from "./plugins/contents";
import cronPlugin from "./plugins/cron"
import wsPlugin from "./plugins/ws"

export const app = new Elysia()
  .use(cors())
  .use(errorPlugin)
  .use(cronPlugin)
  .use(wsPlugin)
  .get("/", () => "Hello Elysia")
  .use(authPlugin)
  // After authPlugin, every plugin will be protected by the auth
  .use(metaPlugin)
  .use(contentsPlugin)
  .use(userPlugin)
  .use(platformPlugin)
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type * from "./export"
export type Application = typeof app;
