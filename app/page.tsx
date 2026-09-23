import Link from 'next/link'
import Image from 'next/image'
import { Truck, ShieldCheck, BadgeIndianRupee, Moon, Star } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const categories = [
  { label: 'Orthopedic', type: 'Orthopedic' },
  { label: 'Memory Foam', type: 'Orthopedic' },
  { label: 'Pocket Spring', type: 'Pocket Spring' },
  { label: 'Latex', type: 'Latex' },
  { label: 'Coir', type: 'Coir' },
  { label: 'Dual Comfort', type: 'Dual Comfort' },
]

export default function HomePage() {
  const featured = products

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/40">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Moon className="size-4" /> India&apos;s trusted sleep brand
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              Sleep better, wake up happier.
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground text-pretty">
              Premium orthopedic, memory foam and spring mattresses starting at
              just ₹8,999. Made for Indian homes, backed by a 100-night trial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className={cn(buttonVariants(), 'h-12 px-6 text-base')}
              >
                Shop Mattresses
              </Link>
              <Link
                href="/products?type=Orthopedic"
                className={cn(buttonVariants({ variant: 'outline' }), 'h-12 px-6 text-base')}
              >
                Explore Orthopedic
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" /> 4.6/5 from 10,000+ homes
              </span>
              <span className="hidden sm:inline">100-night trial</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/hero-bedroom.png"
              alt="Cozy bedroom with a Shiv Shakti Traders mattress"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'Doorstep delivery across India' },
            { icon: ShieldCheck, title: 'Up to 10-Yr Warranty', desc: 'Quality you can rely on' },
            { icon: BadgeIndianRupee, title: 'No-Cost EMI', desc: 'Easy monthly payments' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground">Shop by type</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.label}
              href={`/products?type=${encodeURIComponent(c.type)}`}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Our bestsellers</h2>
            <p className="mt-1 text-muted-foreground">Loved by thousands of Indian families.</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold text-balance sm:text-3xl">
            Try any mattress risk-free for 100 nights
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80 text-pretty">
            Not the perfect fit? Return it for a full refund. That&apos;s how
            confident we are in a better night&apos;s sleep.
          </p>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'mt-6 h-12 px-8 text-base',
            )}
          >
            Find your mattress
          </Link>
        </div>
      </section>
    </>
  )
}
