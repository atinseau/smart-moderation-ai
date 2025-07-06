import axios, { AxiosError, AxiosInstance } from "axios";
import { MetaLongLivedToken } from "../types/meta-long-lived-token.type";
import { MetaMeResponse } from "../types/meta-me-response.type";

export class MetaService {

  protected readonly api: AxiosInstance

  constructor(protected token: string) {
    this.api = axios.create({
      baseURL: "https://graph.facebook.com/v22.0",
      params: {
        access_token: token
      }
    })

  }

  async me() {
    try {
      const response = await this.api.get<MetaMeResponse>('/me', {
        params: {
          fields: ['email', 'name'].join(',')
        }
      })
      return response.data
    } catch (e) {
      console.error("Error fetching user data from Meta:", e);
      return null
    }
  }

  async getLongLivedToken() {
    try {
      const response = await this.api.get<MetaLongLivedToken>('/oauth/access_token', {
        params: {
          access_token: null,
          grant_type: 'fb_exchange_token',
          client_id: Bun.env.META_APP_ID,
          client_secret: Bun.env.META_APP_SECRET,
          fb_exchange_token: this.token
        }
      })

      return response.data
    } catch (e) {
      console.log("Error fetching long-lived token from Meta:", e);
      return null;
    }
  }

}
