import { ArrowUpRight, Camera, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type FooterProps = {
  currency: string
  onCurrencyChange: (currency: string) => void
}

function Footer({ currency, onCurrencyChange }: FooterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer className="maison-footer">
      <div className="footer-newsletter">
        <div>
          <span className="section-index">A LETTER FROM MAISON</span>
          <h2>Notes on living<br /><em>beautifully.</em></h2>
        </div>
        <form className="footer-subscribe" onSubmit={subscribe}>
          <label htmlFor="footer-email">Occasional notes, new collections, and things worth keeping.</label>
          <div className="footer-email-row">
            <input
              autoComplete="email"
              id="footer-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              required
              type="email"
              value={email}
            />
            <button aria-label="Subscribe to the Maison journal" type="submit">
              {submitted ? 'THANK YOU' : 'SUBSCRIBE'} <Send size={14} />
            </button>
          </div>
          <span aria-live="polite">
            {submitted
              ? 'You are on the list. This preview does not send or store your email.'
              : 'No noise. Just a little inspiration, now and then.'}
          </span>
        </form>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <a aria-label="MAISON home" className="footer-wordmark" href="#">MAISON<span>®</span></a>
          <p>Considered essentials.<br />Timeless expressions.</p>
        </div>
        <div className="footer-link-column">
          <span>EXPLORE</span>
          <a href="#collections">Collections</a>
          <a href="#shop">Discover</a>
          <a href="#story">Our world</a>
          <a href="#scent">Object study</a>
        </div>
        <div className="footer-link-column">
          <span>CLIENT CARE</span>
          <a href="mailto:care@maison.studio">Contact</a>
          <a href="#shop">Shipping &amp; returns</a>
          <a href="#newsletter">The MAISON journal</a>
          <a href="mailto:care@maison.studio">FAQs</a>
        </div>
        <div className="footer-link-column footer-follow">
          <span>FOLLOW OUR WORLD</span>
          <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
            Instagram <Camera size={14} />
          </a>
          <a href="https://www.pinterest.com/" rel="noreferrer" target="_blank">
            Pinterest <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© MAISON STUDIO 2026</span>
        <div className="footer-locale">
          <label>
            <span className="visually-hidden">Country</span>
            <select defaultValue="PK">
              <option value="PK">PAKISTAN</option>
              <option value="GB">UNITED KINGDOM</option>
              <option value="US">UNITED STATES</option>
            </select>
          </label>
          <label>
            <span className="visually-hidden">Currency</span>
            <select onChange={(event) => onCurrencyChange(event.target.value)} value={currency}>
              <option value="PKR">PKR ₨</option>
              <option value="USD">USD $</option>
            </select>
          </label>
        </div>
        <div className="footer-legal">
          <a href="#newsletter">PRIVACY</a><a href="#newsletter">TERMS</a>
          <span>DESIGNED TO LAST</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
