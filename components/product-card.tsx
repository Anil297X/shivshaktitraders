'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Check } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/products'
import { SIZES } from '@/lib/products'
import { formatINR, discountPercent } from '@/lib/format'
import { useCart } from '@/components/cart-context'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: SIZES[1],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const off = discountPercent(product.price, product.mrp)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            Bestseller
          </span>
        )}
        {off > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {off}% OFF
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {product.type}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 text-base font-semibold text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>

        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <span className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
            <Star className="size-3.5 fill-current" />
            {product.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString('en-IN')})
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatINR(product.price)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className={cn(buttonVariants({ variant: 'outline' }), 'h-10 flex-1')}
          >
            View
          </Link>
          <button
            onClick={handleAdd}
            className={cn(
              buttonVariants({ variant: added ? 'secondary' : 'default' }),
              'h-10 flex-1',
            )}
          >
            {added ? (
              <>
                <Check className="size-4" /> Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
