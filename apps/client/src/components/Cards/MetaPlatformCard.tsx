'use client';

import { PlatformCard } from "./PlatformCard";
import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";
import { getMetaAuthUrl } from "@/lib/functions/getMetaAuthUrl.client";
import { META_CONNECTION_FAILURE, META_CONNECTION_SUCCESS } from "@/lib/constants/meta-popup-event";
import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

type MetaPlatformCardProps = Readonly<{
  isConnected: boolean;
  id: string;
  name: "META";
  description: string | null;
  label: string | null;
}>

export function MetaPlatformCard(props: MetaPlatformCardProps) {

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


        if (data.name === META_CONNECTION_SUCCESS) {
          console.log('Meta connection success');
          startTransition(() => router.refresh())
        } else if (data.name === META_CONNECTION_FAILURE) {
          console.error('Meta connection error:', data.data.message);
        }
      }
    } catch (e) {
      console.error('Error handling message from Meta:', e);
    }
  }

  const handleConfigure = () => {
    const metaAuthUrl = getMetaAuthUrl();
    popupRef.current = openPopupUrl(metaAuthUrl, "Meta connection")
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
    imageSrc="/img/meta-logo.webp"
    imageAlt="Meta logo"
  />
}
