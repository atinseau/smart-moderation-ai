import { PlatformEnum, prisma, User } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";
import { MetaService } from "./meta.service";


export abstract class MetaConnectionService {
  static async createConnection(user: User, token: string) {

    const metaService = new MetaService(token)
    if (!await metaService.me()) {
      throw new Error('Invalid meta token')
    }

    const encryptedToken = await CryptoService.encrypt(token, Bun.env.TOKEN_PRIVATE_KEY)
    const [_, newToken] = await prisma.$transaction([
      prisma.platformConnection.deleteMany({
        where: {
          platform: PlatformEnum.META,
        }
      }),
      prisma.platformConnection.create({
        data: {
          userId: user.id,
          platform: PlatformEnum.META,
          token: encryptedToken.toString('hex')
        }
      })
    ])
    return newToken
  }
}
