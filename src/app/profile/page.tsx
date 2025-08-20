"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function ProfilePage() {
  const { user } = useAuth()
  const supabase = createClient()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('full_name,email,avatar_url')
        .eq('id', user.id)
        .single()
      setFullName(data?.full_name || '')
      setEmail(data?.email || user.email || '')
      setAvatarUrl(data?.avatar_url || '')
    }
    load()
  }, [user, supabase])

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)
    setMessage('')
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, full_name: fullName, email, avatar_url: avatarUrl })
    if (error) setMessage(error.message)
    else setMessage('Profile updated')
    setSaving(false)
  }

  const changePassword = async () => {
    if (!password) return
    setSaving(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setMessage(error.message)
    else setMessage('Password changed')
    setSaving(false)
    setPassword('')
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Profile</h1>

        {message && (
          <div className="border p-3 rounded text-sm">{message}</div>
        )}

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Avatar URL</Label>
          <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        </div>
        <Button onClick={saveProfile} disabled={saving}>Save Profile</Button>

        <hr className="my-6" />

        <div className="space-y-2">
          <Label>New Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button variant="secondary" onClick={changePassword} disabled={saving || !password}>Change Password</Button>
      </div>
    </ProtectedRoute>
  )
}


