import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost($object: postsInsertInput!) {
    insertIntopostsCollection(objects: [$object]) {
      records {
        id
        title
        content
        excerpt
        created_at
        updated_at
        author_id
        published
        profiles {
          id
          full_name
          email
        }
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: UUID!, $set: postsUpdateInput!) {
    updatepostsCollection(filter: { id: { eq: $id } }, set: $set) {
      records {
        id
        title
        content
        excerpt
        updated_at
        published
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: UUID!) {
    deleteFrompostsCollection(filter: { id: { eq: $id } }) {
      records {
        id
      }
    }
  }
`

export const CREATE_PROFILE = gql`
  mutation CreateProfile($object: profilesInsertInput!) {
    insertIntoprofilesCollection(objects: [$object]) {
      records {
        id
        email
        full_name
        avatar_url
        created_at
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {
    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {
      records {
        id
        email
        full_name
        avatar_url
        updated_at
      }
    }
  }
`
