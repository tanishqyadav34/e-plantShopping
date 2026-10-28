import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice.jsx'

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0)

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <p className="eyebrow">Your green picks</p>
        <h1>Your Shopping Cart</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="button" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p className="cart-unit-price">${item.cost} each</p>
                  <div className="quantity-controls" aria-label={`${item.name} quantity`}>
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
                      } else {
                        dispatch(removeItem(item.name))
                      }
                    }}>−</button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <p className="subtotal">Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
                </div>
                <button className="delete-button" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <strong>Total Cart Amount: ${total.toFixed(2)}</strong>
            <div className="cart-buttons">
              <button className="button button-secondary" onClick={onContinueShopping}>Continue Shopping</button>
              <button className="button" onClick={() => window.alert('Coming Soon')}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default CartItem
