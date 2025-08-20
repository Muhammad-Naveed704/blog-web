'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { otpSchema, type OtpFormData } from '@/lib/validations'

export default function OtpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signInWithOtp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  })

  const onSubmit = async (data: OtpFormData) => {
    try {
      setIsLoading(true)
      setError('')
      setSuccess('')
      
      const { error } = await signInWithOtp(data.email)
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Check your email for a sign-in link!')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign in with Email</h1>
        <p className="text-gray-600 mt-2">We&apos;ll send you a secure sign-in link</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending Link...' : 'Send Sign-in Link'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>
          Remember your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in with password
          </Link>
        </p>
      </div>
    </div>
  )
}
