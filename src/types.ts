

  export interface User {
      name: string;
      username: string;
      twitter_username: string;
      github_username: string;
      website_url: string;
      profile_image: string;
      profile_image_90: string;
  }

  export interface Organization {
      name: string;
      username: string;
      slug: string;
      profile_image: string;
      profile_image_90: string;
  }

  export interface FlareTag {
      name: string;
      bg_color_hex: string;
      text_color_hex: string;
  }

  export interface DevToPublishedArticles {
      type_of: string;
      id: number;
      title: string;
      description: string;
      cover_image: string;
      published: boolean;
      published_at: Date;
      tag_list: string[];
      slug: string;
      path: string;
      url: string;
      canonical_url: string;
      comments_count: number;
      positive_reactions_count: number;
      public_reactions_count: number;
      page_views_count: number;
      published_timestamp: Date;
      body_markdown: string;
      user: User;
      reading_time_minutes: number;
      organization: Organization;
      flare_tag: FlareTag;
  }



