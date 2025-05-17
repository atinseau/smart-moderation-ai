declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_CLIENT_REDIRECT_URL: string
      NEXT_PUBLIC_META_APP_ID: string


      AUTH_SECRET: string
    }
  }
}

export { }
