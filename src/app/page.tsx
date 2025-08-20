import PostList from '@/components/blog/PostList'
import SetupGuide from '@/components/setup/SetupGuide'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xxvwcthqlpxvahqwhwiu.supabase.co"
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dndjdGhxbHB4dmFocXdod2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzQzNjAsImV4cCI6MjA3MTI1MDM2MH0.2ytWRQBDTu78VfULmo-BmiB5JjBILD68SQvVwO0kiLU"
  
  return url && 
         key && 
         url !== 'https://your-project.supabase.co' && 
         key !== 'your-anon-key-here' &&
         !url.includes('your-project') &&
         !key.includes('your-anon-key')
}

export default function Home() {
  if (!isSupabaseConfigured()) {
    return <SetupGuide />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to BlogApp
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing stories and share your own thoughts with the world
        </p>
        <Button asChild size="lg">
          <Link href="/create">Start Writing</Link>
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Posts</h2>
        <PostList />
      </div>
    </div>
  )
}