import { app } from "@/application"
import { WebSocketQueue } from "../types/web-socket-queue.type"
import { WebSocketPayload } from "../types/web-socket-payload.type"
import { WEB_SOCKET_BROADCAST } from "../constants"

export class WebSocketService {
  static queue: WebSocketQueue = []

  static MAX_QUEUE_SIZE = 100

  private static get isReady() {
    try {
      if (this.server.pendingWebSockets === 0) {
        return false
      }
      return true
    } catch { } // Do nothing if an error occurs, e.g., server not initialized
    return false
  }

  private static publish(payload: WebSocketPayload, userId?: string) {
    const topic = userId
      ? `${WEB_SOCKET_BROADCAST}:${userId}`
      : WEB_SOCKET_BROADCAST

    console.log(`Publishing WebSocket message to topic: ${topic}`, payload)
    this.server.publish(topic, JSON.stringify(payload), true)
  }

  static emit(event: string, data: unknown, userId?: string) {
    const payload: WebSocketPayload = {
      event,
      data,
    }

    try {
      if (!this.isReady) {
        if (this.queue.length >= this.MAX_QUEUE_SIZE) {
          console.warn(`WebSocket queue is full (${this.MAX_QUEUE_SIZE} items). Dropping oldest message.`)
          this.queue.shift() // Remove the oldest message if the queue is full
        }
        this.queue.push([payload, userId])
        return
      }
      this.publish(payload, userId)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  static flushQueue() {
    if (this.queue.length === 0 || !this.isReady) {
      return
    }

    console.log(`Flushing WebSocket queue with ${this.queue.length} items`)
    for (const [index, [payload, userId]] of this.queue.entries()) {
      try {
        this.publish(payload, userId)
        this.queue.splice(index, 1) // Remove the successfully sent payload
      } catch (error) {
        // Keep in the queue if an error occurs
      }
    }
  }

  static get server() {
    if (!app.server) {
      throw new ReferenceError('WebSocket server is not initialized. Please ensure the server is running before accessing it.')
    }
    return app.server
  }
}
