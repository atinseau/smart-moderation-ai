import { app } from "@/application"
import { WebSocketQueue } from "../types/web-socket-queue.type"
import { WebSocketPayload } from "../types/web-socket-payload.type"
import { WEB_SOCKET_BROADCAST } from "../constants"

export class WebSocketService {
  static queue: WebSocketQueue = []

  private static get isReady() {
    try {
      if (this.server.pendingWebSockets === 0) {
        return false
      }
      return true
    } catch { } // Do nothing if an error occurs, e.g., server not initialized
    return false
  }

  private static publish(payload: WebSocketPayload) {
    this.server.publish(WEB_SOCKET_BROADCAST, JSON.stringify(payload), true)
  }

  static emit(event: string, data: unknown) {
    const payload: WebSocketPayload = {
      event,
      data,
    }

    try {
      if (!this.isReady) {
        this.queue.push(payload)
        return
      }
      this.publish(payload)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  static flushQueue() {
    if (this.queue.length === 0 || !this.isReady) {
      return
    }

    for (const [index, payload] of this.queue.entries()) {
      try {
        this.publish(payload)
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
