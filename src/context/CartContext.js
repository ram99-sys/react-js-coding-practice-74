import React from 'react'

const CartContext = React.createContext({
  addCartItem: () => {},
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
})

export default CartContext
