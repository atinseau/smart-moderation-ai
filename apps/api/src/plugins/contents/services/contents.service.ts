import { InstagramService } from "../../meta/services/instagram.service";
import { PlatformService } from "../../platform/services/platform.service";
import { GenericContent } from "../types/generic-content.type";


export abstract class ContentsService {

  static async getContents(userId: string) {
    return []
  }

}
