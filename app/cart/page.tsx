'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatINR } from '@/lib/format'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const delivery = subtotal > 0 && subtotal < 15000 ? 499 : 0
  const total = subtotal + delivery

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-8" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for shopping with DreamRest. Your mattress is on its way with
          free delivery.
        </p>
        <Link href="/products" className={cn(buttonVariants(), 'mt-6 h-11 px-6')}>
          Continue shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="size-8" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven&apos;t added a mattress yet.
        </p>
        <Link href="/products" className={cn(buttonVariants(), 'mt-6 h-11 px-6')}>
          Shop mattresses
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Shopping Cart
      </h1>
      <p className="mt-1 text-muted-foreground">
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="flex size-8 items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="flex size-8 items-center justify-center text-foreground hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="font-bold text-foreground">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clear}
            className="text-sm font-medium text-muted-foreground hover:text-destructive"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium text-foreground">
                  {delivery === 0 ? 'FREE' : formatINR(delivery)}
                </dd>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatINR(15000 - subtotal)} more for free delivery.
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="font-bold text-foreground">{formatINR(total)}</dd>
              </div>
            </dl>

            <button
              onClick={() => {
                clear()
                setPlaced(true)
              }}
              className={cn(buttonVariants(), 'mt-6 h-12 w-full text-base')}
            >
              Proceed to Checkout
            </button>
            <Link
              href="/products"
              className="mt-3 block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
