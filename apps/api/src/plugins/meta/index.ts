import Elysia from "elysia";
import { metaConnectionCreateRequestDto } from "./dtos/meta-connection-create-request.dto";
import { MetaConnectionService } from "./services/meta-connection.service";
import authPlugin from "../auth";

export default new Elysia({ prefix: "/meta", name: "metaPlugin" })
  .use(authPlugin)
  .post('/connection', async ({ body, status, user }) => {
    await MetaConnectionService.createConnection(user, body.token)
    return status(201, {
      message: 'Connection successfully established with Meta'
    })
  }, {
    body: metaConnectionCreateRequestDto
  })
  .delete('/connection', async ({ user }) => {
    await MetaConnectionService.deleteConnection(user)
    return {
      message: 'Meta connection successfully deleted'
    }
  })
