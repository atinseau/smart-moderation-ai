'use client';

import { ACCESS_TOKEN_KEY } from "@/lib/constants/local-storage";
import { use } from "react"

export function AccessTokenGuard({ children, accessTokenPromise }: Readonly<{
  children: React.ReactNode,
  accessTokenPromise: Promise<string | null>
}>) {
  const accessToken = use(accessTokenPromise)
  if (typeof window !== "undefined" && !localStorage.getItem(ACCESS_TOKEN_KEY)) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken || '')
  }
  return children
}
