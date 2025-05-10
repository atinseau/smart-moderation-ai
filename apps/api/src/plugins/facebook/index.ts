import Elysia from "elysia";
import { facebookConnectionCreateRequestDto } from "./dtos/facebook-connection-create-request.dto";
import { FacebookConnectionService } from "./services/facebook-connection.service";
import authPlugin from "../auth";

export default new Elysia({ prefix: "/facebook", name: "facebookPlugin" })
  .use(authPlugin)
  .post('/connection', async ({ body, status, user }) => {
    await FacebookConnectionService.createConnection(user, body.token)
    return status(201, {
      message: 'Connection successfully established with Facebook'
    })
  }, {
    body: facebookConnectionCreateRequestDto
  })
