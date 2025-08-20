export interface User {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  published: boolean
  created_at: string
  updated_at: string
  profiles?: User
}

export interface PostsResponse {
  postsCollection: {
    edges: Array<{
      node: Post
    }>
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

export interface CreatePostInput {
  title: string
  content: string
  excerpt?: string
  author_id: string
}
