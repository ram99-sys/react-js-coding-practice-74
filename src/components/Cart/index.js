import Header from '../Header'
import CartItems from '../CartItems'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => {
  const storedRestaurantItemsData = localStorage.getItem('cartItem')
  const parseStoredData = JSON.parse(storedRestaurantItemsData)
  console.log(parseStoredData)

  /*
  let total = 0
  parseStoredData.forEach(eachCartItem => {
    total += eachCartItem.cost * eachCartItem.quantity
  })
  console.log(total)

  */

  return (
    <div>
      <Header />
      {parseStoredData === null ? (
        <EmptyCartView />
      ) : (
        <div className="cart-items-container">
          <div className="cart-header">
            <p className="cart-value">Item</p>
            <p className="cart-value">Quantity</p>
            <p className="cart-value">Price</p>
          </div>
          <div className="cart-items">
            {parseStoredData.map(eachObject => (
              <CartItems key={eachObject.id} cartItemDetails={eachObject} />
            ))}
          </div>
          <hr className="hr-line" />
          <div className="total-price-section">
            <h1 className="order-total">Order Total:</h1>
            <p className="total-price1">
              <span>&#8377;&nbsp;</span>
              {}.00
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
