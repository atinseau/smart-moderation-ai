import { ContentFetching, ContentFetchingStatus, prisma } from "@smart-moderation-ai/db";
import { InstagramService } from "../../meta/services/instagram.service";
import { PlatformService } from "../../platform/services/platform.service";

export abstract class ContentsService {

  static async getContents(userId: string) {
    const platformConnections = await PlatformService.getPlatformConnections(userId)

    const contentFetchings: ContentFetching[] = []

    const now = performance.now()

    const contents = await prisma.$transaction(async (tx) => {
      for (const platformConnection of platformConnections) {
        let contentFetching = await tx.contentFetching.findFirst({
          where: {
            platform: platformConnection.platform,
          }
        })

        // If no content fetching exists, create one to start content fetching
        if (!contentFetching) {
          contentFetching = await tx.contentFetching.create({
            data: {
              platform: platformConnection.platform,
              status: ContentFetchingStatus.PENDING,
              userId
            }
          })
        }
        contentFetchings.push(contentFetching)
      }

      return tx.content.findMany()
    })

    console.log(`Content fetching took ${performance.now() - now}ms`)

    return {
      contentFetchings,
      contents
    }
  }

}
