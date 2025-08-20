'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { createPostSchema, type CreatePostFormData } from '@/lib/validations'
import { createExcerpt } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  })

  const content = watch('content', '')

  const onSubmit = async (data: CreatePostFormData) => {
    if (!user) {
      setError('You must be logged in to create a post')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      const excerpt = createExcerpt(data.content, 200)
      const supabase = createClient()

      // Insert directly using Supabase client instead of GraphQL
      const { data: result, error } = await supabase
        .from('posts')
        .insert({
          title: data.title,
          content: data.content,
          excerpt,
          author_id: user.id,
          published: true,
        })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (result) {
        router.push(`/posts/${result.id}`)
      }
    } catch (err: unknown) {
      console.error('Error creating post:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while creating the post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Share your thoughts with the world</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your post title..."
            {...register('title')}
            disabled={isLoading}
            className="text-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your post content here..."
            {...register('content')}
            disabled={isLoading}
            className="min-h-[400px] text-base leading-relaxed"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              {content.length} characters
            </p>
            {content.length > 200 && (
              <p className="text-sm text-gray-500">
                Excerpt: {createExcerpt(content, 200).length} characters
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
