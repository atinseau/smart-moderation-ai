import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import metaPlugin from "./plugins/meta";
import userPlugin from "./plugins/user";
import authPlugin from "./plugins/auth";
import errorPlugin from "./plugins/error";
import platformPlugin from "./plugins/platform";
import contentsPlugin from "./plugins/contents";

const application = new Elysia()
  .use(cors())
  .use(errorPlugin)
  .get("/", () => "Hello Elysia")
  .use(authPlugin)
  // After authPlugin, every plugin will be protected by the auth
  .use(metaPlugin)
  .use(userPlugin)
  .use(platformPlugin)
  .use(contentsPlugin)
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at http://${application.server?.hostname}:${application.server?.port}`
);

export type Application = typeof application;
