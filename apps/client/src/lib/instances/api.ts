import { treaty } from '@elysiajs/eden'
import type { Application } from "@smart-moderation-ai/api"
import { getAccessToken } from "../functions/getAccessToken.client";
import { getSessionToken } from "../functions/getSessionToken.server";

export const api = treaty<Application>(process.env.NEXT_PUBLIC_API_URL, {
  async onRequest() {
    const accessToken = typeof window !== "undefined"
      ? getAccessToken()
      : await getSessionToken()

    if (accessToken) {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    }
  }
})
