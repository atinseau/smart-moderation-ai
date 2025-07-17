import { prisma } from "@smart-moderation-ai/db";




export abstract class ModerationService {

  static async enableModeration(userId: string, ids: string[]): Promise<void> {
    try {
      await prisma.moderation.createMany({
        data: ids.map((id) => ({
          userId,
          contentId: id
        }))
      })
    } catch (error) {
      console.error("Error enabling moderation:", error);
      throw error
    }
  }

}
