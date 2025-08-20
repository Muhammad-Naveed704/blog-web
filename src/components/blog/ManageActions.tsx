"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface ManageActionsProps {
  postId: string
  authorId: string
}

export default function ManageActions({ postId, authorId }: ManageActionsProps) {
  const supabase = createClient()
  const router = useRouter()
  const [canManage, setCanManage] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCanManage(!!data.user && data.user.id === authorId)
    })
  }, [authorId, supabase])

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


