import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1 `,
})

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from Supabase
  if (typeof window !== 'undefined') {
    const { createClient } = await import('./supabase/client')
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    return {
      headers: {
        ...headers,
        authorization: session?.access_token ? `Bearer ${session.access_token}` : "",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    }
  }

  return {
    headers: {
      ...headers,
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})
