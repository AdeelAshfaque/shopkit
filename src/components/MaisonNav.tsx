import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'

type MaisonNavProps = {
  cartCount: number
  wishlistCount: number
  searchTerm: string
  onSearchChange: (value: string) => void
  onBag: () => void
  onWishlist: () => void
  onAccount: () => void
}

function MaisonNav({
  cartCount,
  wishlistCount,
  searchTerm,
  onSearchChange,
  onBag,
  onWishlist,
  onAccount,
}: MaisonNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    function handleShortcuts(event: KeyboardEvent) {
      const target = event.target
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      if (event.key === '/' && !typing) {
        event.preventDefault()
        setSearchOpen(true)
        searchRef.current?.focus()
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMobileOpen(false)
        setCollectionsOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcuts)
    return () => window.removeEventListener('keydown', handleShortcuts)
  }, [])

  const closeMenus = () => {
    setMobileOpen(false)
    setCollectionsOpen(false)
  }

  return (
    <header className={`maison-header${isScrolled ? ' is-scrolled' : ''}`}>
      <a className="maison-wordmark" href="#" aria-label="MAISON home">MAISON<span>®</span></a>

      <nav className="maison-nav maison-nav-left" aria-label="Main navigation">
        <div
          className="nav-collection-wrap"
          onMouseEnter={() => setCollectionsOpen(true)}
          onMouseLeave={() => setCollectionsOpen(false)}
        >
          <button
            aria-expanded={collectionsOpen}
            className="nav-link nav-menu-trigger"
            onClick={() => setCollectionsOpen((open) => !open)}
            type="button"
          >
            Collections <ArrowDown size={12} />
          </button>
          <AnimatePresence>
            {collectionsOpen && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mega-menu"
                exit={{ opacity: 0, y: 8 }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <span className="mega-menu-kicker">DISCOVER MAISON</span>
                <div className="mega-menu-links">
                  <a href="#collections" onClick={closeMenus}>The Essentials <ArrowRight size={14} /></a>
                  <a href="#collections" onClick={closeMenus}>Contemporary Form <ArrowRight size={14} /></a>
                  <a href="#shop" onClick={closeMenus}>Objects of Desire <ArrowRight size={14} /></a>
                  <a href="#shop" onClick={closeMenus}>View all pieces <ArrowRight size={14} /></a>
                </div>
                <span className="mega-menu-note">CONSIDERED OBJECTS. LASTING IMPRESSIONS.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a className="nav-link" href="#shop">Discover</a>
        <a className="nav-link" href="#story">Our world</a>
      </nav>

      <div className="maison-actions">
        <div className={`maison-search${searchOpen ? ' is-open' : ''}`}>
          <Search aria-hidden="true" size={16} strokeWidth={1.5} />
          <input
            aria-label="Search the collection"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            ref={searchRef}
            type="search"
            value={searchTerm}
          />
          {searchOpen && (
            <button
              aria-label="Close search"
              className="search-close"
              onClick={() => {
                setSearchOpen(false)
                searchRef.current?.blur()
              }}
              type="button"
            >
              <X size={15} />
            </button>
          )}
          {!searchOpen && <kbd>/</kbd>}
        </div>
        <button aria-label="Account" className="nav-icon-button account-button" onClick={onAccount} type="button">
          <UserRound size={17} strokeWidth={1.5} /><span>Account</span>
        </button>
        <button aria-label={`Wishlist, ${wishlistCount} items`} className="nav-icon-button wishlist-nav-button" onClick={onWishlist} type="button">
          <Heart size={17} strokeWidth={1.5} /><span>Wishlist</span>
          {wishlistCount > 0 && <span className="nav-count">{wishlistCount}</span>}
        </button>
        <button aria-label={`Shopping bag, ${cartCount} items`} className="nav-icon-button bag-nav-button" onClick={onBag} type="button">
          <ShoppingBag size={17} strokeWidth={1.5} /><span>Bag</span>
          <span className="nav-count">{cartCount}</span>
        </button>
        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="mobile-menu-button"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label="Mobile navigation"
            className="mobile-nav-drawer"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <span className="mega-menu-kicker">THE MAISON COLLECTION</span>
            <a href="#collections" onClick={closeMenus}>Collections <ArrowRight size={16} /></a>
            <a href="#shop" onClick={closeMenus}>Discover <ArrowRight size={16} /></a>
            <a href="#story" onClick={closeMenus}>Our world <ArrowRight size={16} /></a>
            <div className="mobile-nav-actions">
              <button onClick={() => { closeMenus(); onWishlist() }} type="button"><Heart size={16} /> Wishlist <span>{wishlistCount}</span></button>
              <button onClick={() => { closeMenus(); onBag() }} type="button"><ShoppingBag size={16} /> Bag <span>{cartCount}</span></button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default MaisonNav
