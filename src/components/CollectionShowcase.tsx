import { ArrowUpRight } from 'lucide-react'

const collections = [
  {
    number: '01',
    name: 'The Essentials',
    note: 'AN EXERCISE IN RESTRAINT',
    image: 'photo-1483985988355-763728e1935b',
    alt: 'Editorial fashion portrait in warm natural light',
    className: 'collection-tall',
    target: 'Accessories',
  },
  {
    number: '02',
    name: 'Contemporary Form',
    note: 'SHAPE, MATERIAL, MEANING',
    image: 'photo-1490312278390-ab64016e0aa9',
    alt: 'Sculptural contemporary furniture in a minimal interior',
    className: 'collection-wide',
    target: 'Objects',
  },
  {
    number: '03',
    name: 'Objects of Desire',
    note: 'THE DETAILS THAT STAY',
    image: 'photo-1608571423902-eed4a5ad8108',
    alt: 'Thoughtfully arranged timeless objects',
    className: 'collection-detail',
    target: 'Fragrance',
  },
]

function CollectionShowcase({ onChoose }: { onChoose: (category: string) => void }) {
  return (
    <section className="collection-section" id="collections">
      <header className="collection-heading" data-reveal>
        <span className="section-index">01 / COLLECTIONS</span>
        <h2>CURATED FOR THE<br /><em>MODERN INDIVIDUAL.</em></h2>
        <p>Objects with intention, chosen to find their way into your everyday.</p>
      </header>
      <div className="collection-layout">
        {collections.map((collection) => (
          <a
            className={`collection-tile ${collection.className}`}
            href="#shop"
            key={collection.number}
            onClick={() => onChoose(collection.target)}
          >
            <img
              alt={collection.alt}
              loading="lazy"
              src={`https://images.unsplash.com/${collection.image}?auto=format&fit=crop&w=1300&q=85`}
            />
            <span className="collection-overlay" />
            <span className="collection-tile-top">
              <span>{collection.number} / MAISON</span><ArrowUpRight size={17} />
            </span>
            <span className="collection-tile-content">
              <span>{collection.note}</span>
              <strong>{collection.name}</strong>
            </span>
          </a>
        ))}
      </div>
      <a className="collection-all-link" href="#shop">
        VIEW THE COMPLETE COLLECTION <ArrowUpRight size={14} />
      </a>
    </section>
  )
}

export default CollectionShowcase
