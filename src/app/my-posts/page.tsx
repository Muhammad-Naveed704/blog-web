"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 5

export default function MyPostsPage() {
  const { user } = useAuth()
  const supabase = createClient()
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const load = async (p: number) => {
    if (!user) return
    setLoading(true)
    const from = p * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,created_at,published')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to)
    if (!error) {
      setPosts(data || [])
      setHasMore((data || []).length === PAGE_SIZE)
    }
    setLoading(false)
  }

  useEffect(() => {
    load(0)
  }, [user])

  const del = async (id: string) => {
    await supabase.from('posts').delete().eq('id', id)
    load(page)
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Posts</h1>
          <Button asChild><Link href="/create">New Post</Link></Button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : posts.length === 0 ? (
          <div>No posts</div>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild><Link href={`/posts/${p.id}/edit`}>Edit</Link></Button>
                  <Button variant="destructive" onClick={() => del(p.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" disabled={page===0} onClick={() => { const np = Math.max(0, page-1); setPage(np); load(np) }}>Prev</Button>
          <div>Page {page+1}</div>
          <Button variant="outline" disabled={!hasMore} onClick={() => { const np = page+1; setPage(np); load(np) }}>Next</Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}


