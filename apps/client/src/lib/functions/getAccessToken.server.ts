'use server';

import { cookies as nextCookies } from "next/headers"
import { SESSION_COOKIE_NAME } from "@smart-moderation-ai/shared"

export async function getAccessToken() {
  const cookies = await nextCookies()
  const accessToken = cookies.get(SESSION_COOKIE_NAME)
  return accessToken?.value || null
}
