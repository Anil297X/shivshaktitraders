export type Product = {
  id: string
  name: string
  type: string
  image: string
  price: number
  mrp: number
  rating: number
  reviews: number
  tagline: string
  description: string
  features: string[]
  bestSeller?: boolean
}

export const SIZES = [
  'Single (72 x 36 in)',
  'Double (72 x 48 in)',
  'Queen (78 x 60 in)',
  'King (78 x 72 in)',
] as const

export const products: Product[] = [
  {
    id: 'ortho-memory-foam',
    name: 'OrthoLife Memory Foam',
    type: 'Orthopedic',
    image: '/images/mattress-orthopedic.png',
    price: 15999,
    mrp: 24999,
    rating: 4.6,
    reviews: 2148,
    tagline: 'Doctor-recommended back support',
    description:
      'A high-density orthopedic memory foam mattress engineered for correct spinal alignment. The pressure-relieving foam contours to your body and eases back and joint pain — ideal for anyone who wakes up sore.',
    features: [
      'High-density orthopedic memory foam',
      'Zero-partner-disturbance motion isolation',
      'Breathable knitted fabric cover',
      '10-year warranty',
    ],
    bestSeller: true,
  },
  {
    id: 'pocket-spring',
    name: 'CloudSpring Pocket',
    type: 'Pocket Spring',
    image: '/images/mattress-spring.png',
    price: 12499,
    mrp: 19999,
    rating: 4.4,
    reviews: 1523,
    tagline: 'Bouncy support that breathes',
    description:
      'Individually wrapped pocket springs move independently to support every curve of your body while keeping airflow high, so you stay cool through warm Indian summers.',
    features: [
      'Individually wrapped pocket springs',
      'Extra edge support',
      'Cool breathable comfort layer',
      '7-year warranty',
    ],
  },
  {
    id: 'natural-latex',
    name: 'PureLatex Natural',
    type: 'Latex',
    image: '/images/mattress-latex.png',
    price: 22999,
    mrp: 34999,
    rating: 4.7,
    reviews: 894,
    tagline: 'Naturally cool & responsive',
    description:
      'Made with natural latex that is springy, durable and naturally resistant to dust mites. A premium choice that stays fresh for years with responsive, buoyant support.',
    features: [
      '100% natural latex core',
      'Anti-microbial & dust-mite resistant',
      'Superior durability',
      '10-year warranty',
    ],
    bestSeller: true,
  },
  {
    id: 'coir-firm',
    name: 'SpineFirm Coir',
    type: 'Coir',
    image: '/images/mattress-coir.png',
    price: 8999,
    mrp: 13999,
    rating: 4.3,
    reviews: 1976,
    tagline: 'Firm, airy & budget-friendly',
    description:
      'A traditional firm coir mattress that offers sturdy, ventilated support. A trusted, value-for-money pick for Indian families who prefer a firmer bed.',
    features: [
      'Rubberised coconut coir core',
      'Extra firm support',
      'Highly breathable',
      '5-year warranty',
    ],
  },
  {
    id: 'dual-comfort',
    name: 'FlipRest Dual Comfort',
    type: 'Dual Comfort',
    image: '/images/mattress-dual.png',
    price: 10499,
    mrp: 16999,
    rating: 4.5,
    reviews: 3210,
    tagline: 'Soft on one side, firm on the other',
    description:
      'Can’t decide between soft and firm? Just flip it. One side is plush for cosy nights, the other is firm for extra back support — two mattresses in one.',
    features: [
      'Reversible soft & firm sides',
      'Value for the whole family',
      'Zippered removable cover',
      '6-year warranty',
    ],
    bestSeller: true,
  },
  {
    id: 'pillow-top',
    name: 'RoyalRest Pillow Top',
    type: 'Pillow Top',
    image: '/images/mattress-pillowtop.png',
    price: 27999,
    mrp: 42999,
    rating: 4.8,
    reviews: 642,
    tagline: 'Hotel-luxury plush comfort',
    description:
      'A plush pillow-top layer stitched over a supportive pocket-spring base delivers that sink-in, five-star hotel feel every single night.',
    features: [
      'Extra plush pillow-top layer',
      'Pocket-spring support base',
      'Premium quilted cover',
      '10-year warranty',
    ],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
