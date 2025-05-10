import Elysia, { t } from "elysia";
import { facebookStoreTokenRequestDto } from "./dtos/facebook-store-token-request.dto";
import { FacebookAuthService } from "./services/facebook-auth.service";
import authPlugin from "../auth";

export default new Elysia({ prefix: "/facebook", name: "facebookPlugin" })
  .use(authPlugin)
  .post('/store/token', async ({ body, status, user }) => {
    await FacebookAuthService.storeToken(user, body.token)
    return status(201, {
      message: 'Token stored successfully'
    })
  }, {
    body: facebookStoreTokenRequestDto
  })
