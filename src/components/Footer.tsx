
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function Footer() {
  return (
    <footer className="bg-dark text-white py-8 mt-auto">
      <Container className="text-center">
        <Nav className="justify-content-center mb-3">
          <Nav.Link className="text-white" href="#">
            Privacy
          </Nav.Link>
          <Nav.Link className="text-white" href="#">
            Terms
          </Nav.Link>
          <Nav.Link className="text-white" href="#">
            Contact
          </Nav.Link>
        </Nav>

        <p className="mb-0">
          © 2026 ShopKit. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
