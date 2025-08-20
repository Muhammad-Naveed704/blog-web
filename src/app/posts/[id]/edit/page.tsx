"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function EditPostPage() {
  const supabase = createClient()
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

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

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <Input value={title} onChange={(e)=>setTitle(e.target.value)} />
        <Textarea className="min-h-[300px]" value={content} onChange={(e)=>setContent(e.target.value)} />
        <Button onClick={save} disabled={saving}>Save</Button>
      </div>
    </ProtectedRoute>
  )
}


