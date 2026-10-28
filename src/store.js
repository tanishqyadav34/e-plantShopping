import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlice.jsx'

const store = configureStore({
  reducer: { cart: CartReducer },
})

export default store
