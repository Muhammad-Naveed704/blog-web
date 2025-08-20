import CreatePostForm from '@/components/blog/CreatePostForm'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function CreatePostPage() {
  return (
    <ProtectedRoute>
      <CreatePostForm />
    </ProtectedRoute>
  )
}
