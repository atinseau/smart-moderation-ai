import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import metaPlugin from "./plugins/meta";
import userPlugin from "./plugins/user";
import authPlugin from "./plugins/auth";
import errorPlugin from "./plugins/error";
import platformPlugin from "./plugins/platform";
import contentsPlugin from "./plugins/contents";
import cronPlugin from "./plugins/cron"
import { sleep } from "bun";

const application = new Elysia()
  .use(cors())
  .use(errorPlugin)
  .use(cronPlugin)
  .get("/", () => "Hello Elysia")
  .use(authPlugin)
  .ws('/ws', {
    async upgrade(context) {
      console.log(context)
      await sleep(20000)

      return Promise.resolve()
    },
    transform(context) {
      console.log(context)
    },
    beforeHandle(context) {
      console.log(context)
    },
    drain(context) {
      console.log(context)
    },
    open: (ws) => {
      console.log('🚀 ~ open:', ws.id);
    },
    message: (ws) => {
      console.log('🚀 ~ message:', ws.id);
    },
    close: (ws) => {
      console.log('🚀 ~ close:', ws.id);
    },
    error: (c) => {
      console.log('error');
    },
  })
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
