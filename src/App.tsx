import { useEffect, useState } from 'react'
import AccountPanel from './components/AccountPanel'
import BrandStory from './components/BrandStory'
import CartDrawer from './components/CartDrawer'
import CollectionShowcase from './components/CollectionShowcase'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MaisonNav from './components/MaisonNav'
import ProductDetail from './components/ProductDetail'
import ProductSection from './components/ProductSection'
import ScrollReveals from './components/ScrollReveals'
import ScentExperience from './components/ScentExperience'
import SmoothScroll from './components/SmoothScroll'
import WishlistDrawer from './components/WishlistDrawer'
import { products, type ShopProduct } from './data/products'
import { ShopProvider } from './context/ShopContext'
import { useShop } from './context/useShop'

function getFeaturedFragrance() {
  const fragrance = products.find((product) => product.id === 'no-04-fragrance')
  if (!fragrance) throw new Error('The featured MAISON fragrance is missing from the product catalog.')
  return fragrance
}

const fragranceProduct = getFeaturedFragrance()

function MaisonStore() {
  const {
    currency,
    itemCount,
    wishlist,
    addToCart,
    toggleWishlist,
    setCurrency,
  } = useShop()
  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  function openProduct(product: ShopProduct) {
    setSelectedProduct(product)
    window.history.pushState({ maisonProduct: product.id }, '', `#product/${product.id}`)
  }

  function closeProduct() {
    setSelectedProduct(null)
    if (window.location.hash.startsWith('#product/')) {
      window.history.replaceState(null, '', '#shop')
    }
  }

  function openProductById(productId: string) {
    const product = products.find((item) => item.id === productId)
    if (!product) {
      console.error(`Could not find product "${productId}".`)
      return
    }
    setCartOpen(false)
    setWishlistOpen(false)
    openProduct(product)
  }

  useEffect(() => {
    const syncProductRoute = () => {
      const productId = window.location.hash.match(/^#product\/(.+)$/)?.[1]
      if (!productId) {
        setSelectedProduct(null)
        return
      }
      const product = products.find((item) => item.id === productId)
      if (product) setSelectedProduct(product)
      else {
        console.error(`No MAISON product is registered for route "${productId}".`)
        window.history.replaceState(null, '', '#shop')
      }
    }

    syncProductRoute()
    window.addEventListener('popstate', syncProductRoute)
    return () => window.removeEventListener('popstate', syncProductRoute)
  }, [])

  useEffect(() => {
    const isOverlayOpen = cartOpen || wishlistOpen || accountOpen || Boolean(selectedProduct)
    if (!isOverlayOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setCartOpen(false)
      setWishlistOpen(false)
      setAccountOpen(false)
      closeProduct()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [cartOpen, wishlistOpen, accountOpen, selectedProduct])

  function addProduct(product: ShopProduct, color: string) {
    setWishlistOpen(false)
    if (product.sizes) {
      openProduct(product)
      return
    }
    addToCart(product, 1, color, '')
    setCartOpen(true)
  }

  return (
    <>
      <SmoothScroll />
      <ScrollReveals />
      <MaisonNav
        cartCount={itemCount}
        onAccount={() => setAccountOpen(true)}
        onBag={() => {
          setCartOpen(true)
          setWishlistOpen(false)
        }}
        onSearchChange={setSearchTerm}
        onWishlist={() => {
          setWishlistOpen(true)
          setCartOpen(false)
        }}
        searchTerm={searchTerm}
        wishlistCount={wishlist.length}
      />
      <main>
        <Hero />
        <CollectionShowcase
          onChoose={(selectedCategory) => {
            setCategory(selectedCategory)
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <ProductSection
          category={category}
          onCategoryChange={setCategory}
          currency={currency}
          onAdd={addProduct}
          onOpen={openProduct}
          onWishlist={toggleWishlist}
          searchTerm={searchTerm}
          wishlist={wishlist}
        />
        <ScentExperience
          product={fragranceProduct}
          onDiscover={() => openProduct(fragranceProduct)}
        />
        <BrandStory />
      </main>
      <Footer currency={currency} onCurrencyChange={setCurrency} />
      <ProductDetail
        currency={currency}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onAdd={(product, quantity, color, size) => {
          addToCart(product, quantity, color, size)
          setSelectedProduct(null)
          setCartOpen(true)
          if (window.location.hash.startsWith('#product/')) {
            window.history.replaceState(null, '', '#shop')
          }
        }}
        onClose={closeProduct}
        onWishlist={toggleWishlist}
        product={selectedProduct}
      />
      <CartDrawer
        onClose={() => setCartOpen(false)}
        onOpenProduct={openProductById}
        open={cartOpen}
      />
      <WishlistDrawer
        onAdd={(productId, color) => {
          const product = products.find((item) => item.id === productId)
          if (!product) {
            console.error(`Could not find product "${productId}".`)
            return
          }
          addProduct(product, color)
          setWishlistOpen(false)
        }}
        onClose={() => setWishlistOpen(false)}
        onOpenProduct={openProductById}
        open={wishlistOpen}
      />
      <AccountPanel onClose={() => setAccountOpen(false)} open={accountOpen} />
    </>
  )
}

function App() {
  return (
    <ShopProvider>
      <MaisonStore />
    </ShopProvider>
  )
}

export default App
