'use client';

import { FACEBOOK_CONNECTION_FAILURE, FACEBOOK_CONNECTION_SUCCESS } from "@/lib/constants/facebook-popup-event";
import { postMessage } from "@/lib/functions/postMessage.client";
import { api } from "@/lib/instances/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function sendToken() {
      const searchParams = new URLSearchParams(window.location.hash)
      const facebookToken = searchParams.get('#access_token')

      if (!facebookToken) {
        postMessage(FACEBOOK_CONNECTION_FAILURE, { message: "No Facebook token" })
        return
      }

      const { data, error } = await api.facebook.connection.post({ token: facebookToken })
      if (error) {
        postMessage(FACEBOOK_CONNECTION_FAILURE, { message: error.value.message || "Unknown error" })
        return
      }
      postMessage(FACEBOOK_CONNECTION_SUCCESS, data)
    }

    sendToken()
  }, [])

  return null
}
