import "./events"

import Elysia from "elysia";
import authPlugin from "../auth";
import { ContentsService } from "./services/contents.service";

export default new Elysia({ name: "contentsPlugin" })
  .use(authPlugin)
  .get('/contents', ({ user }) => ContentsService.getContents(user.id))
  .delete('/contents/:id', ({ params, user }) => ContentsService.deleteContent(user.id, params.id))
