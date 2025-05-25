import Elysia from "elysia";
import cron from "@elysiajs/cron";
import { CronService } from "./services/cron.service";

export default new Elysia({ name: "cronPlugin" })
  .use(
    cron({
      name: "task-cron",
      pattern: "*/1 * * * * *",
      protect: true,
      run: () => CronService.handleCron()
    })
  )
