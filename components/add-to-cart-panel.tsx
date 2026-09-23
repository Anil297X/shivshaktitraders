'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Check } from 'lucide-react'
import type { Product } from '@/lib/products'
import { SIZES } from '@/lib/products'
import { formatINR } from '@/lib/format'
import { useCart } from '@/components/cart-context'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AddToCartPanel({ product }: { product: Product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [size, setSize] = useState<string>(SIZES[1])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
      },
      qty,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleBuyNow() {
    addItem(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
      },
      qty,
    )
    router.push('/cart')
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-foreground">Select size</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                'rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors',
                size === s
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-foreground hover:border-primary/60',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">Quantity</p>
        <div className="mt-2 inline-flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="flex size-10 items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
            disabled={qty >= 10}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          className={cn(
            buttonVariants({ variant: added ? 'secondary' : 'outline' }),
            'h-12 flex-1 text-base',
          )}
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
        <button
          onClick={handleBuyNow}
          className={cn(buttonVariants(), 'h-12 flex-1 text-base')}
        >
          Buy Now · {formatINR(product.price * qty)}
        </button>
      </div>
    </div>
  )
}
