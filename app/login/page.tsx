'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Moon, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/components/auth-context'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    login(email)
    router.push('/')
  }

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/hero-bedroom.png"
          alt="Comfortable bedroom"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="absolute bottom-10 left-10 right-10 text-primary-foreground">
          <h2 className="text-3xl font-bold text-balance">
            Welcome back to better sleep.
          </h2>
          <p className="mt-2 text-primary-foreground/85">
            Sign in to track orders, manage your 30-night trial and check out
            faster.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Moon className="size-5" />
            </span>
            <span className="text-lg font-bold text-foreground">
              Shiv Shakti <span className="text-primary">Traders</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details to access your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button type="submit" className={cn(buttonVariants(), 'h-11 w-full text-base')}>
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Shiv Shakti Traders?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
