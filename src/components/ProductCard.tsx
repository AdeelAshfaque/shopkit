import { motion } from 'motion/react'
import { ArrowUpRight, Heart, Plus } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import type { ShopProduct } from '../data/products'

type ProductCardProps = {
  product: ShopProduct
  currency: string
  isWishlisted: boolean
  onOpen: (product: ShopProduct) => void
  onAdd: (product: ShopProduct, color: string) => void
  onWishlist: (productId: string) => void
}

function ProductCard({
  product,
  currency,
  isWishlisted,
  onOpen,
  onAdd,
  onWishlist,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  return (
    <motion.article
      className="maison-product-card"
      data-reveal
      initial={false}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="maison-product-image">
        <button
          aria-label={`View ${product.name}`}
          className="product-image-link"
          onClick={() => onOpen(product)}
          type="button"
        >
          <img alt={product.images[0].alt} loading="lazy" src={product.images[0].src} />
          <img
            alt=""
            aria-hidden="true"
            className="product-image-secondary"
            loading="lazy"
            src={product.images[1].src}
          />
        </button>
        {product.isNew && <span className="product-edition-label">NEW ARRIVAL</span>}
        <button
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className={`product-wishlist${isWishlisted ? ' is-active' : ''}`}
          onClick={() => onWishlist(product.id)}
          type="button"
        >
          <Heart size={17} strokeWidth={1.4} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          className="product-quick-add"
          onClick={() => onAdd(product, selectedColor.name)}
          type="button"
        >
          <Plus size={14} strokeWidth={1.4} /> QUICK ADD
        </button>
        <button
          aria-label={`See ${product.name} details`}
          className="product-image-arrow"
          onClick={() => onOpen(product)}
          type="button"
        >
          <ArrowUpRight size={16} strokeWidth={1.4} />
        </button>
      </div>
      <div className="maison-product-meta">
        <div className="product-name-block">
          <span className="product-category-label">{product.category}</span>
          <button className="product-name-link" onClick={() => onOpen(product)} type="button">
            {product.name}
          </button>
        </div>
        <span className="product-price">{formatPrice(product.price, currency)}</span>
      </div>
      <div className="product-color-row">
        <div aria-label={`${product.colors.length} available colors`} className="product-swatches">
          {product.colors.map((color) => (
            <button
              aria-label={color.name}
              aria-pressed={selectedColor.name === color.name}
              className={`product-swatch${selectedColor.name === color.name ? ' is-selected' : ''}`}
              key={color.name}
              onClick={() => setSelectedColor(color)}
              style={{ '--swatch-color': color.value } as CSSProperties}
              title={color.name}
              type="button"
            />
          ))}
        </div>
        <span>{product.colors.length} {product.colors.length === 1 ? 'COLOR' : 'COLORS'}</span>
      </div>
    </motion.article>
  )
}

function formatPrice(price: number, currency: string) {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price / 278)
  }
  return `Rs. ${price.toLocaleString('en-PK')}`
}

export default ProductCard
