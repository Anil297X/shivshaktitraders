import Link from 'next/link'
import { Moon, Truck, ShieldCheck, BadgeIndianRupee } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Moon className="size-4" />
              </span>
              <span className="text-base font-bold text-foreground">
                Dream<span className="text-primary">Rest</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Better sleep for every Indian home. Quality mattresses at prices
              that make sense.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">All Mattresses</Link></li>
              <li><Link href="/products?type=Orthopedic" className="hover:text-foreground">Orthopedic</Link></li>
              <li><Link href="/products?type=Pocket Spring" className="hover:text-foreground">Pocket Spring</Link></li>
              <li><Link href="/products?type=Latex" className="hover:text-foreground">Latex</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">About us</Link></li>
              <li><Link href="/products" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/products" className="hover:text-foreground">Store locator</Link></li>
              <li><Link href="/products" className="hover:text-foreground">Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Why DreamRest</h3>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Free delivery across India</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Up to 10-year warranty</li>
              <li className="flex items-center gap-2"><BadgeIndianRupee className="size-4 text-primary" /> Easy no-cost EMI</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {'© '}{new Date().getFullYear()} DreamRest India. All rights reserved. Prices inclusive of GST.
        </div>
      </div>
    </footer>
  )
}
