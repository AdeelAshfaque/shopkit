import { useMemo, useState } from 'react'
import { ArrowDownUp, SlidersHorizontal, X } from 'lucide-react'
import { categories, products, type ShopProduct, type SortOption } from '../data/products'
import ProductCard from './ProductCard'

type ProductSectionProps = {
  category: string
  onCategoryChange: (category: string) => void
  currency: string
  searchTerm: string
  wishlist: string[]
  onOpen: (product: ShopProduct) => void
  onAdd: (product: ShopProduct, color: string) => void
  onWishlist: (productId: string) => void
}

const sortOptions: SortOption[] = [
  'Featured',
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
]

function ProductSection({
  category,
  onCategoryChange,
  currency,
  searchTerm,
  wishlist,
  onOpen,
  onAdd,
  onWishlist,
}: ProductSectionProps) {
  const [sort, setSort] = useState<SortOption>('Featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(query)
      return matchesCategory && matchesSearch
    })

    switch (sort) {
      case 'Newest':
        return filtered.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
      case 'Price: Low to High':
        return filtered.sort((a, b) => a.price - b.price)
      case 'Price: High to Low':
        return filtered.sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [category, searchTerm, sort])

  return (
    <section className="shop-section" id="shop">
      <header className="shop-section-heading" data-reveal>
        <div>
          <span className="section-index">02 / THE COLLECTION</span>
          <h2>FEWER THINGS.<br /><em>BETTER CHOSEN.</em></h2>
        </div>
        <p>Made with intention. Kept for a lifetime.<br />A considered edit for living well.</p>
      </header>

      <div className="shop-controls" data-reveal>
        <div className="shop-categories" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? 'is-selected' : ''}
              key={item}
              onClick={() => onCategoryChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="shop-sort-row">
          <span className="shop-result-count">{visibleProducts.length} PIECES</span>
          <button
            aria-expanded={filtersOpen}
            className="filter-toggle"
            onClick={() => setFiltersOpen((open) => !open)}
            type="button"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span>REFINE</span>
          </button>
          <label className="sort-select-wrap">
            <span className="visually-hidden">Sort products</span>
            <ArrowDownUp size={13} strokeWidth={1.5} />
            <select
              onChange={(event) => setSort(event.target.value as SortOption)}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtersOpen && (
        <div className="refine-panel">
          <span>SHOP BY CATEGORY</span>
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? 'is-selected' : ''}
              key={item}
              onClick={() => onCategoryChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
          <button className="refine-close" onClick={() => setFiltersOpen(false)} type="button">
            <X size={14} /> CLOSE
          </button>
        </div>
      )}

      {searchTerm && (
        <div className="search-results-note" role="status">
          SEARCH RESULTS FOR <strong>“{searchTerm}”</strong>
        </div>
      )}

      {visibleProducts.length ? (
        <div className="maison-product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              currency={currency}
              isWishlisted={wishlist.includes(product.id)}
              key={product.id}
              onAdd={onAdd}
              onOpen={onOpen}
              onWishlist={onWishlist}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="maison-empty-results">
          <span className="section-index">NO MATCHES FOUND</span>
          <h3>A quieter search.</h3>
          <p>Try a different phrase or return to the complete edit.</p>
          <button onClick={() => onCategoryChange('All')} type="button">VIEW ALL PIECES</button>
        </div>
      )}
    </section>
  )
}

export default ProductSection
