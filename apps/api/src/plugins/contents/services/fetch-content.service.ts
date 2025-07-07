import { PlatformEnum } from "@smart-moderation-ai/db";
import { QueueService } from "@/services/queue.service";
import { PlatformService } from "../../platform/services/platform.service";
import { InstagramFetchingContent } from "./instagram-fetching-content.service";
import { FetchingContent } from "../classes/fetching-content.class";
import { EmitterService } from "@/services/emitter.service";
import { EventEnum } from "@/enums/event.enum";

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
      throw new Error("FetchContentService.startHydration can only be used on the main thread.");
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
            this.worker = worker;
            clearTimeout(initializationTimeout);
            return
          }

          if ('type' in event.data && event.data.type === 'hydration-completed') {
            EmitterService.emit(EventEnum.HYDRATION_COMPLETED, { taskId: event.data.taskId, userId: event.data.userId })
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
    let fetchingContent: FetchingContent;

    switch (platform) {
      case "META":
        fetchingContent = new InstagramFetchingContent(token);
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    return fetchingContent.fetchContent(taskId, userId)
  }


}
