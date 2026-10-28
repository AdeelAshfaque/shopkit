
import ShopNavbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ShopNavbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default App
