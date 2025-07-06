import Elysia from "elysia";
import { WebSocketService } from "./services/web-socket.service";
import { WEB_SOCKET_BROADCAST } from "./constants";
import { EmitterService } from "@/services/emitter.service";
import { EventEnum } from "@/enums/event.enum";

export default new Elysia()
  .ws('/ws', {
    beforeHandle: ({ body, request }) => {
      console.log('WebSocket connection established', request.url, request.method, request.headers);
    },
    message(_, message) {
      if (message && typeof message !== "object" && !Object.keys(message).length) {
        console.error('Invalid WebSocket message received:', message);
        return;
      }
      EmitterService.emit(EventEnum.WEB_SOCKET_MESSAGE, message)
    },
    open(ws) {
      try {
        ws.subscribe(WEB_SOCKET_BROADCAST)
      } catch (error) {
        console.error('WebSocket connection error:', error)
      }
    },
    close(ws) {
      ws.unsubscribe(WEB_SOCKET_BROADCAST)
    },
  })
