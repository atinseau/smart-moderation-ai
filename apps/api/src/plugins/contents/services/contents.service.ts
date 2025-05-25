import { prisma, PlatformConnection, Task, TaskStatus, TaskType } from "@smart-moderation-ai/db";
import { PlatformService } from "../../platform/services/platform.service";

export abstract class ContentsService {

  static async getContents(userId: string) {
    const now = performance.now()
    const platformConnection = await PlatformService.getPlatformConnections(userId)

    const tasks: Task[] = []

    const contents = await prisma.$transaction(async (tx) => {
      tasks.push(...await tx.task.findMany({
        where: {
          type: TaskType.FETCH_CONTENT,
          userId,
          OR: platformConnection.map((connection) => ({
            metadata: {
              path: ['platform'],
              equals: connection.platform
            }
          }))
        }
      }))

      // Create missing tasks for each platform connection
      for (const connection of platformConnection) {
        if (this.isConnectionTaskExist(connection, tasks)) {
          tasks.push(await tx.task.create({
            data: {
              type: TaskType.FETCH_CONTENT,
              status: TaskStatus.PENDING,
              userId,
              metadata: {
                platform: connection.platform
              }
            }
          }))
        }
      }
      return tx.content.findMany()
    })

    console.log(`Content fetching took ${performance.now() - now}ms`)

    return {
      tasks,
      contents
    }
  }

  private static isConnectionTaskExist(connection: PlatformConnection, tasks: Task[]) {
    return !tasks.some((task) => {
      const metadata = task.metadata as { platform: string };
      return metadata?.platform === connection.platform;
    });
  }

}
