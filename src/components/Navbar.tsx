import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

type ShopNavbarProps = {
  cartCount: number
  cartOpen: boolean
  onCartClick: () => void
  searchTerm: string
  onSearchChange: (value: string) => void
}

function ShopNavbar({
  cartCount,
  cartOpen,
  onCartClick,
  searchTerm,
  onSearchChange,
}: ShopNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      const target = event.target
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)

      if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        setSearchOpen(true)
        searchInput.current?.focus()
      } else if (event.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        searchInput.current?.blur()
      }
    }

    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [searchOpen])

  function toggleSearch() {
    const nextOpen = !searchOpen
    setSearchOpen(nextOpen)
    if (nextOpen) requestAnimationFrame(() => searchInput.current?.focus())
  }

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <span>Small things. Big everyday energy.</span>
        <a href="#shop">
          Free delivery on orders over Rs. 5,000
          <Icon name="arrow-up-right" size={13} />
        </a>
      </div>
      <div className="nav-shell">
        <a aria-label="ShopKit home" className="brand" href="#">
          <span aria-hidden="true" className="brand-mark">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>shopkit<span className="brand-period">.</span></span>
        </a>

        <nav
          aria-label="Main navigation"
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
        >
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop all</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>New &amp; nice</a>
          <a href="#why-shopkit" onClick={() => setMenuOpen(false)}>Our little story</a>
          <a href="#newsletter" onClick={() => setMenuOpen(false)}>Say hello</a>
        </nav>

        <div className="nav-actions">
          <div className="search-field">
            <Icon name="search" size={17} />
            <label className="visually-hidden" htmlFor="product-search">
              Search products
            </label>
            <input
              id="product-search"
              className={searchOpen ? 'is-open' : ''}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Find something..."
              ref={searchInput}
              type="search"
              value={searchTerm}
            />
            <button
              aria-expanded={searchOpen}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              className="search-toggle"
              onClick={toggleSearch}
              type="button"
            >
              <Icon name="search" size={17} />
            </button>
            <kbd>/</kbd>
          </div>
          <button
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            aria-expanded={cartOpen}
            className="bag-button"
            onClick={onCartClick}
            type="button"
          >
            <Icon name="bag" size={20} />
            <span>Bag</span>
            <span className="bag-count" aria-live="polite">{cartCount}</span>
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default ShopNavbar
