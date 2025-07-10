import { treaty } from '@elysiajs/eden'
import type { Application } from "@smart-moderation-ai/api"
import { getAccessToken as getServerAccessToken } from '../functions/getAccessToken.server'
import { SESSION_COOKIE_NAME } from '@smart-moderation-ai/shared'

export const api = treaty<Application>(process.env.NEXT_PUBLIC_API_URL, {
  async onRequest() {
    if (typeof window !== "undefined") {
      return {
        credentials: "include"
      }
    }

    return {
      headers: {
        'Cookie': `${SESSION_COOKIE_NAME}=${await getServerAccessToken()}`
      }
    }
  }
})
