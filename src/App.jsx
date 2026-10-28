import { useState } from 'react'
import AboutUs from './AboutUs.jsx'
import ProductList from './ProductList.jsx'
import './App.css'

function App() {
  const [showProductList, setShowProductList] = useState(false)

  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />
  }

  return (
    <main className="landing-page background-image">
      <div className="landing-content">
        <p className="eyebrow">Bring nature home</p>
        <h1>Welcome To Paradise Nursery</h1>
        <p className="landing-tagline">Grow a little green into your everyday.</p>
        <button className="button button-light" onClick={() => setShowProductList(true)}>
          Get Started
        </button>
      </div>
      <AboutUs />
    </main>
  )
}

export default App
