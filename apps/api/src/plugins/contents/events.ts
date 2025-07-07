import { EventEnum } from "@/enums/event.enum";
import { EmitterService } from "@/services/emitter.service";

EmitterService.on<{ taskId: string, userId: string }>(EventEnum.HYDRATION_COMPLETED, (data) => {
  console.log(`Hydration completed for task ${data.taskId} and user ${data.userId}`);
})
