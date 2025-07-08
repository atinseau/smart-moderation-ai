import Elysia from "elysia";
import { WEB_SOCKET_BROADCAST } from "./constants";
import { EmitterService } from "@/services/emitter.service";
import { EventEnum } from "@/enums/event.enum";
import authPlugin from "../auth";

export default new Elysia()
  .use(authPlugin)
  .ws('/ws', {
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
        ws.subscribe(`${WEB_SOCKET_BROADCAST}:${ws.data.user.id}`)
      } catch (error) {
        console.error('WebSocket connection error:', error)
      }
    },
    close(ws, code, reason) {
      ws.unsubscribe(WEB_SOCKET_BROADCAST)
      ws.unsubscribe(`${WEB_SOCKET_BROADCAST}:${ws.data.user.id}`)
    },
  })
