import Elysia from "elysia";
import authPlugin from "../auth";
import { ContentsService } from "./services/contents.service";
import { contentFetchingCron } from "./content-fetching.cron";

export default new Elysia({ name: "contentsPlugin" })
  .use(authPlugin)
  .use(contentFetchingCron)
  .get('/contents', ({ user }) => {
    return ContentsService.getContents(user.id)
  })
