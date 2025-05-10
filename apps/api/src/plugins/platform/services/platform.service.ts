import { prisma } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";


export abstract class PlatformService {

  static async getConnectedPlatforms(userId: string) {
    const platformConnections = await prisma.platformConnection.findMany({
      where: {
        userId
      }
    })
    return Promise.all(platformConnections.map(async (platformConnection) => {
      const buffer = Buffer.from(platformConnection.token, 'hex')
      const decryptedToken = await CryptoService.decrypt(buffer, Bun.env.TOKEN_PRIVATE_KEY)

      return {
        name: platformConnection.platform,
        createdAt: platformConnection.createdAt,
        token: decryptedToken.toString(),
      }
    }))
  }

  static async getAvailablePlatforms() {
    const platforms = await prisma.platform.findMany()
    return platforms.map((platform) => ({
      name: platform.name,
      description: platform.description,
      label: platform.label,
    }))
  }

}
