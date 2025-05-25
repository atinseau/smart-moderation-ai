import { PlatformEnum, prisma, User } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";
import { MetaService } from "./meta.service";
import { DEFAULT_META_TOKEN_EXPIRATION } from "../constants";


export abstract class MetaConnectionService {
  static async createConnection(user: User, token: string) {

    const metaService = new MetaService(token)
    if (!await metaService.me()) {
      throw new Error('Invalid meta token')
    }

    const longLivedToken = await metaService.getLongLivedToken()
    if (!longLivedToken) {
      throw new Error('Failed to get long lived token from Meta')
    }

    const encryptedToken = await CryptoService.encrypt(longLivedToken.access_token, Bun.env.TOKEN_PRIVATE_KEY)
    const [_, platformConnection] = await prisma.$transaction([
      prisma.platformConnection.deleteMany({
        where: {
          platform: PlatformEnum.META,
        }
      }),
      prisma.platformConnection.create({
        data: {
          userId: user.id,
          platform: PlatformEnum.META,
          token: encryptedToken.toString('hex'),
          // expires_in is in seconds, convert to milliseconds
          expiresAt: new Date(Date.now() + (longLivedToken?.expires_in || DEFAULT_META_TOKEN_EXPIRATION) * 1000),
        }
      })
    ])
    return platformConnection
  }
}
