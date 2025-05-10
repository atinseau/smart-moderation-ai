'use client';

import { FACEBOOK_CONNECTION_FAILURE, FACEBOOK_CONNECTION_SUCCESS } from "@/lib/constants/facebook-popup-event";
import { useEffect } from "react";

type FacebookAuthButtonWrapperProps = Readonly<{
  children: React.ReactNode
}>

export function FacebookAuthButtonWrapper({ children }: FacebookAuthButtonWrapperProps) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      try {
        if (event.origin !== window.location.origin) return;

        if (typeof event.data === "string") {
          const data = JSON.parse(event.data)

          if (data.name === FACEBOOK_CONNECTION_SUCCESS) {
            console.log('Facebook connection success:', data);
          } else if (data.name === FACEBOOK_CONNECTION_FAILURE) {
            console.error('Facebook connection error:', data.data.message);
          }
        }
      } catch (e) {
        console.error('Error handling message from Facebook:', e);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return children
}
