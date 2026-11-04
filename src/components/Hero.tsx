import Icon from './Icon'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="hero-kicker">
          <span className="kicker-spark">✳</span> YOUR EVERYDAY, A LITTLE BETTER
        </span>
        <h1>
          Make room
          <br />
          for <em>good things.</em>
        </h1>
        <p>
          The pieces you didn&apos;t know you needed.
          <br className="desktop-break" /> The ones you&apos;ll wonder how you lived without.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#shop">
            Meet your new favorites <Icon name="arrow-right" size={17} />
          </a>
          <span className="hero-note">
            <span aria-hidden="true">✦</span> Picked with a little extra love
          </span>
        </div>
        <div className="hero-social-proof">
          <div className="avatar-stack" aria-hidden="true">
            <span>J</span><span>M</span><span>A</span><span>S</span>
          </div>
          <span>Loved by <strong>2,400+</strong> happy humans</span>
        </div>
      </div>

      <div className="hero-visual">
        <img
          alt="A sunlit, thoughtfully styled room with flowers and everyday objects"
          className="hero-image"
          fetchPriority="high"
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=90"
        />
        <div className="hero-image-wash" />
        <div className="hero-sticker">
          <span className="sticker-star">✳</span>
          <span>Little things,<br /><em>lovely living.</em></span>
        </div>
        <div className="hero-caption">
          <span>GOOD THINGS, GOOD FEELINGS</span>
          <span className="caption-dot" />
          <span>EST. WITH LOVE</span>
        </div>
      </div>
      <div className="hero-scribble" aria-hidden="true">✳</div>
    </section>
  )
}

export default Hero
