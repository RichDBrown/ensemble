'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
  }
}

export default function UserProfile() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const response = await fetch('/api/auth/user')
      const data = await response.json()
      if (data.authenticated && data.user) {
        setUser(data.user)
      }
    } catch (err) {
      console.error('Failed to fetch user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
      })

      if (response.ok) {
        setUser(null)
        router.push('/sign-in')
        router.refresh()
      }
    } catch (err) {
      console.error('Failed to sign out:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/sign-in"
          className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {user.user_metadata?.name || user.email}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</span>
      </div>
      <button
        onClick={handleSignOut}
        className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Sign Out
      </button>
    </div>
  )
}

