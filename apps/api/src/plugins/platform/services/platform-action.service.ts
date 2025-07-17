import { PlatformEnum } from "@smart-moderation-ai/db";
import { PlatformService } from "./platform.service";

export abstract class PlatformActionService {

  static async deletePlatformContent(userId: string, platformName: PlatformEnum, externalId: string) {
    // const token = await PlatformService.getPlatformTokenByName(userId, platformName)
    if (platformName === PlatformEnum.META) {
      throw new Error("Meta platform does not support content deletion via API");
    }
  }

}
