import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { createClient as createBrowserSupabase } from '@/lib/supabase/client'
import { cookies } from 'next/headers'

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
          {/* Manage actions for author (client-side check) */}
          <ManageActions postId={post.id} authorId={post.author_id} />
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

// Client component for edit/delete controls on detail page
function ManageActions({ postId, authorId }: { postId: string, authorId: string }) {
  'use client'
  const supabase = createBrowserSupabase()
  const React = require('react') as typeof import('react')
  const { useRouter } = require('next/navigation') as typeof import('next/navigation')
  const [canManage, setCanManage] = React.useState(false)
  const router = useRouter()
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCanManage(data.user?.id === authorId)
    })
  }, [authorId])

  const del = async () => {
    if (!confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', postId)
    router.push('/')
  }

  if (!canManage) return null

  return (
    <div className="ml-auto flex items-center gap-1">
      <Button variant="ghost" size="icon" asChild aria-label="Edit post">
        <Link href={`/posts/${postId}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" aria-label="Delete post" onClick={del}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
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
