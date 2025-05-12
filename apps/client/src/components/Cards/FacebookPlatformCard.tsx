'use client';

import { PlatformCard } from "./PlatformCard";
import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";
import { getFacebookAuthUrl } from "@/lib/functions/getFacebookAuthUrl.client";
import { FACEBOOK_CONNECTION_FAILURE, FACEBOOK_CONNECTION_SUCCESS } from "@/lib/constants/facebook-popup-event";
import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

type FacebookPlatformCardProps = Readonly<{
  isConnected: boolean;
  id: string;
  name: "FACEBOOK";
  description: string | null;
  label: string | null;
}>

export function FacebookPlatformCard(props: FacebookPlatformCardProps) {

  const router = useRouter()
  const [_, startTransition] = useTransition()

  const popupRef = useRef<Window | null>(null)
  const popupClosedIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const closedByEventRef = useRef(false)

  const handlePopupEvent = (event: MessageEvent) => {
    try {
      if (event.origin !== window.location.origin) return;
      if (typeof event.data === "string") {
        const data = JSON.parse(event.data)

        // Disable the interval
        closedByEventRef.current = true

        // Close the popup
        popupRef.current?.close()


        if (data.name === FACEBOOK_CONNECTION_SUCCESS) {
          console.log('Facebook connection success');
          startTransition(() => router.refresh())
        } else if (data.name === FACEBOOK_CONNECTION_FAILURE) {
          console.error('Facebook connection error:', data.data.message);
        }
      }
    } catch (e) {
      console.error('Error handling message from Facebook:', e);
    }
  }

  const handleConfigure = () => {
    const facebookAuthUrl = getFacebookAuthUrl();

    // const facebookAuthUrl = "http://localhost:3000/facebook/callback"

    popupRef.current = openPopupUrl(facebookAuthUrl, "Facebook connection")
    if (!popupRef.current) {
      console.error('Popup blocked or failed to open');
      return
    }

    window.addEventListener('message', handlePopupEvent)

    popupClosedIntervalRef.current = setInterval(() => {
      if (popupRef.current?.closed && !closedByEventRef.current) {
        console.error('Popup closed without event');
        clearInterval(popupClosedIntervalRef.current!)
      }
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (popupClosedIntervalRef.current) {
        clearInterval(popupClosedIntervalRef.current)
      }
      window.removeEventListener('message', handlePopupEvent)
    }
  }, [])

  return <PlatformCard
    key={props.id}
    description={props.description}
    title={props.label || props.name}
    isConnected={props.isConnected}
    onConfigure={handleConfigure}
  />
}
