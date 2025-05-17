'use client';

import { META_CONNECTION_FAILURE, META_CONNECTION_SUCCESS } from "@/lib/constants/meta-popup-event";
import { postMessage } from "@/lib/functions/postMessage.client";
import { api } from "@/lib/instances/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function sendToken() {
      const searchParams = new URLSearchParams(window.location.hash)
      const metaToken = searchParams.get('#access_token')

      if (!metaToken) {
        postMessage(META_CONNECTION_FAILURE, { message: "No meta token" })
        return
      }

      const { data, error } = await api.meta.connection.post({ token: metaToken })
      if (error) {
        postMessage(META_CONNECTION_FAILURE, { message: error.value.message || "Unknown error" })
        return
      }
      postMessage(META_CONNECTION_SUCCESS, data)
    }

    sendToken()
  }, [])

  return null
}
