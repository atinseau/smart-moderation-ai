import Elysia from "elysia";
import authPlugin from "../auth";
import { PlatformService } from "./services/platform.service";

export default new Elysia({ name: "platformPlugin" })
  .use(authPlugin)
  .get('/platform/connected', async ({ user }) => {
    const connectedPlatforms = await PlatformService.getConnectedPlatforms(user.id)
    return {
      platforms: connectedPlatforms
    }
  })
  .get('/platform/available', async () => {
    const availablePlatforms = await PlatformService.getAvailablePlatforms()
    return {
      platforms: availablePlatforms
    }
  })
