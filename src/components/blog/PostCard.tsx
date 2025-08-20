"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Pencil, Trash2 } from 'lucide-react'
import ConfirmDialog from '@/components/ui/confirm-dialog'

interface PostCardProps {
  post: Post
  onDeleted?: (id: string) => void
}

export default function PostCard({ post, onDeleted }: PostCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const canManage = user?.id === post.author_id

  const [open, setOpen] = (require('react') as typeof import('react')).useState(false)
  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', post.id)
    if (!error) onDeleted?.(post.id)
  }

  return (
    <article className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white text-sm font-semibold">
            {post.profiles?.full_name?.charAt(0) || post.profiles?.email?.charAt(0) || 'U'}
          </div>
          <div className="leading-tight">
            <p className="font-medium text-gray-900">
              {post.profiles?.full_name || post.profiles?.email || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild aria-label="Edit post">
              <Link href={`/posts/${post.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Delete post" onClick={() => setOpen(true)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
      </div>

      <Link href={`/posts/${post.id}`} className="mt-4 block group">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.excerpt || post.content.substring(0, 200) + '...'}
        </p>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
          <span>Read more</span>
          <span>→</span>
        </div>
      </Link>

      {canManage && (
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete post?"
          description="This action cannot be undone. The post will be permanently deleted."
          confirmText="Delete"
          onConfirm={handleDelete}
        />
      )}
    </article>
  )
}

