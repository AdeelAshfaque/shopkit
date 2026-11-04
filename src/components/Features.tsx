import Icon from './Icon'

const promises = [
  {
    icon: 'heart',
    title: 'Picked with purpose',
    description: 'Useful, lovely, made to be part of your everyday.',
  },
  {
    icon: 'arrow-right',
    title: 'A little treat, on us',
    description: 'Enjoy free delivery when your order is over Rs. 5,000.',
  },
  {
    icon: 'check',
    title: 'No-stress returns',
    description: 'Changed your mind? You have 14 days to send it back.',
  },
] as const

function Features() {
  return (
    <section className="promise-section" id="why-shopkit">
      <div className="promise-heading" data-reveal>
        <span className="eyebrow">THE SHOPKIT KIND OF THING</span>
        <h2>Good stuff. <em>Good people.</em></h2>
      </div>
      <div className="promise-grid">
        {promises.map((promise, index) => (
          <article className="promise-card" data-reveal key={promise.title}>
            <span className={`promise-icon promise-icon-${index + 1}`}>
              <Icon name={promise.icon} size={21} />
            </span>
            <div>
              <h3>{promise.title}</h3>
              <p>{promise.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features
