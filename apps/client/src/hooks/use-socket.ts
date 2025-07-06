'use client';

import type { WebSocketPayload } from "@smart-moderation-ai/api"
import { api } from "@/lib/instances/api";
import { EdenWS } from "@elysiajs/eden/treaty";
import { useEffect, useRef, useState } from "react";

type WebSocket = EdenWS<{
  body: unknown;
  params: {};
  query: unknown;
  headers: unknown;
  response: unknown;
}>

export function useSocket() {
  const subscriptionRef = useRef<WebSocket>(null)
  const listenersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())

  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (subscriptionRef.current) {
      console.warn("WebSocket subscription already exists. Reusing the existing subscription.");
      return; // Prevent re-initialization if already set
    }

    const subscription = api.ws.subscribe({
      headers: {
        coucou: 'coucou'
      }
    })

    subscription.on('open', () => setIsOpen(true))
    subscription.on('message', (event) => {
      const payload = event.data as WebSocketPayload
      if (!payload || !('event' in payload) || !('data' in payload)) {
        console.error("Invalid WebSocket message format:", payload);
        return;
      }
      const listeners = listenersRef.current.get(payload.event);
      if (listeners) {
        listeners.forEach((callback) => callback(payload.data));
      } else {
        console.warn(`No listeners found for event: ${payload.event}`);
      }
    })

    subscription.on('error', (event) => {
      setIsError(true)
      console.error("WebSocket error:", event);
    })

    subscriptionRef.current = subscription;
    return () => {
      subscription.close()
    }
  }, [])

  const emit = (event: string, data: unknown) => {
    if (!subscriptionRef.current || !isOpen) {
      console.error("WebSocket is not initialized or is not open.");
      return;
    }

    subscriptionRef.current.send({
      event,
      data
    });
  }

  const on = <T = any>(event: string, callback: (data: T) => void) => {
    const listeners = listenersRef.current.get(event) || new Set();
    listeners.add(callback);
    listenersRef.current.set(event, listeners);
  }

  const once = <T = any>(event: string, callback: (data: T) => void) => {
    const wrappedCallback = (data: any) => {
      callback(data);
      off(event, wrappedCallback);
    };
    on(event, wrappedCallback);
  }

  const off = <T = any>(event: string, callback?: (data: T) => void) => {
    const listeners = listenersRef.current.get(event);
    if (listeners) {
      if (callback) {
        listeners.delete(callback);
        return
      }
      listeners.clear();
      listenersRef.current.delete(event);
      return
    }
    console.warn(`No listeners found for event: ${event}`);
  }

  return {
    isOpen,
    isError,
    on,
    once,
    off,
    emit
  };
}
