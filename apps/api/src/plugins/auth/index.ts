import Elysia from "elysia";
import { AuthService } from "./services/auth.service";
import { SESSION_COOKIE_NAME } from "@smart-moderation-ai/shared";

export default new Elysia({ name: "authPlugin" })
  .derive({ as: 'scoped' }, async ({ status, cookie }) => {
    const sessionCookie = cookie[SESSION_COOKIE_NAME]
    if (!sessionCookie || !sessionCookie.value) {
      return status(401, 'Unauthorized')
    }

    const user = await AuthService.getUserFromToken(sessionCookie.value)
    if (!user) {
      return status(401, 'Unauthorized')
    }

    return {
      user
    }
  })
