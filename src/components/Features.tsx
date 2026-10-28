
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function Features() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Why Choose ShopKit?</h2>

      <Row>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Quality Products</Card.Title>
              <Card.Text>
                Discover reliable products made for everyday use.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Fast Delivery</Card.Title>
              <Card.Text>
                Get your orders delivered right to your doorstep.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Easy Returns</Card.Title>
              <Card.Text>
                Enjoy a simple and convenient return experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Features
