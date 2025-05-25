import { PlatformEnum, prisma, Task, TaskStatus, TaskType } from "@smart-moderation-ai/db";
import { FetchContentService } from "../../contents/services/fetch-content.service";


export abstract class CronService {

  private static SUPPORTED_TASK_TYPES: TaskType[] = [
    "FETCH_CONTENT"
  ];

  private static handleFetchContentTask(task: Task) {
    const metadata = (task?.metadata || {}) as { platform: PlatformEnum };
    if (typeof task.metadata !== 'object' || !('platform' in metadata)) {
      throw new Error(`Invalid metadata for task ${task.id}`);
    }
    return FetchContentService.startHydration(task.id, task.userId, metadata.platform)
  }

  private static async handleTask(task: Task) {
    try {
      // Update the task only if it is a supported type
      if (this.SUPPORTED_TASK_TYPES.includes(task.type)) {
        await prisma.task.update({
          where: { id: task.id },
          data: { status: TaskStatus.IN_PROGRESS }
        })
      }

      switch (task.type) {
        case "FETCH_CONTENT":
          await this.handleFetchContentTask(task);
          break;
        default:
          console.log('No processor for task type:', task.type);
      }
    } catch (error) {
      console.error(error);
      // If an error occurs, update the task status to FAILED
      await prisma.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.FAILED,
        }
      });
    }
  }

  static async handleCron() {
    const tasks = await prisma.task.findMany({
      where: {
        status: TaskStatus.PENDING
      }
    })

    const queue: Promise<void>[] = [];
    for (const task of tasks) {
      queue.push(this.handleTask(task))
    }
    await Promise.all(queue);
  }

}
