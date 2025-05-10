import { PlatformEnum, prisma, User } from "@smart-moderation-ai/db";
import { CryptoService } from "../../../services/crypto.service";
import { FacebookService } from "./facebook.service";


export abstract class FacebookConnectionService {
  static async createConnection(user: User, token: string) {

    const facebookService = new FacebookService(token)
    if (!await facebookService.me()) {
      throw new Error('Invalid facebook token')
    }

    const encryptedToken = await CryptoService.encrypt(token, Bun.env.TOKEN_PRIVATE_KEY)
    const [_, newToken] = await prisma.$transaction([
      prisma.platformConnection.deleteMany({
        where: {
          platform: PlatformEnum.FACEBOOK,
        }
      }),
      prisma.platformConnection.create({
        data: {
          userId: user.id,
          platform: PlatformEnum.FACEBOOK,
          token: encryptedToken.toString('hex')
        }
      })
    ])
    return newToken
  }
}
