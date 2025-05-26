import { PlatformEnum, Prisma, prisma } from "@smart-moderation-ai/db";
import { QueueService } from "../../../services/queue.service";
import { InstagramService } from "../../meta/services/instagram.service";
import { PlatformService } from "../../platform/services/platform.service";

export abstract class FetchContentService {

  private static worker: Worker | null = null;

  static {
    if (Bun.isMainThread) {
      this.initializeWorker();
    }
  }

  /**
  * @description Starts the hydration process for a user on a specific platform.
  * @mainThread
  */
  static async startHydration(taskId: string, userId: string, platform: PlatformEnum) {
    if (!Bun.isMainThread) {
      throw new Error("FetchContentService can only be used on the main thread.");
    }

    const publisher = await QueueService.createPublisher({
      exchanges: [
        {
          exchange: 'fetch-content',
          type: 'direct'
        }
      ]
    })
    await publisher.send({
      exchange: 'fetch-content',
      routingKey: 'start-hydration',
    }, {
      userId,
      platform,
      taskId
    })
  }

  /**
  * @description Initializes the fetch content worker.
  * @mainThread
  */
  static initializeWorker() {
    if (!Bun.isMainThread) {
      throw new Error("FetchContentService can only be initialized on the main thread.");
    }

    try {
      const initializationTimeout = setTimeout(() => {
        throw new Error("Worker initialization failed. Please check the worker script path or configuration.");
      }, 2000)

      if (!this.worker) {
        const worker = new Worker(new URL("../workers/fetch-content.worker.ts", import.meta.url).href)
        worker.onmessage = (event) => {
          if ('type' in event.data && event.data.type === 'ready') {
            console.log("Fetch content worker is ready");
            worker.postMessage({ type: 'start' })
            worker.onmessage = null // Remove the initial message handler
            this.worker = worker;
            clearTimeout(initializationTimeout);
            return
          }
          throw new Error("Unexpected message from fetch content worker: " + JSON.stringify(event.data));
        }
      }
    } catch (error) {
      console.log("Error initializing fetch content worker");
      process.exit(1)
    }
  }

  /**
  * @description Fetches content for a user on a specific platform.
  * @workerThread
  */
  static async fetchContent(taskId: string, userId: string, platform: PlatformEnum) {
    if (Bun.isMainThread) {
      throw new Error("FetchContentService can only be used on the worker thread.");
    }

    const token = await PlatformService.getPlatformTokenByName(userId, platform);

    switch (platform) {
      case "META":
        return this.fetchInstagramContent(taskId, userId, token);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  static async fetchInstagramContent(taskId: string, userId: string, token: string) {
    const instagramService = new InstagramService(token)

    const task = await prisma.task.findFirst({ where: { id: taskId } })
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    const metadata = (task.metadata || {}) as { lastPageId?: string }

    await instagramService.everyPosts({
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
          status: nextPageId === null ? 'COMPLETED' : 'IN_PROGRESS',
          metadata: {
            ...metadata,
            lastPageId: nextPageId
          }
        }
      })
    })
  }
}
