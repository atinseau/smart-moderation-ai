'use client';

import { api } from "@/lib/instances/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function sendToken() {
      const searchParams = new URLSearchParams(window.location.hash)
      const token = searchParams.get('#access_token')
      await api.post('/facebook/auth', { token })
      window.close()
    }
    sendToken()
  }, [])

  return <p>Home</p>
}
