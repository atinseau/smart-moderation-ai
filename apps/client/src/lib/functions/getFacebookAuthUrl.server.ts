const permissions = [
  "pages_show_list",
  "instagram_basic",
  "instagram_manage_comments"
]

export function getFacebookAuthUrl() {
  let url = `https://www.facebook.com/v22.0/dialog/oauth?response_type=token`

  url += `&display=popup`
  url += `&client_id=${process.env.FACEBOOK_APP_ID}`
  url += `&redirect_uri=${encodeURIComponent(process.env.CLIENT_REDIRECT_URL)}`
  url += `&auth_type=rerequest`
  url += `&scope=${encodeURIComponent(permissions.join(","))}`

  return url
}
