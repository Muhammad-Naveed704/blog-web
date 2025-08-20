import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: Cursor) {
    postsCollection(
      first: $first
      after: $after
      orderBy: { created_at: DescNullsLast }
      filter: { published: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          content
          excerpt
          created_at
          updated_at
          profiles {
            id
            full_name
            email
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_POST_BY_ID = gql`
  query GetPostById($id: UUID!) {
    postsCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          content
          excerpt
          created_at
          updated_at
          author_id
          profiles {
            id
            full_name
            email
            avatar_url
          }
        }
      }
    }
  }
`

export const GET_USER_POSTS = gql`
  query GetUserPosts($authorId: UUID!, $first: Int, $after: Cursor) {
    postsCollection(
      first: $first
      after: $after
      filter: { author_id: { eq: $authorId } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        node {
          id
          title
          content
          excerpt
          published
          created_at
          updated_at
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`
