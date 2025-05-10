import { ACCESS_TOKEN_KEY } from "../constants/local-storage";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY) || null
}
