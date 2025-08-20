// import { createBrowserClient } from '@supabase/ssr'

// export const createClient = () => {
//   const  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

//   if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error(
//       'Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
//     )
//   }

//   return createBrowserClient(supabaseUrl, supabaseAnonKey)
// }
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://xxvwcthqlpxvahqwhwiu.supabase.co'
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dndjdGhxbHB4dmFocXdod2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzQzNjAsImV4cCI6MjA3MTI1MDM2MH0.2ytWRQBDTu78VfULmo-BmiB5JjBILD68SQvVwO0kiLU'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
