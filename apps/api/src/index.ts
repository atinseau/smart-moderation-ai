import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import metaPlugin from "./plugins/meta";
import userPlugin from "./plugins/user";
import authPlugin from "./plugins/auth";
import errorPlugin from "./plugins/error";
import platformPlugin from "./plugins/platform";
import contentsPlugin from "./plugins/contents";
import cronPlugin from "./plugins/cron"
import wsPlugin from "./plugins/ws"

const application = new Elysia()
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
  `🦊 Elysia is running at http://${application.server?.hostname}:${application.server?.port}`
);

export type Application = typeof application;
