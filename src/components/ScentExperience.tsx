import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { ShopProduct } from '../data/products'

const PerfumeCanvas = lazy(() => import('./PerfumeCanvas'))

function FragranceImage({ product }: { product: ShopProduct }) {
  return (
    <img
      className="scent-fallback-image"
      src={product.images[0].src}
      alt={product.images[0].alt}
      loading="lazy"
    />
  )
}

function ScentExperience({
  product,
  onDiscover,
}: {
  product: ShopProduct
  onDiscover: () => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [loadScene, setLoadScene] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const loadForViewport = () => {
      if (window.matchMedia('(min-width: 700px) and (prefers-reduced-motion: no-preference)').matches) {
        setLoadScene(true)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadForViewport()
      },
      { rootMargin: '250px 0px' },
    )
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scent-section" aria-labelledby="scent-title">
      <div className="scent-copy">
        <span className="section-index">THE MAISON SCENT · 01 / 03</span>
        <span className="scent-edition">EAU DE PARFUM · 50 ML</span>
        <h2 id="scent-title">
          A quieter
          <br />
          kind of <em>presence.</em>
        </h2>
        <p>
          Sandalwood, black tea, and the warmth of sun on cedar. A skin-close
          composition made to feel like it has always been yours.
        </p>
        <div className="scent-notes" aria-label="Fragrance notes">
          <span>SANDALWOOD</span><i aria-hidden="true" />
          <span>BLACK TEA</span><i aria-hidden="true" />
          <span>CEDAR</span>
        </div>
        <button className="editorial-link" onClick={onDiscover} type="button">
          DISCOVER NO. 04 <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="scent-stage" ref={stageRef}>
        <div className="scent-stage-index">
          <span>ATELIER Nº 04</span>
          <span>INTERACTIVE OBJECT</span>
        </div>
        <div className="scent-canvas">
          {loadScene ? (
            <Suspense fallback={<FragranceImage product={product} />}>
              <PerfumeCanvas fallback={<FragranceImage product={product} />} />
            </Suspense>
          ) : (
            <FragranceImage product={product} />
          )}
        </div>
        <div className="scent-caption">
          <span>COMPOSED IN PARIS</span>
          <span>50 ML / 1.7 FL.OZ.</span>
        </div>
      </div>
    </section>
  )
}

export default ScentExperience
