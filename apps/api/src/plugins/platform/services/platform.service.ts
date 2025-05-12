import { Platform, prisma } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";


export abstract class PlatformService {

  private static formatPlatform(platform: Platform) {
    return {
      id: platform.id,
      name: platform.name,
      description: platform.description,
      label: platform.label,
      isConnected: false
    }
  }

  static async getPlatforms(userId?: string) {
    const platforms = await prisma.platform.findMany()

    if (userId) {
      const platformConnection = await prisma.platformConnection.findMany({
        where: {
          userId,
        },
      })

      const connectedPlatforms = platformConnection.map((connection) => connection.platform)
      return platforms.map((platform) => ({
        ...this.formatPlatform(platform),
        isConnected: connectedPlatforms.includes(platform.name),
      }))
    }

    return platforms.map(this.formatPlatform)
  }

}
