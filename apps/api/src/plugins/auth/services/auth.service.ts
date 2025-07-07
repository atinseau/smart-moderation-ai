import { decode } from "@auth/core/jwt"
import { prisma } from "@smart-moderation-ai/db"
import { SESSION_COOKIE_NAME } from "@smart-moderation-ai/shared"

export abstract class AuthService {

  static async getUserFromToken(token?: string | null) {
    if (!token) {
      return null
    }
    try {
      const jwt = await decode({
        token,
        salt: SESSION_COOKIE_NAME,
        secret: Bun.env.AUTH_SECRET,
      })

      const email = jwt?.email
      if (!email) {
        return null
      }

      const user = await prisma.user.findFirst({ where: { email } })
      if (!user) {
        return null
      }

      return user
    } catch (e) {
      console.error(e)
    }

    return null
  }

}
