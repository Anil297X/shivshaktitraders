import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, Check, Truck, ShieldCheck, RotateCcw, ChevronRight } from 'lucide-react'
import { getProduct, products } from '@/lib/products'
import { formatINR, discountPercent } from '@/lib/format'
import { AddToCartPanel } from '@/components/add-to-cart-panel'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const off = discountPercent(product.price, product.mrp)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-4" />
        <Link href="/products" className="hover:text-foreground">Mattresses</Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.bestSeller && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              Bestseller
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {product.type}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {product.name}
          </h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-0.5 rounded bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
              <Star className="size-4 fill-current" />
              {product.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.reviews.toLocaleString('en-IN')} verified reviews
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatINR(product.price)}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
            {off > 0 && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent">
                {off}% OFF
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Inclusive of all taxes. No-cost EMI available.
          </p>

          <p className="mt-5 leading-relaxed text-foreground/90">
            {product.description}
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-6">
            <AddToCartPanel product={product} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
            {[
              { icon: Truck, label: 'Free delivery' },
              { icon: RotateCcw, label: '30-night trial' },
              { icon: ShieldCheck, label: 'Warranty' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5">
                <item.icon className="size-5 text-primary" />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground">You may also like</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {formatINR(p.price)}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
