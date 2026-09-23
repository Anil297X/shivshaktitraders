'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu, X, Moon } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Mattresses' },
  { href: '/products?type=Orthopedic', label: 'Orthopedic' },
  { href: '/products?type=Pocket Spring', label: 'Spring' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Moon className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Dream<span className="text-primary">Rest</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                pathname === link.href && 'text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-sm text-muted-foreground">
                Hi, <span className="font-medium text-foreground">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
            >
              <User className="size-4" />
              Login
            </Link>
          )}

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex size-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
          >
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="flex size-10 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
              >
                Logout ({user.name})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                Login / Sign up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
