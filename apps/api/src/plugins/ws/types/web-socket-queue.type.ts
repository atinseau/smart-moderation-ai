import { WebSocketPayload } from "./web-socket-payload.type";

export type WebSocketQueue = Array<[payload: WebSocketPayload, userId?: string]>
