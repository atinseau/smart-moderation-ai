'use server';

import { cookies as nextCookies } from "next/headers"

export async function getSessionToken() {
  const cookies = await nextCookies()
  const accessToken = cookies.get('authjs.session-token')
  return accessToken?.value || null
}
