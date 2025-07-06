import Elysia from "elysia";
import cron from "@elysiajs/cron";
import { CronService } from "./services/cron.service";
import { WebSocketService } from "../ws/services/web-socket.service";

export default new Elysia({ name: "cronPlugin" })
  .use(
    cron({
      name: "task-cron",
      pattern: "*/1 * * * * *",
      protect: true,
      run: () => CronService.handleCron()
    }),
  )
  .use(
    cron({
      name: 'websocket-queue',
      pattern: '*/1 * * * * *',
      protect: true,
      run: () => WebSocketService.flushQueue()
    })
  )
