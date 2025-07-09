import { treaty } from '@elysiajs/eden'
import type { Application } from "@smart-moderation-ai/api"
import { getAccessToken as getClientAccessToken } from '../functions/getAccessToken.client'
import { getAccessToken as getServerAccessToken } from '../functions/getAccessToken.server'
import { SESSION_COOKIE_NAME } from '@smart-moderation-ai/shared'

export const api = treaty<Application>(process.env.NEXT_PUBLIC_API_URL, {
  async onRequest() {
    const token = typeof window !== 'undefined'
      ? getClientAccessToken()
      : await getServerAccessToken()

    if (typeof window !== "undefined") {
      console.log({
        'Cookie': `${SESSION_COOKIE_NAME}=${token}`
      })
    }

    return {
      credentials: "include",
      headers: {
        "X-Salut": "Hello from Elysia",
        'Cookie': `${SESSION_COOKIE_NAME}=${token}`
      }
    }
  }
})
