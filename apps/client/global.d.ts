declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      CLIENT_REDIRECT_URL: string
      AUTH_SECRET: string
      FACEBOOK_APP_ID: string
    }
  }
}

export { }
