import { ArrowUpRight } from 'lucide-react'

function BrandStory() {
  return (
    <section className="story-section" id="story">
      <div className="story-image-wrap" data-reveal>
        <img
          alt="Sunlight crossing a quiet architectural interior"
          data-parallax
          loading="lazy"
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85"
        />
        <span className="story-image-label">A HOME FOR WHAT MATTERS</span>
      </div>
      <div className="story-copy" data-reveal>
        <span className="section-index">04 / OUR POINT OF VIEW</span>
        <h2>LESS,<br />BUT <em>BETTER.</em></h2>
        <p>
          An appreciation for craftsmanship, thoughtful materials, and objects
          designed to become part of your everyday life.
        </p>
        <p>
          We believe the things we choose to live with should mean something.
          Made with care. Made to last. Made to feel like they were always yours.
        </p>
        <a className="editorial-link" href="#newsletter">
          THE MAISON PHILOSOPHY <ArrowUpRight size={14} />
        </a>
        <span className="story-signature">A quieter kind of luxury — MAISON</span>
      </div>
    </section>
  )
}

export default BrandStory
