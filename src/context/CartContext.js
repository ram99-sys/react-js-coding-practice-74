import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
})

export default CartContext
