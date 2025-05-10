'use client';

import { api } from "@/lib/instances/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function sendToken() {
      const searchParams = new URLSearchParams(window.location.hash)
      const facebookToken = searchParams.get('#access_token')
      api.post('/facebook/store/token', { token: facebookToken })
        .then(() => window.opener?.postMessage('facebook-token-stored', window.location.origin))
        .catch(() => window.opener?.postMessage('facebook-token-error', window.location.origin))
        .finally(() => window.close())
    }

    sendToken()
  }, [])

  return <p>FACEBOOK CALLBACK</p>
}
