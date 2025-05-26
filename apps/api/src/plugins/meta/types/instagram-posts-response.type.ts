

export type InstagramPostsResponse = {
  data: {
    id: string
    media_url: string
    caption?: string
    shortcode: string
    timestamp: string
  }[]
  paging: {
    cursors: {
      before: string
      after: string
    }
    next?: string
    previous?: string
  }
}
