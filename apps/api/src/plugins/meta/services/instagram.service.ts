import { MetaService } from "./meta.service";
import { MetaMeAccount } from "../types/meta-me-accounts.type";
import { InstagramPostParams } from "../types/instagram-post-params.type";
import { InstagramPostsResponse } from "../types/instagram-posts-response.type";
import { sleep } from "bun";

export class InstagramService extends MetaService {

  private accountId: string | null = null;

  private async getInstagramAccountId() {
    if (this.accountId) {
      return this.accountId;
    }
    const response = await this.api.get<MetaMeAccount>('/me/accounts', {
      params: {
        fields: ['instagram_business_account'].join(',')
      }
    })
    const instagramAccountId = response?.data?.data?.[0]?.instagram_business_account?.id
    if (!instagramAccountId) {
      throw new Error('No Instagram account found')
    }
    this.accountId = instagramAccountId
    return instagramAccountId
  }

  async posts(params: InstagramPostParams) {
    try {
      const instagramAccountId = await this.getInstagramAccountId()
      const response = await this.api.get<InstagramPostsResponse>(`/${instagramAccountId}/media`, {
        params: {
          limit: params.limit,
          after: params.next,
          fields: [
            'caption',
            'media_url',
            'timestamp'
          ].join(',')
        }
      })
      return response.data
    } catch (e) {
      console.error('Error fetching Instagram posts:', e);
      return null
    }
  }

  async everyPosts(startParams: InstagramPostParams, hooks?: {
    onNextPage?: (nextPageId: string | null) => Promise<any>,
    onPosts?: (posts: InstagramPostsResponse['data']) => Promise<any>
  }) {

    // undefined means we are starting from the first page
    // null means we have reached the end of the pages
    // nextPageId will be set to the next page id if there is a next page
    let nextPageId: string | undefined | null = startParams?.next ?? undefined;

    const posts: InstagramPostsResponse['data'] = [];

    while (nextPageId !== null) {
      console.log('Fetching posts from Instagram', nextPageId)

      const postsResponse = await this.posts({
        ...startParams,
        next: nextPageId
      })

      if (!postsResponse) {
        throw new Error('Failed to fetch posts from Instagram');
      }

      // If there a next property in the response, it means there are more pages to fetch
      // so take the page id from the paging cursors
      nextPageId = postsResponse?.paging.next
        ? postsResponse?.paging?.cursors?.after || null
        : null;

      // If there are posts, call the onPosts callback with the posts data
      if (postsResponse?.data?.length) {
        posts.push(...postsResponse.data || []);
        await hooks?.onPosts?.(postsResponse.data);
      }
      // If there is a next page, call the onNextPage callback with the next page id
      await hooks?.onNextPage?.(nextPageId);

      await sleep(10000)
    }

    console.log('Finished fetching posts from Instagram', posts.length);

    return posts;
  }

}
