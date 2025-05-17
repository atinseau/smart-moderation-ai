import axios, { AxiosInstance } from "axios";
import { MetaMeResponse } from "../types/meta-me.response.type";

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
      return null
    }
  }

}
