'use client';

import { SESSION_COOKIE_NAME } from "@smart-moderation-ai/shared"
import { getCookies } from "./getCookies.client";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null
  }
  return getCookies(SESSION_COOKIE_NAME)
}
