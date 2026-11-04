import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.hero-image, .hero-enter', { clearProps: 'all' })
        return
      }

      const timeline = gsap.timeline({ delay: 0.1 })
      timeline
        .fromTo(
          '.hero-image',
          { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.35,
            ease: 'power3.inOut',
          },
        )
        .from(
          '.hero-enter',
          { y: 22, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' },
          '-=0.7',
        )
    }, hero)

    return () => context.revert()
  }, [])

  return (
    <section className="maison-hero" ref={heroRef}>
      <img
        alt="Editorial portrait in a sculptural black look against warm stone"
        className="hero-image"
        data-parallax
        fetchPriority="high"
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2400&q=90"
      />
      <div className="hero-scrim" />
      <div className="hero-frame">
        <div className="hero-editorial-label hero-enter">
          <span>MAISON JOURNAL</span><span>NO. 01 — 2026</span>
        </div>
        <div className="hero-copy">
          <span className="hero-overline hero-enter">A STUDY IN THE EVERYDAY</span>
          <h1 className="hero-enter">
            THE ART OF
            <br />
            EVERYDAY <em>ELEGANCE.</em>
          </h1>
          <p className="hero-enter">
            Considered essentials. Timeless expressions.
            <br />A new perspective on modern living.
          </p>
          <a className="hero-cta hero-enter" href="#collections">
            EXPLORE THE COLLECTION <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        </div>
        <div className="hero-bottom-line hero-enter">
          <span>FORM FOLLOWS FEELING</span>
          <a aria-label="Scroll to discover collections" href="#collections">
            <span>DISCOVER</span><ArrowDown size={14} strokeWidth={1.5} />
          </a>
          <span>PARIS · COPENHAGEN · EVERYWHERE</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
