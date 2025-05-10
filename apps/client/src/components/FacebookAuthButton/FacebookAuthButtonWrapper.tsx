'use client';

import { useEffect } from "react";

export function FacebookAuthButtonWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data === "facebook-token-stored") {
        console.log("Token stored successfully");
      } else if (event.data === "facebook-token-error") {
        console.log("Error storing token");
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return children
}
