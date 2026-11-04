import { useMemo, useState, type FormEvent } from 'react'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Icon from './components/Icon'
import ShopNavbar from './components/Navbar'

const categories = ['Everything', 'Home', 'Tech', 'Accessories']

const products = [
  {
    id: 'headphones',
    name: 'Studio Wireless Headphones',
    category: 'Tech',
    detail: 'Sound that finds its rhythm.',
    price: 4500,
    previousPrice: 5900,
    rating: '4.9',
    reviews: 128,
    label: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Warm-toned over-ear wireless headphones',
    color: 'sand',
  },
  {
    id: 'table-lamp',
    name: 'The Sunday Table Lamp',
    category: 'Home',
    detail: 'A little glow goes a long way.',
    price: 3200,
    previousPrice: null,
    rating: '4.8',
    reviews: 86,
    label: 'Just in',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Sculptural lamp casting a warm glow',
    color: 'peach',
  },
  {
    id: 'everyday-watch',
    name: 'Everyday Analog Watch',
    category: 'Accessories',
    detail: 'The one you reach for, every day.',
    price: 6800,
    previousPrice: null,
    rating: '4.9',
    reviews: 74,
    label: '',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Minimal wristwatch with a light dial',
    color: 'sage',
  },
  {
    id: 'everyday-camera',
    name: 'Pocket Film Camera',
    category: 'Tech',
    detail: 'Keep the good bits in focus.',
    price: 8900,
    previousPrice: 10500,
    rating: '4.7',
    reviews: 52,
    label: 'A little less',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Compact camera ready for a day out',
    color: 'lavender',
  },
  {
    id: 'sunglasses',
    name: 'Daylight Acetate Frames',
    category: 'Accessories',
    detail: 'A sunnier point of view.',
    price: 2800,
    previousPrice: null,
    rating: '4.8',
    reviews: 39,
    label: '',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Classic sunglasses with a dark frame',
    color: 'butter',
  },
  {
    id: 'ceramic-vase',
    name: 'Sunday Ceramic Vase',
    category: 'Home',
    detail: 'Made for stems or just as it is.',
    price: 2400,
    previousPrice: null,
    rating: '4.9',
    reviews: 61,
    label: 'Small batch',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Handmade ceramic vase in a sunlit room',
    color: 'rose',
  },
  {
    id: 'portable-speaker',
    name: 'Little Room Speaker',
    category: 'Tech',
    detail: 'Big feeling, small footprint.',
    price: 5200,
    previousPrice: null,
    rating: '4.8',
    reviews: 93,
    label: '',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Compact portable speaker on a shelf',
    color: 'blue',
  },
  {
    id: 'weekend-tote',
    name: 'The Everywhere Tote',
    category: 'Accessories',
    detail: 'Room for one more little thing.',
    price: 1900,
    previousPrice: null,
    rating: '4.7',
    reviews: 47,
    label: '',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Everyday tote bag in a neutral color',
    color: 'cream',
  },
]

const formatPrice = (price: number) => `Rs. ${price.toLocaleString('en-PK')}`

function App() {
  const [category, setCategory] = useState('Everything')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        category === 'Everything' || product.category === category
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.detail}`
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesSearch
    })
  }, [category, searchTerm])

  function toggleFavorite(productId: string) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <ShopNavbar
        cartCount={cartCount}
        cartOpen={cartOpen}
        onCartClick={() => setCartOpen((open) => !open)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main>
        <Hero />

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2>Find your new <em>favorite.</em></h2>
              <p>Thoughtful little things for wherever life takes you.</p>
            </div>
            <a className="text-link" href="#newsletter">
              A note from us <Icon name="arrow-up-right" size={16} />
            </a>
          </div>

          <div className="shop-toolbar">
            <div className="category-list" aria-label="Filter products by category">
              {categories.map((item) => (
                <button
                  className={`category-button${category === item ? ' is-active' : ''}`}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="product-count">
              {visibleProducts.length} lovely finds
            </span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => {
                const isFavorite = favorites.includes(product.id)

                return (
                  <article className="product-card" key={product.id}>
                    <div className={`product-image-wrap tone-${product.color}`}>
                      <img
                        alt={product.imageAlt}
                        className="product-image"
                        loading="lazy"
                        src={product.image}
                      />
                      {product.label && (
                        <span className="product-label">{product.label}</span>
                      )}
                      <button
                        aria-label={
                          isFavorite
                            ? `Remove ${product.name} from favorites`
                            : `Add ${product.name} to favorites`
                        }
                        aria-pressed={isFavorite}
                        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
                        onClick={() => toggleFavorite(product.id)}
                        type="button"
                      >
                        <Icon name="heart" size={18} />
                      </button>
                      <button
                        className="quick-add"
                        onClick={() => {
                          setCartCount((count) => count + 1)
                          setCartOpen(false)
                        }}
                        type="button"
                      >
                        <Icon name="plus" size={16} />
                        Add to bag
                      </button>
                    </div>
                    <div className="product-info">
                      <div className="product-name-row">
                        <div>
                          <span className="product-category">
                            {product.category}
                          </span>
                          <h3>{product.name}</h3>
                        </div>
                        <span className="product-rating">
                          <span aria-hidden="true">★</span> {product.rating}
                        </span>
                      </div>
                      <p className="product-detail">{product.detail}</p>
                      <div className="product-price-row">
                        <span className="product-price">
                          {formatPrice(product.price)}
                        </span>
                        {product.previousPrice && (
                          <span className="previous-price">
                            {formatPrice(product.previousPrice)}
                          </span>
                        )}
                        <span className="review-count">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" size={22} />
              </span>
              <h3>No little treasures found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setSearchTerm('')
                  setCategory('Everything')
                }}
                type="button"
              >
                Show me everything
              </button>
            </div>
          )}
        </section>

        <Features />

        <section className="newsletter-section" id="newsletter">
          <div className="newsletter-decoration" aria-hidden="true">✳</div>
          <div className="newsletter-copy">
            <span className="eyebrow">A GOOD THING IN YOUR INBOX</span>
            <h2>A little joy, <em>delivered.</em></h2>
            <p>New finds, kind notes, and 10% off your first order.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <label className="visually-hidden" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              autoComplete="email"
              id="newsletter-email"
              placeholder="Your email address"
              required
              type="email"
            />
            <button className="button button-dark" type="submit">
              {subscribed ? (
                <>
                  You&apos;re on the list <Icon name="check" size={16} />
                </>
              ) : (
                <>
                  Count me in <Icon name="arrow-right" size={16} />
                </>
              )}
            </button>
            <span className="newsletter-note" aria-live="polite">
              {subscribed
                ? 'Lovely. Keep an eye on your inbox!'
                : 'No spam, just the good stuff. Unsubscribe whenever.'}
            </span>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
