import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { formatPrice, products } from '../data/products'
import { useShop } from '../context/useShop'

const FREE_SHIPPING = 5000

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onOpenProduct: (productId: string) => void
}

function CartDrawer({ open, onClose, onOpenProduct }: CartDrawerProps) {
  const { cart, itemCount, subtotal, currency, changeQuantity, removeFromCart, clearCart } = useShop()
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmation'>('bag')
  const shippingThreshold = currency === 'USD' ? FREE_SHIPPING / 278 : FREE_SHIPPING
  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal / (currency === 'USD' ? 278 : 1))

  function closeDrawer() {
    setStep('bag')
    onClose()
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearCart()
    setStep('confirmation')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="maison-overlay cart-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDrawer()
          }}
        >
          <motion.aside
            animate={{ x: 0 }}
            aria-label={step === 'checkout' ? 'Checkout' : 'Shopping bag'}
            aria-modal="true"
            className="maison-drawer"
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            role="dialog"
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="drawer-header">
              <div>
                <span className="section-index">{step === 'checkout' ? 'CHECKOUT / 01' : 'MAISON / YOUR SELECTION'}</span>
                <h2>
                  {step === 'checkout' ? 'A few details.' : step === 'confirmation' ? 'With our thanks.' : `Your bag (${itemCount})`}
                </h2>
              </div>
              <button aria-label="Close" className="drawer-close" onClick={closeDrawer} type="button"><X size={20} /></button>
            </header>

            {step === 'bag' && (
              <>
                {cart.length > 0 ? (
                  <>
                    <div className="drawer-shipping">
                      <p>
                        {amountToFreeShipping > 0
                          ? `${formatPrice(Math.ceil(amountToFreeShipping), currency)} until complimentary delivery`
                          : 'Complimentary delivery is yours.'}
                      </p>
                      <div className="shipping-meter"><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
                    </div>
                    <div className="drawer-items">
                      {cart.map((line) => {
                        const product = products.find((item) => item.id === line.productId)
                        if (!product) return null
                        return (
                          <article className="drawer-item" key={line.lineId}>
                            <button
                              className="drawer-item-image"
                              onClick={() => onOpenProduct(product.id)}
                              type="button"
                            >
                              <img src={product.images[0].src} alt={product.images[0].alt} />
                            </button>
                            <div className="drawer-item-copy">
                              <span>{product.category} {line.size && `· SIZE ${line.size}`}</span>
                              <button className="drawer-item-title" onClick={() => onOpenProduct(product.id)} type="button">{product.name}</button>
                              <span className="drawer-item-color">{line.color}</span>
                              <div className="drawer-item-controls">
                                <div className="drawer-quantity">
                                  <button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(line.lineId, -1)} type="button"><Minus size={13} /></button>
                                  <span>{line.quantity}</span>
                                  <button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(line.lineId, 1)} type="button"><Plus size={13} /></button>
                                </div>
                                <strong>{formatPrice(product.price * line.quantity, currency)}</strong>
                              </div>
                            </div>
                            <button aria-label={`Remove ${product.name}`} className="drawer-remove" onClick={() => removeFromCart(line.lineId)} type="button"><Trash2 size={15} /></button>
                          </article>
                        )
                      })}
                    </div>
                    <footer className="drawer-footer">
                      <div className="drawer-subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal, currency)}</strong></div>
                      <p>Shipping and any applicable duties are calculated at checkout.</p>
                      <button className="maison-button maison-button-dark drawer-checkout" onClick={() => setStep('checkout')} type="button">
                        CONTINUE TO CHECKOUT <ArrowRight size={15} />
                      </button>
                      <button className="drawer-continue" onClick={closeDrawer} type="button">CONTINUE DISCOVERING</button>
                    </footer>
                  </>
                ) : (
                  <div className="drawer-empty">
                    <ShoppingBag size={24} strokeWidth={1.2} />
                    <h3>A little room for something considered.</h3>
                    <p>Your selection is waiting to be made.</p>
                    <button className="maison-button maison-button-dark" onClick={closeDrawer} type="button">DISCOVER THE COLLECTION <ArrowRight size={14} /></button>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form className="checkout-form" onSubmit={submitOrder}>
                <button className="checkout-back" onClick={() => setStep('bag')} type="button"><ArrowLeft size={14} /> BACK TO YOUR BAG</button>
                <p className="checkout-disclaimer">A secure checkout preview. No payment is collected in this demo.</p>
                <label>FULL NAME<input autoComplete="name" name="name" required /></label>
                <label>EMAIL ADDRESS<input autoComplete="email" name="email" required type="email" /></label>
                <label>STREET ADDRESS<input autoComplete="street-address" name="address" required /></label>
                <div className="checkout-form-row">
                  <label>CITY<input autoComplete="address-level2" name="city" required /></label>
                  <label>POSTAL CODE<input autoComplete="postal-code" name="postalCode" required /></label>
                </div>
                <div className="checkout-order-total"><span>Order total</span><strong>{formatPrice(subtotal, currency)}</strong></div>
                <button className="maison-button maison-button-dark drawer-checkout" type="submit">PLACE DEMO ORDER <ArrowRight size={15} /></button>
                <span className="checkout-privacy">Your details stay in this browser session and are not submitted to a server.</span>
              </form>
            )}

            {step === 'confirmation' && (
              <div className="drawer-confirmation">
                <span className="confirmation-mark"><Check size={23} /></span>
                <span className="section-index">A DEMO ORDER, BEAUTIFULLY IMAGINED</span>
                <h3>Thank you for discovering MAISON.</h3>
                <p>Your preview is complete. No payment was taken and no order was sent.</p>
                <button className="maison-button maison-button-dark" onClick={closeDrawer} type="button">RETURN TO THE COLLECTION <ArrowRight size={14} /></button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
