import "./events"

import Elysia from "elysia";
import authPlugin from "../auth";
import { ContentsService } from "./services/contents.service";

export default new Elysia({ name: "contentsPlugin", prefix: "/contents" })
  .use(authPlugin)
  .get('/', ({ user }) => ContentsService.getContents(user.id))
  .delete('/:id', ({ params, user }) => ContentsService.deleteContent(user.id, params.id))
