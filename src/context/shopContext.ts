import { createContext } from 'react'
import type { ShopProduct } from '../data/products'
export type CartLine = {
  lineId: string
  productId: string
  quantity: number
  color: string
  size: string
}

export type ShopContextValue = {
  cart: CartLine[]
  wishlist: string[]
  itemCount: number
  subtotal: number
  currency: string
  setCurrency: (currency: string) => void
  addToCart: (product: ShopProduct, quantity: number, color: string, size: string) => void
  changeQuantity: (lineId: string, change: number) => void
  removeFromCart: (lineId: string) => void
  toggleWishlist: (productId: string) => void
  clearCart: () => void
}

export const ShopContext = createContext<ShopContextValue | null>(null)
