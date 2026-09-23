import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

const types = ['All', 'Orthopedic', 'Pocket Spring', 'Latex', 'Coir', 'Dual Comfort', 'Pillow Top']

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const activeType = type && types.includes(type) ? type : 'All'
  const filtered =
    activeType === 'All'
      ? products
      : products.filter((p) => p.type === activeType)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All Mattresses
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comfort for every sleeper and every budget. Prices are inclusive of
          GST with free delivery across India.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <Link
            key={t}
            href={t === 'All' ? '/products' : `/products?type=${encodeURIComponent(t)}`}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              activeType === t
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-primary hover:text-primary',
            )}
          >
            {t}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No mattresses found in this category.
        </p>
      )}
    </div>
  )
}
