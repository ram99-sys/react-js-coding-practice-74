const Cart = () => {
  const storedRestaurantItemsData = localStorage.getItem('cartItem')
  const parseStoredData = JSON.parse(storedRestaurantItemsData)
  console.log(parseStoredData)

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default Cart
