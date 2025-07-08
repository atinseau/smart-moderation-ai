'use client';

import type { WebSocketPayload } from "@smart-moderation-ai/api"
import { useCallback, useEffect, useRef, useState } from "react";

let referenceCount = 0
let ws: WebSocket | null = null

export function useSocket() {
  const [isOpen, setIsOpen] = useState(ws && ws.readyState === WebSocket.OPEN)
  const [isError, setIsError] = useState(false)
  const listenersMapRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())

  const isMountedRef = useRef(false)

  const handleOpen = useCallback(() => setIsOpen(true), [])

  const handleMessage = useCallback((event: MessageEvent<string>) => {
    const payload = JSON.parse(event.data) as WebSocketPayload;
    if (!payload || !('event' in payload) || !('data' in payload)) {
      console.error("Invalid WebSocket message format:", payload);
      return;
    }
    const listeners = listenersMapRef.current.get(payload.event);
    if (listeners) {
      listeners.forEach((callback) => callback(payload.data));
    } else {
      console.warn(`No listeners found for event: ${payload.event}`);
    }
  }, [])

  const handleError = useCallback((event: Event) => {
    setIsError(true)
    console.error("WebSocket error:", event);
  }, [])


  const emit = (event: string, data: unknown) => {
    if (!ws || !isOpen) {
      console.error("WebSocket is not initialized or is not open.");
      return;
    }

    ws.send(JSON.stringify({
      event,
      data
    }));
  }

  const on = useCallback(<T = any>(event: string, callback: (data: T) => void) => {
    const listeners = listenersMapRef.current.get(event) || new Set();
    if (listeners.has(callback)) {
      console.warn(`Callback for event "${event}" is already registered.`);
      return;
    }
    listeners.add(callback);
    listenersMapRef.current.set(event, listeners);
  }, [])

  const once = useCallback(<T = any>(event: string, callback: (data: T) => void) => {
    const wrappedCallback = (data: any) => {
      callback(data);
      off(event, wrappedCallback);
    };
    on(event, wrappedCallback);
  }, [])

  const off = useCallback(<T = any>(event: string, callback?: (data: T) => void) => {
    const listeners = listenersMapRef.current.get(event);
    if (listeners) {
      if (callback) {
        listeners.delete(callback);
        return
      }
      listeners.clear();
      listenersMapRef.current.delete(event);
      return
    }
    console.warn(`No listeners found for event: ${event}`);
  }, [])


  useEffect(() => {
    if (isMountedRef.current) {
      console.warn("useSocket has already been initialized. Skipping re-initialization.");
      return; // Prevent re-initialization if already mounted
    }

    if (!ws && referenceCount <= 0) {
      console.log("Creating new WebSocket connection", ws, referenceCount);
      ws = new WebSocket("ws://localhost:8080/ws")
    }

    if (!ws) {
      console.error("WebSocket is not initialized. Cannot attach event listeners.");
      return; // Prevent attaching listeners if WebSocket is not initialized
    }

    // Attach event of this hook instance to the WebSocket
    ws.addEventListener('open', handleOpen)
    ws.addEventListener('message', handleMessage)
    ws.addEventListener('error', handleError)

    referenceCount += 1;
    isMountedRef.current = true;
  }, [])

  useEffect(() => {
    // If the WebSocket is not initialized or not open, do nothing
    if (!ws || !isOpen) {
      return
    }

    return () => {
      console.log("Cleaning up WebSocket subscription", ws, referenceCount);
      if (!ws) {
        console.warn("No WebSocket subscription to clean up.");
        return;
      }

      // Remove event listeners of this hook instance from the WebSocket
      ws.removeEventListener('error', handleError)
      ws.removeEventListener('open', handleOpen)
      ws.removeEventListener('message', handleMessage)

      // Decrement the reference count
      referenceCount -= 1;

      // If reference count is zero, close the WebSocket and clean up
      if (referenceCount <= 0 && ws.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        ws.close();
        ws = null; // Clear the WebSocket reference
      }
    }
  }, [isOpen])

  return {
    isOpen,
    isError,
    on,
    once,
    off,
    emit
  };
}
