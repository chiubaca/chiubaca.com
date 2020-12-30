/* eslint-disable camelcase */
declare module DevTo {
  export interface User {
    name: string
    username: string
    twitter_username?: any
    github_username: string
    website_url?: any
    profile_image: string
    profile_image_90: string
  }

  export interface Article {
    type_of: string
    id: number
    title: string
    description: string
    published: boolean
    published_at: Date
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    page_views_count: number
    published_timestamp: Date
    body_markdown: string
    positive_reactions_count: number
    cover_image: string
    tag_list: string[]
    canonical_url: string
    user: User
  }
  export interface ArticleBySlug {
    type_of: string
    id: number
    title: string
    description: string
    readable_publish_date: string
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    collection_id?: any
    published_timestamp: Date
    positive_reactions_count: number
    cover_image: string
    social_image: string
    canonical_url: string
    created_at: Date
    edited_at: Date
    crossposted_at?: any
    published_at: Date
    last_comment_at: Date
    tag_list: string
    tags: string[]
    body_html: string
    body_markdown: string
    user: User
  }
}

declare module 'vfile-reporter'
declare module 'rehype-format'
