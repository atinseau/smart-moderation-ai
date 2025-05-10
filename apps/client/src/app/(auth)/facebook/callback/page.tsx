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
      api.post('/facebook/connection', { token: facebookToken })
        .then(() => postMessage(FACEBOOK_CONNECTION_SUCCESS))
        .catch((e) => postMessage(FACEBOOK_CONNECTION_FAILURE, e))
        .finally(() => window.close())
    }

    sendToken()
  }, [])

  return <p>FACEBOOK CALLBACK</p>
}
