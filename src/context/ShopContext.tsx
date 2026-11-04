import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products, type ShopProduct } from '../data/products'
import { ShopContext, type CartLine, type ShopContextValue } from './shopContext'

function readStorage<T>(key: string, isValid: (value: unknown) => value is T, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    if (stored === null) return fallback
    const parsed: unknown = JSON.parse(stored)
    if (isValid(parsed)) return parsed
    console.warn(`Ignoring invalid saved shop data for "${key}".`)
  } catch (error) {
    console.warn(`Could not read saved shop data for "${key}".`, error)
  }
  return fallback
}

function isCart(value: unknown): value is CartLine[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'lineId' in item &&
        typeof item.lineId === 'string' &&
        'productId' in item &&
        typeof item.productId === 'string' &&
        products.some((product) => product.id === item.productId) &&
        'quantity' in item &&
        typeof item.quantity === 'number' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        'color' in item &&
        typeof item.color === 'string' &&
        'size' in item &&
        typeof item.size === 'string',
    )
  )
}

function isWishlist(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (id) => typeof id === 'string' && products.some((product) => product.id === id),
    )
  )
}

function saveStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Could not save shop data for "${key}".`, error)
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() =>
    readStorage('maison-cart', isCart, []),
  )
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage('maison-wishlist', isWishlist, []),
  )
  const [currency, setCurrency] = useState('PKR')

  useEffect(() => saveStorage('maison-cart', cart), [cart])
  useEffect(() => saveStorage('maison-wishlist', wishlist), [wishlist])

  const addToCart = useCallback(
    (product: ShopProduct, quantity: number, color: string, size: string) => {
      const lineId = `${product.id}:${color}:${size}`
      setCart((current) => {
        const existing = current.find((line) => line.lineId === lineId)
        return existing
          ? current.map((line) =>
              line.lineId === lineId
                ? { ...line, quantity: line.quantity + quantity }
                : line,
            )
          : [...current, { lineId, productId: product.id, quantity, color, size }]
      })
    },
    [],
  )

  const changeQuantity = useCallback((lineId: string, change: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.lineId === lineId
            ? { ...line, quantity: line.quantity + change }
            : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback((lineId: string) => {
    setCart((current) => current.filter((line) => line.lineId !== lineId))
  }, [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const value = useMemo<ShopContextValue>(() => {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
    const subtotal = cart.reduce((total, item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      return total + (product?.price ?? 0) * item.quantity
    }, 0)

    return {
      cart,
      wishlist,
      itemCount,
      subtotal,
      currency,
      setCurrency,
      addToCart,
      changeQuantity,
      removeFromCart,
      toggleWishlist,
      clearCart,
    }
  }, [
    cart,
    wishlist,
    currency,
    addToCart,
    changeQuantity,
    removeFromCart,
    toggleWishlist,
    clearCart,
  ])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
