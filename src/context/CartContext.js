import React from 'react'

const CartContext = React.createContext({
  toggler: false,
  openToggler: () => {},
  closeToggler: () => {},
  addCartItem: () => {},
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
})

export default CartContext
