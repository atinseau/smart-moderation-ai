import NextAuth from "next-auth"
import nextAuthConfig from "./lib/constants/next-auth-config"

export const { auth: middleware } = NextAuth(nextAuthConfig)
