import Elysia from "elysia";
import authPlugin from "../auth";
import { enableModerationRequestDto } from "./dtos/enable-moderation-request.dto";
import { ModerationService } from "./services/moderation.service";


export default new Elysia({ name: "moderationPlugin", prefix: "/moderation" })
  .use(authPlugin)
  .post('/enable', ({ body, user }) => ModerationService.enableModeration(user.id, body.ids), {
    body: enableModerationRequestDto
  })
