import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Heart, ShoppingBag, X } from 'lucide-react'
import { products, formatPrice } from '../data/products'
import { useShop } from '../context/useShop'

type WishlistDrawerProps = {
  open: boolean
  onClose: () => void
  onOpenProduct: (productId: string) => void
  onAdd: (productId: string, color: string) => void
}

function WishlistDrawer({ open, onClose, onOpenProduct, onAdd }: WishlistDrawerProps) {
  const { wishlist, currency, toggleWishlist } = useShop()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="maison-overlay cart-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.aside
            animate={{ x: 0 }}
            aria-label="Wishlist"
            aria-modal="true"
            className="maison-drawer"
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            role="dialog"
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="drawer-header">
              <div>
                <span className="section-index">MAISON / YOUR SAVED PIECES</span>
                <h2>Considered for later <span>({savedProducts.length})</span></h2>
              </div>
              <button aria-label="Close wishlist" className="drawer-close" onClick={onClose} type="button"><X size={20} /></button>
            </header>
            {savedProducts.length ? (
              <div className="wishlist-drawer-list">
                {savedProducts.map((product) => (
                  <article className="drawer-item" key={product.id}>
                    <button className="drawer-item-image" onClick={() => onOpenProduct(product.id)} type="button">
                      <img src={product.images[0].src} alt={product.images[0].alt} />
                    </button>
                    <div className="drawer-item-copy">
                      <span>{product.category}</span>
                      <button className="drawer-item-title" onClick={() => onOpenProduct(product.id)} type="button">{product.name}</button>
                      <strong>{formatPrice(product.price, currency)}</strong>
                      <div className="wishlist-actions">
                        <button className="wishlist-add" onClick={() => onAdd(product.id, product.colors[0].name)} type="button"><ShoppingBag size={13} /> ADD TO BAG</button>
                        <button aria-label={`Remove ${product.name} from wishlist`} className="wishlist-remove" onClick={() => toggleWishlist(product.id)} type="button">REMOVE</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="drawer-empty">
                <Heart size={25} strokeWidth={1.2} />
                <h3>Keep the pieces that stay with you.</h3>
                <p>Your wishlist is a quiet place for future favorites.</p>
                <button className="maison-button maison-button-dark" onClick={onClose} type="button">DISCOVER THE COLLECTION <ArrowRight size={14} /></button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WishlistDrawer
