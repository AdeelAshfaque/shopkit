import { AnimatePresence, motion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowUpRight, Heart, Minus, Plus, X } from 'lucide-react'
import { formatPrice, type ShopProduct } from '../data/products'

type ProductDetailProps = {
  product: ShopProduct | null
  currency: string
  isWishlisted: boolean
  onClose: () => void
  onAdd: (product: ShopProduct, quantity: number, color: string, size: string) => void
  onWishlist: (productId: string) => void
}

function ProductDetail(props: ProductDetailProps) {
  return <ProductDetailContent key={props.product?.id ?? 'closed'} {...props} />
}

function ProductDetailContent({
  product,
  currency,
  isWishlisted,
  onClose,
  onAdd,
  onWishlist,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [expanded, setExpanded] = useState<string | null>('Details')
  const [zoomed, setZoomed] = useState(false)

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          animate={{ opacity: 1 }}
          className="maison-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
          transition={{ duration: 0.22 }}
        >
          <motion.section
            aria-labelledby="detail-title"
            aria-modal="true"
            className="pdp-dialog"
            role="dialog"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            initial={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="pdp-topbar">
              <button className="pdp-back" onClick={onClose} type="button"><ArrowLeft size={15} /> BACK TO THE COLLECTION</button>
              <span>MAISON / {product.category.toUpperCase()}</span>
              <button aria-label="Close product details" className="pdp-close" onClick={onClose} type="button"><X size={19} /></button>
            </header>
            <div className="pdp-layout">
              <div className="pdp-gallery">
                <button
                  aria-label={zoomed ? 'Zoom out of product image' : 'Zoom into product image'}
                  className={`pdp-main-image${zoomed ? ' is-zoomed' : ''}`}
                  onClick={() => setZoomed((value) => !value)}
                  type="button"
                >
                  <img alt={product.images[activeImage].alt} src={product.images[activeImage].src} />
                  <span>{zoomed ? 'CLICK TO RESET' : 'CLICK TO ENLARGE'} <ArrowUpRight size={12} /></span>
                </button>
                <div className="pdp-thumbnails" aria-label="Product images">
                  {product.images.map((image, index) => (
                    <button
                      aria-label={`View image ${index + 1} of ${product.name}`}
                      aria-pressed={activeImage === index}
                      className={activeImage === index ? 'is-active' : ''}
                      key={image.src + index}
                      onClick={() => { setActiveImage(index); setZoomed(false) }}
                      type="button"
                    >
                      <img alt="" src={image.src} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="pdp-details">
                <span className="section-index">OBJECT NO. {product.id.replaceAll('-', ' ').toUpperCase()}</span>
                <h1 id="detail-title">{product.name}</h1>
                <span className="pdp-price">{formatPrice(product.price, currency)}</span>
                <p className="pdp-description">{product.description}</p>

                <div className="pdp-option">
                  <div className="pdp-option-label">
                    <span>COLOUR</span><strong>{selectedColor}</strong>
                  </div>
                  <div className="pdp-color-options">
                    {product.colors.map((color) => (
                      <button
                        aria-label={color.name}
                        aria-pressed={selectedColor === color.name}
                        className={selectedColor === color.name ? 'is-active' : ''}
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        style={{ '--swatch-color': color.value } as CSSProperties}
                        type="button"
                      />
                    ))}
                  </div>
                </div>

                {product.sizes && (
                  <div className="pdp-option">
                    <div className="pdp-option-label">
                      <span>SIZE</span><strong>{selectedSize || 'SELECT A SIZE'}</strong>
                      <button className="size-guide-link" type="button" onClick={() => setExpanded('Size guide')}>SIZE GUIDE</button>
                    </div>
                    <div className="pdp-size-options">
                      {product.sizes.map((size) => (
                        <button
                          aria-pressed={selectedSize === size}
                          className={selectedSize === size ? 'is-active' : ''}
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          type="button"
                        >{size}</button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pdp-buy-row">
                  <div className="pdp-quantity">
                    <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => value - 1)} type="button"><Minus size={13} /></button>
                    <span>{quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} type="button"><Plus size={13} /></button>
                  </div>
                  <button
                    className="pdp-add-button"
                    disabled={Boolean(product.sizes && !selectedSize)}
                    onClick={() => onAdd(product, quantity, selectedColor, selectedSize)}
                    type="button"
                  >
                    {product.sizes && !selectedSize ? 'SELECT A SIZE' : 'ADD TO BAG'} <span>{formatPrice(product.price * quantity, currency)}</span>
                  </button>
                  <button
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={isWishlisted}
                    className={`pdp-wishlist${isWishlisted ? ' is-active' : ''}`}
                    onClick={() => onWishlist(product.id)}
                    type="button"
                  ><Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} /></button>
                </div>
                <p className="pdp-shipping">Complimentary delivery over Rs. 5,000 · Thoughtfully wrapped</p>

                <div className="pdp-accordions">
                  {[
                    ['Details', product.material],
                    ['Shipping & returns', 'Complimentary delivery on orders over Rs. 5,000. We offer considered, plastic-free packaging and complimentary returns within 14 days.'],
                    ['Size guide', 'Designed for an easy, considered fit. For personal sizing advice, reach us at care@maison.studio.'],
                  ].map(([title, content]) => (
                    <div className="pdp-accordion" key={title}>
                      <button aria-expanded={expanded === title} onClick={() => setExpanded(expanded === title ? null : title)} type="button">
                        {title.toUpperCase()} <span>{expanded === title ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === title && (
                          <motion.p animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} initial={{ height: 0, opacity: 0 }}>
                            {content}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductDetail
