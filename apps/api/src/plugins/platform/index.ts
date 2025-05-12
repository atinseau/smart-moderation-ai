import Elysia from "elysia";
import authPlugin from "../auth";
import { PlatformService } from "./services/platform.service";

export default new Elysia({ name: "platformPlugin" })
  .use(authPlugin)
  .get('/platforms', async ({ user }) => {
    return PlatformService.getPlatforms(user.id)
  })
