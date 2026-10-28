import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find((item) => item.name === action.payload.name)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.name !== action.payload)
    },
    updateQuantity(state, action) {
      const item = state.items.find((entry) => entry.name === action.payload.name)
      if (item) item.quantity = action.payload.quantity
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
