export type ShopProduct = {
  id: string
  name: string
  category: string
  price: number
  description: string
  material: string
  colors: { name: string; value: string }[]
  sizes?: string[]
  images: { src: string; alt: string }[]
  isNew?: boolean
}

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const products: ShopProduct[] = [
  {
    id: 'signature-tote',
    name: 'Signature Leather Tote',
    category: 'Accessories',
    price: 42500,
    description:
      'A quietly assured everyday companion. Cut from supple full-grain leather with a softly structured silhouette that only gets better with time.',
    material: 'Full-grain leather, cotton lining',
    colors: [
      { name: 'Warm espresso', value: '#4a352a' },
      { name: 'Natural', value: '#b8a58d' },
      { name: 'Black', value: '#262522' },
    ],
    images: [
      { src: image('photo-1590874103328-eac38a683ce7'), alt: 'Signature leather tote in a warm neutral tone' },
      { src: image('photo-1584917865442-de89df76afd3'), alt: 'Leather handbag with clean sculptural lines' },
    ],
    isNew: true,
  },
  {
    id: 'sculpted-vase',
    name: 'Sculpted Ceramic Vase',
    category: 'Objects',
    price: 14800,
    description:
      'An expressive silhouette shaped by hand and finished in a softly tactile glaze. Designed to hold a branch, or to be left beautifully alone.',
    material: 'Hand-finished stoneware',
    colors: [{ name: 'Chalk', value: '#d8d0c3' }, { name: 'Umber', value: '#77685a' }],
    images: [
      { src: image('photo-1578500494198-246f612d3b3d'), alt: 'Sculptural ceramic vessel in a sunlit interior' },
      { src: image('photo-1578749556568-bc2c40e68b61'), alt: 'Handmade ceramic vase with a tactile surface' },
    ],
  },
  {
    id: 'atelier-sneaker',
    name: 'Atelier Leather Sneaker',
    category: 'Footwear',
    price: 28900,
    description:
      'An exercise in restraint. Clean lines, considered proportions, and soft Italian leather make a timeless foundation for the everyday.',
    material: 'Italian leather, recycled rubber sole',
    colors: [{ name: 'Ivory', value: '#e8e2d6' }, { name: 'Stone', value: '#b0aa9f' }],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    images: [
      { src: image('photo-1549298916-b41d501d3772'), alt: 'Minimal white leather sneaker' },
      { src: image('photo-1495555961986-6d4c1ecb7be3'), alt: 'Leather sneaker in a quiet neutral palette' },
    ],
    isNew: true,
  },
  {
    id: 'cashmere-knit',
    name: 'The Cashmere Knit',
    category: 'Apparel',
    price: 56800,
    description:
      'Light as a thought, warm as a familiar room. A relaxed pure cashmere layer made for slow mornings and long seasons.',
    material: '100% Grade-A cashmere',
    colors: [{ name: 'Oat', value: '#c9bdab' }, { name: 'Moss', value: '#737b67' }, { name: 'Ink', value: '#353632' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      { src: image('photo-1576566588028-4147f3842f27'), alt: 'Soft neutral knitwear with a timeless cut' },
      { src: image('photo-1620799140408-edc6dcb6d633'), alt: 'Fine cashmere knit in a warm neutral tone' },
    ],
  },
  {
    id: 'everyday-wallet',
    name: 'Everyday Leather Wallet',
    category: 'Accessories',
    price: 16900,
    description:
      'A thoughtful home for the essentials. Slim, beautifully made, and designed to disappear into a pocket or a favorite bag.',
    material: 'Vegetable-tanned calf leather',
    colors: [{ name: 'Cognac', value: '#996345' }, { name: 'Black', value: '#262522' }],
    images: [
      { src: image('photo-1627123424574-724758594e93'), alt: 'Minimal leather wallet in a rich cognac shade' },
      { src: image('photo-1622560480654-d96214fdc887'), alt: 'Crafted leather accessories' },
    ],
  },
  {
    id: 'tailored-coat',
    name: 'The Essential Coat',
    category: 'Apparel',
    price: 84900,
    description:
      'A modern heirloom, cut with a generous line and quiet confidence. Thoughtful tailoring meets a beautifully weighted recycled-wool blend.',
    material: 'Recycled wool and cashmere blend',
    colors: [{ name: 'Camel', value: '#a99175' }, { name: 'Charcoal', value: '#4b4b47' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      { src: image('photo-1539533018447-63fcce2678e3'), alt: 'Classic tailored coat in a warm neutral shade' },
      { src: image('photo-1548126032-079a0fb0099d'), alt: 'Minimal wool coat with elegant proportions' },
    ],
    isNew: true,
  },
  {
    id: 'atelier-lamp',
    name: 'Contemporary Table Lamp',
    category: 'Objects',
    price: 34700,
    description:
      'An intimate pool of light, shaped in brushed metal and warm opal glass. A sculptural presence by day; a softer mood by night.',
    material: 'Brushed brass, opal glass',
    colors: [{ name: 'Brushed brass', value: '#aa8d64' }, { name: 'Burnished bronze', value: '#59463a' }],
    images: [
      { src: image('photo-1507473885765-e6ed057f782c'), alt: 'Sculptural table lamp in a softly lit room' },
      { src: image('photo-1507473885765-e6ed057f782c'), alt: 'Warm modern lamp with an opal diffuser' },
    ],
  },
  {
    id: 'no-04-fragrance',
    name: 'No. 04 — Santal',
    category: 'Fragrance',
    price: 22600,
    description:
      'A skin-close composition of sandalwood, black tea, and the warmth of sun on cedar. Considered, calm, and entirely your own.',
    material: '50 ml eau de parfum, responsibly sourced ingredients',
    colors: [{ name: 'Amber', value: '#927255' }],
    images: [
      { src: image('photo-1594035910387-fea47794261f'), alt: 'Amber glass fragrance bottle with a minimal label' },
      { src: image('photo-1541643600914-78b084683601'), alt: 'Luxury perfume bottle in soft studio light' },
    ],
    isNew: true,
  },
]

export const categories = ['All', 'Accessories', 'Apparel', 'Footwear', 'Objects', 'Fragrance']

export type SortOption = 'Featured' | 'Newest' | 'Price: Low to High' | 'Price: High to Low'

export function formatPrice(price: number, currency: string) {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price / 278)
  }

  return `Rs. ${price.toLocaleString('en-PK')}`
}
