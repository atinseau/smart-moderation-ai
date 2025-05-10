const permissions = [
  "pages_show_list",
  "instagram_basic",
  "instagram_manage_comments",
  "email",
  "instagram_content_publish",
  "instagram_manage_insights",
  "pages_read_engagement",
  "business_management",
  "pages_manage_posts"
]

export function getFacebookAuthUrl() {
  if (typeof window !== "undefined") {
    throw new Error("getFacebookAuthUrl should only be called on the server")
  }

  let url = `https://www.facebook.com/v22.0/dialog/oauth?response_type=token`

  url += `&display=popup`
  url += `&client_id=${process.env.FACEBOOK_APP_ID}`
  url += `&redirect_uri=${encodeURIComponent(process.env.CLIENT_REDIRECT_URL)}`
  url += `&auth_type=rerequest`
  url += `&extras={"setup":{"channel":"IG_API_ONBOARDING"}}`
  url += `&scope=${encodeURIComponent(permissions.join(","))}`

  return url
}
