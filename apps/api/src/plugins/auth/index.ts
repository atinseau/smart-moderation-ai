import Elysia from "elysia";
import { AuthService } from "./services/auth.service";

export default new Elysia({ name: "authPlugin" })
  .derive({ as: 'scoped' }, async ({ headers, status, request }) => {
    const token = headers['authorization']?.split(' ')?.[1] || null
    const user = await AuthService.getUserFromToken(token)

    if (!user) {
      return status(401, 'Unauthorized')
    }

    return {
      user
    }
  })
