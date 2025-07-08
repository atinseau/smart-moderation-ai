import { EventEnum } from "@/enums/event.enum";
import { EmitterService } from "@/services/emitter.service";
import { WebSocketService } from "../ws/services/web-socket.service";
import { WebSocketEventEnum } from "@smart-moderation-ai/shared";

EmitterService.on<{ taskId: string, userId: string }>(EventEnum.HYDRATION_COMPLETED, (data) => {
  console.log(`Hydration completed for task ${data.taskId} and user ${data.userId}`);
  WebSocketService.emit(WebSocketEventEnum.HYDRATION_TASK_COMPLETED, {
    taskId: data.taskId
  }, data.userId) // Emit the event to user's WebSocket connection
})
