import { Platform, PlatformConnection, PlatformEnum, prisma } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";


export abstract class PlatformService {

  static decryptedTokenCache: Map<string, string> = new Map()

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

      return platforms.map((platform) => {
        const connectedPlatform = platformConnection.find((connection) => connection.platform === platform.name)
        return {
          ...this.formatPlatform(platform),
          isConnected: !!connectedPlatform,
          expiresAt: connectedPlatform?.expiresAt || null,
        }
      })
    }

    return platforms.map(this.formatPlatform)
  }

  private static async decryptPlatformToken(token: string) {
    if (this.decryptedTokenCache.has(token)) {
      return this.decryptedTokenCache.get(token)!
    }
    const tokenBuffer = Buffer.from(token, 'hex')
    const decryptedToken = await CryptoService.decrypt(tokenBuffer, Bun.env.TOKEN_PRIVATE_KEY)
    const decryptedTokenString = decryptedToken.toString()
    this.decryptedTokenCache.set(token, decryptedTokenString)
    return decryptedTokenString
  }

  static async getPlatformTokenByName(userId: string, platformName: PlatformEnum) {
    const platformConnection = await prisma.platformConnection.findFirst({
      where: {
        userId,
        platform: platformName
      }
    })
    if (!platformConnection) {
      throw new Error("Platform connection not found")
    }
    return this.decryptPlatformToken(platformConnection.token)
  }

  static async getPlatformToken(platformConnection: PlatformConnection) {
    return this.decryptPlatformToken(platformConnection.token)
  }

  static async getPlatformConnections(userId: string) {
    const platformConnections = await prisma.platformConnection.findMany({
      where: {
        userId,
      },
    })
    return platformConnections
  }

}
