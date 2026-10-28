import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './CartSlice.jsx'
import CartItem from './CartItem.jsx'

const plantsArray = [
  {
    category: 'Air Purifying',
    plants: [
      { name: 'Peace Lily', image: 'photo-1501004318641-b39e6451bec6', description: 'Elegant white blooms and lush leaves help freshen your indoor space.', cost: 18 },
      { name: 'Snake Plant', image: 'photo-1593691509543-c55fb32e5cee', description: 'A sculptural, resilient favorite that thrives with little fuss.', cost: 22 },
      { name: 'Golden Pothos', image: 'photo-1497250681960-ef046c08a56e', description: 'Trailing heart-shaped leaves bring an easy cascade of green.', cost: 16 },
      { name: 'Areca Palm', image: 'photo-1512428813834-c702c7702b78', description: 'A graceful tropical palm that adds a soft, airy feel to any room.', cost: 28 },
      { name: 'Rubber Plant', image: 'photo-1509423350716-97f9360b4e09', description: 'Glossy, bold foliage makes this a striking low-maintenance accent.', cost: 25 },
      { name: 'Boston Fern', image: 'photo-1597055181300-b5bfcfc1c99b', description: 'Feathery fronds add a lush, fresh look to shelves and bright corners.', cost: 20 },
    ],
  },
  {
    category: 'Aromatic',
    plants: [
      { name: 'Lavender', image: 'photo-1499002238440-d264edd596ec', description: 'Fragrant purple blooms bring a soothing touch to sunny windowsills.', cost: 14 },
      { name: 'Rosemary', image: 'photo-1471193945509-9ad0617afabf', description: 'A fragrant kitchen herb with evergreen needles for cooking and décor.', cost: 12 },
      { name: 'Basil', image: 'photo-1618164436241-4473940d1f5c', description: 'Fresh, aromatic leaves make this a delicious countertop companion.', cost: 10 },
      { name: 'Mint', image: 'photo-1628556270448-4d4e4148e1b1', description: 'Bright, refreshing leaves are wonderful for tea and sunny kitchens.', cost: 9 },
      { name: 'Lemon Balm', image: 'photo-1591857177580-dc82b9ac4e1e', description: 'A cheerful herb with delicate lemon-scented leaves.', cost: 11 },
      { name: 'Jasmine', image: 'photo-1494972308805-463bc619d34e', description: 'Delicate blooms and a sweet fragrance make evenings feel special.', cost: 19 },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Echeveria', image: 'photo-1459411552884-841db9b3cc2a', description: 'A compact rosette succulent in soft, pastel green tones.', cost: 13 },
      { name: 'Aloe Vera', image: 'photo-1509423350716-97f9360b4e09', description: 'A sun-loving succulent with architectural leaves and easy-care charm.', cost: 15 },
      { name: 'Jade Plant', image: 'photo-1501004318641-b39e6451bec6', description: 'Rounded, glossy leaves give this classic succulent a cheerful look.', cost: 17 },
      { name: 'String of Pearls', image: 'photo-1509423350716-97f9360b4e09', description: 'Delicate bead-like leaves trail beautifully from a hanging planter.', cost: 21 },
      { name: 'Haworthia', image: 'photo-1459411552884-841db9b3cc2a', description: 'A petite striped succulent that is perfect for desks and small spaces.', cost: 12 },
      { name: 'Sedum', image: 'photo-1497250681960-ef046c08a56e', description: 'Colorful, drought-tolerant foliage for a bright little plant display.', cost: 14 },
    ],
  },
]

function plantImage(image) {
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80`
}

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false)
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const addedToCart = Object.fromEntries(items.map((item) => [item.name, true]))

  return (
    <div className="shop-page">
      <nav className="navbar" aria-label="Main navigation">
        <button className="brand" onClick={onHomeClick}>Paradise Nursery</button>
        <div className="nav-actions">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={() => setShowCart(false)}>Plants</button>
          <button className="cart-link" onClick={() => setShowCart(true)} aria-label={`Cart, ${cartCount} items`}>
            <span aria-hidden="true">🛒</span> Cart <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="catalog">
          <header className="catalog-heading">
            <p className="eyebrow">Find your new favorite</p>
            <h1>Plants for every space</h1>
            <p>Thoughtful greenery, ready to make yourself at home.</p>
          </header>
          {plantsArray.map((category) => (
            <section className="plant-category" key={category.category}>
              <h2>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant) => {
                  const isAdded = addedToCart[plant.name]
                  return (
                    <article className="product-card" key={plant.name}>
                      <img
                        src={plantImage(plant.image)}
                        alt={plant.name}
                        onError={(event) => {
                          event.currentTarget.onerror = null
                          event.currentTarget.src = 'https://placehold.co/700x480/e7eee5/45634b?text=Plant'
                        }}
                      />
                      <div className="product-details">
                        <div className="product-title-row">
                          <h3>{plant.name}</h3>
                          <span className="price">${plant.cost}</span>
                        </div>
                        <p>{plant.description}</p>
                        <button
                          className="button add-button"
                          disabled={isAdded}
                          onClick={() => dispatch(addItem({ ...plant, image: plantImage(plant.image) }))}
                        >
                          {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  )
}

export default ProductList
