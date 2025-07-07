import { PlatformEnum, Prisma, prisma } from "@smart-moderation-ai/db";
import { FetchingContent } from "../classes/fetching-content.class";
import { InstagramService } from "../../meta/services/instagram.service";


export class InstagramFetchingContent extends FetchingContent {

  private readonly instagramService: InstagramService;

  constructor(token: string) {
    super(token)
    this.instagramService = new InstagramService(token);
  }

  async fetchContent(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({ where: { id: taskId } })
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    const metadata = (task.metadata || {}) as { lastPageId?: string }

    await this.instagramService.everyPosts({
      limit: 10,
      next: metadata?.lastPageId ?? undefined
    }, {
      onPosts: async (posts) => prisma.content.createMany({
        skipDuplicates: true,
        data: posts.map((post) => ({
          userId,
          externalId: post.id,
          externalCreatedAt: new Date(post.timestamp),
          title: post.caption || 'No title',
          imageUrl: post.media_url,
          platform: PlatformEnum.META,
          metadata: {
            type: 'instagram',
            shortcode: post.shortcode
          }
        })) as Prisma.ContentCreateManyInput[]
      }),
      onNextPage: async (nextPageId) => prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          metadata: {
            ...metadata,
            lastPageId: nextPageId
          }
        }
      })
    })
  }
}
