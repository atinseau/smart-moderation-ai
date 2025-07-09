'use client';

import { PlatformCard } from "./PlatformCard";
import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";
import { getMetaAuthUrl } from "@/lib/functions/getMetaAuthUrl.client";
import { META_CONNECTION_FAILURE, META_CONNECTION_SUCCESS } from "@/lib/constants/meta-popup-event";
import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/instances/api";

type MetaPlatformCardProps = Readonly<{
  name: "META";
  isConnected: boolean;
  id: string;
  description: string | null;
  label: string | null;
  expiresAt?: string | null;
}>

const SUPPORTED_EVENTS = [
  META_CONNECTION_SUCCESS,
  META_CONNECTION_FAILURE
]

export function MetaPlatformCard(props: MetaPlatformCardProps) {

  const router = useRouter()
  const [_, startTransition] = useTransition()

  const popupRef = useRef<Window | null>(null)
  const popupClosedIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const closedByEventRef = useRef(false)

  const handlePopupClose = () => {
    // Disable the interval
    closedByEventRef.current = true

    // Close the popup
    popupRef.current?.close()
  }

  const handlePopupEvent = (event: MessageEvent) => {
    try {
      if (event.origin !== window.location.origin) return;
      if (typeof event.data === "string") {
        const data = JSON.parse(event.data)

        console.log('Received message from Meta:', data);

        if (SUPPORTED_EVENTS.includes(data.name)) {
          switch (data.name) {
            case META_CONNECTION_SUCCESS:
              console.log('Meta connection success');
              startTransition(() => router.refresh());
              break;
            case META_CONNECTION_FAILURE:
              console.error('Meta connection error:', data.data.message);
              break;
          }
          handlePopupClose();
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

  const handleDisconnect = async () => {
    try {
      await api.meta.connection.delete()
      startTransition(() => router.refresh())
    } catch (error) {
      console.error('Error disconnecting from Meta:', error);
    }
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
    onDisconnect={handleDisconnect}
    expiresAt={props.expiresAt}
    imageSrc="/img/meta-logo.webp"
    imageAlt="Meta logo"
  />
}
