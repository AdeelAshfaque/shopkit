
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Hero() {
  const headline = 'Discover Your Next Favourite'
  const description = 'Explore quality products at great prices.'

  return (
    <Container className="py-5 text-center">
      <h1>{headline}</h1>
      <p>{description}</p>
      <Button variant="primary">Shop Now</Button>
    </Container>
  )
}

export default Hero
