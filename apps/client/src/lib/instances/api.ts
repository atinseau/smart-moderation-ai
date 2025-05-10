import axios from "axios";
import { getAccessToken } from "../functions/getAccessToken.client";
import { getSessionToken } from "../functions/getSessionToken.server";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  const accessToken = typeof window !== "undefined"
    ? getAccessToken()
    : await getSessionToken()

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`)
  }
  return config
})
