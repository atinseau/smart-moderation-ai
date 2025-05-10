import axios, { AxiosInstance } from "axios";
import { FacebookMeResponse } from "../types/facebook-me.response.type";



export class FacebookService {

  private readonly api: AxiosInstance

  constructor(token: string) {
    this.api = axios.create({
      baseURL: "https://graph.facebook.com/v22.0",
      params: {
        access_token: token
      }
    })

  }

  async me() {
    try {
      const response = await this.api.get<FacebookMeResponse>('/me', {
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
