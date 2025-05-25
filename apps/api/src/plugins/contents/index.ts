import Elysia from "elysia";
import authPlugin from "../auth";
import { ContentsService } from "./services/contents.service";

export default new Elysia({ name: "contentsPlugin" })
  .use(authPlugin)
  .get('/contents', ({ user }) => {
    return ContentsService.getContents(user.id)
  })
