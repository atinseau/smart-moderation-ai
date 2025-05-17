import { AxiosError } from "axios";
import { GenericContent } from "../../contents/types/generic-content.type";
import { MetaService } from "./meta.service";
import { MetaMeAccount } from "../types/meta-me-accounts.type";



export class InstagramService extends MetaService {

  private async getInstagramAccountId() {
    const response = await this.api.get<MetaMeAccount>('/me/accounts', {
      params: {
        fields: ['instagram_business_account'].join(',')
      }
    })
    const instagramAccountId = response?.data?.data?.[0]?.instagram_business_account?.id
    if (!instagramAccountId) {
      throw new Error('No Instagram account found')
    }
    return instagramAccountId
  }

  async posts() {
    try {
      const contents: GenericContent[] = []
      const instagramAccountId = await this.getInstagramAccountId()

      console.log(instagramAccountId)

      return contents
    } catch (e) {
      return []
    }
  }

}
