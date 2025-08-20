import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

async function getPost(id: string) {
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        id,
        full_name,
        email,
        avatar_url
      )
    `)
    .eq('id', id)
    .eq('published', true)
    .single()

  if (error || !post) {
    return null
  }

  return post
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-4 text-gray-600 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {post.profiles?.full_name?.charAt(0) || post.profiles?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {post.profiles?.full_name || post.profiles?.email || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                Published on {formatDate(post.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  // Use static client to avoid cookies() in build-time context
  const supabase = createStaticClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id')
    .eq('published', true)
    .limit(50) // Generate static pages for first 50 posts

  return posts?.map((post) => ({
    id: post.id,
  })) || []
}
