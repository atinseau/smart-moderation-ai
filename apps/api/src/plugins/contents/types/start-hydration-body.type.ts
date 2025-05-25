import { PlatformEnum } from "@smart-moderation-ai/db"

export type StartHydrationBody = {
  userId: string
  taskId: string
  platform: PlatformEnum
}
