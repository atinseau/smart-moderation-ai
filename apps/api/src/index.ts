import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import facebookPlugin from "./plugins/facebook";
import userPlugin from "./plugins/user";
import authPlugin from "./plugins/auth";
import errorPlugin from "./plugins/error";

const application = new Elysia()
  .use(cors())
  .use(errorPlugin)
  .get("/", () => "Hello Elysia")
  .use(authPlugin)
  // After authPlugin, every plugin will be protected by the auth
  .use(facebookPlugin)
  .use(userPlugin)
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at http://${application.server?.hostname}:${application.server?.port}`
);
