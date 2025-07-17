import { prisma, PlatformConnection, Task, TaskStatus, TaskType } from "@smart-moderation-ai/db";
import { PlatformService } from "../../platform/services/platform.service";
import { MetaService } from "../../meta/services/meta.service";
import { PlatformActionService } from "../../platform/services/platform-action.service";

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
          AND: {
            OR: platformConnection.map((connection) => ({
              metadata: {
                path: ['platform'],
                equals: connection.platform
              }
            }))
          }
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
      return tx.content.findMany({
        include: {
          moderation: true
        },
        where: {
          deletedAt: null,
          userId
        }
      })
    })

    console.log(`Content fetching took ${performance.now() - now}ms`)

    return {
      tasks: tasks.filter((task) => task.status !== "COMPLETED"),
      contents
    }
  }

  static async deleteContent(userId: string, contentId: string) {
    try {
      const content = await prisma.content.findFirst({
        where: {
          userId,
          id: contentId
        }
      })
      if (!content) {
        throw new Error("Content not found");
      }
      await PlatformActionService.deletePlatformContent(userId, content.platform, content.externalId)
      await prisma.content.update({
        where: {
          id: contentId
        },
        data: {
          deletedAt: new Date()
        }
      })
    } catch (error) {
      console.error("Error deleting content");
      throw error;
    }
  }

  private static isConnectionTaskExist(connection: PlatformConnection, tasks: Task[]) {
    return !tasks.some((task) => {
      const metadata = task.metadata as { platform: string };
      return metadata?.platform === connection.platform;
    });
  }

}
