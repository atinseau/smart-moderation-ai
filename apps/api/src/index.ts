import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { facebookPlugin } from "./plugins/facebook";
import { prisma } from "./lib/prisma";


const app = new Elysia()
  .use(cors())
  .use(facebookPlugin)
  .get("/", () => "Hello Elysia")
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
