import cron from "@elysiajs/cron";
import { ContentFetchingStatus, prisma } from "@smart-moderation-ai/db";
import { ContentFetchingService } from "./services/content-fetching.service";



export const contentFetchingCron = cron({
  name: "contentFetchingCron",
  pattern: "*/1 * * * * *",
  protect: true,
  run: async () => {
    const contentFetchings = await prisma.contentFetching.findMany({
      where: {
        status: ContentFetchingStatus.PENDING
      }
    })

    for (const contentFetching of contentFetchings) {
      ContentFetchingService.initContentFetching(contentFetching)
    }

  }
})
