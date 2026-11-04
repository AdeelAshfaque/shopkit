import Icon from './Icon'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a aria-label="ShopKit home" className="brand brand-light" href="#">
            <span aria-hidden="true" className="brand-mark">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span>shopkit<span className="brand-period">.</span></span>
          </a>
          <p>Little things for living a<br />whole lot more.</p>
          <a className="footer-email" href="mailto:hello@shopkit.store">
            <Icon name="arrow-up-right" size={15} /> hello@shopkit.store
          </a>
        </div>
        <div className="footer-links">
          <div>
            <h3>Come on in</h3>
            <a href="#shop">Shop everything</a>
            <a href="#shop">New &amp; nice</a>
            <a href="#why-shopkit">Our story</a>
          </div>
          <div>
            <h3>Here to help</h3>
            <a href="#newsletter">Contact us</a>
            <a href="#newsletter">Shipping &amp; returns</a>
            <a href="#newsletter">Your order</a>
          </div>
          <div className="footer-social">
            <h3>Let&apos;s be friends</h3>
            <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
              <span className="instagram-icon">◎</span> Instagram
            </a>
            <p>Good finds, shared often.</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ShopKit Studio. Made for your everyday.</span>
        <div>
          <a href="#newsletter">Privacy</a>
          <a href="#newsletter">Terms</a>
          <span>Made with a little <span className="footer-heart">♥</span> in Pakistan</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
