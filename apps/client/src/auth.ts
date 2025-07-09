import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@smart-moderation-ai/db"
import { SESSION_COOKIE_NAME } from "@smart-moderation-ai/shared"
import nextAuthConfig from "./lib/constants/next-auth-config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: SESSION_COOKIE_NAME,
      options: {
        httpOnly: false
      }
    }
  },
  session: {
    strategy: "jwt"
  },
  ...nextAuthConfig,
})
