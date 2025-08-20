import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {post.profiles?.full_name?.charAt(0) || post.profiles?.email?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {post.profiles?.full_name || post.profiles?.email || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>
      </div>

      <Link href={`/posts/${post.id}`} className="block group">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 200) + '...'}
        </p>
        <span className="text-blue-600 text-sm font-medium group-hover:underline">
          Read more →
        </span>
      </Link>
    </article>
  )
}
