"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Pencil, Trash2, Save } from 'lucide-react'

export default function EditPostPage() {
  const supabase = createClient()
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('posts').select('title,content').eq('id', params.id).single()
      setTitle(data?.title || '')
      setContent(data?.content || '')
    }
    load()
  }, [params.id, supabase])

  const save = async () => {
    setSaving(true)
    await supabase.from('posts').update({ title, content }).eq('id', params.id)
    setSaving(false)
    router.push('/my-posts')
  }

  const remove = async () => {
    if (!confirm('Delete this post?')) return
    setDeleting(true)
    await supabase.from('posts').delete().eq('id', params.id)
    setDeleting(false)
    router.push('/my-posts')
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild aria-label="Back">
              <Link href="/my-posts">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Edit Post</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={save} disabled={saving} aria-label="Save">
              <Save className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={remove} disabled={deleting} aria-label="Delete">
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Amazing blog title" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <Textarea className="min-h-[320px]" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your content..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" asChild>
              <Link href={`/posts/${params.id}`}>Cancel</Link>
            </Button>
            <Button onClick={save} disabled={saving}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}


