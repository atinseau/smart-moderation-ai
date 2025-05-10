import axios from "axios";
import { getAccessToken } from "../functions/getAccessToken.client";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`)
  }
  return config
})
